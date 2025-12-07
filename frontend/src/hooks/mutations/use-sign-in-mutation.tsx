import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";

import type { SignInSchemaDto } from "@/pages/auth/-schemas/sign-in-schema";

import { useCurrentUserContext } from "../contexts/current-user-context";

const API_URL = `${import.meta.env.VITE_API_URL}`.replace(/\/+$/, "");
const LOGIN_PATH_URL = "/auth/login";

const signInUser = async (userCredentials: SignInSchemaDto) => {
  const response = await axios.post(
    `${API_URL}${LOGIN_PATH_URL}`,
    {
      userEmail: userCredentials.email,
      passwordProvided: userCredentials.password,
    },
    { withCredentials: true }
  );

  return response.data;
};

export const getUseSignInMutationQueryKey = () => ["sign-in"] as const;

export const useSignInMutation = () => {
  const navigate = useNavigate();
  const { setUser } = useCurrentUserContext();

  return useMutation({
    mutationKey: getUseSignInMutationQueryKey(),

    mutationFn: (userCredentials: SignInSchemaDto) =>
      signInUser(userCredentials),

    onSuccess: (user) => {
      setUser({ _id: user._id, email: user.email, name: user.name });
      toast.success("Login realizado com sucesso!");
      navigate({ to: "/" });
    },

    onError: (error) => {
      if (isAxiosError(error)) {
        const status = error.response?.status;

        const networkError = !error.response || error.code === "ERR_NETWORK";
        const serverError = status && status >= 500;

        if (networkError || serverError) {
          toast.error("Falha inesperada ao realizar login");
          return;
        }
      }

      toast.error("Credenciais inválidas");
    },
  });
};
