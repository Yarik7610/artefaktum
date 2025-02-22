"use client"
import { User } from "@prisma/client"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { FC, useCallback, useEffect, useState } from "react"
import { Avatar } from "../avatars/avatar"
import { buttonVariants } from "../shadcn/button"
import { Separator } from "../shadcn/separator"

interface MobileMenuProps {
  children: React.ReactNode
  user: User | null
}
export const MobileMenu: FC<MobileMenuProps> = ({ children, user }) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false)

  useEffect(() => {
    if (isMenuOpened) document.body.style.overflow = "hidden"
    else document.body.style.overflow = "initial"
  }, [isMenuOpened])

  const handleMenuClose = useCallback(() => {
    setIsMenuOpened(false)
  }, [])

  useEffect(() => {
    window.addEventListener("orientationchange", handleMenuClose)
    return () => window.removeEventListener("orientationchange", handleMenuClose)
  }, [])

  return (
    <>
      <button aria-label="burger-menu" className="block md:hidden" onClick={() => setIsMenuOpened(!isMenuOpened)}>
        {isMenuOpened ? <X /> : <Menu />}
      </button>
      {isMenuOpened && (
        <nav className="md:hidden w-full absolute top-[80px] left-0 bottom-0 right-0 z-50 bg-white border-t">
          <ul className="flex flex-col justify-center font-[500] text-gray-500 px-8">
            {!user ? (
              <li className="py-5">
                <Link className={buttonVariants({ variant: "default" })} href={"/sign-in"}>
                  Войти
                </Link>
              </li>
            ) : (
              <>
                <li className="py-5">
                  <Avatar src={user?.image} />
                  <p className="text-xl mt-5 font-bold text-primary truncate">{user?.name}</p>
                </li>
                <li className="py-2">
                  <Link href={"/creator"}>Создать коллекцию</Link>
                </li>
                <li className="py-2">
                  <Link href={`/author/${user?.id}`}>Мой профиль</Link>
                </li>
                <li className="py-2">
                  <Link href={"/collections"}>Коллекции</Link>
                </li>
                <li className="py-2">
                  <Link href={"/authors"}>Авторы</Link>
                </li>
                <li className="py-2">
                  <Separator />
                </li>
                <li className="py-2">
                  <Link href={"/settings"}>Настройки</Link>
                </li>
                <li className="py-2">{children}</li>
              </>
            )}
          </ul>
        </nav>
      )}
    </>
  )
}
