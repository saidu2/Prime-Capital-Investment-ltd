"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useLenis } from "@/components/smooth-scroll";
import type { Person } from "@/data/leadership";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Portrait grid with a Cardinal-style profile modal.
 * Desktop: photo only, a gold-topped name bar slides up on hover/focus.
 * Touch: the name bar is always visible (there is no hover).
 */
export function PeopleGrid({ people }: { people: Person[] }) {
  const [open, setOpen] = useState<number | null>(null);

  const step = useCallback(
    (dir: 1 | -1) =>
      setOpen((i) =>
        i === null ? i : (i + dir + people.length) % people.length,
      ),
    [people.length],
  );

  // Wrapping row, centred, so an incomplete last row (e.g. 5 = 3 + 2) sits
  // in the middle instead of hugging the left edge.
  const narrow = people.length <= 3 ? "lg:max-w-5xl" : "";

  return (
    <MotionConfig reducedMotion="user">
      <ul
        className={`mx-auto flex flex-wrap justify-center gap-6 md:gap-8 ${narrow}`}
      >
        {people.map((p, i) => (
          <motion.li
            key={p.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: EASE, delay: (i % 3) * 0.1 }}
            className="w-full sm:w-[calc((100%-1.5rem)/2)] md:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-4rem)/3)]"
          >
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`${p.name.trim()}, ${p.role}, read profile`}
              className="group relative block aspect-[4/5] w-full cursor-pointer overflow-hidden bg-ink-2 text-left focus-visible:outline-offset-4"
            >
              {p.photo ? (
                <Image
                  src={p.photo}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-[50%_18%] saturate-[0.85] transition-[transform,filter] duration-[1400ms] ease-soft group-hover:scale-[1.04] group-hover:saturate-100 group-focus-visible:scale-[1.04]"
                />
              ) : (
                <Monogram name={p.name} />
              )}
              <span
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/10 to-transparent"
              />
              {/* Name bar — always on touch, slides up on hover-capable devices */}
              <span className="absolute inset-x-0 bottom-0 translate-y-0 transition-transform duration-700 ease-soft [@media(hover:hover)]:translate-y-full [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-focus-visible:translate-y-0">
                <span className="block h-[3px] w-full bg-gold-refined" />
                <span className="block bg-ink/90 px-6 py-5 backdrop-blur-sm">
                  <span className="block font-display text-xl text-white md:text-2xl">
                    {p.name.trim()}
                  </span>
                  <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-soft">
                    {p.role}
                  </span>
                </span>
              </span>
            </button>
          </motion.li>
        ))}
      </ul>

      <ProfileModal
        people={people}
        index={open}
        onClose={() => setOpen(null)}
        onStep={step}
      />
    </MotionConfig>
  );
}

function ProfileModal({
  people,
  index,
  onClose,
  onStep,
}: {
  people: Person[];
  index: number | null;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}) {
  const person = index === null ? null : people[index];
  const [dir, setDir] = useState<1 | -1>(1);
  const lenis = useLenis();
  const isOpen = index !== null;

  // Freeze the smooth-scrolled page behind the modal.
  useEffect(() => {
    if (!isOpen) return;
    lenis?.stop();
    return () => lenis?.start();
  }, [isOpen, lenis]);

  const go = (d: 1 | -1) => {
    setDir(d);
    onStep(d);
  };

  return (
    <DialogPrimitive.Root
      open={index !== null}
      onOpenChange={(o) => !o && onClose()}
    >
      <AnimatePresence>
        {person && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="fixed inset-0 z-[70] bg-ink/85 backdrop-blur-sm"
              />
            </DialogPrimitive.Overlay>

            <DialogPrimitive.Content
              asChild
              forceMount
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") go(1);
                if (e.key === "ArrowLeft") go(-1);
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="fixed inset-0 z-[71] flex items-center justify-center px-4 pb-4 pt-16 outline-none md:px-24 md:py-6"
                data-lenis-prevent
              >
                {/* Close — top-right of the screen, as on Cardinal */}
                <DialogPrimitive.Close
                  aria-label="Close profile"
                  className="absolute right-4 top-4 z-10 flex h-12 w-12 cursor-pointer items-center justify-center text-white/70 transition-colors hover:text-white md:right-8 md:top-8"
                >
                  <X aria-hidden strokeWidth={1.25} className="h-8 w-8" />
                </DialogPrimitive.Close>

                {/* Side arrows (desktop) */}
                {people.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      aria-label="Previous profile"
                      className="group absolute left-4 top-1/2 z-10 hidden h-16 w-12 -translate-y-1/2 cursor-pointer items-center justify-center text-white/60 transition-colors hover:text-white md:flex lg:left-10"
                    >
                      <ChevronLeft
                        aria-hidden
                        strokeWidth={1}
                        className="h-11 w-11 transition-transform duration-500 ease-soft group-hover:-translate-x-1"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      aria-label="Next profile"
                      className="group absolute right-4 top-1/2 z-10 hidden h-16 w-12 -translate-y-1/2 cursor-pointer items-center justify-center text-white/60 transition-colors hover:text-white md:flex lg:right-10"
                    >
                      <ChevronRight
                        aria-hidden
                        strokeWidth={1}
                        className="h-11 w-11 transition-transform duration-500 ease-soft group-hover:translate-x-1"
                      />
                    </button>
                  </>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="relative w-full max-w-5xl overflow-hidden bg-ink-2 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)]"
                >
                  <AnimatePresence mode="wait" initial={false} custom={dir}>
                    <motion.div
                      key={index}
                      custom={dir}
                      initial={{ opacity: 0, x: dir * 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: dir * -16 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="grid max-h-[88vh] grid-rows-[auto_minmax(0,1fr)] md:grid-cols-[5fr_7fr] md:grid-rows-1"
                    >
                      <div className="relative h-56 bg-ink sm:h-72 md:h-auto md:min-h-[520px]">
                        {person.photo ? (
                          <Image
                            src={person.photo}
                            alt={`Portrait of ${person.name.trim()}`}
                            fill
                            sizes="(min-width: 768px) 40vw, 100vw"
                            className="object-cover object-[50%_18%]"
                          />
                        ) : (
                          <Monogram name={person.name} />
                        )}
                        <span
                          aria-hidden
                          className="absolute inset-x-0 bottom-0 h-[3px] bg-gold-refined md:hidden"
                        />
                      </div>

                      <div className="flex min-h-0 flex-col p-7 sm:p-10 md:p-12">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-soft">
                          {person.role}
                        </p>
                        <DialogPrimitive.Title className="mt-3 font-display text-3xl font-normal leading-tight text-white md:text-[2.6rem]">
                          {person.name.trim()}
                        </DialogPrimitive.Title>
                        <span
                          aria-hidden
                          className="mt-6 block h-px w-14 bg-gold-refined"
                        />
                        <DialogPrimitive.Description asChild>
                          <div
                            data-lenis-prevent
                            className="mt-6 min-h-0 flex-1 space-y-4 overflow-y-auto pr-2 text-[15px] leading-[1.8] text-white/80"
                          >
                            {person.fullInfo.split(/\n{2,}/).map((para) => (
                              <p key={para.slice(0, 40)}>{para}</p>
                            ))}
                          </div>
                        </DialogPrimitive.Description>

                        {/* Footer: counter + mobile arrows */}
                        <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
                          <span className="font-display text-sm tabular-nums text-white/70">
                            {String((index ?? 0) + 1).padStart(2, "0")}
                            <span className="mx-2 text-white/30">/</span>
                            <span className="text-white/40">
                              {String(people.length).padStart(2, "0")}
                            </span>
                          </span>
                          {people.length > 1 && (
                            <div className="flex gap-2 md:hidden">
                              <button
                                type="button"
                                onClick={() => go(-1)}
                                aria-label="Previous profile"
                                className="flex h-10 w-10 items-center justify-center border border-white/20 text-white"
                              >
                                <ChevronLeft aria-hidden className="h-4 w-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => go(1)}
                                aria-label="Next profile"
                                className="flex h-10 w-10 items-center justify-center border border-white/20 text-white"
                              >
                                <ChevronRight aria-hidden className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}

/** Placeholder portrait until a photo is supplied: gold initials on ink. */
function Monogram({ name }: { name: string }) {
  const initials = name
    .replace(/[^A-Za-z ]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1)
    .map((w) => w[0])
    .filter((_, i, all) => i === 0 || i === all.length - 1)
    .join("")
    .toUpperCase();
  return (
    <span
      aria-hidden
      className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-ink-2 to-ink"
    >
      <span className="flex h-28 w-28 items-center justify-center rounded-full border border-gold-refined/50 font-display text-4xl text-gold-soft">
        {initials}
      </span>
    </span>
  );
}
