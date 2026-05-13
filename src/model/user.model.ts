import { prisma } from "@/lib/prisma";

const getUsers = async (currentPage: number, pageSize: number, published: boolean) => {
  const skip = (currentPage - 1) * pageSize;

  const [data, total] = await prisma.$transaction([
    prisma.user.findMany({
      where: { posts: { some: { published } } },
      skip,
      take: pageSize,
      include: {
        posts: {
          select: { id: true, title: true, published: true, createdAt: true, updatedAt: true },
          where: { published },
        },
      },
    }),
    prisma.user.count({
      where: { posts: { some: { published } } },
    }),
  ]);

  return {
    data,
    total,
    currentPage,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
};

export { getUsers };
