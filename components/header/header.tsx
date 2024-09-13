import { getUserBySession } from "@/services/user"
import Link from "next/link"
import { Avatar } from "../avatars/avatar"
import { SignOutBtn } from "../btns/signOutBtn"
import { buttonVariants } from "../shadcn/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../shadcn/dropdown-menu"
import { MobileMenu } from "./mobileMenu"

export const Header = async () => {
  const user = await getUserBySession()

  return (
    <header className="h-[80px] px-8 flex justify-between items-center max-w-[1920px] mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold">
        <Link href={"/"}>Колли</Link>
      </h1>
      <nav className="hidden md:block">
        <ul className="flex items-center justify-center space-x-16 font-medium text-gray-500">
          <li className="transition-colors hover:text-primary">
            <Link href={"/collections"}>Коллекции</Link>
          </li>
          <li className="transition-colors hover:text-primary">
            <Link href={"/authors"}>Авторы</Link>
          </li>
          <li className="z-10">
            {!user ? (
              <Link className={buttonVariants({ variant: "default" })} href={"/sign-in"}>
                Войти
              </Link>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger aria-label="Dropdown button" className="rounded-full ">
                  <Avatar src={user?.image} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link className="w-full" href={"/creator"}>
                      Создать коллекцию
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link className="w-full" href={`/author/${user?.id}`}>
                      Мой профиль
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link className="w-full" href={"/settings"}>
                      Настройки
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SignOutBtn />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </li>
        </ul>
      </nav>
      <MobileMenu user={user}>
        <SignOutBtn />
      </MobileMenu>
    </header>
  )
}
