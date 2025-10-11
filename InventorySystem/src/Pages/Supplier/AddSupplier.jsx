import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Timestamp } from "firebase/firestore";
import { useSuppliers } from "@/context/SupplierContext";
import FullPageLoader from "@/components/ui/FullPageLoader";


import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

// ✅ Validation Schema
const SupplierFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(10, "Phone must be at least 10 digits."),
  address: z.string().min(5, "Address must be at least 5 characters."),
  createdAt: z.coerce.date({ invalid_type_error: "Select a valid date." }),
});

export default function SupplierForm({
  existingSupplier,
  onSuccess,
  mode = "add",
}) {
  const { createSupplier, editSupplier, loading } = useSuppliers();
  if (loading) {
    return <FullPageLoader message="Loading suppliers..." />;
  }

  // ✅ React Hook Form setup
  const form = useForm({
    resolver: zodResolver(SupplierFormSchema),
    defaultValues: existingSupplier
      ? {
          ...existingSupplier,
          createdAt: existingSupplier.createdAt?.toDate
            ? existingSupplier.createdAt.toDate().toISOString().split("T")[0]
            : existingSupplier.createdAt,
        }
      : {
          name: "",
          email: "",
          phone: "",
          address: "",
          createdAt: new Date().toISOString().split("T")[0],
        },
  });

  // ✅ On form submit
  const onSubmit = async (values) => {
    try {
      const data = {
        ...values,
        createdAt: Timestamp.fromDate(new Date(values.createdAt)),
      };

      if (mode === "edit" && existingSupplier?.id) {
        await editSupplier(existingSupplier.id, data);
      } else {
        await createSupplier(data);
      }

      form.reset();
      onSuccess?.(); // Close dialog
    } catch (error) {
      console.error("Error saving supplier:", error);
    }
  };

  return (
    <div className="flex justify-center">
       <Card className="w-full max-w-md shadow-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {mode === "edit" ? "Edit Supplier" : "Add New Supplier"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* ✅ Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Supplier Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ✅ Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="supplier@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ✅ Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="03001234567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ✅ Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Street, City, Country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ✅ Created At */}
              <FormField
                control={form.control}
                name="createdAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Created At</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ✅ Submit */}
              <div className="pt-4 flex justify-end">
                <Button type="submit">
                  {mode === "edit" ? "Update Supplier" : "Add Supplier"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
