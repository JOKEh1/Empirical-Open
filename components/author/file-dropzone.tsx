'use client'

import { useState } from 'react'
import { Upload, X, FileText } from 'lucide-react'

interface FileDropzoneProps {
  onFilesSelected: (files: File[]) => void
  maxFiles?: number
  acceptedTypes?: string[]
}

export function FileDropzone({
  onFilesSelected,
  maxFiles = 5,
  acceptedTypes = ['.pdf', '.docx', '.doc'],
}: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFiles = Array.from(e.dataTransfer.files).filter((file) => {
      const ext = '.' + file.name.split('.').pop()?.toLowerCase()
      return acceptedTypes.includes(ext)
    })

    if (droppedFiles.length + selectedFiles.length <= maxFiles) {
      const newFiles = [...selectedFiles, ...droppedFiles]
      setSelectedFiles(newFiles)
      onFilesSelected(newFiles)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.currentTarget.files || [])
    if (files.length + selectedFiles.length <= maxFiles) {
      const newFiles = [...selectedFiles, ...files]
      setSelectedFiles(newFiles)
      onFilesSelected(newFiles)
    }
  }

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index)
    setSelectedFiles(newFiles)
    onFilesSelected(newFiles)
  }

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
          isDragging
            ? 'border-gold bg-gold/5'
            : 'border-white/20 bg-white/5 hover:border-white/40'
        }`}
      >
        <Upload className="mx-auto h-12 w-12 text-gold/60 mb-3" />
        <p className="mb-2 text-sm font-medium text-foreground">
          Drag and drop your files here
        </p>
        <p className="mb-4 text-xs text-foreground/70">
          or{' '}
          <label className="cursor-pointer text-gold hover:text-gold-soft">
            browse your computer
            <input
              type="file"
              multiple
              accept={acceptedTypes.join(',')}
              onChange={handleFileInput}
              className="hidden"
            />
          </label>
        </p>
        <p className="text-xs text-foreground/60">
          Supported: {acceptedTypes.join(', ')} (Max {maxFiles} files)
        </p>
      </div>

      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">
            {selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''} selected
          </p>
          <div className="space-y-2">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-white/5 p-3 border border-white/10"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <FileText className="h-4 w-4 text-gold flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-foreground/60">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="ml-2 inline-flex items-center text-foreground/60 transition-colors hover:text-rust flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
