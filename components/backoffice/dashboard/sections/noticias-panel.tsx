"use client"

import FileUploadList4 from "@/components/file-upload-list-4"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function NoticiasPanel() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div>
        <h2 className="mb-6 text-3xl font-extrabold tracking-[-0.03em] text-[#000000]">
          Crear nueva noticia/post
        </h2>
        <FileUploadList4 />
        <div className="mt-4 w-1/3">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="educacion">Educación</SelectItem>
              <SelectItem value="salud">Salud</SelectItem>
              <SelectItem value="cultura">Cultura</SelectItem>
              <SelectItem value="tecnologia">Tecnología</SelectItem>
              <SelectItem value="medio-ambiente">Medio ambiente</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div />
    </div>
  )
}
