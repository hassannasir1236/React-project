import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../components/ui/form";

// Zod schema for validation
const ProductSchema = z.object({
  name: z.string().min(2),
  sku: z.string().min(1),
  barcode: z.string().optional(),
  categoryId: z.string().min(1),
  brandId: z.string().min(1),
  supplierId: z.string().min(1),
  costPrice: z.number(),
  sellingPrice: z.number(),
  discountType: z.enum(["percentage", "fixed", "none"]),
  discountValue: z.number().optional(),
  giftMinQty: z.number().optional(),
  giftQty: z.number().optional(),
  reorderLevel: z.number(),
  expiryDate: z.string().optional(),
  stock: z.number(),
  imageUrl: z.string().optional(),
  createdAt: z.string(),
});

export default function AddProduct() {
  const form = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      sku: "",
      barcode: "",
      categoryId: "",
      brandId: "",
      supplierId: "",
      costPrice: 0,
      sellingPrice: 0,
      discountType: "none",
      discountValue: 0,
      giftMinQty: 0,
      giftQty: 0,
      reorderLevel: 0,
      expiryDate: "",
      stock: 0,
      imageUrl: "",
      createdAt: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = (values) => {
    toast.success("Product Added!", {
      description: (
        <pre className="mt-2 p-4 bg-gray-900 text-white dark:bg-gray-100 dark:text-black rounded">
          {JSON.stringify(values, null, 2)}
        </pre>
      ),
    });
  };

  return (
    <div className="flex justify-center mt-6 p-4">
      <Card className="w-full max-w-5xl shadow-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900 dark:text-gray-100">Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left Column */}
              <div className="space-y-4">
                {["name","sku","barcode","categoryId","brandId","supplierId","costPrice","sellingPrice"].map((field) => (
                  <FormField
                    key={field}
                    control={form.control}
                    name={field}
                    render={({ field: f }) => (
                      <FormItem>
                        <FormLabel className="text-gray-800 dark:text-gray-200">{field.charAt(0).toUpperCase() + field.slice(1)}</FormLabel>
                        <FormControl>
                          <Input
                            {...f}
                            type={["costPrice","sellingPrice"].includes(field) ? "number" : "text"}
                            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {[
                  {name: "discountType", type:"select", options:["none","percentage","fixed"]},
                  {name: "discountValue", type:"number"},
                  {name: "giftMinQty", type:"number"},
                  {name: "giftQty", type:"number"},
                  {name: "reorderLevel", type:"number"},
                  {name: "expiryDate", type:"date"},
                  {name: "stock", type:"number"},
                  {name: "imageUrl", type:"text"},
                  {name: "createdAt", type:"date"}
                ].map((field) => (
                  <FormField
                    key={field.name}
                    control={form.control}
                    name={field.name}
                    render={({ field: f }) => (
                      <FormItem>
                        <FormLabel className="text-gray-800 dark:text-gray-200">{field.name.charAt(0).toUpperCase() + field.name.slice(1)}</FormLabel>
                        <FormControl>
                          {field.type === "select" ? (
                            <select
                              {...f}
                              className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 px-2 py-1 rounded"
                            >
                              {field.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                          ) : (
                            <Input
                              {...f}
                              type={field.type}
                              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500"
                            />
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2 flex justify-end">
                <Button type="submit" className="bg-black dark:bg-white text-white dark:text-black">
                  Add Product
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
