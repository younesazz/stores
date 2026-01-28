"use client"

export default function ThemeToggle() {
  const toggle = () => {
    document.documentElement.classList.toggle("dark")
  }

  return (
    <button
      onClick={toggle}
      className="rounded-lg border px-3 py-1 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
    >
      🌙
    </button>
  )
}
