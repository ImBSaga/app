// Shadcn
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

// Types
import type { ErrorCardProps } from "@/types/Global.type";

export const ErrorCard = ({ message, onRetry }: ErrorCardProps) => {
  return (
    <div className="flex items-center justify-center p-6">
      <Card className="max-w-md w-full shadow-lg rounded-2xl">
        <CardHeader className="flex items-center gap-2">
          <AlertCircle className="h-6 w-6 text-destructive" />
          <CardTitle className="text-lg font-semibold">
            Something went wrong
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            {message || "An unexpected error occurred."}
          </p>

          {onRetry && (
            <Button onClick={onRetry} className="w-full">
              Try Again
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorCard;
