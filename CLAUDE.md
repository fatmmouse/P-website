# P-website — harry 的个人网站

## 项目定位

不是在线简历，是「harry 的网页版人格」。用途：① 简历附件（给 HR 和 HR 的 AI 看）② 沉淀自媒体文章 ③ 以后挂可交互作品。非商用。

**核心设计语言：反差。** 卡通形象是一张冷漠脸（Loud House 风格），但本人是甲亢状态——所以设计上让「小人保持冷漠，世界围着他疯狂地动」，不要把小人做活泼了。

## 已定决策（2026-06-13 对齐）

| 决策点 | 结论 |
|---|---|
| 技术栈 | Astro（内容驱动、纯静态、以后可嵌交互组件） |
| 受众/部署 | 已部署到 GitHub Pages（默认域名），国内外访问后续迁移到自有域名 + Cloudflare Pages / 腾讯 EdgeOne |
| 小人动画 | 表情状态机：AI 生图产出 6~10 个状态图，场景切换 + CSS 微动效（呼吸浮动等），不做补间，「啪」地切换保留漫画感 |
| 视觉风格 | 漫画分镜风：歪斜不一的分镜格、速度线、拟声词、对话气泡；先做小样定稿再搭整站 |
| Agent 可读 | llms.txt + 每页 .md 纯文本版 + JSON-LD（Person/Article）+ /for-agents 彩蛋页 |
| 背景音乐 | 免版权曲库（Pixabay Music 等）或 AI 生成 lofi 循环；读者主动点击播放，懒加载，单曲压缩 ≤1MB；文章 frontmatter 标 mood 配曲 |

## 目录结构约定

```
P-website/
├── CLAUDE.md          # 本文件，规范变更先改这里再改实践
├── HANDOFF.md         # 当前进行中工作的交接快照，按需读取（标题选型流程、已知坑、文件地图）
├── assets/            # 原始素材（角色原图等），不直接被网站引用
│   └── character/     # 小人状态图，命名：状态名.png（如 idle.png / shocked.png / typing.png）
├── Reference/         # 私密参考资料，【永不】进入网站内容或公开仓库
│   └── MyJournal/     # 日记，已在 .gitignore，只用于理解 harry 其人，红线见下
├── mockups/           # 风格小样（单文件 HTML），定稿后归档不删
└── site/              # Astro 工程，网站本体
    ├── src/content/posts/   # 文章（md + frontmatter：title/kind/episode/date/summary/note/mood）
    │                        #   kind: serial=小红书连载（episode 排话数）| essay=特别刊（学术长文，note 放编者按）
    ├── src/layouts/Base.astro  # 设计系统（纸面/噪点/panel/刊头/页脚），全局样式都在这
    ├── src/pages/           # index / about / for-agents / projects / 404 / llms.txt.ts / posts/
    └── public/              # character/ 状态图 web 版（webp）、posts/<id>/ 配图、music/<mood>.mp3
```

## 常用命令

- 开发预览：`npm --prefix site run dev`（端口 4321，路径带 `/P-website/`）
- 构建验证：`npm --prefix site run build`（交付前必跑）
- 线上地址：https://fatmmouse.github.io/P-website/

## 当前待办

- [ ] 表情状态图：harry 按 `assets/character/PROMPTS.md` 生图 → 抠图压缩进 public/character/ → 接进首页状态机（抠图脚本思路：floodfill 边缘背景 + 形态学开运算去噪，见 2026-06-13 会话）
- [ ] 背景音乐：选免版权曲目放 public/music/<mood>.mp3（calm / focus），随身听已就位
- [ ] 域名：购买后更新 `site/astro.config.mjs` 的 `site` 字段并重新配置 Pages 自定义域名
- [ ] harry 磁盘只剩 ~1.3GB，已挂存储分析任务

## 部署

- **平台**：GitHub Pages
- **工作流**：`.github/workflows/deploy.yml`（`withastro/action@v3`，main 分支 push 时自动部署）
- **当前线上地址**：https://fatmmouse.github.io/P-website/
- **base 路径**：`/P-website/`（仓库名）。所有绝对路径（字体、图片、导航、llms.txt、.md 端点）已改为 `\${import.meta.env.BASE_URL}` 拼接，避免子路径部署 404。
- 后续若迁移到自定义域名根路径，需把 `base` 改回 `/` 并重新检查全站路径。

## 已定的产品决策（除非 harry 反悔，不要恢复）

- 文章页**不放**小红书图文版截图画廊（2026-06-13 harry 拍板删除）
- 刊头 HARRY 描边已定稿 = 8 号「红块衬底反白」+ **方正不旋转**（2026-06-14）；固化在 Base.astro 的 .brand h1。twitch 关键帧基础帧必须 transform:none，不要塞 rotate（否则刊头静止时变斜）
- 刊头 HARRY 红块内垂直居中已定稿：line-height 1 + padding `4px 16px 2px`（2026-06-15）；固化在 Base.astro 的 .brand h1
- 人物档案标题（about 的 .sheet h1）已定稿 = **Harry**（首字母大写）+ 7 号「水平串印」+ **3.3px** 平移（2026-06-15）；固化在 about.astro 的 .sheet h1
- 标题印刷错位描边只用单红，不用红蓝双色
- 标题字体 Smiley Sans（得意黑）已 self-host 于 site/public/fonts/SmileySans-Oblique.woff2（1.15MB，得意黑 v2.0.1 的 ttf.woff2）；**不要改回 deno CDN**——那个 301+2.4s 国内常超时，会让标题 fallback 成正体「板正」。@font-face 必须同时声明 normal+italic 两条都指向这个斜体（否则 italic 兜底会触发二次合成倾斜变形）
- 角色图必须是抠好的透明底，不能是带底色的方图
- 学术文上网必须清掉学号/课程/任课教师信息，署名统一 harry（2026-06-13 论文上线时确立）

## 红线（违反 = 事故）

1. **日记（Reference/MyJournal）的任何内容、引文、细节，永不出现在网站、公开仓库、构建产物中。** 日记只用于帮助 AI 理解 harry 的气质来做设计判断。
2. 密钥、token 不进代码。
3. git push 等 harry 说了再推。

## 文章同步约定

- 文章源头：`../RedNote/xiaohongshu-tuwen/<标题>/源文.md`（+ 配图 01.png…）
- 同步进网站时：源文为准，网站版可加 frontmatter（date / mood / cover），不改正文。
- 暂为手动复制，文章多了之后再写同步脚本（重复 3 遍才自动化）。

## 验证习惯

- 改完跑 `npm --prefix site run build`（Astro 工程建好之后），本地预览确认再交付。
- 部署由 GitHub Actions 自动完成；push 到 main 后可在仓库 Actions 页查看进度。
