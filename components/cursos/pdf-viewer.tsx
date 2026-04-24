"use client"

import { useState } from "react"
import { ExternalLink, FileText, X } from "lucide-react"

export function PdfViewer({ url }: { url: string }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group flex items-center gap-4 rounded-2xl border border-black/8 bg-[#F8FAFC] px-5 py-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
      >
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#E05780]/10">
          <FileText className="size-6 text-[#E05780]" />
        </div>
        <div className="text-left">
          <p className="font-sans text-sm font-semibold text-[#E05780]">Ver documento adjunto</p>
          <p className="font-[family:var(--font-body)] text-xs text-black/45">Haz clic para abrir el PDF</p>
        </div>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-10 flex h-full max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-black/8 px-5 py-3">
              <div className="flex items-center gap-2">
                <FileText className="size-4 text-[#E05780]" />
                <p className="font-sans text-sm font-semibold text-black/70">Documento adjunto</p>
              </div>
              <div className="flex items-center gap-1">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-[#75A5E3] hover:bg-[#75A5E3]/10"
                >
                  <ExternalLink className="size-3.5" />
                  Abrir en nueva pestaña
                </a>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-1.5 text-black/50 hover:bg-neutral-100 hover:text-black"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>
            <iframe
              src={url}
              className="h-full w-full flex-1"
              title="Documento PDF"
            />
          </div>
        </div>
      )}
    </>
  )
}
