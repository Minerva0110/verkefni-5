import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

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

  if (!Object.keys(categoryMap).length) {
    throw new Error("No categories found! Check database connection.");
  }

  for (const question of [
    {
      content: "Hvað gerir `<strong>` tag í HTML?",
      categoryId: categoryMap["html"],
      answers: [
        { content: "Gerir texta feitletraðan með merkingarfræðilegu gildi.", correct: true },
        { content: "Býr til stóran fyrirsagnatexta.", correct: false },
        { content: "Gerir texta skáletraðan.", correct: false },
        { content: "Engin af ofangreindum valkostum er rétt.", correct: false },
      ],
    },
    {
      content: "Hvaða CSS eign er notuð til að breyta bakgrunnslit á vefsíðu?",
      categoryId: categoryMap["css"],
      answers: [
        { content: "background-color", correct: true },
        { content: "color", correct: false },
        { content: "border-color", correct: false },
        { content: "background-image", correct: false },
      ],
    },
    {
      content: "Hvaða JavaScript aðgerð er notuð til að búa til nýtt fylki sem byggir á gögnum úr öðru fylki?",
      categoryId: categoryMap["javascript"],
      answers: [
        { content: "map()", correct: true },
        { content: "filter()", correct: false },
        { content: "reduce()", correct: false },
        { content: "forEach()", correct: false },
      ],
    },
    {
      content: "Hvað gerir `z-index` í CSS?",
      categoryId: categoryMap["css"],
      answers: [
        { content: "Stjórnar hversu langt fram eða aftur element birtist.", correct: true },
        { content: "Stillir hversu þykkt border á elementi er.", correct: false },
        { content: "Breytir stærð texta.", correct: false },
        { content: "Setur mynd á bakgrunninn.", correct: false },
      ],
    },
    {
      content: "Hvernig getur þú breytt texta inni í HTML elementi með JavaScript?",
      categoryId: categoryMap["javascript"],
      answers: [
        { content: "document.getElementById('id').innerText = 'Nýr texti';", correct: true },
        { content: "document.querySelector('id').text = 'Nýr texti';", correct: false },
        { content: "document.getElementByClass('id').value = 'Nýr texti';", correct: false },
        { content: "window.alert('Nýr texti');", correct: false },
      ],
    },
  ]) {
    await prisma.question.create({
      data: {
        content: question.content,
        categoryId: question.categoryId,
        answers: {
          create: question.answers,
        },
      },
    });
  }

}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
