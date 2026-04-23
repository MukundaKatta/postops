"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleWaitlist(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setSubmitted(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      // Non-fatal: UX stays happy even if network fails.
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-pink-500" />
          PostOps
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <a href="#demo" className="hidden sm:inline hover:opacity-70">
            See a demo
          </a>
          <Link
            href="/try"
            className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium transition hover:border-neutral-900 hidden sm:inline-block"
          >
            Try it
          </Link>
          <a
            href="#waitlist"
            className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
          >
            Get early access
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 -z-10 h-[500px] bg-gradient-to-b from-pink-100 via-pink-50 to-transparent opacity-60" />
        <div className="mx-auto max-w-4xl px-6 pt-20 pb-20 text-center sm:pt-28">
          <p className="mb-5 inline-block rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-pink-700">
            Small business
          </p>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-neutral-900 sm:text-7xl">
            Your social media team, in a box.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600 sm:text-xl">
            Photos in. Posts out. AI writes the captions, picks the hashtags, and schedules it all
            for you.
          </p>

          {submitted ? (
            <p className="mt-12 text-sm font-medium text-pink-700">
              Thanks. We will ping you the day we launch.
            </p>
          ) : (
            <form
              id="waitlist"
              onSubmit={handleWaitlist}
              className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            >
              <input
                type="email"
                placeholder="you@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full border border-neutral-300 bg-white px-5 py-3.5 text-base placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10 sm:w-80"
              />
              <button
                type="submit"
                disabled={submitting}
                className="rounded-full bg-neutral-900 px-7 py-3.5 font-medium text-white transition hover:bg-neutral-700 disabled:opacity-60"
              >
                Join the waitlist
              </button>
            </form>
          )}

          <p className="mt-6 text-xs text-neutral-400">
            Early access list is open. First 100 get in free forever.
          </p>
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" className="border-y border-neutral-200 bg-neutral-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-pink-600">
              Live preview
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">See it in action</h2>
          </div>
          <div className="mt-12 mx-auto max-w-3xl grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-neutral-200 overflow-hidden bg-white">
              <div className="aspect-square bg-gradient-to-br from-pink-200 via-pink-100 to-orange-100 flex items-center justify-center text-5xl">
                🥐
              </div>
              <div className="p-4 text-sm text-neutral-500">Your photo</div>
            </div>
            <div className="rounded-3xl border border-neutral-200 bg-white p-5">
              <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-pink-600">
                Three captions, ready to post
              </div>
              <div className="flex flex-col gap-3">
                {[
                  "Flaky. Buttery. Gone in three bites. Fresh croissants, every morning at 7. 🥐 #bakery #localeats",
                  "Your Saturday plans? Coffee + one of these. We open at 7 sharp.",
                  "Recipe didn't change. Neither did the butter. Same croissant we've made for a decade.",
                ].map((cap, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-sm leading-relaxed text-neutral-800"
                  >
                    {cap}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/try"
              className="inline-block rounded-full bg-pink-600 px-7 py-3.5 font-medium text-white transition hover:bg-pink-700"
            >
              Try it with your own photos →
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What you get</h2>
          </div>
          <div className="mt-12 grid gap-12 sm:grid-cols-3">
            <div>
              <div className="text-3xl">📸</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">Photos to posts</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Drop a product photo. Get three on-brand captions in seconds.
              </p>
            </div>
            <div>
              <div className="text-3xl">📆</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">Always scheduled</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                A full month of content, queued and ready, so you never miss a day.
              </p>
            </div>
            <div>
              <div className="text-3xl">📈</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">Learns what works</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Doubles down on what your audience actually engages with.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-neutral-200 bg-neutral-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-pink-600">
              How it works
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Three steps. No learning curve.
            </h2>
          </div>
          <div className="mt-12 grid gap-12 sm:grid-cols-3">
            <div className="relative">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-sm font-bold text-pink-700">
                1
              </div>
              <h3 className="text-lg font-semibold tracking-tight">Upload your photos</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Drop up to 3 photos and describe the event or product. Takes 30 seconds.
              </p>
            </div>
            <div className="relative">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-sm font-bold text-pink-700">
                2
              </div>
              <h3 className="text-lg font-semibold tracking-tight">AI writes the posts</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Get platform-specific drafts for Instagram, Twitter, and LinkedIn — each with the
                right tone.
              </p>
            </div>
            <div className="relative">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-sm font-bold text-pink-700">
                3
              </div>
              <h3 className="text-lg font-semibold tracking-tight">Post or schedule</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Review, tweak, and publish in one click. Or let PostOps queue it for the best time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-4xl px-6 py-28 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Be the first in line.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-neutral-600">
          Early access starts soon. Get on the list and we will reach out the moment we open the
          doors.
        </p>
        <a
          href="#waitlist"
          className="mt-8 inline-block rounded-full bg-pink-600 px-7 py-3.5 font-medium text-white transition hover:bg-pink-700"
        >
          Reserve my spot
        </a>
      </section>

      <footer className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-sm text-neutral-500">
          <p className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-pink-500" />
            PostOps
          </p>
          <p>© 2026</p>
        </div>
      </footer>
    </>
  );
}
