import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../components/ui/card";

// Schema for Category
const CategoryFormSchema = z.object({
  name: z.string().min(2, { message: "Category name must be at least 2 characters." }),
  description: z.string().optional(),
});

export default function AddCategory() {
  const form = useForm({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (values) => {
    toast("Category Submitted", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-black p-4 text-white">
          {JSON.stringify(values, null, 2)}
        </pre>
      ),
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-xl shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center md:text-left">Add New Category</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              
              {/* Category Name */}
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

              {/* Description */}
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

            </form>
          </Form>
        </CardContent>

        <CardFooter className="justify-end">
          <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
