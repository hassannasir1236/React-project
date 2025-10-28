import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useSuppliers } from "@/context/SupplierContext";
import { useProducts } from "@/context/ProductContext";
import { usePurchases } from "@/context/PurchaseContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// Validation Schemas
const ItemSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  costPrice: z.coerce.number().min(0, "Cost price required"),
  sellingPrice: z.coerce.number().min(0, "Selling price required"),
  giftQty: z.coerce.number().min(0, "Gift quantity required"),
});

const PurchaseSchema = z.object({
  supplierId: z.string().min(1, "Supplier is required"),
  purchaseDate: z.string().min(1, "Date is required"),
  totalAmount: z.coerce.number().min(1, "Total amount required"),
  items: z.array(ItemSchema).min(1, "At least one item is required"),
});

export default function AddPurchase() {
  const { suppliers } = useSuppliers();
  const { products } = useProducts();
  const { createPurchase } = usePurchases();

  const normalizedSuppliers = suppliers?.map((s) => ({
    id: s.id,
    value: s.id,
    label: s.name,
  })) || [];

  const normalizedProducts = products?.map((p) => ({
    id: p.id,
    value: p.id,
    label: p.name,
    sellingPrice: p.sellingPrice || 0, // Optional default
  })) || [];

  const form = useForm({
    resolver: zodResolver(PurchaseSchema),
    defaultValues: {
      supplierId: "",
      purchaseDate: new Date().toISOString().split("T")[0],
      totalAmount: 0,
      items: [
        { productId: "", quantity: 1, costPrice: 0, sellingPrice: 0, giftQty: 0 },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  // Submit purchase
  const onSubmit = (values) => {
    const totalAmount = values.items.reduce(
      (sum, item) => sum + item.quantity * item.costPrice,
      0
    );
    createPurchase({ ...values, totalAmount });
    form.reset({
      supplierId: "",
      purchaseDate: new Date().toISOString().split("T")[0],
      totalAmount: 0,
      items: [
        { productId: "", quantity: 1, costPrice: 0, sellingPrice: 0, giftQty: 0 },
      ],
    });
  };

  return (
    <Card className="max-w-6xl mx-auto p-6 shadow-lg bg-white dark:bg-gray-900">
      <CardHeader>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Add Purchase
        </h2>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Supplier */}
            <FormField
              control={form.control}
              name="supplierId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supplier</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full md:w-60">
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

            {/* Purchase Date */}
            <FormField
              control={form.control}
              name="purchaseDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purchase Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Total Amount */}
            <FormField
              control={form.control}
              name="totalAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Amount</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Items */}
            <div className="space-y-4">
              <FormLabel className="text-lg font-semibold">Items</FormLabel>
              {fields.map((item, index) => (
                <div
                  key={item.id}
                  className="grid grid-cols-6 gap-4 items-end"
                >
                  {/* Product */}
                  <FormField
                    control={form.control}
                    name={`items.${index}.productId`}
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Product</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Product" />
                            </SelectTrigger>
                            <SelectContent>
                              {normalizedProducts.map((product) => (
                                <SelectItem key={product.id} value={product.value}>
                                  {product.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Quantity */}
                  <FormField
                    control={form.control}
                    name={`items.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem className="col-span-1">
                        <FormLabel>Qty</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Cost Price */}
                  <FormField
                    control={form.control}
                    name={`items.${index}.costPrice`}
                    render={({ field }) => (
                      <FormItem className="col-span-1">
                        <FormLabel>Cost</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Selling Price */}
                  <FormField
                    control={form.control}
                    name={`items.${index}.sellingPrice`}
                    render={({ field }) => (
                      <FormItem className="col-span-1">
                        <FormLabel>Selling</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Gift Qty */}
                  <FormField
                    control={form.control}
                    name={`items.${index}.giftQty`}
                    render={({ field }) => (
                      <FormItem className="col-span-1">
                        <FormLabel>Gift</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Remove Button */}
                  <div className="col-span-1 flex items-end">
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                onClick={() =>
                  append({
                    productId: "",
                    quantity: 1,
                    costPrice: 0,
                    sellingPrice: 0,
                    giftQty: 0,
                  })
                }
              >
                + Add Item
              </Button>
            </div>

            {/* Submit */}
            <div className="pt-6">
              <Button type="submit">Submit Purchase</Button>
            </div>
          </form>
        </Form>
      </CardContent>

      <CardFooter />
    </Card>

  );
}
