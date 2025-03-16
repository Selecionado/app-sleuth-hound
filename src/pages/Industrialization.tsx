
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const Industrialization = () => {
  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Industrialização</h1>
        <p className="text-sm text-muted-foreground">
          Este módulo está em desenvolvimento
        </p>
      </div>

      <Card className="border-0 shadow-md">
        <CardContent className="p-6 flex items-center justify-center min-h-[300px]">
          <p className="text-muted-foreground text-center">
            Novas funcionalidades de industrialização estarão disponíveis em breve.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Industrialization;
