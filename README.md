# P-website

harry 的个人网站——「网页版人格」。

不是在线简历，而是一个内容驱动的个人连载志：AI、注意力、自我管理，以及偶尔掉出来的学术长文。设计上是漫画分镜风，核心反差是「小人保持冷漠，世界围着他疯狂地动」。

**线上地址**：https://fatmmouse.github.io/P-website/

## 当前状态

- 9 个页面已上线：首页 / 文章×4 / about / for-agents / projects / 404
- 人物档案标题定稿：`Harry` + 7 号水平串印 + 3.3px 平移
- 刊头 HARRY 定稿：8 号红块衬底反白，垂直居中 `padding: 4px 16px 2px`
- 底部测评台已删除，样式已固化进代码

## 技术栈

- [Astro](https://astro.build/) —— 内容驱动、纯静态、未来可嵌交互组件
- 自托管标题字体「得意黑 Smiley Sans」
- 部署在 GitHub Pages（默认域名），后续可能迁移到自有域名 + Cloudflare Pages / 腾讯 EdgeOne

## 本地开发

```bash
# 安装依赖（已在 site/ 子目录内）
npm --prefix site install

# 开发预览（端口 4321）
npm --prefix site run dev

# 构建验证（交付前必跑）
npm --prefix site run build
```

## 目录结构

```
P-website/
├── README.md          # 本文件（项目概览、线上地址、快速开始）
├── CLAUDE.md          # 本地 AI 指令文件（不进入公开仓库）
├── HANDOFF.md         # 当前工作交接快照
├── .claude/skills/    # 本地 AI skills（不进入公开仓库）
├── Reference/         # 私密参考资料（日记等），永不进入公开仓库
├── assets/            # 原始素材（角色原图等）
├── mockups/           # 风格小样 HTML
└── site/              # Astro 工程
    ├── src/content/posts/   # 文章（md + frontmatter）
    ├── src/layouts/         # 布局与设计系统
    ├── src/pages/           # 页面路由
    └── public/              # 静态资源（字体、角色图、favicon）
```

## 发布文章

最简方式：直接对 AI 说：

```
发布文章 /Users/fatmmouse/RedNote/xiaohongshu-tuwen/<标题>/源文.md
```

AI 会自动推断 frontmatter、复制配图、build 验证，然后等你确认后 push 部署。

如果想手动控制，完整流程是：

1. 从 `../RedNote/xiaohongshu-tuwen/<标题>/源文.md` 复制正文
2. 在 `site/src/content/posts/` 新建 `.md` 文件
3. 添加 frontmatter：
   ```yaml
   ---
   title: 文章标题
   kind: serial        # serial=小红书连载 | essay=特别刊（学术长文）
   episode: 3          # serial 必填，按话数递增
   date: 2026-06-15
   summary: 一句话摘要
   mood: focus         # calm / focus / lofi
   note: 编者按        # essay 可选
   cover: /posts/<slug>/cover.webp  # 可选
   ---
   ```
4. 不改正文
5. 跑 `npm --prefix site run build` 验证
6. push 到 `main` 分支，GitHub Actions 会自动部署

### frontmatter 字段

| 字段 | 必填 | 说明 |
|---|---|---|
| `title` | ✅ | 文章标题 |
| `kind` | ✅ | `serial`=小红书连载，`essay`=学术特别刊 |
| `date` | ✅ | 发布日期，格式 `YYYY-MM-DD` |
| `summary` | ✅ | 一句话摘要 |
| `mood` | ✅ | `calm` / `focus` / `lofi`，未来匹配背景音乐 |
| `episode` | serial 必填 | 连载话数，按整数递增 |
| `note` | 可选 | 编者按，`essay` 常用 |
| `cover` | 可选 | 封面图路径 |

## 部署

- 工作流：`.github/workflows/deploy.yml`
- 触发：push 到 `main` 分支
- 当前 base 路径：`/P-website/`（仓库名）。全站绝对路径使用 `import.meta.env.BASE_URL` 拼接，避免子路径 404。
- 后续若迁移到自定义域名根路径，需把 `site/astro.config.mjs` 的 `base` 改回 `/` 并重新检查全站路径。

## 红线

- `Reference/MyJournal/` 日记内容**永不**进入网站、公开仓库或构建产物。
- 密钥、token、密码不进代码。
- 学术文上网前清掉学号/课程/任课教师信息，署名统一 `harry`。

## 待办

- 表情状态图：按 `assets/character/PROMPTS.md` 生图并接入首页状态机
- 背景音乐：`site/public/music/<mood>.mp3`（calm / focus）
- 域名：购买后迁移到自有域名 + Cloudflare Pages / 腾讯 EdgeOne

## License

非商用个人项目。
