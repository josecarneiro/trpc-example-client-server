import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { db } from './db';
import { publicProcedure, router } from './trpc';

const appRouter = router({
  list: publicProcedure.query(async () => {
    const posts = await db.post.findMany();
    return posts;
  }),
  load: publicProcedure
    .input((value: unknown): any => {
      return value as any;
    })
    .query(async (opts) => {
      const { input } = opts;
      const post = await db.post.findById(input);
      return post;
    }),
  create: publicProcedure
    .input((value: unknown): any => {
      return value as any;
    })
    .mutation(async (opts) => {
      const { input } = opts;
      const post = await db.post.create(input);
      return post;
    })
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter
});

server.listen(3000);
