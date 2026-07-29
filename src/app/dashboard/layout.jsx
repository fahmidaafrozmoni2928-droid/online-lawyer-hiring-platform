import Sidebar from "@/components/Sidebar";
import { auth } from "@/lib/auth";

import { headers } from "next/headers";

export default async function DashboardLayout({ children }) {

 
  return (
    <div className="flex">
      <Sidebar></Sidebar>
      <main className="flex-1 p-6">
        
        {children}
      </main>
    </div>
  );
}
