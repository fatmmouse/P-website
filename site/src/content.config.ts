import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    // serial = 小红书连载（按 episode 排话数）；essay = 特别刊（学术长文等，不占话数）
    kind: z.enum(['serial', 'essay']).default('serial'),
    episode: z.number().optional(),
    date: z.coerce.date(),
    summary: z.string(),
    // 编者按（可选），渲染在文章开头
    note: z.string().optional(),
    // 配乐心情，对应 public/music/<mood>.mp3（曲目待选）
    mood: z.string().default('lofi'),
  }),
});

export const collections = { posts };
