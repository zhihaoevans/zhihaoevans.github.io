# xzh · Dev Notes

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
