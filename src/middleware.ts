import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { DEFAULT_LOGIN_REDIRECT } from "./lib/constants"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isAuthenticated = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) return //don't do any action, allow next steps

  if (isAuthenticated && isAuthRoute) return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl.origin))
  if (!isAuthenticated && isAuthRoute) return

  if (!isAuthenticated && !isPublicRoute) return Response.redirect(new URL("/sign-in", nextUrl.origin))

  return
})

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)"
  ]
}

const publicRoutes = ["/", "/verificate-email", "/reset", "/new-password"]
const authRoutes = ["/sign-in", "/sign-up"]
const apiAuthPrefix = "/api/auth"
