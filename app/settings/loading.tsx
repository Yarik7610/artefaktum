import { Preloader } from "@/components/prealoder"

export default function SettingsPageLoading() {
  return (
    <main className="py-10 flex items-center justify-center h-[calc(100vh-80px)]">
      <Preloader />
    </main>
  )
}
