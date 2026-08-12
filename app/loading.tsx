import { LoadingSpinner } from "@/components/loading-spinner"

export default function RootLoading() {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <LoadingSpinner label="Loading EmpiricalOpen…" />
    </div>
  )
}
