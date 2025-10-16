# 📦 Vercel 部署文件清单

## ✅ 需要上传到 GitHub 的文件（共 36 个）

Vercel 会从 GitHub 仓库自动部署，所以需要先把这些文件推送到 GitHub。

### 📋 配置文件（7 个）
```
✓ .gitignore               (Git 忽略规则)
✓ .gitattributes          (Git 属性)
✓ package.json            (依赖配置)
✓ package-lock.json       (依赖锁定)
✓ vite.config.js          (Vite 构建配置)
✓ vercel.json             (Vercel 部署配置)
✓ index.html              (HTML 入口)
```

### 📁 源代码 - 入口文件（4 个）
```
✓ src/main.jsx            (React 入口)
✓ src/App.jsx             (主应用)
✓ src/App.css             (主样式)
✓ src/index.css           (全局样式)
```

### 🔧 服务配置（1 个）
```
✓ src/services/supabase.js    (Supabase 配置 - 包含 API 密钥)
```

### 🎨 UI 组件（18 个）

#### PatientSelector（患者选择器）
```
✓ src/components/PatientSelector/PatientSelector.jsx
✓ src/components/PatientSelector/PatientSelector.css
```

#### VideoStream（视频流）
```
✓ src/components/VideoStream/VideoStream.jsx
✓ src/components/VideoStream/VideoStream.css
```

#### PatientMetrics（患者指标）
```
✓ src/components/PatientMetrics/PatientMetrics.jsx
✓ src/components/PatientMetrics/PatientMetrics.css
```

#### LiveSession（实时会话 - 旧版，可选）
```
✓ src/components/LiveSession/LiveSession.jsx
✓ src/components/LiveSession/LiveSession.css
```

#### HistoricalCharts（历史图表）
```
✓ src/components/HistoricalCharts/HistoricalCharts.jsx
✓ src/components/HistoricalCharts/HistoricalCharts.css
```

#### DoctorNotes（医生备注）
```
✓ src/components/DoctorNotes/DoctorNotes.jsx
✓ src/components/DoctorNotes/DoctorNotes.css
```

#### RecoveryMetrics（恢复指标）
```
✓ src/components/RecoveryMetrics/RecoveryMetrics.jsx
✓ src/components/RecoveryMetrics/RecoveryMetrics.css
```

#### DataEntry（数据录入）
```
✓ src/components/DataEntry/DataEntry.jsx
✓ src/components/DataEntry/DataEntry.css
```

### 📚 文档文件（6 个 - 可选但推荐）
```
✓ README.md                    (项目说明)
✓ QUICK-START.md              (快速开始)
✓ DEPLOYMENT.md               (部署指南)
✓ GITHUB-DEPLOY.md            (GitHub 部署)
✓ 项目总结.md                 (中文总结)
✓ 测试数据说明.md             (数据说明)
✓ 新布局说明.md               (布局说明)
✓ Vercel部署文件清单.md       (本文件)
```

### 🗄️ 数据库文件（2 个 - 参考用）
```
✓ supabase-setup.sql          (数据库初始化脚本)
✓ SQL-SETUP-INSTRUCTIONS.txt  (SQL 执行说明)
```

---

## ❌ 不需要上传的文件/文件夹

这些文件已在 `.gitignore` 中配置，**不会**被上传到 GitHub/Vercel：

```
❌ node_modules/          (约 300MB，Vercel 会自动安装)
❌ dist/                  (构建产物，Vercel 自动生成)
❌ .vercel/               (Vercel 本地配置)
❌ .env                   (环境变量，如果有的话)
❌ .DS_Store              (Mac 系统文件)
❌ *.log                  (日志文件)
```

---

## 🚀 部署流程

### 步骤 1️⃣：上传到 GitHub

```bash
# 进入项目目录
cd c:\Users\Jacks\新建文件夹\pt-assessment-simulator

# 初始化 Git
git init

# 添加所有文件（.gitignore 会自动排除不需要的）
git add .

# 提交
git commit -m "Initial commit: PT Assessment Simulator with video monitoring"

# 连接 GitHub 仓库（替换 YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/pt-assessment-simulator.git
git branch -M main

# 推送到 GitHub
git push -u origin main
```

### 步骤 2️⃣：Vercel 自动部署

#### 方法 A：通过 Vercel Dashboard（推荐）

1. 访问 https://vercel.com
2. 用 GitHub 账号登录
3. 点击 **"Add New" → "Project"**
4. 选择 `pt-assessment-simulator` 仓库
5. 点击 **"Import"**
6. Vercel 自动检测配置：
   ```
   Framework Preset:  Vite
   Build Command:     npm run build
   Output Directory:  dist
   Install Command:   npm install
   ```
7. 点击 **"Deploy"**
8. 等待 2-3 分钟
9. 获取部署链接！

#### 方法 B：通过 Vercel CLI

```bash
# 确保已登录
vercel login

# 部署到生产环境
vercel --yes --prod
```

---

## 📊 上传文件统计

| 类别 | 数量 | 大小估算 |
|------|------|---------|
| 配置文件 | 7 | ~50 KB |
| 源代码 | 23 | ~150 KB |
| 文档 | 8 | ~100 KB |
| 数据库脚本 | 2 | ~20 KB |
| **总计** | **40** | **~320 KB** |

**对比**：
- ✅ 上传文件：~320 KB
- ❌ 不上传 node_modules：~300 MB

**节省空间：99.9%！**

---

## ✅ 验证上传内容

### 检查哪些文件会被上传

```bash
# 查看 Git 追踪的文件
git ls-files

# 查看将要提交的文件
git status
```

### 确认 .gitignore 生效

```bash
# 查看被忽略的文件
git status --ignored
```

应该看到：
```
Ignored files:
  node_modules/
  dist/
  .vercel/
```

---

## 🔧 Vercel 自动执行的操作

当您推送代码到 GitHub 后，Vercel 会自动：

1. ✅ **克隆仓库**：从 GitHub 拉取代码
2. ✅ **安装依赖**：运行 `npm install`（根据 package.json）
3. ✅ **构建项目**：运行 `npm run build`（生成 dist/ 文件夹）
4. ✅ **部署到 CDN**：将 dist/ 内容分发到全球节点
5. ✅ **生成 URL**：提供分享链接

---

## 🎯 关键文件说明

### 必须正确配置的文件

#### 1. `package.json`
```json
{
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",    // Vercel 会执行这个
    "preview": "vite preview"
  }
}
```

#### 2. `vite.config.js`
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

#### 3. `vercel.json`（可选，但推荐）
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

#### 4. `src/services/supabase.js`（包含 API 配置）
```javascript
const supabaseUrl = 'https://nhdnjgozjcbdrarwliwg.supabase.co'
const supabaseAnonKey = 'eyJhbGci...'  // 您的 API 密钥
```
**注意**：这个文件必须上传，因为它包含 Supabase 连接信息

---

## 🔒 安全注意事项

### ✅ 可以公开的信息（已在代码中）
- Supabase URL
- Supabase Anon/Public Key（只读权限）

### ❌ 不应公开的信息
- Supabase Service Role Key（如果有的话）
- 私人环境变量

**当前配置**：使用的是 Anon Key，可以安全公开。

---

## 📱 部署后的 URL 结构

Vercel 会生成以下 URL：

```
生产环境：
https://pt-assessment-simulator.vercel.app

或带随机后缀：
https://pt-assessment-simulator-xxxxx.vercel.app

预览环境（每次推送都生成）：
https://pt-assessment-simulator-git-main-yourname.vercel.app
```

---

## 🔄 后续更新流程

修改代码后：

```bash
# 1. 提交更改
git add .
git commit -m "Update: 描述你的修改"

# 2. 推送到 GitHub
git push

# 3. Vercel 自动重新部署（无需手动操作）
```

---

## 🆘 常见问题

### ❓ Q1: 是否需要上传 node_modules？
**A**: ❌ 不需要！`.gitignore` 已排除，Vercel 会自动安装。

### ❓ Q2: 是否需要上传 dist 文件夹？
**A**: ❌ 不需要！Vercel 会自动运行 `npm run build` 生成。

### ❓ Q3: Supabase 密钥是否安全？
**A**: ✅ 使用的是 Anon Key（公开的），有 Row Level Security 保护。

### ❓ Q4: 如何更新部署？
**A**: 只需 `git push`，Vercel 自动重新部署。

### ❓ Q5: 部署失败怎么办？
**A**: 
1. 检查 Vercel 部署日志
2. 确认 `package.json` 的 scripts 正确
3. 本地运行 `npm run build` 测试

---

## ✅ 快速检查清单

部署前确认：

- [ ] 所有源代码文件已保存
- [ ] `package.json` 包含正确的 scripts
- [ ] `src/services/supabase.js` 配置正确
- [ ] `.gitignore` 存在并排除 node_modules
- [ ] 本地可以运行 `npm run build` 成功
- [ ] Supabase SQL 脚本已执行
- [ ] 代码已推送到 GitHub
- [ ] Vercel 已连接 GitHub 仓库

---

## 🎉 总结

**需要上传的**：
- ✅ 所有源代码（src/ 文件夹）
- ✅ 配置文件（package.json, vite.config.js 等）
- ✅ 入口文件（index.html）
- ✅ 文档（可选）

**不需要上传的**：
- ❌ node_modules/
- ❌ dist/
- ❌ .vercel/

**上传方式**：
1. Git push 到 GitHub
2. Vercel 从 GitHub 自动部署

**文件大小**：~320 KB（不含 node_modules）

---

**准备好了吗？开始部署吧！** 🚀
