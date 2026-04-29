"use client"

import { AnimatePresence, motion } from "motion/react"
import { Bot, MessageCircle, Send, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

import { useLanguage } from "@/lib/i18n/language-context"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  streaming?: boolean
}

const COPY = {
  es: {
    title: "Asistente Fundapica",
    subtitle: "Cursos, horarios y servicios",
    greeting:
      "¡Hola! Soy el asistente de Fundapica. Puedo ayudarte con información sobre nuestros cursos, horarios y servicios. ¿En qué puedo ayudarte?",
    placeholder: "Escribe tu consulta...",
    close: "Cerrar asistente",
    open: "Abrir asistente",
    error: "Lo siento, ha ocurrido un error. Inténtalo de nuevo.",
  },
  ca: {
    title: "Assistent Fundapica",
    subtitle: "Cursos, horaris i serveis",
    greeting:
      "Hola! Soc l'assistent de Fundapica. Puc ajudar-te amb informació sobre els nostres cursos, horaris i serveis. En què et puc ajudar?",
    placeholder: "Escriu la teva consulta...",
    close: "Tancar assistent",
    open: "Obrir assistent",
    error: "Ho sento, hi ha hagut un error. Torna-ho a provar.",
  },
}

export function ChatWidget() {
  const pathname = usePathname()
  const { language } = useLanguage()
  const copy = COPY[language]

  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Reset greeting when language changes
  useEffect(() => {
    setMessages([
      { id: "greeting", role: "assistant", content: COPY[language].greeting },
    ])
  }, [language])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 50)
  }, [isOpen])

  // Only render on frontend routes
  if (!pathname.startsWith("/frontend")) return null

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", content: text }
    const assistantId = `a-${Date.now()}`
    const assistantMsg: Message = { id: assistantId, role: "assistant", content: "", streaming: true }

    setMessages((prev) => [...prev, userMsg, assistantMsg])
    setInput("")
    setLoading(true)

    const history = [...messages, userMsg].map(({ role, content }) => ({ role, content }))

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, language }),
      })

      if (!res.body) throw new Error("no stream")

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ""
      let accumulated = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split("\n")
        buffer = lines.pop() ?? ""

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue
          const data = line.slice(6).trim()
          if (data === "[DONE]") break
          try {
            const { text } = JSON.parse(data) as { text: string }
            accumulated += text
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId ? { ...m, content: accumulated } : m
              )
            )
          } catch {}
        }
      }

      setMessages((prev) =>
        prev.map((m) => (m.id === assistantId ? { ...m, streaming: false } : m))
      )
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: COPY[language].error, streaming: false }
            : m
        )
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="fab"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => setIsOpen(true)}
            aria-label={copy.open}
            className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#E05780] text-white shadow-[0_8px_30px_rgba(224,87,128,0.45)] transition-colors hover:bg-[#d14a74]"
          >
            <MessageCircle className="size-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed bottom-6 right-6 z-50 flex w-[360px] flex-col overflow-hidden rounded-3xl border border-black/8 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.18)]"
            style={{ height: 520 }}
          >
            {/* Header */}
            <div className="flex shrink-0 items-center gap-3 bg-gradient-to-r from-[#75A5E3] to-[#E05780] px-4 py-3.5">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/20">
                <Bot className="size-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">{copy.title}</p>
                <p className="text-xs text-white/75">{copy.subtitle}</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label={copy.close}
                className="flex size-8 items-center justify-center rounded-full text-white/80 transition hover:bg-white/20 hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn("flex gap-2", msg.role === "user" ? "justify-end" : "justify-start")}
                >
                  {msg.role === "assistant" && (
                    <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-[#75A5E3]/12 text-[#75A5E3]">
                      <Bot className="size-4" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-6",
                      msg.role === "user"
                        ? "rounded-br-sm bg-[#E05780] text-white"
                        : "rounded-bl-sm bg-slate-100 text-slate-800"
                    )}
                  >
                    {msg.content || (
                      <span className="flex gap-1">
                        <span className="size-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:0ms]" />
                        <span className="size-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
                        <span className="size-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
                      </span>
                    )}
                    {msg.streaming && msg.content && (
                      <span className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse rounded-full bg-current opacity-60" />
                    )}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="shrink-0 border-t border-black/6 p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  sendMessage()
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={copy.placeholder}
                  disabled={loading}
                  className="flex-1 rounded-2xl border border-black/10 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-[#75A5E3]/50 focus:ring-2 focus:ring-[#75A5E3]/15 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[#E05780] text-white transition hover:bg-[#d14a74] disabled:opacity-40"
                >
                  <Send className="size-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
