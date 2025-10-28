import React, { useEffect } from "react";
import { useSuppliers } from "@/context/SupplierContext";
import { useBrands } from "@/context/BrandContext";
import { useCategories } from "@/context/CategoryContext";
import { useProducts } from "@/context/ProductContext"; // ✅ Correct hook
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import FullPageLoader from "@/components/ui/FullPageLoader";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// ✅ Schema
const ProductSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  sku: z.string().min(1, "SKU is required"),
  barcode: z.string().optional(),

  categoryId: z
    .string()
    .min(1, "Please select a category")
    .refine((val) => val !== "select" && val !== "", {
      message: "Please select a category",
    }),

  brandId: z
    .string()
    .min(1, "Please select a brand")
    .refine((val) => val !== "select" && val !== "", {
      message: "Please select a brand",
    }),

  supplierId: z
    .string()
    .min(1, "Please select a supplier")
    .refine((val) => val !== "select" && val !== "", {
      message: "Please select a supplier",
    }),

  costPrice: z.coerce.number({ invalid_type_error: "Cost price must be a number" }),
  sellingPrice: z.coerce.number({ invalid_type_error: "Selling price must be a number" }),
  discountType: z.enum(["percentage", "fixed", "none"]),
  discountValue: z.coerce.number().optional(),
  giftMinQty: z.coerce.number().optional(),
  giftQty: z.coerce.number().optional(),
  reorderLevel: z.coerce.number({ invalid_type_error: "Reorder level must be a number" }),
  unit: z.string().min(1, "Unit is required"),
  expiryDate: z.string().optional(),
  stock: z.coerce.number({ invalid_type_error: "Stock must be a number" }),
  imageUrl: z.string().optional(),
  status: z.enum(["active", "inactive"]),
  description: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// ✅ SKU Generator
const generateSKU = () => {
  const date = new Date().toISOString().split("T")[0].replace(/-/g, "");
  const random = Math.floor(10000 + Math.random() * 90000);
  return `SKU-${date}-${random}`;
};

export default function AddProduct() {
  const {
    loading,
    createProduct,
    editProduct,
    editingProduct,
    setEditingProduct,
  } = useProducts(); // ✅ Correct hook usage

  const { suppliers } = useSuppliers();
  const { brands } = useBrands();
  const { categories } = useCategories();

  const normalizedSuppliers = suppliers?.map((s) => ({
    id: s.id,
    value: s.id,
    label: s.name,
  })) || [];

  const normalizedBrands = brands?.map((b) => ({
    id: b.id,
    value: b.id,
    label: b.name,
  })) || [];

  const normalizedCategories = categories?.map((c) => ({
    id: c.id,
    value: c.id,
    label: c.name,
  })) || [];

  const form = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      sku: generateSKU(),
      barcode: "",
      supplierId: "",
      brandId: "",
      categoryId: "",
      costPrice: 0,
      sellingPrice: 0,
      discountType: "none",
      discountValue: 0,
      giftMinQty: 0,
      giftQty: 0,
      reorderLevel: 0,
      unit: "pcs",
      expiryDate: "",
      stock: 0,
      imageUrl: "",
      status: "active",
      description: "",
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    },
  });

  // ✅ Prefill form if editing
  useEffect(() => {
    if (editingProduct) {
      form.reset({
        ...editingProduct,
        createdAt: editingProduct.createdAt
          ? new Date(editingProduct.createdAt.seconds * 1000).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      });
    }
  }, [editingProduct, form]);

  // ✅ Submit handler
  const onSubmit = async (values) => {
    try {
      if (editingProduct) {
        await editProduct(editingProduct.id, values);
        setEditingProduct(null);
      } else {
        await createProduct(values);
      }

      form.reset({
        ...form.defaultValues,
        sku: generateSKU(),
      });
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Something went wrong!");
    }
  };

  if (loading) return <FullPageLoader />;

  return (
    <div className="flex justify-center mt-6 p-4">
      <Card className="w-full max-w-5xl shadow-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900 dark:text-gray-100">
            {editingProduct ? "Edit Product" : "Add New Product"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* LEFT COLUMN */}
              <div className="space-y-5">
                {/* Product Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Product name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* SKU */}
                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU (Auto)</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Supplier */}
                <FormField
                  control={form.control}
                  name="supplierId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Supplier</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Supplier" />
                          </SelectTrigger>
                          <SelectContent>
                            {normalizedSuppliers.map((supplier) => (
                              <SelectItem key={supplier.id} value={supplier.value}>
                                {supplier.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Brand */}
                <FormField
                  control={form.control}
                  name="brandId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Brand" />
                          </SelectTrigger>
                          <SelectContent>
                            {normalizedBrands.map((brand) => (
                              <SelectItem key={brand.id} value={brand.value}>
                                {brand.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Category */}
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {normalizedCategories.map((category) => (
                              <SelectItem key={category.id} value={category.value}>
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Cost & Selling Price */}
                {["costPrice", "sellingPrice"].map((f) => (
                  <FormField
                    key={f}
                    control={form.control}
                    name={f}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {f === "costPrice" ? "Cost Price" : "Selling Price"}
                        </FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}

                {/* Unit */}
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Unit" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "pcs",
                              "kg",
                              "g",
                              "liter",
                              "ml",
                              "box",
                              "pack",
                              "dozen",
                            ].map((unit) => (
                              <SelectItem key={unit} value={unit}>
                                {unit.toUpperCase()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-5">
                {/* Discount Type */}
                <FormField
                  control={form.control}
                  name="discountType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount Type</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Type" />
                          </SelectTrigger>
                          <SelectContent>
                            {["none", "percentage", "fixed"].map((opt) => (
                              <SelectItem key={opt} value={opt}>
                                {opt.toUpperCase()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Other number fields */}
                {[
                  "discountValue",
                  "giftMinQty",
                  "giftQty",
                  "reorderLevel",
                  "expiryDate",
                  "stock",
                ].map((f) => (
                  <FormField
                    key={f}
                    control={form.control}
                    name={f}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {f.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type={f === "expiryDate" ? "date" : "number"}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={3} placeholder="Enter product description" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Image URL */}
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://..." />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2 flex justify-end mt-4">
                <Button type="submit" className="bg-black text-white px-6 py-2">
                  {editingProduct ? "Update Product" : "Add Product"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
