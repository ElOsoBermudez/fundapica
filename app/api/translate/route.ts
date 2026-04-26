import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

type TranslateRequest = {
  fields: Record<string, string | null>
  targetLang: "es" | "ca"
}

const LANG_NAMES: Record<string, string> = {
  es: "castellano (español)",
  ca: "catalán",
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "Falta configurar OPENAI_API_KEY" }, { status: 500 })
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    const body: TranslateRequest = await req.json()
    const { fields, targetLang } = body

    const entries = Object.entries(fields).filter(([, v]) => v && v.trim())
    if (!entries.length) {
      return NextResponse.json({ translated: {} })
    }

    const fieldDescriptions = entries
      .map(([key, value]) => `### CAMPO: ${key}\n${value}`)
      .join("\n\n")

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Eres un traductor profesional especializado en ${LANG_NAMES[targetLang]}.
Tu tarea es traducir campos de texto al ${LANG_NAMES[targetLang]}.
REGLAS IMPORTANTES:
- Si el campo contiene HTML, preserva exactamente toda la estructura HTML (tags, atributos, clases) y solo traduce el texto dentro de los tags.
- Si el campo es texto plano, tradúcelo directamente.
- Devuelve SOLO un JSON válido con los campos traducidos, sin texto adicional ni markdown.
- Mantén el mismo tono y estilo del original.
- El formato de respuesta debe ser: {"campo1": "traducción1", "campo2": "traducción2"}`,
        },
        {
          role: "user",
          content: `Traduce los siguientes campos al ${LANG_NAMES[targetLang]}:\n\n${fieldDescriptions}\n\nDevuelve SOLO el JSON con los campos traducidos.`,
        },
      ],
      temperature: 0.2,
      response_format: { type: "json_object" },
    })

    const raw = response.choices[0]?.message?.content ?? "{}"
    const translated: Record<string, string> = JSON.parse(raw)

    return NextResponse.json({ translated })
  } catch (err) {
    console.error("[translate]", err)
    return NextResponse.json({ error: "Error en la traducción" }, { status: 500 })
  }
}
