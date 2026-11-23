"use client";

import { ArrowRight, Check, Loader2 } from "lucide-react";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";

/** Early-access request — sent through the existing /api/contact endpoint. */
export function WaitlistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: "",
          subject: "Investment Portal: early access",
          message: `${name} would like early access to the Prime Capital Investment Portal.`,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setState("done");
    } catch {
      setState("idle");
      toast.error(
        "We couldn't register your interest just now. Please try again or email info@primecapital.ng",
      );
    }
  };

  if (state === "done") {
    return (
      <div className="flex items-start gap-4 border border-gold-refined/40 bg-white/[0.04] p-6">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-refined text-ink">
          <Check aria-hidden className="h-5 w-5" />
        </span>
        <p className="text-[15.5px] leading-relaxed text-white/85">
          Thank you, {name.split(" ")[0]}. You&apos;re on the list. We&apos;ll
          email you as soon as the Investment Portal opens.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="sr-only">Full name</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            autoComplete="name"
            className="block w-full border border-white/20 bg-white/[0.05] px-5 py-4 text-[15px] text-white placeholder:text-white/40 focus:border-gold-refined focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="sr-only">Email address</span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            autoComplete="email"
            className="block w-full border border-white/20 bg-white/[0.05] px-5 py-4 text-[15px] text-white placeholder:text-white/40 focus:border-gold-refined focus:outline-none"
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={state === "sending"}
        className="btn-sheen group inline-flex w-full items-center justify-center gap-3 rounded-[2px] bg-gold-refined px-8 py-4 text-[13px] font-bold uppercase tracking-[0.16em] text-ink transition-colors duration-500 hover:bg-gold-soft disabled:opacity-60 sm:w-auto"
      >
        {state === "sending" ? "Sending..." : "Request Early Access"}
        {state === "sending" ? (
          <Loader2 aria-hidden className="h-4 w-4 animate-spin" />
        ) : (
          <ArrowRight
            aria-hidden
            className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
          />
        )}
      </button>
    </form>
  );
}
