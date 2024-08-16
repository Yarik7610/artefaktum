import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
  const tags = [
    { label: "Другое" },
    { label: "Винные бутылки" },
    { label: "Монеты" },
    { label: "Марки" },
    { label: "Почтовые открытки" },
    { label: "Виниловые пластинки" },
    { label: "Игрушки" },
    { label: "Фигурки" },
    { label: "Антиквариат" },
    { label: "Комиксы" },
    { label: "Ножи и мечи" },
    { label: "Часы" },
    { label: "Книги" },
    { label: "Ювелирные изделия" },
    { label: "Ретро техника" },
    { label: "Картины" },
    { label: "Банкноты" },
    { label: "Военные артефакты" },
    { label: "Спортивные сувениры" },
    { label: "Этикетки" }
  ]

  await prisma.tag.createMany({
    data: tags
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
