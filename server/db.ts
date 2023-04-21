export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

// Mock database
const posts: Post[] = [];

export const db = {
  post: {
    findMany: async () => posts,
    findById: async (id: Post['id']) => posts.find((post) => post.id === id),
    create: async (data: Omit<Post, 'id'>) => {
      const post = { id: Math.floor(Math.random() * 1e10), ...data };
      posts.push(post);
      return post;
    }
  }
};
