# P-website 工作交接（HANDOFF）

> 最后更新：2026-06-15。本文件是「当前进行中工作」的快照，供新对话 / 接手者按需读取。
> 项目整体规范、设计语言、红线见 [CLAUDE.md](CLAUDE.md)，本文件不重复，只记当前状态与接手要点。

## 一句话

harry 的个人网站「网页版人格」，Astro 纯静态，漫画分镜风。代码全在 `site/`。
- 线上地址：https://fatmmouse.github.io/P-website/
- 开发预览：`npm --prefix site run dev`（端口 4321）
- 交付前必跑：`npm --prefix site run build`

## 已完成（v1，已 build 通过）

- **9 个页面**：首页 / 文章×4 / about / for-agents / projects / 404
  - 文章 = 3 篇小红书连载（`kind: serial`）+ 1 篇学术特别刊（`kind: essay`，《将军底头》拉康式分析）
  - 内容在 `site/src/content/posts/*.md`，schema 在 `site/src/content.config.ts`
- **设计系统**：`site/src/layouts/Base.astro`（纸面 / 噪点 / panel / 刊头 / 页脚 + 全局样式，用 `<style is:global>`）
- **标题字体 Smiley Sans 已 self-host**（`site/public/fonts/SmileySans-Oblique.woff2`，1.15MB）；**不要回 deno CDN**（301+2.4s 国内超时会让标题 fallback 成正体）
- **角色图已抠透明底**：`site/public/character/idle.webp`
- favicon（`site/public/favicon.svg`）+ og/twitter 分享 meta（在 Base.astro head）
- **Agent 层**：`/llms.txt`、每篇文章 `/posts/<id>.md` 纯文本端点、各页 JSON-LD
- **刊头 HARRY 描边已定稿 = 8 号「红块衬底反白」+ 方正不旋转**（固化在 Base.astro 的 `.brand h1`）
- **刊头 HARRY 红块内垂直居中已定稿**：line-height 1 + padding `4px 16px 2px`（固化在 Base.astro 的 `.brand h1`）
- **人物档案标题已定稿**：Harry（首字母大写）+ 7 号「水平串印」+ 3.3px 平移（固化在 about.astro 的 `.sheet h1`）；about 底部测评台已删除
- **GitHub Pages 自动部署**：`.github/workflows/deploy.yml`，main 分支 push 时自动构建部署
- **子路径 base 处理全站已改**：所有绝对路径使用 `import.meta.env.BASE_URL` 拼接，适配 `/P-website/`

## 进行中

目前无阻塞中的设计决策。剩余待办见下方。

## ⚠️ 已知坑（都踩过，务必记住）

1. **改 .astro 的 `<style>` 块后，dev server 的 HMR 不会注入新样式** → 必须重启 dev server（preview_stop + preview_start），否则样式看起来"没生效"。改样式后看不到效果，先重启再排查。
2. **Astro scoped `<style>` 的特异性 > `<style is:global>`**：scoped 选择器会被 Astro 加 `[data-astro-cid-*]` 属性，优先级压过 is:global。
   - 测评台最初「0–8 看起来都一样、7 号水平平移不出现」就是因为 `.sheet h1` 的 scoped 默认 `text-shadow` 盖掉了 is:global 各风格的 text-shadow。**已通过删掉那条 scoped 默认 text-shadow 修复**。
   - 教训：要被 is:global / 内联控件覆盖的属性，不要在 scoped style 里设默认值。

## 剩余待办（都阻塞在 harry，非本次重点）

- **表情状态图**：harry 按 `assets/character/PROMPTS.md` 生图 → 抠图（floodfill 边缘 + 形态学开运算）→ 接首页状态机
- **背景音乐**：calm / focus 两首免版权 lofi 放 `site/public/music/<mood>.mp3`（随身听播放器已就位，在文章页）
- **域名**：购买后更新 `site/astro.config.mjs` 的 `site` 字段并重新配置 Pages 自定义域名；迁移到根路径时需同步改 `base` 为 `/`

## 文件地图（关键）

| 路径 | 作用 |
|---|---|
| `site/src/layouts/Base.astro` | 设计系统 + 刊头（.brand h1 已定 8 号）+ 全局样式 + 字体 @font-face |
| `site/src/pages/index.astro` | 首页（分镜格、状态机、连载/特别刊列表） |
| `site/src/pages/about.astro` | 关于本人（人物档案标题 Harry + 7 号水平串印 3.3px，刊头垂直居中见 Base） |
| `site/src/pages/posts/[id].astro` | 文章阅读页（连载 + 特别刊，含随身听、脚注样式） |
| `site/src/content/posts/*.md` | 文章源（frontmatter: title/kind/episode/date/summary/note/mood） |
| `assets/character/PROMPTS.md` | 表情状态图生图提示词 |
