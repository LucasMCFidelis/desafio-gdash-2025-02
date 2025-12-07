import { useMutation } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";

export function useExportWeatherLogs() {
  return useMutation({
    mutationFn: async ({
      from,
      to,
    //   location,
    }: {
      from?: string;
      to?: string;
      location?: string;
    }) => {
      const query = new URLSearchParams();
      if (from) query.append("from", from);
      if (to) query.append("to", to);
    //   if (location) query.append("location", location);

      const url = `${import.meta.env.VITE_API_URL}/weather/logs/export.csv?${query.toString()}`;
      console.log(url);

      const response = await axios.get(url, {
        responseType: "blob",
        withCredentials: true,
      });

      console.log(response);

      const blob = new Blob([response.data], {
        type: response.headers["content-type"] || "text/csv",
      });

      const fileURL = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = fileURL;
      link.download = `weather_export_${new Date().toISOString()}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(fileURL);
    },
    onError: (error) => {
      console.log(error);

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
}
