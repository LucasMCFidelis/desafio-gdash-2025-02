import z from "zod";

export const signUpSchema = z
  .object({
    name: z
      .string("Nome inválido.")
      .trim()
      .min(3, "Nome deve ter pelo menos 3 caracteres."),
    email: z.email("E-mail inválido!"),
    password: z.string("Senha inválida!").min(8, "Senha inválida!"),
    passwordConfirmation: z.string("Senha inválida!").min(8, "Senha inválida!"),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirmation;
    },
    {
      error: "As senhas não coincidem.",
      path: ["passwordConfirmation"],
    }
  );

export type SignUpSchemaDto = z.infer<typeof signUpSchema>;
