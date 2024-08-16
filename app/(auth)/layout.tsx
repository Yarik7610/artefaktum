export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <main className="h-[calc(100vh-80px)] flex items-center w-[80%] md:w-[400px] mx-auto">{children}</main>
}
