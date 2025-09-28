// src/Layout/index.js

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import SidebarLayout from "./Sidebar/Sidebar"
import HeaderLayout from "./Header/Header"

export default function AppLayout({ children }) {
  return (
    <SidebarProvider>
      <SidebarLayout />
      <SidebarInset>
        
        <HeaderLayout />
        
        <main className="flex flex-1 flex-col gap-4 p-4">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
