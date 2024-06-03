import { AdminNav } from "@/components";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AdminNav />
      <div className="container mx-32 flex-1 py-10">{children}</div>
    </>
  );
};

export default AdminLayout;
