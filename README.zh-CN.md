# Astro Notion Broadcast

这是一个基于 [Astro](https://astro.build/) 框架的静态站点生成器，可以将您的 Notion 数据库内容转换为精美的静态博客网站。

## 特性

- 🚀 基于 Astro 构建，性能优异
- 📝 从 Notion 数据库自动同步内容
- 🏷️ 支持分类和标签系统
- 🌓 内置暗/亮主题切换
- 📱 响应式设计，移动端友好
- 🖼️ 支持文章封面图和预览图
- 🔗 支持社交媒体链接分享
- 🔍 基于 LRU 缓存的高效数据获取
- 🎨 使用 Tailwind CSS 和 daisyUI 构建的现代 UI

## 快速开始

### Notion 数据库设置

您需要在 Notion 中创建一个具有以下属性的数据库：

```
`属性名`(类型): 功能描述
```

- `name` (标题): 文章标题
- `content` (文本): 文章内容 - 支持 md 格式富文本和代码高亮自动格式化
- `category` (选择): 文章分类
- `tags` (多选): 文章标签
- `url` (网址): 原始文章链接
- `created_at` (创建时间): 排序需要

> 你也可以通过复制 notion 模板: [Notion Broadcast Template](https://shard-pint-734.notion.site/1eb4be1c91708053803feeafaebd3c14?v=1eb4be1c9170802ea1e7000ce0f6f42f&pvs=4) 来快速创建你的 notion database.

### 前提条件

- Node.js 18+
- pnpm 10+
- [Notion API Key](https://www.notion.so/profile/integrations) 创建你的集成,然后将数据库与集成关联(数据库页面的点击右上角`...`,菜单选择集成,集成列表可以搜索到您创建的集成名称),[如果对这个步骤有困惑,请点击搜索](https://www.bing.com/search?q=how%20to%20create%20notion%20integration%20api%20key&qs=n&form=QBRE&sp=-1&lq=0&pq=&sc=20-0&sk=&cvid=EC135DD5C41040A08742FE5AE556B882)
- Notion 数据库 ID (位置在如下的 `{database_id}` )

```
https://www.notion.so/{workspace_name}/{database_id}?v={view_id}
```

### 安装

1. 从模板创建新仓库

```bash
# 使用 GitHub 模板仓库
# 点击 GitHub 仓库页面上的 "Use this template" 按钮
# 或访问 https://github.com/TransonQ/astro-notion-broadcast/generate
```

2. 克隆您的新仓库并进入目录

```bash
git clone https://github.com/yourusername/your-repository-name.git
cd your-repository-name
```

3. 安装依赖

```bash
pnpm install
```

4. 创建 `.env` 文件并添加以下内容：

```bash
# !NOTE : 在部署构建之前，请配置环境变量 NOTION_API_KEY 和 NOTION_DATABASE_ID
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_notion_database_id

PAGE_SIZE=20
SITE_TITLE=Your Blog Title
SITE_DESCRIPTION=Your blog description
COPYRIGHT=Your Name
EMAIL=your-email@example.com
# 可选的社交媒体链接
GITHUB=https://github.com/yourusername
TWITTER=https://twitter.com/yourusername
# 其他社交媒体链接...
```

5. 启动开发服务器

```bash
pnpm dev
```

6. 构建静态站点

```bash
pnpm build
```

## 自定义

### 主题

该项目使用 Tailwind CSS 和 daisyUI 进行样式设计。您可以修改 `src/styles/global.css` 文件自定义样式。

### 页面布局

页面布局定义在 `src/layouts` 目录中，您可以根据需要进行修改。

### 组件

所有UI组件都在 `src/components` 目录中，包含导航栏、文章卡片、分页等组件。

## 部署

构建完成后，您可以将 `dist` 目录部署到任何静态托管服务，例如 Vercel、Netlify 或 GitHub Pages。

注意: 因为本项目是完全静态生成的, 当 notion database 更新的时候需要自定义触发重新构建, 否则你的内容无法更新。

### 使用 GitHub Actions 自动触发重新构建

本项目已配置了 GitHub Actions 工作流程，可以定期触发 Vercel 部署钩子来重新构建您的网站，确保内容与 Notion 数据库保持同步。

#### 设置步骤：

1. 在 Vercel 获取部署钩子 (Deploy Hook)
   - 在 Vercel 项目设置中，导航至 "Git" 选项卡
   - 滚动到 "Deploy Hooks" 部分
   - 创建一个新的钩子并复制生成的 URL

2. 在 GitHub 仓库中设置 Secrets
   - 导航到仓库的 `Settings` → `Secrets and Variables` → `Actions`
   - 创建一个新的 Repository Secret
   - 名称设为 `VERCEL_DEPLOY_HOOK`，值为您在 Vercel 中复制的部署钩子 URL

3. 工作流程自动化
   - 项目已包含 `.github/workflows/notion-poll.yml` 文件，它配置了多个每日运行时间
   - 默认情况下，钩子将在 UTC 时间的 2:00、4:00、6:00、7:00、8:00、9:00、10:00、12:00、14:00 和 15:00 触发
   - 您可以根据需要修改 cron 表达式来调整触发时间

4. 手动触发
   - 您还可以在 GitHub 仓库的 "Actions" 标签页中手动触发工作流程
   - 找到名为 "Notion Polling Job" 的工作流程
   - 点击 "Run workflow" 按钮手动触发部署

通过这种方式，您的 Notion 数据库中的任何更新都将在每天的预定时间自动反映到您的网站上。

## 许可证

MIT 许可证

## 贡献

欢迎提交问题和拉取请求！
