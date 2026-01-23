"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-6">
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
        <AlertCircle className="h-10 w-10 text-destructive" />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
          Something went wrong!
        </h1>
        <p className="text-muted-foreground max-w-[600px]">
          We apologize for the inconvenience. An unexpected error occurred while
          processing your request.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={() => reset()} size="lg" className="gap-2">
          <RefreshCcw className="h-4 w-4" />
          Try again
        </Button>
        <Link href="/">
          <Button variant="outline" size="lg">
            Return Home
          </Button>
        </Link>
      </div>

      {error.digest && (
        <p className="text-xs text-muted-foreground">
          Error ID: {error.digest}
        </p>
      )}
    </div>
  );
}
