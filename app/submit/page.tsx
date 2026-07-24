'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FileDropzone } from '@/components/author/file-dropzone'
import { CoAuthorInput } from '@/components/author/co-author-input'
import { journalsDetail, disciplines } from '@/lib/journals-data'
import { ArrowRight, ArrowLeft, CheckCircle, Home } from 'lucide-react'

const STEPS = [
  { id: 1, title: 'Basic Info', description: 'Title and abstract' },
  { id: 2, title: 'Metadata', description: 'Discipline and keywords' },
  { id: 3, title: 'Target Journals', description: 'Select journals' },
  { id: 4, title: 'Authors', description: 'Add co-authors' },
  { id: 5, title: 'Files', description: 'Upload manuscript' },
]

interface FormData {
  title: string
  abstract: string
  keywords: string
  discipline: string
  targetJournals: string[]
  coAuthors: Array<{ name: string; orcidId: string; email: string; affiliation: string }>
  files: File[]
}

export default function SubmitManuscript() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    title: '',
    abstract: '',
    keywords: '',
    discipline: '',
    targetJournals: [],
    coAuthors: [],
    files: [],
  })

  const handleNextStep = () => {
    if (step < STEPS.length) setStep(step + 1)
  }

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleJournalToggle = (journalId: string) => {
    setFormData((prev) => ({
      ...prev,
      targetJournals: prev.targetJournals.includes(journalId)
        ? prev.targetJournals.filter((j) => j !== journalId)
        : [...prev.targetJournals, journalId],
    }))
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.title.trim().length > 0 && formData.abstract.trim().length > 0
      case 2:
        return formData.discipline && formData.keywords.trim().length > 0
      case 3:
        return formData.targetJournals.length > 0
      case 4:
        return true // Optional co-authors
      case 5:
        return formData.files.length > 0
      default:
        return false
    }
  }

  const handleSubmit = () => {
    console.log('[v0] Submitting manuscript:', formData)
    // In a real app, this would send data to the backend
    alert('Manuscript submitted successfully!')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-white/10 bg-paper">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-4">
          <h1 className="font-serif text-xl font-semibold text-foreground">
            Submit Manuscript
          </h1>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xs border border-white/20 px-3 py-2 text-sm transition-colors hover:border-white/40"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[1180px] px-6 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Step Indicator */}
          <div className="lg:col-span-1">
            <div className="sticky top-12 space-y-3">
              {STEPS.map((s, index) => {
                const isCurrentStep = s.id === step
                const isCompleted = s.id < step
                const isUpcoming = s.id > step

                return (
                  <div key={s.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                          isCurrentStep
                            ? 'bg-gold text-ink'
                            : isCompleted
                              ? 'bg-jade text-ink'
                              : 'bg-white/10 text-foreground/60'
                        }`}
                      >
                        {isCompleted ? <CheckCircle className="h-4 w-4" /> : s.id}
                      </div>
                      {index < STEPS.length - 1 && (
                        <div
                          className={`my-1 h-8 w-0.5 ${
                            isCurrentStep || isCompleted
                              ? 'bg-gold'
                              : 'bg-white/10'
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p
                        className={`text-sm font-semibold transition-colors ${
                          isCurrentStep ? 'text-gold' : 'text-foreground'
                        }`}
                      >
                        {s.title}
                      </p>
                      <p className="text-xs text-foreground/60">{s.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Form Content */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-white/10 bg-paper-raised p-8">
              {/* Step 1: Basic Info */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Manuscript Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="Enter your manuscript title"
                      className="w-full rounded-xs border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder-foreground/50 transition-colors focus:border-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Abstract *
                    </label>
                    <textarea
                      value={formData.abstract}
                      onChange={(e) =>
                        setFormData({ ...formData, abstract: e.target.value })
                      }
                      placeholder="Write a clear and concise abstract (250-350 words recommended)"
                      rows={6}
                      className="w-full rounded-xs border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder-foreground/50 transition-colors focus:border-gold focus:outline-none resize-none"
                    />
                    <p className="mt-2 text-xs text-foreground/60">
                      Characters: {formData.abstract.length}
                    </p>
                  </div>
                </div>
              )}

              {/* Step 2: Metadata */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Primary Discipline *
                    </label>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {disciplines.map((disc) => (
                        <label
                          key={disc}
                          className="flex items-center gap-3 rounded-xs border border-white/20 bg-white/5 p-3 cursor-pointer transition-colors hover:border-gold/40 hover:bg-white/10"
                        >
                          <input
                            type="radio"
                            name="discipline"
                            value={disc}
                            checked={formData.discipline === disc}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                discipline: e.target.value,
                              })
                            }
                            className="h-4 w-4 accent-gold"
                          />
                          <span className="text-sm font-medium">{disc}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Keywords *
                    </label>
                    <input
                      type="text"
                      value={formData.keywords}
                      onChange={(e) =>
                        setFormData({ ...formData, keywords: e.target.value })
                      }
                      placeholder="Separate keywords with commas (e.g., climate change, malaria, epidemiology)"
                      className="w-full rounded-xs border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder-foreground/50 transition-colors focus:border-gold focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Target Journals */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Select Target Journal(s) *
                    </label>
                    <div className="space-y-2">
                      {journalsDetail.map((journal) => (
                        <label
                          key={journal.id}
                          className="flex items-start gap-3 rounded-xs border border-white/20 bg-white/5 p-3 cursor-pointer transition-colors hover:border-gold/40 hover:bg-white/10"
                        >
                          <input
                            type="checkbox"
                            checked={formData.targetJournals.includes(journal.id)}
                            onChange={() => handleJournalToggle(journal.id)}
                            className="h-4 w-4 mt-0.5 accent-gold flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">
                              {journal.name}
                            </p>
                            <p className="text-xs text-foreground/60">
                              {journal.discipline}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Authors */}
              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-4 text-sm font-medium text-foreground">
                      Co-Authors (Optional)
                    </h3>
                    <CoAuthorInput
                      onCoAuthorsChange={(coAuthors) =>
                        setFormData({ ...formData, coAuthors })
                      }
                    />
                  </div>
                </div>
              )}

              {/* Step 5: Files */}
              {step === 5 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-4 text-sm font-medium text-foreground">
                      Upload Manuscript *
                    </h3>
                    <FileDropzone
                      onFilesSelected={(files) =>
                        setFormData({ ...formData, files })
                      }
                      maxFiles={3}
                      acceptedTypes={['.pdf', '.docx', '.doc']}
                    />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-8 flex gap-3">
                {step > 1 && (
                  <button
                    onClick={handlePrevStep}
                    className="flex items-center gap-2 rounded-xs border border-white/20 px-6 py-2.5 text-sm font-medium transition-colors hover:border-white/40"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Previous
                  </button>
                )}
                {step < STEPS.length ? (
                  <button
                    onClick={handleNextStep}
                    disabled={!isStepValid()}
                    className="ml-auto flex items-center gap-2 rounded-xs bg-gold px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-gold-soft disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="ml-auto flex items-center gap-2 rounded-xs bg-gold px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-gold-soft"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Submit Manuscript
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
