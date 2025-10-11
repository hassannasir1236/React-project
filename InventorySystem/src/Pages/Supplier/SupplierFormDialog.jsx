import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SupplierForm from "./AddSupplier";

export default function SupplierFormDialog({ supplier, mode = "add", onSubmit }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* 🧩 Open Button */}
      <DialogTrigger asChild>
        <Button
          variant={mode === "edit" ? "outline" : "default"}
          size="sm"
          className="font-medium mr-2"
        >
          {mode === "edit" ? "Edit" : "Add Supplier"}
        </Button>
      </DialogTrigger>

      {/* 🧩 Dialog */}
      <DialogContent
        className="
          max-w-2xl w-full 
          max-h-[80vh] 
          overflow-y-auto 
          bg-white dark:bg-gray-900 
          text-gray-900 dark:text-gray-100 
          rounded-2xl shadow-2xl
          p-6
          space-y-6
        "
      >
        {/* Header */}
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold tracking-tight">
            {mode === "edit" ? "Edit Supplier" : "Add New Supplier"}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
            {mode === "edit"
              ? "Update the supplier details below."
              : "Fill out the form to add a new supplier."}
          </DialogDescription>
        </DialogHeader>

        {/* Content */}
        <div className="overflow-y-auto pr-1">
          <SupplierForm
            existingSupplier={supplier}
            onSuccess={() => setOpen(false)}
            mode={mode}
            onSubmitOverride={onSubmit}
          />
        </div>

        {/* Footer */}
        <DialogFooter className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
