import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";

import type { SignUpSchemaDto } from "@/pages/auth/-schemas/sign-up-schema";

import { useCurrentUserContext } from "../contexts/current-user-context";

const API_URL = `${import.meta.env.VITE_API_URL}`.replace(/\/+$/, "");
const CREATE_USER_PATH_URL = "/user";

const createUser = async (userData: SignUpSchemaDto) => {
  const response = await axios.post(
    `${API_URL}${CREATE_USER_PATH_URL}`,
    {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    },
    { withCredentials: true }
  );

  return response.data;
};

export const getUseSignUpMutationQueryKey = () => ["create-user"] as const;

export const useSignUpMutation = () => {
  const navigate = useNavigate();
  const { setUser } = useCurrentUserContext();

  return useMutation({
    mutationKey: getUseSignUpMutationQueryKey(),

    mutationFn: (userData: SignUpSchemaDto) => createUser(userData),

    onSuccess: (user) => {
      toast.success("Usuário criado com sucesso!");
      setUser({ _id: user._id, email: user.email, name: user.name });
      navigate({ to: "/" });
    },

    onError: (error) => {
      if (isAxiosError(error)) {
        const status = error.response?.status;

        const networkError = !error.response || error.code === "ERR_NETWORK";
        const serverError = status && status >= 500;

        if (networkError || serverError) {
          toast.error("Falha inesperada ao criar conta");
          return;
        }
      }

      toast.error("Erro, tente novamente!");
    },
  });
};
