# 启动命令（复制到终端即可）

## 启动前后端（Next.js + API 路由）

```powershell
powershell -ExecutionPolicy Bypass -File .\terminal-start.ps1 -Port 3001
```

打开：

- http://localhost:3001/
- http://localhost:3001/zh-CN

## 启动前后端 + Stripe Webhook 转发（可选）

需要先安装并登录 Stripe CLI。

```powershell
powershell -ExecutionPolicy Bypass -File .\terminal-start.ps1 -Port 3001 -WithStripeWebhook
```

