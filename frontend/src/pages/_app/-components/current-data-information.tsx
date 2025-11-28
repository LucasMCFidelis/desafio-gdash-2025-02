import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useWeathersLogsContext } from "@/hooks/contexts/weathers-logs-context";

const CurrentLogDataInformation = () => {
  const { currentLogData } = useWeathersLogsContext();

  if (!currentLogData) return;

  return (
    <>
      <h1 className="text-xl md:text-3xl font-bold text-foreground">
        Dashboard de Clima - {currentLogData.location}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-primary">Condição Atual</CardTitle>
            <CardDescription>
              Última atualização: {currentLogData.time}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xl md:text-2xl font-semibold capitalize">
              {currentLogData.condition}
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-primary">Temperatura</CardTitle>
            <CardDescription>Em graus Celsius</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xl md:text-4xl font-bold text-chart-1">
              {currentLogData.temperature}°C
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-primary">Sensação Térmica</CardTitle>
            <CardDescription>Em graus Celsius</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xl md:text-4xl font-bold text-chart-3">
              {currentLogData.feels_like}°C
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-primary">Umidade</CardTitle>
            <CardDescription>Em porcentagem</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xl md:text-4xl font-bold text-chart-2">
              {currentLogData.humidity}%
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CurrentLogDataInformation;
