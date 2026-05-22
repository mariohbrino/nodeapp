import type { User } from "@/generated/prisma/browser";
import { prisma } from "@/lib/prisma";

/**
 * Get a paginated list of users, optionally filtered by published posts.
 * @param currentPage number number of the current page
 * @param pageSize number number of users per page
 * @param published boolean filter by published posts
 * @param all boolean whether to include all users or only those with published posts
 * @returns object containing the paginated list of users, total count, and pagination info
 */
const getUsers = async (
  currentPage: number,
  pageSize: number,
  published: boolean,
  all: boolean = true,
): Promise<{
  data: Array<User & { _count: { posts: number } }>;
  total: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
}> => {
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

/** Get a user by their ID, including their published posts.
 * @param id string ID of the user
 * @returns object containing the user and their published posts, or null if not found
 */
const getUserById = async (
  id: string,
): Promise<(User & { posts: Array<{ id: string; title: string; published: boolean; createdAt: Date }> }) | null> => {
  return prisma.user.findUnique({
    where: { id },
    include: {
      posts: {
        select: { id: true, title: true, published: true, createdAt: true },
      },
    },
  });
};

/** Get the first user in the database.
 * @returns object containing the first user, or null if no users exist
 */
const getFirstUser = async (): Promise<User | null> => {
  return prisma.user.findFirst();
};

export { getFirstUser, getUserById, getUsers };
