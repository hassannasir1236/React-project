import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBrands } from "@/context/BrandContext";
import { Button } from "@/components/ui/button";
import FullPageLoader from "@/components/ui/FullPageLoader";
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

// ✅ Validation schema
const BrandSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Brand name must be at least 2 characters." }),
});

export default function AddBrand({ onClose }) {
  const {
    loading,
    createBrand,
    editBrand,
    editingBrand,
    setEditingBrand,
  } = useBrands();

    if (loading) {
      return <FullPageLoader message="Loading Brands..." />;
    }

  const form = useForm({
    resolver: zodResolver(BrandSchema),
    defaultValues: { name: "" },
  });

  // ✅ Fill form when editing
  useEffect(() => {
    if (editingBrand) {
      form.setValue("name", editingBrand.name);
    }
  }, [editingBrand, form]);

  // ✅ Submit handler
  const onSubmit = async (values) => {
    if (editingBrand) {
      await editBrand(editingBrand.id, values);
      setEditingBrand(null);
    } else {
      await createBrand(values);
    }
    form.reset();
    if (onClose) onClose();
  };

  return (
    <Card className="w-full max-w-md shadow-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
      <CardHeader>
        <CardTitle>{editingBrand ? "Edit Brand" : "Add Brand"}</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter brand name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardFooter className="justify-end">
              <Button type="submit">
                {editingBrand ? "Update" : "Submit"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
