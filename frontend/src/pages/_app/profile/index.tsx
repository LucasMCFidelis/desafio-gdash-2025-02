import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useCurrentUserContext } from "@/hooks/contexts/current-user-context";
import { useUpdateUserData } from "@/hooks/mutations/use-update-user-mutation";
import { userSchema } from "@/hooks/schemas/user-schema";
import type { User } from "@/interfaces/user";

export const Route = createFileRoute("/_app/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { user, setUser } = useCurrentUserContext();

  if (!user || !user._id) {
    navigate({ href: "/auth" });
  }
  const updateUserDataMutation = useUpdateUserData(user!._id);
  const form = useForm<Omit<User, "_id">>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  });

  async function onSubmit(data: Omit<User, "_id">) {
    await updateUserDataMutation.mutateAsync({ _id: user!._id, ...data });
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full md:w-lg grid gap-6 mt-12 mx-auto"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full">
            {updateUserDataMutation.isPending ? (
              <>
                Atualizando dados <Spinner />
              </>
            ) : (
              <>Atualizar dados</>
            )}
          </Button>
        </form>
      </Form>
      <Button
        variant={"destructive"}
        type="button"
        className="w-full mt-6"
        onClick={() => setUser(null)}
      >
        Sair
      </Button>
    </>
  );
}
