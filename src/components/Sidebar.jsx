"use client";

import Link from "next/link";
import {
  MessageSquare,
  User,
   History,
   BarChart3,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";



export default function Sidebar() {

  const { data: session } = authClient.useSession();
const user = session?.user;

    let menus = [];

  if (user?.role === "user") {
    menus = [
      {
        name: "My Profile",
        href: "/dashboard/user/my-profile",
        icon: User,
      },
      {
        name: "Hiring History",
        href: "/dashboard/user/hiring-history",
        icon: History,
      },
      {
        name: "Comments",
        href: "/dashboard/user/comments",
        icon: MessageSquare,
      },
    ];
  }

  if (user?.role === "lawyer") {
    menus = [
      {
        name: "Hiring History",
        href: "/dashboard/lawyer/hiring-history",
        icon: History,
      },
      {
        name: "Manage Legal Profile",
        href: "/dashboard/lawyer/manage-legal-profile",
        icon: User,
      },
    ];
  }

  if (user?.role === "admin") {
    menus = [
      {
        name: "All Transactions",
        href: "/dashboard/admin/all-transactions",
        icon: History,
      },
      {
        name: "Analytics",
        href: "/dashboard/admin/analytics",
        icon: BarChart3,
      },
      {
        name: "Manage Users",
        href: "/dashboard/admin/manage-users",
        icon: User,
      },
    ];
  }
  return (
    <aside className="w-64 min-h-screen bg-base-200 border-r border-base-300 flex flex-col">

      {/* Logo */}
      <div className="px-6 py-6 border-b border-base-300">
        <div className="flex items-center gap-3">
         
         
        </div>
      </div>

      {/* Menu */}
      <ul className="menu p-4 flex-1">
        {menus.map((item) => {
          const Icon = item.icon;

          return (
            <li key={item.name} className="mb-2">
              <Link
                href={item.href}
                className="flex items-center gap-3 rounded-xl hover:bg-base-300"
              >
                <Icon size={20} />
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>

     
    </aside>
  );
}