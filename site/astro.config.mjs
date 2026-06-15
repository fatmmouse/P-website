import { defineConfig } from 'astro/config';

// GitHub Pages 默认域名。域名买好后改为真实域名并同步 JSON-LD / llms.txt 里的绝对链接。
export default defineConfig({
  site: 'https://fatmmouse.github.io',
  base: '/P-website/',
  // 关掉 Astro 自带的开发者工具栏：它默认钉在 dev 页面正中底部，会遮挡内容；
  // harry 不需要它，且它只在 dev 出现，生产环境本来就没有。
  devToolbar: { enabled: false },
});
