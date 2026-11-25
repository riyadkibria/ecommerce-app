import { Suspense } from "react";
import AdminGuard from "./AdminGuard";


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (

    <Suspense fallback={
      <div>
        Checking access...
      </div>
    }>

      <AdminGuard>
        {children}
      </AdminGuard>

    </Suspense>

  );

}