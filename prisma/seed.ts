import { writeCollectionFilesToFolderAndDB } from "@/services/collection"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import { promises as fs } from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"

const prisma = new PrismaClient()

const MOCK_COLLECTION_IMAGE_NAME = "defaultUserImage512x512.png"
const MOCK_COLLECTION_IMAGE_PATH = path.join(process.cwd(), "public", MOCK_COLLECTION_IMAGE_NAME)

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

  const users = []
  const passwordHash = await bcrypt.hash("12345", 10)

  for (let i = 1; i <= 20; i++) {
    const email = `user${i}@example.com`
    const user = await prisma.user.create({
      data: {
        email: email,
        password: passwordHash,
        email_verified: true,
        name: `User ${i}`,
        collections_amount: 0,
        average_rating: 0
      }
    })
    users.push(user)
  }

  for (const user of users) {
    for (let j = 1; j <= 5; j++) {
      const tagId = Math.floor(Math.random() * 20) + 1

      const collection = await prisma.collection.create({
        data: {
          user_id: user.id,
          name: `Collection ${j} of ${user.name}`,
          description: `Description for collection ${j} by ${user.name}`,
          tag_id: tagId,
          average_rating: 0,
          rating_count: 0
        }
      })

      const imageId = uuidv4()

      const fileBuffer = await fs.readFile(MOCK_COLLECTION_IMAGE_PATH)
      const file = new File([fileBuffer], MOCK_COLLECTION_IMAGE_NAME, {
        type: "image/png",
        lastModified: Date.now()
      })

      const extendedFile = {
        file: file,
        id: imageId
      }

      await writeCollectionFilesToFolderAndDB([extendedFile], collection.id)

      await prisma.user.update({
        where: { id: user.id },
        data: {
          collections_amount: { increment: 1 }
        }
      })
    }
  }
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
