# Astro Notion Broadcast

[中文](/README.zh-CN.md)

A static site generator based on [Astro](https://astro.build/) framework that transforms your Notion database content into an elegant static blog website.

## Features

- 🚀 Built on Astro for excellent performance
- 📝 Automatic content synchronization from Notion database
- 🏷️ Support for category and tag systems
- 🌓 Built-in dark/light theme toggle
- 📱 Responsive design, mobile-friendly
- 🖼️ Support for article cover images and preview images
- 🔗 Social media sharing links
- 🔍 Efficient data fetching with LRU cache
- 🎨 Modern UI built with Tailwind CSS and daisyUI

## Quick Start

### Notion Database Setup

You need to create a database in Notion with the following properties:

```
`[property_key]`([Type]): description
```

- `name` (Title): title
- `content` (Text): content - supports rich text in Markdown format and automatic code syntax highlighting.
- `category` (Select): category
- `tags` (Multi-select): tags
- `url` (URL): Original article link
- `created_at` (Creation Time): Sorted

> You can quickly create your Notion database by duplicating the Notion template: [Notion Broadcast Template](https://shard-pint-734.notion.site/1eb4be1c91708053803feeafaebd3c14?v=1eb4be1c9170802ea1e7000ce0f6f42f&pvs=4).

### Prerequisites

- Node.js 18+
- pnpm 10+
- [Notion API Key](https://www.notion.so/profile/integrations)
  Create your integration, then associate it with your database (on the database page, click the `...` in the top-right corner, select "Integrations" from the menu, and search for the name of the integration you created). [need help? search in google](https://www.google.com/search?q=how%20to%20create%20notion%20integration%20api%20key)
- Notion Database ID

```
https://www.notion.so/{workspace_name}/{database_id}?v={view_id}
```

### Installation

1. Create a new repository from this template

```bash
# Use the GitHub template repository
# Click on "Use this template" button on the GitHub repository page
# or navigate to https://github.com/TransonQ/astro-notion-broadcast/generate
```

2. Clone your new repository and navigate into the directory

```bash
git clone https://github.com/yourusername/your-repository-name.git
cd your-repository-name
```

3. Install dependencies

```bash
pnpm install
```

4. Create a `.env` file and add the following content:

```bash
# !NOTE: Before deploying the build, configure the NOTION_API_KEY and NOTION_DATABASE_ID
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_notion_database_id

PAGE_SIZE=20
SITE_TITLE=Your Blog Title
SITE_DESCRIPTION=Your blog description
COPYRIGHT=Your Name
EMAIL=your-email@example.com
# Optional social media links
GITHUB=https://github.com/yourusername
TWITTER=https://twitter.com/yourusername
# Other social media links...
```

5. Start the development server

```bash
pnpm dev
```

6. Build the static site

```bash
pnpm build
```

## Customization

### Theme

This project uses Tailwind CSS and daisyUI for styling. You can modify the `src/styles/global.css` file to customize styles.

### Page Layouts

Page layouts are defined in the `src/layouts` directory, and you can modify them as needed.

### Components

All UI components are located in the `src/components` directory, including navigation bar, article cards, pagination, and more.

## Deployment

After building, you can deploy the `dist` directory to any static hosting service such as Vercel, Netlify, or GitHub Pages.

Note: Because this project is completely statically generated, you must manually trigger a rebuild when the Notion database is updated; otherwise, your content will not be refreshed.

### Using GitHub Actions for Automatic Rebuild Triggers

This project has been configured with GitHub Actions workflows that can periodically trigger Vercel deployment hooks to rebuild your site, ensuring that content stays synchronized with your Notion database.

#### Setup Steps:

1. Get a deploy hook from Vercel
   - Navigate to the "Git" tab in your Vercel project settings
   - Scroll down to the "Deploy Hooks" section
   - Create a new hook and copy the generated URL

2. Set up Secrets in your GitHub repository
   - Navigate to your repository's `Settings` → `Secrets and Variables` → `Actions`
   - Create a new Repository Secret
   - Name it `VERCEL_DEPLOY_HOOK` and set its value to the deploy hook URL you copied from Vercel

3. Workflow Automation
   - The project already includes a `.github/workflows/notion-poll.yml` file that configures multiple daily run times
   - By default, the hook will trigger at 2:00, 4:00, 6:00, 7:00, 8:00, 9:00, 10:00, 12:00, 14:00, and 15:00 UTC
   - You can modify the cron expressions to adjust the trigger times as needed

4. Manual Triggering
   - You can also manually trigger the workflow from the "Actions" tab in your GitHub repository
   - Find the workflow named "Notion Polling Job"
   - Click the "Run workflow" button to manually trigger a deployment

With this setup, any updates to your Notion database will automatically be reflected on your website at the scheduled times each day.

## License

[License type in LICENSE file]

## Contributing

Issues and pull requests are welcome!
