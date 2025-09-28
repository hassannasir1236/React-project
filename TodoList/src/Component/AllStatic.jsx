import React from "react";
import { useTodo } from "../Context/TodoContext";
export default function AllStatic() {
  const { getTotalCount, getCountByStatus } = useTodo();
  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-transparent border-5 border-green-300 rounded-xl shadow-md dark:bg-gray-800 dark:border-green-500">
      <h5 className="mb-4 pb-2 pt-2 text-center text-4xl font-bold rounded-md bg-[#3cd9a0] shadow-2xl text-white dark:text-white dark:bg-green-600">
        All Static
      </h5>

      <ul className="my-6 space-y-3">
        {/* Total Task */}
        <li className="bg-[#85ecc6] shadow-2xl text-whit flex items-center p-4 text-base font-semibold rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white">
            <span className="flex-1 ml-3 text-black-900 font-bold text-md">Total Task</span>
            <span className="px-2 py-0.5 text-md font-bold text-black-900 bg-transparent rounded dark:bg-gray-600 dark:text-gray-300">
            {getTotalCount()}
            </span>
        </li>
        {/* Todo Task */}
         <li className="bg-[#85ecc6] shadow-2xl text-whit flex items-center p-4 text-base font-semibold rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white">
            <span className="flex-1 ml-3 text-black-900 font-bold text-md">Todo Task</span>
            <span className="px-2 py-0.5 text-md font-bold text-black-900 bg-transparent rounded dark:bg-gray-600 dark:text-gray-300">
              {getCountByStatus("todo")}
            </span>
        </li>
        {/* Completed Task */}
         <li className="bg-[#85ecc6] shadow-2xl text-whit flex items-center p-4 text-base font-semibold rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white">
            <span className="flex-1 ml-3 text-black-900 font-bold text-md">Completed Task</span>
            <span className="px-2 py-0.5 text-md font-bold text-black-900 bg-transparent rounded dark:bg-gray-600 dark:text-gray-300">
              {getCountByStatus("completed")}
            </span>
        </li>
        {/* Pending Task */}
         <li className="bg-[#85ecc6] shadow-2xl text-whit flex items-center p-4 text-base font-semibold rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white">
            <span className="flex-1 ml-3 text-black-900 font-bold text-md">Pending Task</span>
            <span className="px-2 py-0.5 text-md font-bold text-black-900 bg-transparent rounded dark:bg-gray-600 dark:text-gray-300">
              {getCountByStatus("pending")}
            </span>
        </li>
        {/* Deleted Task */}
         <li className="bg-[#85ecc6] shadow-2xl text-whit flex items-center p-4 text-base font-semibold rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white">
            <span className="flex-1 ml-3 text-black-900 font-bold text-md">Deleted Task</span>
            <span className="px-2 py-0.5 text-md font-bold text-black-900 bg-transparent rounded dark:bg-gray-600 dark:text-gray-300">
              {getCountByStatus("deleted")}
            </span>
        </li>
      </ul>
    </div>
  );
}
