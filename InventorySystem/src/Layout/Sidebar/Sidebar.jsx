// src/Layout/Sidebar/Sidebar.jsx

import * as React from "react";
import { GalleryVerticalEnd, Minus, Plus } from "lucide-react";
import { Link, useLocation } from "react-router-dom"; // ✅ 1. useLocation
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Dashboard",
      items: [
        { title: "Dashboard", url: "/dashboard" },
      ],
    },
    {
      title: "Supplier",
      items: [
        { title: "Add Supplier", url: "/supplier" },
      ],
    },
    {
      title: "Category",
      items: [
        { title: "Add Category", url: "/category" },
      ],
    },
    {
      title: "Brands",
      items: [
        { title: "Add Brands", url: "/brands" },
      ],
    },
    {
      title: "Products",
      items: [
        { title: "Add Product", url: "/products" },
      ],
    },
    {
      title: "Purchase",
      items: [
        { title: "Add Purchase", url: "/purchase" },
      ],
    },
    {
      title: "Sales",
      items: [
        { title: "Add Sale", url: "/sales" },
      ],
    },
  ],
};

export default function SidebarLayout(props) {
  const location = useLocation(); // ✅ 2. get current path

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Documentation</span>
                  <span>v1.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item, index) => (
              <Collapsible key={item.title} defaultOpen={index === 1} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {item.title}
                      <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                      <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  {item.items?.length > 0 && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={location.pathname === subItem.url} // ✅ 3. highlight active
                            >
                              <Link to={subItem.url}>{subItem.title}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
