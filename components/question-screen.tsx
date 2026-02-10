"use client"

import { useState } from "react"

interface QuestionScreenProps {
  question: string
  onYes: () => void
  visible: boolean
}

export function QuestionScreen({ question, onYes, visible }: QuestionScreenProps) {
  const [yesScale, setYesScale] = useState(1)

  const handleNo = () => {
    setYesScale((prev) => prev + 0.4)
  }

  if (!visible) return null

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-10 px-6">
      <h1
        className="text-center text-3xl font-bold text-foreground md:text-5xl"
        style={{ textShadow: "0 2px 10px rgba(255,182,193,0.4)" }}
      >
        {question}
      </h1>

      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={onYes}
          className="rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:shadow-xl active:scale-95"
          style={{
            transform: `scale(${yesScale})`,
            boxShadow: `0 ${4 * yesScale}px ${20 * yesScale}px rgba(255,182,193,0.5)`,
          }}
        >
          Iya
        </button>

        <button
          type="button"
          onClick={handleNo}
          className="rounded-full bg-secondary px-6 py-2 text-sm font-medium text-secondary-foreground shadow transition-all duration-200 hover:bg-secondary/80 active:scale-95"
        >
          Tidak
        </button>
      </div>
    </div>
  )
}
