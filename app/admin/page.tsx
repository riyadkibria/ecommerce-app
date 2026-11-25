import { Suspense } from "react";
import AdminContent from "./AdminContent";


export default function AdminPage() {

  return (

    <Suspense fallback={
      <p>
        Loading...
      </p>
    }>

      <AdminContent />

    </Suspense>

  );

}