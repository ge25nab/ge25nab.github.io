# 部署说明

本站只有一套 GitHub Pages 部署。`master` 或 `main` 有新提交后，`.github/workflows/deploy-static.yml` 会构建静态文件，将 `out/` 发布到 `gh-pages` 分支。GitHub Pages 再把该分支内容发布到 `https://xingcheng-zhou.com/`。

## GitHub 仓库设置

在 **Settings → Pages** 中确认：

- **Source**：Deploy from a branch
- **Branch**：`gh-pages`，目录 `/(root)`
- **Custom domain**：`xingcheng-zhou.com`
- **Enforce HTTPS**：开启

工作流使用 `peaceiris/actions-gh-pages` 向 `gh-pages` 分支发布，因此这里的 Source 需要选择分支，不是 GitHub Actions。

## 发布更新

将改动提交并推送到 `master`（或 `main`）。随后查看仓库的 **Actions → Build and Deploy**，确认 `build` 和 `deploy` 都成功；再确认 **pages build and deployment** 成功。站点通常会在几分钟内更新，不需要手动上传文件或修改 DNS。

`https://ge25nab.github.io/` 会指向同一个站点；设置了自定义域名后，它通常会重定向到 `https://xingcheng-zhou.com/`，并不是第二套独立部署。

本地构建可使用 `NEXT_PUBLIC_BASE_URL=https://xingcheng-zhou.com npm run build`。输出在 `out/`，推送源代码后由工作流重新构建；本地 `out/` 不提交到仓库。

如果部署失败，先查看失败步骤。若部署成功但线上仍是旧版，再核对 Pages 设置、浏览器缓存和自定义域名的 DNS。
