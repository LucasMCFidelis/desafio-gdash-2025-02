import { useState } from "react";
import { type DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { useExportWeatherLogs } from "@/hooks/mutations/use-export-weather-logs";

const ExportWeatherLogs = () => {
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });
  const [csvEnabled, setCsvEnabled] = useState<boolean>(true);
  const [xlsxEnabled, setXlsxEnabled] = useState<boolean>(true);

  const exportMutation = useExportWeatherLogs();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button>Exportar dados completos</Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-auto overflow-hidden p-4 space-y-4"
        align="start"
      >
        <Calendar
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={setDateRange}
          numberOfMonths={2}
        />

        <div className="flex gap-8">
          <div className="flex items-center space-x-2">
            <Switch checked={csvEnabled} onCheckedChange={setCsvEnabled} />
            <Label>CSV</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch checked={xlsxEnabled} onCheckedChange={setXlsxEnabled} />
            <Label>XLSX</Label>
          </div>
        </div>

        <Button
          className="w-full"
          disabled={exportMutation.isPending}
          onClick={() => {
            if (!dateRange?.from || !dateRange?.to) return;

            exportMutation.mutate({
              from: dateRange.from.toISOString().split("T")[0],
              to: dateRange.to.toISOString().split("T")[0],
              format: {
                csv: csvEnabled,
                xlsx: xlsxEnabled,
              },
            });

            setOpen(false);
          }}
        >
          {exportMutation.isPending
            ? "Exportando..."
            : "Confirmar Intervalo para Exportar"}
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default ExportWeatherLogs;
