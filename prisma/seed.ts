import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Fræing á gagnagrunn...");

  await prisma.category.createMany({
    data: [
      { name: "HTML", slug: "html" },
      { name: "CSS", slug: "css" },
      { name: "JavaScript", slug: "javascript" },
    ],
    skipDuplicates: true, 
  });

  const categories = await prisma.category.findMany();
  const categoryMap = Object.fromEntries(categories.map((c) => [c.slug, c.id]));

  console.log("Category Map:", categoryMap);

  async function upsertQuiz(title: string, file: string, questions: any) {
    return prisma.quiz.upsert({
      where: { title },
      update: {},
      create: {
        title,
        file,
        questions: { create: questions },
      },
    });
  }

  async function addNewQuestions(quizTitle: string, newQuestions: any[]) {
    const existingQuiz = await prisma.quiz.findUnique({
      where: { title: quizTitle },
      include: { questions: true },
    });

    if (!existingQuiz) {
      console.log(`Quiz '${quizTitle}' not found, skipping update.`);
      return;
    }

    const existingQuestionContents = new Set(existingQuiz.questions.map((q) => q.content));

    const filteredQuestions = newQuestions.filter(
      (q) => !existingQuestionContents.has(q.content)
    );

    if (filteredQuestions.length === 0) {
      console.log(`No new questions to add for quiz: ${quizTitle}`);
      return;
    }

    await prisma.quiz.update({
      where: { title: quizTitle },
      data: {
        questions: { create: filteredQuestions },
      },
    });

    console.log(`Added ${filteredQuestions.length} new questions to quiz '${quizTitle}'`);
  }

  await addNewQuestions("Vefþróun Próf 1", [
    {
      content: "Hvað gerir `<em>` tagið í HTML?",
      categoryId: categoryMap["html"],
      answers: {
        create: [
          { content: "Gerir texta skáletraðan með merkingu.", correct: true },
          { content: "Gerir texta feitan.", correct: false },
          { content: "Býr til hlekk.", correct: false },
          { content: "Breytir leturgerð texta.", correct: false },
        ],
      },
    },
    {
      content: "Hvaða HTML tag er notað til að búa til óraðaðan lista?",
      categoryId: categoryMap["html"],
      answers: {
        create: [
          { content: "<ul>", correct: true },
          { content: "<ol>", correct: false },
          { content: "<li>", correct: false },
          { content: "<list>", correct: false },
        ],
      },
    },
  ]);

  await addNewQuestions("CSS Próf 1", [
    {
      content: "Hvað gerir `position: absolute;` í CSS?",
      categoryId: categoryMap["css"],
      answers: {
        create: [
          { content: "Staðsetur hlut miðað við næsta staðsetta foreldri.", correct: true },
          { content: "Lætur hlutinn festast efst á síðunni.", correct: false },
          { content: "Staðsetur hlut miðað við sjálfan sig.", correct: false },
          { content: "Bætir við bil á milli lína.", correct: false },
        ],
      },
    },
    {
      content: "Hvaða CSS eiginleiki er notaður til að breyta leturstærð?",
      categoryId: categoryMap["css"],
      answers: {
        create: [
          { content: "font-size", correct: true },
          { content: "text-size", correct: false },
          { content: "size", correct: false },
          { content: "font-style", correct: false },
        ],
      },
    },
  ]);

  await addNewQuestions("JavaScript Próf 1", [
    {
      content: "Hvað gerir `Array.prototype.filter()` í JavaScript?",
      categoryId: categoryMap["javascript"],
      answers: {
        create: [
          { content: "Býr til nýtt fylki með gildum sem uppfylla skilyrði.", correct: true },
          { content: "Breytir öllum gildum í fylki.", correct: false },
          { content: "Reiknar saman öll gildi í fylki.", correct: false },
          { content: "Fjarlægir tóma reiti í fylki.", correct: false },
        ],
      },
    },
    {
      content: "Hvernig getur þú lýst `const` í JavaScript?",
      categoryId: categoryMap["javascript"],
      answers: {
        create: [
          { content: "Býr til breytu sem ekki er hægt að endurskilgreina.", correct: true },
          { content: "Býr til breytu sem hægt er að breyta síðar.", correct: false },
          { content: "Býr til fast gildi sem hægt er að uppfæra.", correct: false },
          { content: "Gerir tilvísun til annað skjal.", correct: false },
        ],
      },
    },
  ]);

  console.log("Fræing á gagnagrunn lokið!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
