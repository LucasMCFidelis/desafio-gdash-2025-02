import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
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
import { useSignInMutation } from "@/hooks/mutations/use-sign-in-mutation";
import {
  signInSchema,
  type SignInSchemaDto,
} from "@/pages/auth/-schemas/sign-in-schema";

import AuthRootForm from "./auth-root-form";
import PasswordInput from "./password-input";

const SignInForm = () => {
  const signInMutation = useSignInMutation();

  const form = useForm<SignInSchemaDto>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignInSchemaDto) {
    await signInMutation.mutateAsync(values);
  }

  return (
    <AuthRootForm title={"Entrar"} description={"Faça login para continuar."}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent className="grid gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Digite sua senha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button type="submit" className="w-full">
              {signInMutation.isPending ? (
                <>
                  Entrando <Spinner />
                </>
              ) : (
                <>Entrar</>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </AuthRootForm>
  );
};

export default SignInForm;
