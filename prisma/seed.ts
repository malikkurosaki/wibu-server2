import prisma from "@/lib/prisma";
import loading from "loading-cli";

const listAdmin = ["6289697338821"];

(async () => {
  const log = loading("Seeding...").start();
  // seed admin
  for await (const item of listAdmin) {
    await prisma.user.upsert({
      where: {
        phone: item
      },
      create: {
        phone: item,
        role: "ADMIN"
      },
      update: {
        role: "ADMIN"
      }
    });
  }
  log.info(`Seeded Admin Successfully`);
})()
  .catch((err) => {
    console.log(err);
    process.exit();
  })
  .finally(() => {
    prisma.$disconnect();
    process.exit();
  });
