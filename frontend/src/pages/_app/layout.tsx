import { createFileRoute, Outlet } from "@tanstack/react-router";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="h-screen space-y-6">
      <Header/>
      <div className="flex flex-col flex-1 max-w-7xl mx-auto md:mt-10">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}
