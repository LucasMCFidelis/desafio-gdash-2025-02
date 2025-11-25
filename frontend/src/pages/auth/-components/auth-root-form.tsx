import { type ReactNode } from "react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AuthRootFormProps {
  children: ReactNode;
  title: string;
  description: string;
}

const AuthRootForm = ({ children, title, description }: AuthRootFormProps) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        {children}
      </Card>
    </>
  );
};

export default AuthRootForm;
