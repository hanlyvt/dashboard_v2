"use client"

import {
  BookOpen,
  BarChart3,
  ClipboardCheck,
  Home,
  PresentationIcon as PresentationChart,
  Users,
  Settings,
  LogOut,
} from "lucide-react"
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
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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
]

export function AppSidebar() {
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">EduDashboard</h2>
            <p className="text-sm text-muted-foreground">Docenten Portal</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigatie</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/instellingen">
                    <Settings className="w-4 h-4" />
                    <span>Instellingen</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-muted">
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
            MJ
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">Mevrouw Jansen</p>
            <p className="text-xs text-muted-foreground">Groep 6A</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="w-full justify-start mt-2">
          <LogOut className="w-4 h-4 mr-2" />
          Uitloggen
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
