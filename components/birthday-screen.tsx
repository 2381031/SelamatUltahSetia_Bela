"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { FloatingHearts } from "./floating-hearts"

interface BirthdayScreenProps {
  visible: boolean
  name: string
}

export function BirthdayScreen({ visible, name }: BirthdayScreenProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [typingDone, setTypingDone] = useState(false)
  const [showPhoto, setShowPhoto] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const fullText = `Selamat Ulang Tahun buat ${name}!`

  useEffect(() => {
    if (!visible) return

    let i = 0
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayedText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
        setTypingDone(true)
        setTimeout(() => setShowPhoto(true), 400)
        setTimeout(() => setShowMessage(true), 1200)
      }
    }, 80)

    // Try to play audio
    if (audioRef.current) {
      audioRef.current.volume = 0.5
      audioRef.current.play().catch(() => {
        // Autoplay blocked — user interaction required
      })
    }

    return () => clearInterval(interval)
  }, [visible, fullText])

  if (!visible) return null

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center gap-8 overflow-hidden px-6 py-12">
      <FloatingHearts />

      {/* Sparkle decorations */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-[10%] top-[15%] h-2 w-2 animate-pulse rounded-full bg-accent/60" />
        <div
          className="absolute right-[15%] top-[20%] h-3 w-3 animate-pulse rounded-full bg-primary/40"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute left-[20%] top-[60%] h-2 w-2 animate-pulse rounded-full bg-accent/50"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute right-[25%] top-[70%] h-3 w-3 animate-pulse rounded-full bg-primary/30"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute left-[70%] top-[40%] h-2 w-2 animate-pulse rounded-full bg-accent/40"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      {/* Main title with typing effect */}
      <div className="relative z-10 text-center">
        <h1
          className="text-balance text-3xl font-bold text-foreground md:text-5xl lg:text-6xl"
          style={{ textShadow: "0 2px 15px rgba(255,182,193,0.5)" }}
        >
          {displayedText}
          {!typingDone && (
            <span className="ml-1 inline-block animate-pulse text-primary">{"|"}</span>
          )}
        </h1>
        {typingDone && (
          <span className="mt-2 inline-block animate-bounce text-4xl md:text-5xl" role="img" aria-label="party">
{"\ud83c\udf89"}
          </span>
        )}
      </div>

      {/* Photo */}
      <div
        className={`relative z-10 overflow-hidden rounded-2xl shadow-2xl transition-all duration-1000 ${
          showPhoto ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
        style={{ boxShadow: "0 8px 40px rgba(255,182,193,0.4)" }}
      >
        <Image
          src="Setia.jpeg"
          alt={`Foto ulang tahun ${name}`}
          width={360}
          height={360}
          className="h-auto w-[280px] rounded-2xl object-cover md:w-[360px]"
          priority
        />
      </div>

      {/* Sweet message */}
      <div
        className={`relative z-10 max-w-md text-center transition-all duration-1000 ${
          showMessage ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <p className="text-lg leading-relaxed text-foreground/80 md:text-xl">
          Semoga semua impian dan harapanmu terwujud. Terima kasih sudah menjadi orang yang luar biasa. Semoga tahun ini penuh kebahagiaan!
        </p>
        <p className="mt-4 text-2xl" role="img" aria-label="hearts">
{"\ud83d\udc96\u2728\ud83d\udc96"}
        </p>
      </div>

     {/* YouTube autoplay background music (muted by browser policy) */}
<iframe
  title="Just The Way You Are - Bruno Mars"
  width="0"
  height="0"
  className="hidden"
  allow="autoplay; encrypted-media"
  src="https://www.youtube.com/embed/LjhCEhWiKXk?autoplay=1&mute=1&loop=1&playlist=LjhCEhWiKXk&controls=0"
/>

    </div>
  )
}
