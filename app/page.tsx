"use client"

import { useState } from "react"
import { QuestionScreen } from "@/components/question-screen"
import { BirthdayScreen } from "@/components/birthday-screen"

type Screen = "question1" | "question2" | "birthday"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("question1")
  const [transitioning, setTransitioning] = useState(false)

  const goToScreen = (screen: Screen) => {
    setTransitioning(true)
    setTimeout(() => {
      setCurrentScreen(screen)
      setTransitioning(false)
    }, 500)
  }

  return (
    <main
      className="relative min-h-dvh overflow-hidden"
      style={{
        background:
          currentScreen === "birthday"
            ? "linear-gradient(135deg, #fff0f3 0%, #ffb6c1 40%, #ffc0cb 70%, #ffe4e9 100%)"
            : "linear-gradient(135deg, #fff5f7 0%, #ffd6e0 50%, #ffb6c1 100%)",
        transition: "background 1s ease",
      }}
    >
      <div
        className={`transition-opacity duration-500 ${
          transitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {currentScreen === "question1" && (
          <QuestionScreen
            question="Kamu penasaran?"
            onYes={() => goToScreen("question2")}
            visible={currentScreen === "question1"}
          />
        )}

        {currentScreen === "question2" && (
          <QuestionScreen
            question="Mau lanjut?"
            onYes={() => goToScreen("birthday")}
            visible={currentScreen === "question2"}
          />
        )}

        {currentScreen === "birthday" && (
          <BirthdayScreen
            visible={currentScreen === "birthday"}
            name="Setia"
          />
        )}
      </div>
    </main>
  )
}
