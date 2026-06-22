# DEPLOY.md — process-hub-site 部署文档

## 项目信息

- **类型**：静态前端（React + TypeScript + Vite + Tailwind v4）
- **域名**：process-hub.show360.win
- **端口**：80（容器内 Nginx）
- **数据**：无持久数据（纯静态网站）

## 构建

```bash
npm install
npx vite build
# 产出：dist/
```

## Docker

```bash
# 构建镜像
docker build -t process-hub-site .

# 本地测试
docker run -d -p 8080:80 --name ph-test process-hub-site
curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/
# → 200

# 清理
docker stop ph-test && docker rm ph-test
```

## 服务器部署

### 前置条件

- nginx:1.27-alpine 镜像已缓存（i9 manifest 确认可用）
- process-hub.show360.win DNS 已配置（CNAME → process-hub-site.show360.win 或 Cloudflare Tunnel 通配）

### 部署步骤

1. **同步配置**（i9 上）：
   ```bash
   cd /ai/platform
   git pull origin main
   ```

2. **克隆源码**（i9 上）：
   ```bash
   cd /home/markxu
   git clone https://github.com/xyj0694/process-hub-site.git
   # 或 git pull 如果已存在
   ```

3. **构建并启动**（i9 上）：
   ```bash
   cd /ai/demo-platform/projects/process-hub-site
   docker compose build --no-cache
   docker compose up -d
   ```

4. **重启 Traefik 加载新路由**（i9 上）：
   ```bash
   cd /ai/demo-platform
   docker compose restart traefik
   ```

5. **验证**：
   ```bash
   curl -s -o /dev/null -w "%{http_code}" https://process-hub.show360.win/
   # → 200
   ```

## 更新部署

```bash
# Mac 本地
cd /Users/markxu/dev/my/process-hub-site
# ... 修改代码 ...
npm run build        # npx vite build
git add -A && git commit -m "feat: ..." && git push

# i9 服务器
ssh markxu@ubuntu-home
cd /home/markxu/process-hub-site
git pull
cd /ai/demo-platform/projects/process-hub-site
docker compose up -d --build
```

## 配置文件位置

- Dockerfile：`/Users/markxu/dev/my/process-hub-site/Dockerfile`
- nginx.conf：`/Users/markxu/dev/my/process-hub-site/nginx.conf`
- docker-compose.yml：`/Users/markxu/dev/my/env-hub/platform/projects/process-hub-site/docker-compose.yml`
- dynamic.yml 路由：`/Users/markxu/dev/my/env-hub/platform/global/dynamic.yml` (process-hub 条目)
