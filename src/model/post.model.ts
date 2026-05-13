import { prisma } from "@/lib/prisma";

const getPosts = async (currentPage: number, pageSize: number, published: boolean) => {
  const skip = (currentPage - 1) * pageSize;

  const [data, total] = await prisma.$transaction([
    prisma.post.findMany({
      where: { published },
      skip,
      take: pageSize,
      include: {
        author: {
          select: { id: true, name: true },
        },
      },
    }),
    prisma.post.count({
      where: { published },
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

export { getPosts };
