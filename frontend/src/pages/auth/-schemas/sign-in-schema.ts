import z from "zod";

export const signInSchema = z.object({
  email: z.email("E-mail inválido!"),
  password: z.string("Senha inválida!").min(8, "Senha inválida!"),
});

export type SignInSchemaDto = z.infer<typeof signInSchema>;
