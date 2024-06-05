import { AdminNav } from "@/components";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <AdminNav />
      <div className="container ml-[11rem] flex-1 py-10">{children}</div>
    </div>
  );
};

export default AdminLayout;
