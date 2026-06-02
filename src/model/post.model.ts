import { prisma } from "@/lib/prisma";

type Post = {
  id?: string;
  title: string;
  content: string;
  published: boolean;
  createdAt?: Date;
  authorId: string;
};

type PostUpdate = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  modifierId: string;
};

type ArticleDetails = {
  id: string;
  title: string;
  content?: string;
  published: boolean;
  createdAt: Date;
  author: { id: string; name: string; email?: string };
};

type ArticleList = {
  data: ArticleDetails[];
  total: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
};

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
): Promise<ArticleList> => {
  const skip = (currentPage - 1) * pageSize;

  const [data, total] = await prisma.$transaction([
    prisma.post.findMany({
      where: all ? {} : { published },
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
      include: {
        author: {
          select: { id: true, name: true },
        },
        _count: {
          select: { comments: true },
        },
      },
    }),
    prisma.post.count({
      where: all ? {} : { published },
    }),
  ]);

  return {
    data: data.map((post) => ({
      ...post,
    })),
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
const getPostById = async (id: string): Promise<ArticleDetails | null> => {
  return prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: { id: true, name: true, email: true },
      },
      comments: {
        select: { id: true, content: true, createdAt: true },
      },
    },
  });
};

/**
 * Create a new post with the given title, content, published status, and author ID.
 * @param input object containing the title, content, published status, and author ID
 * @returns object containing the newly created post's details
 */
const createPost = async (input: Post): Promise<Post> => {
  const { title, content, published, authorId } = input;
  return prisma.post.create({
    data: {
      title,
      content,
      published,
      authorId,
    },
  });
};

/**
 * Update an existing post with the given title, content, and published status.
 * @param input object containing the post ID, title, content, and published status
 * @returns object containing the updated post's details
 */
const updatePost = async (input: PostUpdate): Promise<Post> => {
  const { id, title, content, published } = input;
  return prisma.post.update({
    where: { id },
    data: {
      title,
      content,
      published,
    },
  });
};

/**
 * Delete a post by its ID.
 * @param input string ID of the post to delete
 * @returns object containing the deleted post's details
 */
const deletePost = async (input: { id: string }): Promise<Post> => {
  const { id } = input;
  return prisma.post.delete({
    where: { id },
  });
};

export { createPost, deletePost, getPostById, getPosts, updatePost };
