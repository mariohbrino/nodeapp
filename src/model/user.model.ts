import { prisma } from "@/lib/prisma";

const getUsers = async (currentPage: number, pageSize: number, published: boolean, all: boolean = true) => {
  const skip = (currentPage - 1) * pageSize;

  const [data, total] = await prisma.$transaction([
    prisma.user.findMany({
      where: all ? {} : { posts: { some: { published } } },
      skip,
      take: pageSize,
      include: {
        _count: { select: { posts: { where: { published: true } } } },
      },
    }),
    prisma.user.count({
      where: all ? {} : { posts: { some: { published } } },
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

const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    include: {
      posts: {
        select: { id: true, title: true, published: true, createdAt: true },
      },
    },
  });
};

export { getUserById, getUsers };
