require("dotenv/config")

const { PrismaClient } = require("@prisma/client")
const { PrismaSQLiteAdapter } = require("@prisma/adapter-sqlite")

const adapter = new PrismaSQLiteAdapter({
    url: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({ adapter })

async function main() {
    const result = await prisma.$queryRaw`SELECT 1`
    console.log(result)
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
