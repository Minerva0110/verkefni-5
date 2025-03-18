import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Fræing á gagnagrunn...");

  // Búa til flokka
  await prisma.category.createMany({
    data: [
      { name: "HTML", slug: "html" },
      { name: "CSS", slug: "css" },
      { name: "JavaScript", slug: "javascript" },
    ],
    skipDuplicates: true,
  });

  // Sækja flokka og búa til kort til auðveldra leitunar
  const categories = await prisma.category.findMany();
  const categoryMap = Object.fromEntries(categories.map((c) => [c.slug, c.id]));

  console.log("Category Map:", categoryMap);

  if (!Object.keys(categoryMap).length) {
    throw new Error("Engir flokkar fundust! Athugaðu tenginguna við gagnagrunn.");
  }

  // Fræja Quizzes
  const quiz1 = await prisma.quiz.create({
    data: {
      title: "Vefþróun Próf 1",
      file: "web_dev_quiz_1.pdf",
      questions: {
        create: [
          {
            content: "Hvað gerir `<strong>` tagið í HTML?",
            categoryId: categoryMap["html"],
            answers: {
              create: [
                { content: "Gerir texta feitan með merkingu.", correct: true },
                { content: "Býr til stór fyrirsagnir.", correct: false },
                { content: "Gerir texta italíseraðan.", correct: false },
                { content: "Enginn af ofangreindum.", correct: false },
              ]
            },
          },
        ],
      },
    },
  });

  const quiz2 = await prisma.quiz.create({
    data: {
      title: "CSS Próf 1",
      file: "css_quiz_1.pdf", // Fyrirgefðu, það er aðeins sýndur staður
      questions: {
        create: [
          {
            content: "Hvaða CSS eiginleiki er notaður til að breyta bakgrunnslit vefsíðu?",
            categoryId: categoryMap["css"],
            answers: {
              create: [
                { content: "background-color", correct: true },
                { content: "color", correct: false },
                { content: "border-color", correct: false },
                { content: "none of the above", correct: false },
              ]
            },
          },
        ],
      },
    },
  });

  console.log("Fræjað quiz ID: ", quiz1.id, quiz2.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
