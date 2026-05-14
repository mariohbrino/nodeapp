import { prisma } from "@/lib/prisma";

const getPosts = async (currentPage: number, pageSize: number, published: boolean, all: boolean = true) => {
  const skip = (currentPage - 1) * pageSize;

  const [data, total] = await prisma.$transaction([
    prisma.post.findMany({
      where: all ? {} : { published },
      skip,
      take: pageSize,
      include: {
        author: {
          select: { id: true, name: true },
        },
      },
    }),
    prisma.post.count({
      where: all ? {} : { published },
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

const getPostById = async (id: string) => {
  return prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: { id: true, name: true, email: true },
      },
    },
  });
};

export { getPostById, getPosts };
