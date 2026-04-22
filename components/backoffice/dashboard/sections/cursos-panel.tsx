"use client"

import FileUploadList4 from "@/components/file-upload-list-4"
import { createBrowserSupabaseClient } from "@/lib/supabase/client"
import type { CategoriaCurso } from "@/lib/supabase/types"
import { AlertDialog } from "@base-ui/react/alert-dialog"
import { motion } from "motion/react"
import { PlusCircle, Pencil, Trash2 } from "lucide-react"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const RichTextEditor = dynamic(
  () => import("./rich-text-editor").then((m) => m.RichTextEditor),
  { ssr: false }
)

const ALLOWED_TYPES = ["image/jpg", "image/jpeg", "image/png", "image/webp"]
const MAX_SIZE = 5 * 1024 * 1024

type CursoCard = {
  id: string
  titulo: string
  descripcion: string
  contenido: string
  categoria: string | null
  categoria_id: string | null
  imagen_url: string | null
  created_at: string
  isNew: boolean
}

export function CursosPanel() {
  const [categorias, setCategorias] = useState<CategoriaCurso[]>([])
  const [categoriaId, setCategoriaId] = useState<string | null>(null)
  const [nuevaCategoria, setNuevaCategoria] = useState("")
  const [titulo, setTitulo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [contenido, setContenido] = useState("")
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [cursos, setCursos] = useState<CursoCard[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editorKey, setEditorKey] = useState(0)
  const [filtroCategoria, setFiltroCategoria] = useState<string>("todas")
  const [filtroFecha, setFiltroFecha] = useState<string>("recientes")
  const [pagina, setPagina] = useState(1)
  const POR_PAGINA = 4

  useEffect(() => {
    const supabase = createBrowserSupabaseClient()

    supabase
      .from("categorias_cursos")
      .select("*")
      .order("nombre")
      .then(({ data, error }) => {
        if (error) toast.error("Error al cargar categorías")
        if (data) setCategorias(data)
      })

    supabase
      .from("cursos")
      .select("*, categorias_cursos(nombre)")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) {
          setCursos(data.map((c) => ({
            id: c.id,
            titulo: c.titulo,
            descripcion: c.descripcion ?? "",
            contenido: c.contenido ?? "",
            categoria: (c.categorias_cursos as unknown as { nombre: string } | null)?.nombre ?? null,
            categoria_id: c.categoria_id,
            imagen_url: c.imagen_url,
            created_at: new Date(c.created_at).toLocaleDateString("es-ES", {
              day: "numeric", month: "long", year: "numeric",
            }),
            isNew: false,
          })))
        }
      })
  }, [])

  const resetForm = () => {
    setTitulo("")
    setDescripcion("")
    setContenido("")
    setCategoriaId(null)
    setImageUrl(null)
    setEditingId(null)
    setEditorKey((k) => k + 1)
  }

  const handleFilesChange = async (files: File[]) => {
    if (!files.length) { setImageUrl(null); return }
    const file = files[0]
    if (!ALLOWED_TYPES.includes(file.type) || file.size > MAX_SIZE) return
    setUploading(true)
    const supabase = createBrowserSupabaseClient()
    const ext = file.name.split(".").pop()
    const path = `${Date.now()}.${ext}`
    const { error } = await supabase.storage.from("cursos").upload(path, file, { upsert: true })
    if (!error) {
      const { data } = supabase.storage.from("cursos").getPublicUrl(path)
      setImageUrl(data.publicUrl)
      toast.success("Imagen subida correctamente")
    } else {
      toast.error(`Error al subir la imagen: ${error.message}`)
    }
    setUploading(false)
  }

  const handleCrearCategoria = async () => {
    const nombre = nuevaCategoria.trim()
    if (!nombre) return
    const supabase = createBrowserSupabaseClient()
    const { data, error } = await supabase
      .from("categorias_cursos")
      .insert({ nombre })
      .select()
      .single()
    if (!error && data) {
      setCategorias((prev) => [...prev, data].sort((a, b) => a.nombre.localeCompare(b.nombre)))
      setCategoriaId(data.id as string)
      setNuevaCategoria("")
      toast.success(`Categoría "${nombre}" creada`)
    } else if (error) {
      toast.error("Error al crear la categoría")
    }
  }

  const handleEditar = (curso: CursoCard) => {
    setEditingId(curso.id)
    setTitulo(curso.titulo)
    setDescripcion(curso.descripcion)
    setContenido(curso.contenido)
    setCategoriaId(curso.categoria_id)
    setImageUrl(curso.imagen_url)
    setEditorKey((k) => k + 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
    toast("Editando curso — modifica los campos y pulsa Actualizar")
  }

  const handleEliminar = async (id: string) => {
    const supabase = createBrowserSupabaseClient()
    const { error } = await supabase.from("cursos").delete().eq("id", id)
    if (!error) {
      setCursos((prev) => prev.filter((c) => c.id !== id))
      if (editingId === id) resetForm()
      toast.success("Curso eliminado")
    } else {
      toast.error("Error al eliminar el curso")
    }
  }

  const handleGuardar = async () => {
    if (!titulo.trim()) return
    setSaving(true)
    const supabase = createBrowserSupabaseClient()

    if (editingId) {
      const { error } = await supabase
        .from("cursos")
        .update({
          titulo: titulo.trim(),
          descripcion: descripcion.trim() || null,
          contenido: contenido || null,
          categoria_id: categoriaId ?? null,
          imagen_url: imageUrl || null,
        })
        .eq("id", editingId)
      if (!error) {
        toast.success("Curso actualizado correctamente")
        setCursos((prev) => prev.map((c) =>
          c.id === editingId ? {
            ...c,
            titulo: titulo.trim(),
            descripcion: descripcion.trim(),
            contenido,
            categoria: categorias.find(cat => cat.id === categoriaId)?.nombre ?? null,
            categoria_id: categoriaId,
            imagen_url: imageUrl,
          } : c
        ))
        resetForm()
      } else {
        toast.error("Error al actualizar el curso")
      }
    } else {
      const { data, error } = await supabase
        .from("cursos")
        .insert({
          titulo: titulo.trim(),
          descripcion: descripcion.trim() || null,
          contenido: contenido || null,
          categoria_id: categoriaId ?? null,
          imagen_url: imageUrl || null,
        })
        .select()
        .single()
      if (!error && data) {
        toast.success("¡Felicidades! Tu curso ha sido creado")
        const nuevo: CursoCard = {
          id: data.id,
          titulo: titulo.trim(),
          descripcion: descripcion.trim(),
          contenido,
          categoria: categorias.find(cat => cat.id === categoriaId)?.nombre ?? null,
          categoria_id: categoriaId,
          imagen_url: imageUrl,
          created_at: new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }),
          isNew: true,
        }
        setCursos((prev) => [nuevo, ...prev.map(c => ({ ...c, isNew: false }))])
        resetForm()
      } else {
        toast.error("Error al guardar el curso, inténtalo de nuevo")
      }
    }
    setSaving(false)
  }

  const cursosFiltrados = cursos
    .filter((c) => filtroCategoria === "todas" || c.categoria_id === filtroCategoria)
    .sort((a, b) => filtroFecha === "antiguas" ? a.created_at.localeCompare(b.created_at) : b.created_at.localeCompare(a.created_at))
  const totalPaginas = Math.ceil(cursosFiltrados.length / POR_PAGINA)
  const cursosPagina = cursosFiltrados.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA)

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="flex-1">
        <h2 className="mb-6 text-3xl font-extrabold tracking-[-0.03em] text-[#000000]">
          {editingId ? "Editar curso" : "Crear nuevo curso"}
        </h2>
        <FileUploadList4 onValueChange={handleFilesChange} />
        <div className="mt-4 flex items-center gap-3">
          <span className="text-sm text-muted-foreground whitespace-nowrap">Elige una categoría</span>
          <div className="w-44">
            <Select value={categoriaId} onValueChange={(v) => setCategoriaId(v ?? null)}>
              <SelectTrigger className="bg-black text-[#fafafa] [&>svg]:text-[#fafafa] [&_span]:text-[#fafafa]">
                <SelectValue placeholder="Categoría">
                  {categoriaId ? (categorias.find(c => c.id === categoriaId)?.nombre ?? "Categoría") : null}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-black text-[#fafafa] [&_*]:text-[#fafafa] [&_[data-highlighted]]:bg-white/10">
                {categorias.length === 0 ? (
                  <div className="px-3 py-2 text-xs text-white/50">Sin categorías aún</div>
                ) : (
                  categorias.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.nombre}</SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          <span className="text-sm text-muted-foreground whitespace-nowrap">o crea una</span>
          <input
            type="text"
            value={nuevaCategoria}
            onChange={(e) => setNuevaCategoria(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleCrearCategoria() }}
            placeholder="Nueva categoría"
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
          <button
            onClick={handleCrearCategoria}
            className="flex items-center gap-1.5 h-9 rounded-md bg-black px-3 py-1 text-sm text-[#fafafa] shadow-sm hover:bg-black/80"
          >
            <PlusCircle className="size-4" />Crear
          </button>
        </div>
        <div className="mt-4">
          <p className="mb-1 text-sm font-medium">Título</p>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título del curso"
            className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
        <div className="mt-4">
          <p className="mb-1 text-sm font-medium">Descripción corta</p>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Breve descripción del curso (se mostrará en el listado)"
            rows={2}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
          />
        </div>
        <div className="mt-4">
          <RichTextEditor key={editorKey} onChange={setContenido} defaultContent={contenido} />
        </div>
        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={handleGuardar}
            disabled={saving || uploading || !titulo.trim()}
            className="h-10 rounded-md bg-black px-6 text-sm font-medium text-white hover:bg-black/80 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Guardando..." : editingId ? "Actualizar curso" : "Guardar y publicar"}
          </button>
          {editingId && (
            <button
              onClick={resetForm}
              className="h-10 rounded-md border border-input px-4 text-sm hover:bg-accent"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>
      <div className="hidden lg:block px-[15px]">
        <div className="h-full w-px bg-[#0a0a0a]" style={{ minHeight: "100%" }} />
      </div>
      <div className="flex-1 flex flex-col gap-3">
        {uploading && (
          <p className="text-sm text-muted-foreground">Subiendo imagen...</p>
        )}

        <div className="flex gap-2 flex-wrap">
          <select
            value={filtroCategoria}
            onChange={(e) => { setFiltroCategoria(e.target.value); setPagina(1) }}
            className="h-8 rounded-md border border-input bg-background px-2 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="todas">Todas las categorías</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.nombre}</option>
            ))}
          </select>
          <select
            value={filtroFecha}
            onChange={(e) => { setFiltroFecha(e.target.value); setPagina(1) }}
            className="h-8 rounded-md border border-input bg-background px-2 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="recientes">Más recientes</option>
            <option value="antiguas">Más antiguas</option>
          </select>
        </div>

        {cursosPagina.map((curso) => (
          <motion.div
            key={curso.id}
            initial={curso.isNew ? { opacity: 0, y: -16 } : false}
            animate={curso.isNew ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="rounded-lg border border-input overflow-hidden"
          >
            <div className="flex gap-4 p-4">
              {curso.imagen_url ? (
                <img
                  src={curso.imagen_url}
                  alt={curso.titulo}
                  className="w-32 h-32 object-cover rounded-md shrink-0"
                />
              ) : (
                <div className="w-32 h-32 rounded-md shrink-0 bg-neutral-100 flex items-center justify-center text-xs text-muted-foreground">
                  Sin imagen
                </div>
              )}
              <div className="flex flex-col gap-1 min-w-0 flex-1">
                {curso.categoria && (
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {curso.categoria}
                  </span>
                )}
                <h3 className="text-base font-bold leading-tight">{curso.titulo}</h3>
                <p className="text-xs text-muted-foreground">{curso.created_at}</p>
                {curso.descripcion && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {curso.descripcion}
                  </p>
                )}
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => handleEditar(curso)}
                    className="flex items-center gap-1 rounded-md bg-[#0a0a0a] px-2 py-1 text-xs text-[#fafafa] hover:bg-[#0a0a0a]/80"
                  >
                    <Pencil className="size-3" /> Editar
                  </button>
                  <AlertDialog.Root>
                    <AlertDialog.Trigger
                      className="flex items-center gap-1 rounded-md bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
                    >
                      <Trash2 className="size-3" /> Eliminar
                    </AlertDialog.Trigger>
                    <AlertDialog.Portal>
                      <AlertDialog.Backdrop className="fixed inset-0 bg-black/40 z-50" />
                      <AlertDialog.Popup className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
                        <AlertDialog.Title className="text-base font-semibold">
                          ¿Eliminar curso?
                        </AlertDialog.Title>
                        <AlertDialog.Description className="mt-2 text-sm text-muted-foreground">
                          Esta acción no se puede deshacer. El curso «{curso.titulo}» se eliminará permanentemente.
                        </AlertDialog.Description>
                        <div className="mt-5 flex justify-end gap-2">
                          <AlertDialog.Close className="h-9 rounded-md border border-input px-4 text-sm hover:bg-accent">
                            Cancelar
                          </AlertDialog.Close>
                          <AlertDialog.Close
                            onClick={() => handleEliminar(curso.id)}
                            className="h-9 rounded-md bg-red-500 px-4 text-sm text-white hover:bg-red-600"
                          >
                            Sí, eliminar
                          </AlertDialog.Close>
                        </div>
                      </AlertDialog.Popup>
                    </AlertDialog.Portal>
                  </AlertDialog.Root>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {totalPaginas > 1 && (
          <div className="flex items-center justify-center gap-1 pt-2">
            <button
              onClick={() => setPagina((p) => Math.max(1, p - 1))}
              disabled={pagina === 1}
              className="h-7 w-7 rounded-md border border-input text-xs hover:bg-accent disabled:opacity-40"
            >
              ‹
            </button>
            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPagina(p)}
                className={`h-7 w-7 rounded-md border text-xs ${p === pagina ? "bg-[#0a0a0a] text-[#fafafa] border-[#0a0a0a]" : "border-input hover:bg-accent"}`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
              disabled={pagina === totalPaginas}
              className="h-7 w-7 rounded-md border border-input text-xs hover:bg-accent disabled:opacity-40"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
