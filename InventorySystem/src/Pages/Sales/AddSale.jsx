import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card, CardHeader, CardTitle, CardContent, CardFooter
} from "@/components/ui/card";
import {
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select, SelectTrigger, SelectValue, SelectItem, SelectContent
} from "@/components/ui/select";

const ManualItemSchema = z.object({
  productId: z.string().optional(), // if scanned
  productName: z.string().optional(), // if manual
  barcode: z.string().optional(),
  quantity: z.number().min(1),
  costPrice: z.number().min(0),
  sellingPrice: z.number().min(0),
  giftQty: z.number().min(0),
});

const SaleSchema = z.object({
  userId: z.string(),
  paymentMethod: z.enum(["cash", "card", "online"]),
  items: z.array(ManualItemSchema),
});

export default function AddSale() {
  const form = useForm({
    resolver: zodResolver(SaleSchema),
    defaultValues: {
      userId: "",
      paymentMethod: "cash",
      items: [
        {
          barcode: "",
          productId: "",
          productName: "",
          quantity: 1,
          costPrice: 0,
          sellingPrice: 0,
          giftQty: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const onSubmit = (data) => {
    console.log("Sale Data:", data);
  };

  return (
    <Card className="max-w-6xl mx-auto p-6 shadow-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Record Sale (Barcode + Manual)
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Sale Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-gray-200">Cashier ID</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-gray-200">Payment Method</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="card">Card</SelectItem>
                        <SelectItem value="online">Online</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Sale Items */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Items</h3>
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end border p-4 rounded-md bg-gray-50 dark:bg-gray-800">
                  {/* Barcode (for scanner) */}
                  <FormField
                    control={form.control}
                    name={`items.${index}.barcode`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-gray-200">Barcode</FormLabel>
                        <FormControl><Input placeholder="Scan barcode" {...field} /></FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Manual Product Name */}
                  <FormField
                    control={form.control}
                    name={`items.${index}.productName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-gray-200">Product Name</FormLabel>
                        <FormControl><Input placeholder="Enter manually" {...field} /></FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Quantity */}
                  <FormField
                    control={form.control}
                    name={`items.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-gray-200">Qty</FormLabel>
                        <FormControl><Input type="number" {...field} /></FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Selling Price */}
                  <FormField
                    control={form.control}
                    name={`items.${index}.sellingPrice`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-gray-200">Price</FormLabel>
                        <FormControl><Input type="number" {...field} /></FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Gift Qty */}
                  <FormField
                    control={form.control}
                    name={`items.${index}.giftQty`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-gray-200">Gift Qty</FormLabel>
                        <FormControl><Input type="number" {...field} /></FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Remove Button */}
                  <Button
                    type="button"
                    variant="destructive"
                    className="mt-2"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  append({
                    barcode: "",
                    productId: "",
                    productName: "",
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
            <div className="flex justify-end">
              <Button type="submit" className="mt-4">Submit Sale</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
