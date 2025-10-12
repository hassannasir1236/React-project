import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCategories } from "@/context/CategoryContext";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const CategorySchema = z.object({
  name: z.string().min(2, { message: "Category name must be at least 2 characters." }),
  description: z.string().optional(),
});

export default function AddCategory({ onClose }) {
  const { createCategory, editCategory, editingCategory, setEditingCategory } =
    useCategories();


  const form = useForm({
    resolver: zodResolver(CategorySchema),
    defaultValues: { name: "", description: "" },
  });

  useEffect(() => {
    if (editingCategory) {
      form.setValue("name", editingCategory.name);
      form.setValue("description", editingCategory.description || "");
    }
  }, [editingCategory, form]);

  const onSubmit = async (values) => {
    if (editingCategory) {
      await editCategory(editingCategory.id, values);
      setEditingCategory(null);
    } else {
      await createCategory(values);
    }
    form.reset();
    if (onClose) onClose();
  };

  return (
    <div className="flex justify-center mt-10 mb-10">
      <Card className="w-full max-w-md shadow-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
        <CardHeader>
          <CardTitle>{editingCategory ? "Edit Category" : "Add New Category"}</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Category Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Optional description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CardFooter className="justify-end">
                <Button type="submit">
                  {editingCategory ? "Update" : "Submit"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
