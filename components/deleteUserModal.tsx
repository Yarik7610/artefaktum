import { deleteUser } from "@/app/_actions/settingsActions"
import { SubmitFormBtn } from "./btns/submitFormBtn"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "./shadcn/alert-dialog"
import { Button } from "./shadcn/button"

export const DeleteUserModal = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" variant="destructive">
          Удалить аккаунт
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
          <AlertDialogDescription>
            Данное действие необратимо. Оно приведет к полному удалению вашего аккаунта с невозможностью восстановления
            данных.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отменить</AlertDialogCancel>
          <form action={deleteUser}>
            <SubmitFormBtn className="w-full min-w-[125px]">Продолжить</SubmitFormBtn>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
