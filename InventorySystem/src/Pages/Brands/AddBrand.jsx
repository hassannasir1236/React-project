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
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../components/ui/card";

// Schema
const BrandSchema = z.object({
  name: z.string().min(2, { message: "Brand name must be at least 2 characters." }),
});

export default function AddBrand() {
  const form = useForm({
    resolver: zodResolver(BrandSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = (values) => {
    toast("Brand added!", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-black p-4 text-white">
          {JSON.stringify(values, null, 2)}
        </pre>
      ),
    });
    form.reset();
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md shadow-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl">Add Brand</CardTitle>
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
