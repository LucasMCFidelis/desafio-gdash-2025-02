import { useMutation } from "@tanstack/react-query";
import axios, { type AxiosResponse, isAxiosError } from "axios";
import { toast } from "sonner";

interface ExportWeatherLogs {
  from?: string;
  to?: string;
  location?: string;
  format?: {
    csv?: boolean;
    xlsx?: boolean;
  };
}

export function useExportWeatherLogs() {
  return useMutation({
    mutationFn: async ({ from, to, location, format }: ExportWeatherLogs) => {
      const query = new URLSearchParams();
      if (from) query.append("from", from);
      if (to) query.append("to", to);
      if (location) query.append("location", location);

      const urlCSV = `${import.meta.env.VITE_API_URL}/weather/logs/export.csv?${query.toString()}`;
      const urlXLSX = `${import.meta.env.VITE_API_URL}/weather/logs/export.xlsx?${query.toString()}`;

      const requests: Array<Promise<AxiosResponse<Blob>>> = [];

      if (format?.csv) {
        requests.push(
          axios.get(urlCSV, {
            responseType: "blob",
            withCredentials: true,
          })
        );
      }

      if (format?.xlsx) {
        requests.push(
          axios.get(urlXLSX, {
            responseType: "blob",
            withCredentials: true,
          })
        );
      }

      if (requests.length === 0) {
        throw new Error("Nenhum formato selecionado.");
      }

      const responses = await Promise.all(requests);

      // ↓ Faz o download para cada arquivo selecionado
      responses.forEach((res) => {
        const contentType = res.headers["content-type"];

        const extension =
          contentType.includes("sheet") || contentType.includes("excel")
            ? "xlsx"
            : "csv";

        const blob = new Blob([res.data], { type: contentType });

        const fileURL = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = fileURL;
        link.download = `weather_export_${new Date().toISOString()}.${extension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        window.URL.revokeObjectURL(fileURL);
      });
    },

    onError: (error) => {
      if (isAxiosError(error)) {
        const status = error.response?.status;

        const networkError = !error.response || error.code === "ERR_NETWORK";
        const serverError = status && status >= 500;

        if (networkError || serverError) {
          toast.error("Falha inesperada ao exportar dados");
          return;
        }
      }

      toast.error("Não foi possível realizar a exportação");
    },
  });
}
