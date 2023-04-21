import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';
import './polyfill';

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000'
    })
  ]
});

const main = async () => {
  const posts = await trpc.list.query();

  console.log('Posts:', posts);

  const createdPost = await trpc.create.mutate({
    postId: 5,
    title: 'Hello world',
    body: 'Olá Mundo'
  });

  console.log('Created post:', createdPost);

  const post = await trpc.load.query(1);

  console.log('Found post', post);
};

main();
