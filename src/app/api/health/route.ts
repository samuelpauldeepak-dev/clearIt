import { NextResponse } from "next/server";
import { handleApiError } from "@/lib/api-error";

/**
 * Health Check API
 *
 * Returns the status of the application and the current timestamp.
 */
export async function GET() {
  try {
    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
