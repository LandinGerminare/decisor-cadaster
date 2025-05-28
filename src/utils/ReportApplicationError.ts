import { ApplicationError } from "@/types/ApplicationError";

export async function reportApplicationError(error: ApplicationError) {
  await fetch("/api/report", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(error),
  });
}
