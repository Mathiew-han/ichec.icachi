# 部署到 https://chinese-chi.vercel.app/

本项目是 Next.js App Router（含 API 路由 + Supabase Auth/DB + Stripe Webhook）。要挂载在子路径 `/26/` 下，需要两部分：

1) 如果需要子路径（/26），应用使用 basePath  
2) 如果使用根路径（当前为 https://chinese-chi.vercel.app/），无需反向代理

## 1. 应用侧配置（basePath）

在生产环境设置环境变量（根路径部署）：

- `NEXT_PUBLIC_BASE_PATH=`（留空）
- `NEXT_PUBLIC_SITE_URL=https://chinese-chi.vercel.app`

然后构建/启动：

```bash
npm ci
npm run build
npm run start -- --port 3000
```

## 2. 如果需要挂载到 /26（可选）

假设 Next.js 运行在同机 `127.0.0.1:3000`。

```nginx
server {
  server_name 你的域名;

  # 访问 /26 时补全尾斜杠
  location = /26 {
    return 301 /26/;
  }

  location /26/ {
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    proxy_pass http://127.0.0.1:3000;
  }
}
```

说明：

- 由于应用 `basePath=/26`，反代时不要剥离 `/26` 前缀（直接透传即可）。
- Next.js 的静态资源和 API 路由都会自动落在 `/26/_next/*`、`/26/api/*`。

## 3. 关键检查点（根路径部署）

- 首页能打开：`https://chinese-chi.vercel.app/`
- 国际化路由正常：`https://chinese-chi.vercel.app/zh-CN`
- 登录页正常：`https://chinese-chi.vercel.app/zh-CN/auth`

## 4. 如果你使用 Vercel 托管 Next.js

Vercel 本身不提供“把同一站点挂载到别的域名的某个子路径”能力。常见做法是：

- Next.js 仍部署在 Vercel（例如 `https://your-app.vercel.app`）
- `ichec.icachi.org` 用 Nginx/网关把 `/26/*` 反代到 Vercel 的域名
- 同样需要 `NEXT_PUBLIC_BASE_PATH=/26`，并保持反代不剥离前缀
