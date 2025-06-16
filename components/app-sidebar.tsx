"use client";

import {
  BookOpen,
  BarChart3,
  ClipboardCheck,
  Home,
  PresentationIcon as PresentationChart,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Les voorbereiden",
    url: "/les-voorbereiden",
    icon: PresentationChart,
  },
  {
    title: "Evaluatie",
    url: "/evaluatie",
    icon: ClipboardCheck,
  },
  {
    title: "Materiaal",
    url: "/materiaal",
    icon: BookOpen,
  },
  {
    title: "Leerlingensoftware",
    url: "/leerlingen",
    icon: Users,
  },
  {
    title: "Statistieken",
    url: "/statistieken",
    icon: BarChart3,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r bg-zwijsen-blue">
      <SidebarHeader className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden">
            <img
              src="/Logo.png"
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>

          <div>
            <h2 className="font-semibold text-xl text-zwijsen-blue">Zwijsen</h2>
            <p className="text-sm text-gray-600">Docenten Portal</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-6">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-3">
            Navigatie
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="w-full">
                    <Link
                      href={item.url}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-zwijsen-blue hover:text-[#0069B3] transition-all duration-200 font-semibold"
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-6" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-3">
            Accountt
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="w-full">
                  <Link
                    href="/instellingen"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-zwijsen-blue hover:text-zwijsen-blue /transition-all duration-200 font-semibold"
                  >
                    <Settings className="w-5 h-5" />
                    <span className="text-sm">Instellingen</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
          <div className="w-10 h-10 bg-zwijsen-blue rounded-full flex items-center justify-center text-white text-sm font-semibold">
            MJ
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900">
              Mevrouw Jansen
            </p>
            <p className="text-xs text-gray-600">Groep 6A</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start mt-3 text-gray-600 hover:bg-zwijsen-blue hover:text-white font-semibold transition-all duration-200"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Uitloggen
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
