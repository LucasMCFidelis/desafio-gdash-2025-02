import { createFileRoute, Outlet } from "@tanstack/react-router";

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex flex-col h-screen space-y-6">
      <Header/>
      <div className="flex flex-col flex-1 max-w-11/12 mx-auto md:mt-10 bg-background">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}
