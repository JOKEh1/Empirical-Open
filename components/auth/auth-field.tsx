"use client"

import { useState } from "react"
import type { LucideIcon } from "lucide-react"
import { AlertCircle, Check, Eye, EyeOff } from "lucide-react"

export function AuthField({
  id,
  label,
  type = "text",
  icon: Icon,
  value,
  onChange,
  placeholder,
  autoComplete,
  error,
  valid,
  hint,
  required,
}: {
  id: string
  label: string
  type?: string
  icon: LucideIcon
  value: string
  onChange: (value: string) => void
  placeholder?: string
  autoComplete?: string
  error?: string
  valid?: boolean
  hint?: string
  required?: boolean
}) {
  const [show, setShow] = useState(false)
  const isPassword = type === "password"
  const inputType = isPassword && show ? "text" : type

  const stateRing = error
    ? "border-rust/70 focus-within:border-rust focus-within:ring-rust/30"
    : valid
      ? "border-jade/60 focus-within:border-jade focus-within:ring-jade/30"
      : "border-white/15 focus-within:border-gold focus-within:ring-gold/30"

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[13px] font-medium text-paper-raised/85">
        {label}
        {required && <span className="ml-0.5 text-gold-soft">*</span>}
      </label>

      <div
        className={`flex items-center gap-2.5 rounded-xs border bg-white/5 px-3 transition-all focus-within:ring-2 ${stateRing}`}
      >
        <Icon className="size-4 shrink-0 text-paper-raised/50" aria-hidden="true" />
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className="w-full bg-transparent py-2.5 text-[15px] text-paper-raised outline-none placeholder:text-paper-raised/35"
        />
        {isPassword ? (
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            className="shrink-0 text-paper-raised/50 transition-colors hover:text-paper-raised"
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        ) : valid ? (
          <Check className="size-4 shrink-0 text-jade" aria-hidden="true" />
        ) : null}
      </div>

      {error ? (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-xs text-rust">
          <AlertCircle className="size-3.5 shrink-0" />
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-paper-raised/50">
          {hint}
        </p>
      ) : null}
    </div>
  )
}
