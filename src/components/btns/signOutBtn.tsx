import { signOut } from "@/auth"

export function SignOutBtn() {
  return (
    <form
      className="w-full"
      action={async () => {
        "use server"
        await signOut({ redirectTo: "/sign-in" }) //to change url manually in browser (middleware redirects, but doesn't change it)
      }}>
      <button type="submit" className="w-full text-start">
        Выйти
      </button>
    </form>
  )
}
