import { AvatarForm } from "@/components/avatarForm"
import { BigAvatar } from "@/components/avatars/bigAvatar"
import { DeleteUserModal } from "@/components/deleteUserModal"
import { SettingsInfo } from "@/components/settingsInfo/settingsInfo"
import { getAcceptableExtensions } from "@/lib/utils"
import { allowedAvatarImageExtensions } from "@/lib/zodSchemas"
import { getUserBySession } from "@/services/user"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Настройки",
  description: "Страница настроек автора"
}

export default async function SettingsPage() {
  const acceptableExtensions = getAcceptableExtensions(allowedAvatarImageExtensions)

  const user = await getUserBySession()

  return (
    <main className="w-[85%] py-10 mx-auto">
      <div className="flex flex-col-reverse xl:flex-row justify-between pb-10 gap-10">
        <section className="xl:w-[65%]">
          <SettingsInfo user={user} />
        </section>
        <section className="xl:w-[35%] flex flex-col gap-5 items-center">
          <BigAvatar src={user?.image} />
          <p className="mb-2 text-center">
            Допустимые расширения: <span className="text-gray-500">{acceptableExtensions}</span>
          </p>
          <AvatarForm acceptableExtensions={acceptableExtensions} />
        </section>
      </div>
      <DeleteUserModal />
    </main>
  )
}
