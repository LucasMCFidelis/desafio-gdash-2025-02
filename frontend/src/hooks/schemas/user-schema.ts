import z from "zod";

export const userSchema = z.object({
  name: z.string("Nome inválido.").trim().min(1, "Nome é obrigatório."),
  email: z.email("E-mail inválido!"),
});
