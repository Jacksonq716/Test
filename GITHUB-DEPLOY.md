# 🚀 GitHub 上传和部署完整指南

## 📦 需要上传到 GitHub 的文件

### ✅ 必须上传的文件和文件夹

```
pt-assessment-simulator/
├── src/                          ✓ 所有源代码
│   ├── components/               ✓ 所有组件
│   ├── services/                 ✓ Supabase 配置
│   ├── App.jsx                   ✓
│   ├── App.css                   ✓
│   ├── main.jsx                  ✓
│   └── index.css                 ✓
├── public/                       ✓ 如果有的话
├── index.html                    ✓ 入口 HTML
├── package.json                  ✓ 依赖配置
├── package-lock.json             ✓ 锁定依赖版本
├── vite.config.js                ✓ Vite 配置
├── vercel.json                   ✓ Vercel 部署配置
├── .gitignore                    ✓ Git 忽略文件
├── .gitattributes                ✓ Git 属性配置
├── README.md                     ✓ 项目说明
├── QUICK-START.md                ✓ 快速开始指南
├── DEPLOYMENT.md                 ✓ 部署指南
├── 项目总结.md                   ✓ 中文文档
├── 测试数据说明.md               ✓ 数据说明
└── supabase-setup.sql            ✓ 数据库脚本
```

### ❌ 不要上传的文件/文件夹（已在 .gitignore 中）

```
❌ node_modules/        (依赖包，太大，会自动安装)
❌ dist/                (构建产物，部署时自动生成)
❌ .vercel/             (Vercel 本地配置)
❌ .env                 (环境变量，包含敏感信息)
❌ .DS_Store            (Mac 系统文件)
```

---

## 🔧 Git 初始化和上传步骤

### 方法 1️⃣：使用命令行（推荐）

#### 步骤 1：初始化 Git 仓库

```bash
# 进入项目目录
cd c:\Users\Jacks\新建文件夹\pt-assessment-simulator

# 初始化 Git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: PT Assessment Simulator"
```

#### 步骤 2：创建 GitHub 仓库

1. 访问 https://github.com
2. 点击右上角 **"+"** → **"New repository"**
3. 填写信息：
   - **Repository name**: `pt-assessment-simulator`
   - **Description**: `Physical Therapist Assessment Simulator - Real-time patient monitoring dashboard`
   - **Public** 或 **Private**（选择 Public 方便分享）
   - ❌ **不要勾选** "Add a README file"（我们已经有了）
4. 点击 **"Create repository"**

#### 步骤 3：连接并推送到 GitHub

```bash
# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/pt-assessment-simulator.git

# 重命名分支为 main
git branch -M main

# 推送到 GitHub
git push -u origin main
```

#### 完整命令示例：

```bash
cd c:\Users\Jacks\新建文件夹\pt-assessment-simulator
git init
git add .
git commit -m "Initial commit: PT Assessment Simulator with Supabase integration"
git remote add origin https://github.com/YOUR_USERNAME/pt-assessment-simulator.git
git branch -M main
git push -u origin main
```

---

### 方法 2️⃣：使用 GitHub Desktop（图形界面）

#### 步骤 1：下载 GitHub Desktop

1. 访问 https://desktop.github.com/
2. 下载并安装
3. 登录你的 GitHub 账号

#### 步骤 2：添加项目

1. 打开 GitHub Desktop
2. 点击 **File** → **Add Local Repository**
3. 选择路径：`c:\Users\Jacks\新建文件夹\pt-assessment-simulator`
4. 如果提示 "not a git repository"，点击 **Create a repository**

#### 步骤 3：提交并发布

1. 在左下角填写提交信息：
   - **Summary**: `Initial commit`
   - **Description**: `PT Assessment Simulator with real-time sync`
2. 点击 **Commit to main**
3. 点击顶部的 **Publish repository**
4. 选择 **Public** 或 **Private**
5. 点击 **Publish Repository**

---

## 🚀 从 GitHub 部署到 Vercel

### 方法 A：通过 Vercel Dashboard（最简单）

#### 步骤 1：准备工作

✅ 确保代码已推送到 GitHub  
✅ 确保 Supabase SQL 脚本已执行

#### 步骤 2：连接 Vercel

1. 访问 https://vercel.com
2. 点击 **Login** 并使用 GitHub 账号登录
3. 授权 Vercel 访问你的 GitHub

#### 步骤 3：导入项目

1. 点击 **Add New** → **Project**
2. 在 **Import Git Repository** 中找到 `pt-assessment-simulator`
3. 点击 **Import**

#### 步骤 4：配置部署

Vercel 会自动检测到 Vite 项目，配置如下：

```
Framework Preset:  Vite         (自动检测)
Root Directory:    ./            (保持默认)
Build Command:     npm run build (自动填充)
Output Directory:  dist          (自动填充)
Install Command:   npm install   (自动填充)
```

**⚠️ 重要**：不需要添加环境变量（Supabase URL 和 Key 已写在代码中）

#### 步骤 5：部署

1. 点击 **Deploy**
2. 等待 2-3 分钟构建完成
3. 看到 "🎉 Congratulations!" 表示成功

#### 步骤 6：获取链接

部署成功后会显示：
```
✅ https://pt-assessment-simulator.vercel.app
```

或类似：
```
✅ https://pt-assessment-simulator-xxxxx.vercel.app
```

**复制这个链接即可分享！** 🎉

---

### 方法 B：通过 Vercel CLI（命令行）

如果你已经登录了 Vercel CLI：

```bash
# 进入项目目录
cd c:\Users\Jacks\新建文件夹\pt-assessment-simulator

# 连接 GitHub 仓库后部署
vercel --prod

# 如果是首次部署，会询问：
# Set up and deploy? → Yes
# Which scope? → 选择你的账号
# Link to existing project? → No
# Project name? → 回车（使用默认）
# Directory? → 回车（使用当前目录）
# Override settings? → No
```

---

## 🔄 后续更新流程

### 当你修改了代码后：

```bash
# 1. 添加修改的文件
git add .

# 2. 提交更改
git commit -m "描述你的修改，例如：Update doctor notes with more details"

# 3. 推送到 GitHub
git push

# 4. Vercel 会自动重新部署！（无需手动操作）
```

---

## ✅ 部署后检查清单

部署完成后，访问你的 Vercel 链接并检查：

- [ ] 页面能正常打开
- [ ] 实时会话数据显示正确
- [ ] 历史图表显示 8 次会话数据
- [ ] 恢复指标显示 4 个卡片
- [ ] 医生备注显示完整内容
- [ ] 点击 + 按钮能打开数据录入弹窗
- [ ] 能成功添加新数据
- [ ] 在多个浏览器窗口测试实时同步

---

## 🆘 常见问题

### ❓ 问题 1：推送到 GitHub 时要求输入密码

**原因**：GitHub 不再支持密码认证

**解决方案**：使用 Personal Access Token

1. 访问 https://github.com/settings/tokens
2. 点击 **Generate new token** → **Generate new token (classic)**
3. 勾选 `repo` 权限
4. 生成并复制 Token
5. 在命令行输入用户名和 Token（而不是密码）

**或者**：使用 GitHub Desktop（自动处理认证）

---

### ❓ 问题 2：Vercel 部署失败

**检查步骤**：

1. 确认 `package.json` 中有正确的 scripts：
   ```json
   "scripts": {
     "dev": "vite",
     "build": "vite build",
     "preview": "vite preview"
   }
   ```

2. 确认 `vite.config.js` 存在

3. 查看 Vercel 部署日志找到具体错误

---

### ❓ 问题 3：部署成功但页面无数据

**原因**：忘记执行 Supabase SQL 脚本

**解决**：

1. 访问 https://nhdnjgozjcbdrarwliwg.supabase.co
2. 进入 SQL Editor
3. 执行 `supabase-setup.sql` 中的所有内容

---

### ❓ 问题 4：如何设置自定义域名？

1. 在 Vercel 项目中，点击 **Settings** → **Domains**
2. 输入你的域名（如 `pt-simulator.com`）
3. 按照提示在域名提供商处添加 DNS 记录
4. 等待 DNS 生效（通常几分钟到几小时）

---

## 📋 文件清单总结

### 核心代码文件（17 个）
```
✓ src/components/LiveSession/LiveSession.jsx
✓ src/components/LiveSession/LiveSession.css
✓ src/components/HistoricalCharts/HistoricalCharts.jsx
✓ src/components/HistoricalCharts/HistoricalCharts.css
✓ src/components/DoctorNotes/DoctorNotes.jsx
✓ src/components/DoctorNotes/DoctorNotes.css
✓ src/components/RecoveryMetrics/RecoveryMetrics.jsx
✓ src/components/RecoveryMetrics/RecoveryMetrics.css
✓ src/components/DataEntry/DataEntry.jsx
✓ src/components/DataEntry/DataEntry.css
✓ src/services/supabase.js
✓ src/App.jsx
✓ src/App.css
✓ src/main.jsx
✓ src/index.css
✓ index.html
✓ vite.config.js
```

### 配置文件（5 个）
```
✓ package.json
✓ package-lock.json
✓ vercel.json
✓ .gitignore
✓ .gitattributes
```

### 文档文件（5 个）
```
✓ README.md
✓ QUICK-START.md
✓ DEPLOYMENT.md
✓ 项目总结.md
✓ 测试数据说明.md
```

### 数据库文件（1 个）
```
✓ supabase-setup.sql
```

**总计：28 个文件需要上传到 GitHub**

---

## 🎯 快速操作清单

### 第 1 步：上传到 GitHub（5 分钟）

```bash
cd c:\Users\Jacks\新建文件夹\pt-assessment-simulator
git init
git add .
git commit -m "Initial commit: PT Assessment Simulator"
# 在 GitHub 创建仓库后：
git remote add origin https://github.com/YOUR_USERNAME/pt-assessment-simulator.git
git branch -M main
git push -u origin main
```

### 第 2 步：Vercel 部署（3 分钟）

1. 访问 https://vercel.com
2. 用 GitHub 登录
3. Import 你的仓库
4. 点击 Deploy
5. 获取链接

### 第 3 步：测试（2 分钟）

1. 打开 Vercel 提供的链接
2. 检查数据是否显示
3. 测试添加数据功能
4. 在多个窗口测试同步

---

**总共只需 10 分钟，你的项目就会上线并可以分享！** 🚀

有任何问题随时问我！
