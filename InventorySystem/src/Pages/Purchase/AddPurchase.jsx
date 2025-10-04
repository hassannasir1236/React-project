import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

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
  giftQty: z.coerce.number().min(0, "Gift quantity required"),
});

const PurchaseSchema = z.object({
  supplierId: z.string().min(1, "Supplier is required"),
  purchaseDate: z.string().min(1, "Date is required"),
  totalAmount: z.coerce.number().min(1, "Total amount required"),
  items: z.array(ItemSchema).min(1, "At least one item is required"),
});

export default function AddPurchase() {
  const form = useForm({
    resolver: zodResolver(PurchaseSchema),
    defaultValues: {
      supplierId: "",
      purchaseDate: "",
      totalAmount: 0,
      items: [{ productId: "", quantity: 1, costPrice: 0, giftQty: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const onSubmit = (values) => {
    console.log("Purchase Submitted", values);
    toast.success("Purchase recorded!");
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
            {/* Supplier ID */}
            <FormField
              control={form.control}
              name="supplierId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supplier</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="sup1">Supplier 1</SelectItem>
                      <SelectItem value="sup2">Supplier 2</SelectItem>
                    </SelectContent>
                  </Select>
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
                  className="grid md:grid-cols-5 gap-4 items-end"
                >
                  {/* Product ID */}
                  <FormField
                    control={form.control}
                    name={`items.${index}.productId`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product</FormLabel>
                        <FormControl>
                          <Input placeholder="Product ID" {...field} />
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
                      <FormItem>
                        <FormLabel>Qty</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
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
                      <FormItem>
                        <FormLabel>Cost</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
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
                      <FormItem>
                        <FormLabel>Gift</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Remove */}
                  <div>
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
                  append({ productId: "", quantity: 1, costPrice: 0, giftQty: 0 })
                }
              >
                + Add Item
              </Button>
            </div>

            {/* Submit */}
            <div className="pt-6">
              <Button type="submit" className="w-fit">
                Submit Purchase
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>

      <CardFooter />
    </Card>
  );
}
