'use client'

import { useState } from 'react'
import { Plus, X, User } from 'lucide-react'

interface CoAuthor {
  name: string
  orcidId: string
  email: string
  affiliation: string
}

interface CoAuthorInputProps {
  onCoAuthorsChange: (coAuthors: CoAuthor[]) => void
}

export function CoAuthorInput({ onCoAuthorsChange }: CoAuthorInputProps) {
  const [coAuthors, setCoAuthors] = useState<CoAuthor[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    orcidId: '',
    email: '',
    affiliation: '',
  })

  const handleAddCoAuthor = () => {
    if (formData.name && formData.email && formData.orcidId) {
      const newCoAuthors = [...coAuthors, formData]
      setCoAuthors(newCoAuthors)
      onCoAuthorsChange(newCoAuthors)
      setFormData({ name: '', orcidId: '', email: '', affiliation: '' })
      setIsAdding(false)
    }
  }

  const handleRemoveCoAuthor = (index: number) => {
    const newCoAuthors = coAuthors.filter((_, i) => i !== index)
    setCoAuthors(newCoAuthors)
    onCoAuthorsChange(newCoAuthors)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {coAuthors.map((author, index) => (
          <div
            key={index}
            className="flex items-start justify-between rounded-lg bg-white/5 p-4 border border-white/10"
          >
            <div className="flex gap-3 min-w-0 flex-1">
              <User className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{author.name}</p>
                <p className="text-xs text-foreground/70">{author.email}</p>
                <p className="text-xs text-foreground/60">{author.orcidId}</p>
                {author.affiliation && (
                  <p className="text-xs text-foreground/60">{author.affiliation}</p>
                )}
              </div>
            </div>
            <button
              onClick={() => handleRemoveCoAuthor(index)}
              className="ml-2 inline-flex items-center text-foreground/60 transition-colors hover:text-rust flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {isAdding ? (
        <div className="space-y-3 rounded-lg bg-white/5 p-4 border border-white/10">
          <input
            type="text"
            placeholder="Co-author name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-xs border border-white/20 bg-white/5 px-3 py-2 text-sm text-foreground placeholder-foreground/50 transition-colors focus:border-gold focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full rounded-xs border border-white/20 bg-white/5 px-3 py-2 text-sm text-foreground placeholder-foreground/50 transition-colors focus:border-gold focus:outline-none"
          />
          <input
            type="text"
            placeholder="ORCID ID (e.g., 0000-0001-2345-6789)"
            value={formData.orcidId}
            onChange={(e) => setFormData({ ...formData, orcidId: e.target.value })}
            className="w-full rounded-xs border border-white/20 bg-white/5 px-3 py-2 text-sm text-foreground placeholder-foreground/50 transition-colors focus:border-gold focus:outline-none"
          />
          <input
            type="text"
            placeholder="Affiliation (optional)"
            value={formData.affiliation}
            onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
            className="w-full rounded-xs border border-white/20 bg-white/5 px-3 py-2 text-sm text-foreground placeholder-foreground/50 transition-colors focus:border-gold focus:outline-none"
          />
          <div className="flex gap-2">
            <button
              onClick={handleAddCoAuthor}
              className="flex-1 rounded-xs bg-gold px-3 py-2 text-sm font-semibold text-ink transition-colors hover:bg-gold-soft"
            >
              Add Co-Author
            </button>
            <button
              onClick={() => {
                setIsAdding(false)
                setFormData({ name: '', orcidId: '', email: '', affiliation: '' })
              }}
              className="flex-1 rounded-xs border border-white/20 px-3 py-2 text-sm font-medium transition-colors hover:border-white/40"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full rounded-xs border border-white/20 px-3 py-2.5 text-sm font-medium transition-colors hover:border-white/40 flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Co-Author
        </button>
      )}
    </div>
  )
}
