# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).


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

当前使用 history 路由，GitHub Pages 不提供 SPA 路由重写，直接访问或刷新
`/blog` 等子路径仍可能返回 404；这与首页空白问题是独立问题。
