import Todos from "@/components/todo/Todos/Todos"

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto w-full max-w-2xl px-6 py-12">
        <Todos />
      </div>
    </main>
  )
}