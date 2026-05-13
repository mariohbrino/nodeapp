import { prisma } from "@/lib/prisma";

// Seed database with some dummy data
const main = async () => {
  // Create a new user with a post
  const alice = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      name: "Alice",
      email: "alice@prisma.io",
      posts: {
        create: [
          {
            title: "Alice's first post",
            content: "Hello World! This is my first post.",
            published: true,
          },
          {
            title: "Alice's second post",
            content: "Hello again! This is my second post.",
            published: false,
          },
          {
            title: "Alice's third post",
            content: "Hello once more! This is my third post.",
            published: true,
          },
        ],
      },
    },
    include: {
      posts: true,
    },
  });

  // Create a new user with a posts
  const bob = await prisma.user.upsert({
    where: { email: "bob@prisma.io" },
    update: {},
    create: {
      email: "bob@prisma.io",
      name: "Bob",
      posts: {
        create: [
          {
            title: "Bob's first post",
            content: "Hello World! This is Bob's first post.",
            published: true,
          },
          {
            title: "Bob's second post",
            content: "Hello again! This is Bob's second post.",
            published: true,
          },
        ],
      },
    },
    include: {
      posts: true,
    },
  });
  console.log("User created:", bob);
  console.log("User created:", alice);
};

await main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
