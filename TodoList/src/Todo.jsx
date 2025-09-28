import AllStatic from './Component/AllStatic';
import StagesWise from './Component/StageWise';
import { useTodo } from './Context/TodoContext';
import React, { useState } from 'react';

export default function AppContent() {
  const { AddTodo } = useTodo();
  const [inputText, setInputText] = useState("");

  const handleAddTodo = (e) => {
    e.preventDefault();

    const trimmed = inputText.trim();
    if (!trimmed) return;

    const newTodo = {
      id: Date.now(),
      text: trimmed,
      status: "todo"
    };

    AddTodo(newTodo);
    setInputText("");
  };

  return (
    <>
      <div className="grid grid-flow-col grid-rows-2 gap-4 mt-20">
        <h1 className='text-center text-white text-4xl col-span-full'>Todo List</h1>

        <div className='flex justify-center col-span-full'>
          <form onSubmit={handleAddTodo} className="relative w-[400px]">
            <input
              type="text"
              placeholder='Add Items'
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className='w-full border-2 border-transparent rounded-2xl p-2 pr-20 bg-white'
            />
            <button
              type="submit"
              className='absolute top-1/2 -translate-y-1/2 right-2 bg-blue-500 text-white px-4 py-1 rounded-xl text-sm'
            >
              Add
            </button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 justify-items-center mt-20">
        <AllStatic />

        <StagesWise
            CardBorderColor="border-yellow-300"
            CardTitleColor="bg-yellow-500"
            CardItemBgColor="bg-[#f9e79f]"
            CardTitleName="Todo Task"
            CompleteBtn={true}
            PendingBtn={true}
            DeleteBtn={true}
            UpdateBtn={true}
            status="todo"
        />

        <StagesWise
            CardBorderColor="border-green-300"
            CardTitleColor="bg-green-500"
            CardItemBgColor="bg-[#85ecc6]"
            CardTitleName="Complete Task"
            ReverseBtn={true}
            DeleteBtn={true}
            PendingBtn={true}
            status="completed"
        />

        <StagesWise
            CardBorderColor="border-purple-300"
            CardTitleColor="bg-purple-500"
            CardItemBgColor="bg-[#e0b3ff]"
            CardTitleName="Pending Task"
            CompleteBtn={true}
            DeleteBtn={true}
            UpdateBtn={true}
            ReverseBtn={true}
            status="pending"
        />

        <StagesWise
            CardBorderColor="border-red-300"
            CardTitleColor="bg-red-500"
            CardItemBgColor="bg-[#ff9999]"
            CardTitleName="Deleted Task"
            ReverseBtn={true}
            PermanentDeleteBtn={true}
            status="deleted"
        />
      </div>
    </>
  );
}