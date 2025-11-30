import type { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ChartCardRootProps {
  title: string;
  description: string;
  children: ReactNode;
}

const ChartCardRoot = ({
  title,
  description,
  children,
}: ChartCardRootProps) => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-primary">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default ChartCardRoot;
