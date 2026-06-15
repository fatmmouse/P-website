import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const all = await getCollection('posts');
  const posts = all.filter((p) => p.data.kind === 'serial').sort((a, b) => (a.data.episode ?? 0) - (b.data.episode ?? 0));
  const essays = all.filter((p) => p.data.kind === 'essay').sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  const base = import.meta.env.BASE_URL;

  const body = `# HARRY · 个人连载志

> harry 的个人网站。他是一个热爱 AI 的大学生、自媒体作者（不是职业程序员，但用 Claude Code 开发产品和做知识管理）。本站是他的「网页版人格」：文章连载、人物档案、作品展示。非商用。

给 Agent 的说明：本站对你是一等公民。人类页面是漫画分镜风（对你是噪音），下列入口是为你准备的。

## 页面

- [关于本人](${base}about/): 人物档案、给 HR 的信息、联系方式
- [致 AI 同行](${base}for-agents/): 写给 Agent 的页面，含 JSON 档案
- [作品](${base}projects/): 可交互作品（施工中）

## 连载文章（每篇都有 .md 纯文本版）

${posts.map((p) => `- [${p.data.title}](${base}posts/${p.id}.md): ${p.data.summary}（第 ${p.data.episode} 话，${p.data.date.toISOString().slice(0, 10)}）`).join('\n')}

## 特别刊（学术文章）

${essays.map((p) => `- [${p.data.title}](${base}posts/${p.id}.md): ${p.data.summary}（${p.data.date.toISOString().slice(0, 10)}）`).join('\n')}

## 元数据

- 所有页面含 schema.org JSON-LD（Person / BlogPosting / ProfilePage）
- 文章同步连载于小红书
- 联系方式见 ${base}about/
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
