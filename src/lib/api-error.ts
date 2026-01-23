import { NextResponse } from "next/server";
import { z } from "zod";

export class ApiError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 400,
    public details?: any,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function handleApiError(error: unknown) {
  console.error("[API Error]:", error);

  if (error instanceof ApiError) {
    return NextResponse.json(
      { error: error.message, details: error.details },
      { status: error.statusCode },
    );
  }

  if (error instanceof z.ZodError) {
    return NextResponse.json(
      { error: "Validation Error", details: error.errors },
      { status: 400 },
    );
  }

  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}
