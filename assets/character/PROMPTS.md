# 表情状态图 · 生图提示词

> 用法：打开即梦 / nano banana（Gemini 图像生成）等支持「参考图 + 提示词」的工具，
> **每次都上传原图 `assets/loud-house-square.png` 作为角色参考**，然后粘贴对应提示词。
> 生成后存到本目录，文件名按下表（小写英文）。我（Claude）后续会压缩成 web 版放进网站。

## 验收标准（每张都要满足）

- 角色和原图是同一个人：黑色齐刘海中长发、黑框方眼镜、黑西装外套 + 白色内搭、黑裤黑鞋、脸上有雀斑
- Loud House 卡通风格：粗黑描边、扁平上色
- 底色为米白纸色（接近 #efebe0），无其他背景元素
- 全身像、正方形构图
- **表情管理**：除了 excited / dancing 两张，其余都保持冷漠脸（半睁眼、面无表情）——冷漠是人设

## 核心提示词（每条前面都加这段）

```
The Loud House cartoon style, full body character, young man with black chin-length hair and straight bangs, black rectangular glasses, half-lidded sleepy eyes, deadpan expression, freckles, black suit jacket over white shirt, black pants and shoes, thick black outlines, flat colors, plain cream paper background (#efebe0), square composition, consistent with the reference image
```

## 状态清单

| 文件名 | 用途 | 在核心提示词后追加 |
|---|---|---|
| idle.png | 首页默认（已有，即原图） | — |
| stare.png | 被鼠标点到：瞪你 | eyes wide open suddenly, startled but still unimpressed, leaning back slightly, one eyebrow raised |
| typing.png | 施工/作品页：敲键盘 | sitting at a small desk, typing on a laptop, same deadpan face, tiny motion lines near hands |
| thinking.png | 文章页：思考 | sitting and reading a book, one hand on chin, thoughtful but expressionless |
| excited.png | 彩蛋/甲亢时刻 | arms raised high, huge open-mouth grin, sparkling eyes, jumping, energetic action lines around him（这张要彻底破功，反差越大越好） |
| climbing.png | 状态格：攀岩 | rock climbing on a bouldering wall, gripping colorful holds, still deadpan face |
| dancing.png | 状态格：popping | doing a popping dance freeze pose, dynamic angles, confident smirk |
| coffee.png | 状态格：咖啡馆写日记 | sitting at a cafe table, holding a coffee cup, writing in a small notebook, calm |
| running.png | 状态格：江边跑步 | jogging with earphones in, slight sweat drop, deadpan face, small motion lines |
| sleeping.png | 404 / 深夜彩蛋 | standing but asleep, eyes closed, a small "Zzz" floating above his head, slightly tilted posture |

## 生成技巧

1. 一次生成一张，不满意就重抽——重点盯「眼镜形状」和「发型」，最容易跑偏
2. 如果工具支持「角色一致性 / Character reference」模式，务必开启
3. 生成尺寸选 1:1，1024×1024 以上
4. 全部生成完不用自己压缩，直接丢进本目录跟我说一声
