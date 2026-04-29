import { NextRequest } from "next/server"
import OpenAI from "openai"
import { createServerSupabaseClient } from "@/lib/supabase/server"

type ChatMessage = {
  role: "user" | "assistant"
  content: string
}

async function buildKnowledgeContext(): Promise<string> {
  try {
    const supabase = await createServerSupabaseClient()

    const [cursosResult, noticiasResult] = await Promise.all([
      supabase
        .from("cursos")
        .select("titulo, descripcion, tipo, categorias_cursos(nombre)")
        .order("created_at", { ascending: false })
        .limit(40),
      supabase
        .from("noticias")
        .select("titulo, categorias(nombre)")
        .order("created_at", { ascending: false })
        .limit(12),
    ])

    let ctx = ""

    if (cursosResult.data?.length) {
      ctx += "\n## CURSOS DISPONIBLES\n"
      for (const c of cursosResult.data) {
        const cat = (c.categorias_cursos as unknown as { nombre: string } | null)?.nombre
        ctx += `- **${c.titulo}**`
        if (cat) ctx += ` [${cat}]`
        if (c.tipo && c.tipo !== "ambos") ctx += ` — Para: ${c.tipo}`
        if (c.descripcion) ctx += `\n  ${c.descripcion}`
        ctx += "\n"
      }
    }

    if (noticiasResult.data?.length) {
      ctx += "\n## NOTICIAS Y NOVEDADES\n"
      for (const n of noticiasResult.data) {
        const cat = (n.categorias as unknown as { nombre: string } | null)?.nombre
        ctx += `- ${n.titulo}`
        if (cat) ctx += ` (${cat})`
        ctx += "\n"
      }
    }

    return ctx
  } catch {
    return ""
  }
}

const SYSTEM_PROMPT_BASE = `Eres el asistente virtual de Fundapica (Academia Fundapica), una institución de formación profesional en Barcelona.

## SOBRE FUNDAPICA
Somos una institución comprometida con el desarrollo del talento y la empleabilidad. Diseñamos y ejecutamos programas de formación adaptados a las necesidades de empresas y personas que buscan crecer profesionalmente.

## UBICACIÓN
Carrer de Rocafort, 67-69, local 10, Eixample, 08015 Barcelona

## HORARIOS DE ATENCIÓN
- Lunes a Viernes: 9:00 - 14:00 y 15:00 - 18:00
- Sábados y Domingos: Cerrado

## SERVICIOS
- Formación para personas: itinerarios formativos personalizados para mejorar competencias y empleabilidad
- Formación para empresas: programas adaptados para equipos, liderazgo y actualización de competencias
- Orientación profesional: ayudamos a encontrar el curso más adecuado a cada perfil

## CONTACTO
Los visitantes pueden enviar un mensaje desde la sección Contacto de la web (/frontend/contacto) o visitar las instalaciones en horario de atención.`

export async function POST(req: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return new Response(JSON.stringify({ error: "Falta OPENAI_API_KEY" }), { status: 500 })
  }

  const { messages, language } = (await req.json()) as {
    messages: ChatMessage[]
    language?: string
  }

  const knowledgeCtx = await buildKnowledgeContext()

  const langRule =
    language === "ca"
      ? "Respon SEMPRE en català. Si l'usuari escriu en castellà, respon igualment en català de manera natural."
      : "Responde SIEMPRE en castellano. Si el usuario escribe en catalán, responde igualmente en castellano de forma natural."

  const systemPrompt = `${SYSTEM_PROMPT_BASE}
${knowledgeCtx}
## INSTRUCCIONES DE COMPORTAMIENTO
- ${langRule}
- Sé amable, cercano y profesional. Tono cálido pero eficiente.
- Cuando el usuario muestre interés en formarse, recomiéndale cursos concretos de la lista.
- Si preguntan por horarios, precios o disponibilidad que no esté en el contexto, invita a contactar directamente.
- Nunca inventes información que no figure en el contexto.
- Para contactar, indica que pueden usar el formulario de la sección Contacto de la web.
- Respuestas concisas: máximo 3-4 párrafos. Usa listas cuando sea útil para la claridad.`

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  const stream = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "system", content: systemPrompt }, ...messages],
    temperature: 0.4,
    max_tokens: 600,
    stream: true,
  })

  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content ?? ""
        if (text) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`))
        }
      }
      controller.enqueue(encoder.encode("data: [DONE]\n\n"))
      controller.close()
    },
  })

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}
