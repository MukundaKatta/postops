"use client";

import { useState, useRef } from "react";
import Link from "next/link";

interface PhotoSlot {
  id: number;
  url: string | null;
}

interface SocialDraft {
  platform: "Instagram" | "Twitter" | "LinkedIn";
  icon: string;
  color: string;
  content: string;
}

function generateDrafts(description: string): SocialDraft[] {
  const desc = description.trim() || "our latest product";

  return [
    {
      platform: "Instagram",
      icon: "📸",
      color: "text-pink-600",
      content: `✨ ${desc}\n\nEvery detail matters. Every moment tells a story. This is ours — and we're just getting started. 🌸\n\n#smallbusiness #shoplocal #behindthescenes #newdrop #${desc.split(" ")[0].toLowerCase()}`,
    },
    {
      platform: "Twitter",
      icon: "🐦",
      color: "text-sky-500",
      content: `Just dropped: ${desc}\n\nWe poured everything into this one. Check it out 👇`,
    },
    {
      platform: "LinkedIn",
      icon: "💼",
      color: "text-blue-700",
      content: `Excited to share our latest: ${desc}.\n\nThis represents months of hard work and a genuine commitment to quality. We believe small businesses deserve tools and moments that reflect their best selves.\n\nWould love to hear what you think in the comments.`,
    },
  ];
}

export default function TryPage() {
  const [slots, setSlots] = useState<PhotoSlot[]>([
    { id: 1, url: null },
    { id: 2, url: null },
    { id: 3, url: null },
  ]);
  const [description, setDescription] = useState("");
  const [drafts, setDrafts] = useState<SocialDraft[] | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const fileRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  function handleFileChange(slotIndex: number, file: File | undefined) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setSlots((prev) =>
      prev.map((s, i) => (i === slotIndex ? { ...s, url } : s))
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setDrafts(generateDrafts(description));
  }

  function handleReset() {
    slots.forEach((s) => {
      if (s.url) URL.revokeObjectURL(s.url);
    });
    setSlots([
      { id: 1, url: null },
      { id: 2, url: null },
      { id: 3, url: null },
    ]);
    setDescription("");
    setDrafts(null);
  }

  async function handleCopy(platform: string, content: string) {
    await navigator.clipboard.writeText(content);
    setCopied(platform);
    setTimeout(() => setCopied(null), 1500);
  }

  const hasAnyPhoto = slots.some((s) => s.url !== null);

  return (
    <>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-pink-500" />
          PostOps
        </Link>
        <Link
          href="/#waitlist"
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          Get early access
        </Link>
      </nav>

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-12">
        <div className="text-center mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-pink-600">
            v0 demo
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Photos → Posts
          </h1>
          <p className="mt-3 text-neutral-600">
            Upload up to 3 photos and describe your event or product. Get platform-specific
            draft posts instantly.
          </p>
        </div>

        {!drafts ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Photo upload grid */}
            <div>
              <p className="mb-3 text-sm font-medium text-neutral-700">Photos (up to 3)</p>
              <div className="grid grid-cols-3 gap-4">
                {slots.map((slot, i) => (
                  <div key={slot.id}>
                    <input
                      ref={fileRefs[i]}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange(i, e.target.files?.[0])}
                    />
                    <button
                      type="button"
                      onClick={() => fileRefs[i].current?.click()}
                      className="relative w-full aspect-square rounded-2xl border-2 border-dashed border-neutral-300 bg-neutral-50 overflow-hidden transition hover:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    >
                      {slot.url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={slot.url}
                          alt={`Photo ${i + 1}`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="flex flex-col items-center justify-center h-full gap-1 text-neutral-400">
                          <span className="text-2xl">+</span>
                          <span className="text-xs">Photo {i + 1}</span>
                        </span>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Event description */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-neutral-700"
              >
                What's this about? <span className="text-neutral-400 font-normal">(one line)</span>
              </label>
              <input
                id="description"
                type="text"
                placeholder="e.g. our new summer menu launch at the downtown café"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-base placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10"
              />
            </div>

            <button
              type="submit"
              disabled={!hasAnyPhoto || !description.trim()}
              className="w-full rounded-full bg-pink-600 py-3.5 font-medium text-white transition hover:bg-pink-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Generate posts
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            {/* Preview strip */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {slots
                .filter((s) => s.url)
                .map((s, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={s.url!}
                    alt={`Photo ${i + 1}`}
                    className="h-20 w-20 flex-shrink-0 rounded-xl object-cover border border-neutral-200"
                  />
                ))}
              <div className="flex-shrink-0 flex items-center px-3">
                <p className="text-sm text-neutral-500 italic">&ldquo;{description}&rdquo;</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-neutral-200" />
              <p className="text-xs font-semibold uppercase tracking-widest text-pink-600">
                Draft posts
              </p>
              <div className="h-px flex-1 bg-neutral-200" />
            </div>

            {/* Draft cards */}
            <div className="space-y-4">
              {drafts.map((draft) => (
                <div
                  key={draft.platform}
                  className="rounded-2xl border border-neutral-200 bg-white p-5"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{draft.icon}</span>
                      <span className={`text-sm font-semibold ${draft.color}`}>
                        {draft.platform}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(draft.platform, draft.content)}
                      className="rounded-lg border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-600 transition hover:bg-neutral-50"
                    >
                      {copied === draft.platform ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-neutral-800">
                    {draft.content}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-4 pt-4">
              <button
                onClick={handleReset}
                className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium transition hover:border-neutral-900"
              >
                Start over
              </button>
              <p className="text-xs text-neutral-400">
                These are mocked drafts — real AI generation coming soon.
              </p>
              <Link
                href="/#waitlist"
                className="text-sm font-medium text-pink-600 hover:underline"
              >
                Join the waitlist to get early access →
              </Link>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
