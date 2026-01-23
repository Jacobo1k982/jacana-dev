import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const newUser = await prisma.user.create({
        data: {
            name: "Ryan",
            email: "askmecr@gmail.com"
        },
    });
    console.log(newUser);
}

main()

