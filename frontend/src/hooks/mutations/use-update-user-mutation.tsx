"use client";

import { useMutation } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";

import type { User } from "@/interfaces/user";

import { useCurrentUserContext } from "../contexts/current-user-context";
import { userSchema } from "../schemas/user-schema";

const API_URL = `${import.meta.env.VITE_API_URL}`.replace(/\/+$/, "");
const UPDATE_USER_PATH_URL = "/user";

const updateUser = async (data: User) => {
  const { _id: userId, ...userData } = data;
  userSchema.parse(userData);

  const response = await axios.put(
    `${API_URL}${UPDATE_USER_PATH_URL}?userId=${userId}`,
    {
      name: userData.name,
      email: userData.email,
    },
    { withCredentials: true }
  );

  return response.data;
};

export const getUpdateUserDataQueryKey = (userId: string) =>
  ["update-user", userId] as const;

export const useUpdateUserData = (userId: string) => {
  const { setUser } = useCurrentUserContext();
  return useMutation({
    mutationKey: getUpdateUserDataQueryKey(userId),
    mutationFn: updateUser,
    onSuccess: (user) => {
      toast.success("Usuário atualizado com sucesso!");
      setUser({ _id: user._id, email: user.email, name: user.name });
    },

    onError: (error) => {
      if (isAxiosError(error)) {
        const status = error.response?.status;

        const networkError = !error.response || error.code === "ERR_NETWORK";
        const serverError = status && status >= 500;

        if (networkError || serverError) {
          toast.error("Falha inesperada ao atualizar dados");
          return;
        }
      }

      toast.error("Erro, tente novamente!");
    },
  });
};
