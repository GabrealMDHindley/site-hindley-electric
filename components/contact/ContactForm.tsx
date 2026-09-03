"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { jobTypes } from "@/lib/site-config";

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "focus-ring w-full border border-bone/20 bg-ground px-4 py-3 text-bone placeholder:text-muted/60 transition-colors focus:border-amber";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [jobType, setJobType] = useState("");

  useEffect(() => {
    const fromQuery = searchParams.get("job");
    if (fromQuery && (jobTypes as readonly string[]).includes(fromQuery)) {
      setJobType(fromQuery);
    }
  }, [searchParams]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      firstName: String(data.get("firstName") ?? "").trim(),
      lastName: String(data.get("lastName") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      jobType: String(data.get("jobType") ?? ""),
      description: String(data.get("description") ?? "").trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
      setJobType("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="border border-amber/40 bg-surface p-8 text-center"
      >
        <p className="font-display text-2xl uppercase text-amber">Got it.</p>
        <p className="mt-3 text-bone/80">
          Thanks — Nick will get back to you directly about your job. If it's urgent,
          give us a call.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-2 block text-sm text-bone/80">
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="lastName" className="mb-2 block text-sm text-bone/80">
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm text-bone/80">
            Phone number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm text-bone/80">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="jobType" className="mb-2 block text-sm text-bone/80">
          Type of job
        </label>
        <select
          id="jobType"
          name="jobType"
          required
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className={`${inputClasses} appearance-none`}
        >
          <option value="" disabled>
            Select a job type
          </option>
          {jobTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="description" className="mb-2 block text-sm text-bone/80">
          Tell us exactly what you need done
        </label>
        <textarea
          id="description"
          name="description"
          rows={5}
          required
          placeholder="The more detail, the faster we can quote it — panel type, room, symptoms, anything that helps."
          className={inputClasses}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-400">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="focus-ring w-full bg-amber px-7 py-4 font-display text-sm uppercase tracking-wide text-ground transition-all hover:bg-amber-glow disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send Job Request"}
      </button>
    </form>
  );
}
