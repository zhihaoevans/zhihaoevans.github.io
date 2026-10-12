# Mike · Dev Notes

个人开发者网站，展示 Linux / C++ 工程方向、公开仓库与技术笔记。

- 网站：https://zhihaoevans.github.io/
- 项目展示：https://zhihaoevans.github.io/#/projects
- 关于：https://zhihaoevans.github.io/#/about
- 技术栈：Vue 3、TypeScript、Vite、Tailwind CSS

## 本地开发

```bash
npm ci
npm run dev
npm run build
npm run preview
```

## 内容维护

- `public/data/profile.json`：个人介绍与技能；未知经历、学历和联系方式不填写。
- `public/data/projects.json`：公开仓库与项目链接。
- `public/data/articles.json`：文章列表及正文；已有正文直接读取，无正文时加载 `public/articles/<slug>.md`。
- 技能 `level`、项目日期和演示链接可以省略；不显示无依据的百分比与日期。

## GitHub Pages 部署

本项目部署到 https://zhihaoevans.github.io/，Vite 的 `base` 保持 `/`。

在仓库 **Settings → Pages → Build and deployment → Source** 中选择
**GitHub Actions**，然后合并部署工作流的修改。工作流检查类型、构建并上传
`dist`，仅在 `main` 推送或手动运行时部署；PR 只构建，不发布。
部署使用 GitHub 提供的 `GITHUB_TOKEN`，不再需要 `PERSONAL_TOKEN`。
不要把 `zhihaoevans.github.io` 配置为自定义域名，也不要继续发布 `main` 根目录。
旧的 `gh-pages` 分支和 `npm run deploy` 不属于此部署流程。

空白页排查：线上 HTML 应引用 `/assets/*.js`，而不是 `/src/main.ts`。
发布源码会使浏览器因 TypeScript 的 MIME 类型拒绝执行入口。
在 Actions 中确认部署成功后，检查首页、JS/CSS 请求和浏览器控制台。
本地验证：`npm ci && npm run build`，然后 `npm run preview`。

使用 hash 路由，例如 `/#/projects` 和 `/#/blog`，以支持 GitHub Pages 上直接访问、刷新和分享子页面。

## 页面与主题

- 首页展示工程方向、精选项目与技术笔记。
- 明暗切换位于导航栏；首次跟随系统主题，手动选择后存入浏览器本地存储。
- 子页面按需加载，使用 hash 路由兼容 GitHub Pages。
- 样式集中在 [src/style.css](src/style.css)，主题行为见 [useTheme.ts](src/composables/useTheme.ts)。

## 开发入口

| 位置 | 用途 |
| --- | --- |
| [HomeView.vue](src/views/HomeView.vue) | 首页内容与布局 |
| [NavBar.vue](src/components/NavBar.vue) | 导航与主题按钮 |
| [页面目录](src/views/) | 项目、博客、文章与关于页面 |
| [路由](src/router/index.ts) | 页面路径与按需加载 |
| [数据加载](src/composables/useData.ts) | JSON 内容与文章正文读取 |
| [部署工作流](.github/workflows/deploy.yml) | 类型检查、构建与 GitHub Pages 发布 |

建议本地使用与 CI 一致的 Node.js 22。提交前运行 `npm run build`，并检查浅色、深色、子页刷新以及窄屏布局；`npm run check` 可单独检查类型。
