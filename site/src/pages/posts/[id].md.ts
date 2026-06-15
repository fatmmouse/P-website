import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('posts');
  return posts.map((post) => ({ params: { id: post.id }, props: { post } }));
};

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as { post: Awaited<ReturnType<typeof getCollection<'posts'>>>[number] };
  const base = import.meta.env.BASE_URL;

  const kindLabel = post.data.kind === 'essay' ? '特别刊（学术文章）' : `第 ${post.data.episode} 话 · 同步连载于小红书`;
  const note = post.data.note ? `\n> 编者按：${post.data.note}\n` : '';
  const body = `# ${post.data.title}

> 作者：harry · ${kindLabel} · ${post.data.date.toISOString().slice(0, 10)}
> 网页版：${base}posts/${post.id}/ · 全站导览：${base}llms.txt
${note}
${post.body ?? ''}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
