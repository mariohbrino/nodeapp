import { prisma } from "@/lib/prisma";

/**
 * Get a paginated list of posts, optionally filtered by published status.
 * @param currentPage number number of the current page
 * @param pageSize number number of posts per page
 * @param published boolean filter by published status
 * @param all boolean whether to include all posts or only published ones
 * @returns object containing the paginated list of posts, total count, and pagination info
 */
const getPosts = async (
  currentPage: number,
  pageSize: number,
  published: boolean,
  all: boolean = true,
): Promise<{
  data: Array<{ id: string; title: string; published: boolean; createdAt: Date; author: { id: string; name: string } }>;
  total: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
}> => {
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

/**
 * Get a single post by its ID, including the author's information.
 * @param id string ID of the post
 * @returns object containing the post's details and author's information, or null if not found
 */
const getPostById = async (
  id: string,
): Promise<{
  id: string;
  title: string;
  published: boolean;
  createdAt: Date;
  author: { id: string; name: string; email: string };
} | null> => {
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
