import { createFileRoute } from "@tanstack/react-router";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SignInForm from "./-components/sign-in-form";
import SignUpForm from "./-components/sign-up-form";

export const Route = createFileRoute("/auth/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col mt-10 lg:mt-20 items-center gap-6 p-5">
      <Tabs defaultValue="sign-in" className="w-full md:max-w-md">
        <TabsList>
          <TabsTrigger value="sign-in">Entrar</TabsTrigger>
          <TabsTrigger value="sign-up">Criar conta</TabsTrigger>
        </TabsList>
        <TabsContent value="sign-in" className="w-full">
          <SignInForm />
        </TabsContent>
        <TabsContent value="sign-up" className="w-full">
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
