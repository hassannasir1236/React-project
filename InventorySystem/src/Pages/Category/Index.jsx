import React from "react";
import AppLayout from "../../Layout/Index"; 
import AddCategory from "./AddCategory";
import DetailsCategory from "./DetailsCategory";
import { Toaster } from "sonner";
import { CategoryProvider } from "@/context/CategoryContext";
function CategoryIndex() {
  return (
    <AppLayout>
      <CategoryProvider>
        <div className="">
          {/* Toaster */}
          <Toaster />

          {/* Add Category Form (centered) */}
          <div className="">
              <AddCategory />
          </div>

          {/* Separator with visible text */}
          <div className="flex items-center my-12">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            <span className="mx-4 text-gray-500 dark:text-gray-400 uppercase tracking-wide text-sm font-semibold">
              Category List
            </span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          </div>

          {/* Category Table */}
          <div className="">
            <DetailsCategory />
          </div>
        </div>
      </CategoryProvider>
    </AppLayout>
  );
}

export default CategoryIndex;
