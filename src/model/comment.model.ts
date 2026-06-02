import { prisma } from "@/lib/prisma";

type Comment = {
  id?: string;
  content: string;
  postId: string;
  createdAt?: Date;
};

const createComment = async (input: Comment): Promise<Comment> => {
  const { content, postId } = input;
  return prisma.comment.create({
    data: {
      content,
      postId,
    },
  });
};

export { createComment };
