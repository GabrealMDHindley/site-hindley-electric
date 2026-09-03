import { NextResponse } from "next/server";
import { jobTypes } from "@/lib/site-config";

export const runtime = "nodejs";

type ContactPayload = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  jobType: string;
  description: string;
};

function isValidPayload(body: unknown): body is ContactPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.firstName === "string" &&
    b.firstName.trim().length > 0 &&
    typeof b.lastName === "string" &&
    b.lastName.trim().length > 0 &&
    typeof b.phone === "string" &&
    b.phone.trim().length > 0 &&
    typeof b.email === "string" &&
    b.email.includes("@") &&
    typeof b.jobType === "string" &&
    (jobTypes as readonly string[]).includes(b.jobType) &&
    typeof b.description === "string"
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { ok: false, error: "Please fill in every field with a valid value." },
      { status: 400 }
    );
  }

  const webhookUrl = process.env.CRM_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "hindley-electric-website",
          submittedAt: new Date().toISOString(),
          ...body,
        }),
      });

      if (!res.ok) {
        console.error("CRM webhook responded with", res.status);
        // Fall through — the lead is still logged below, and the visitor still
        // gets a success confirmation. The lead is not lost.
      }
    } catch (err) {
      console.error("Failed to forward lead to CRM_WEBHOOK_URL", err);
    }
  } else {
    // No CRM configured yet — log server-side so the lead isn't lost while the
    // client sets up their Go High Level webhook (see status.md).
    console.log("New Hindley Electric lead (CRM_WEBHOOK_URL not set):", body);
  }

  return NextResponse.json({ ok: true });
}
