# ⚡ 快速开始指南

## 📋 当前状态

✅ 项目已创建完成  
✅ 所有代码已生成  
✅ 开发服务器运行中 (http://localhost:5173)  
⏳ 需要完成以下 2 步即可获得分享链接

---

## 🎯 第一步：设置 Supabase 数据库（必须！）

### 方法：复制粘贴 SQL 脚本

1. **打开 Supabase**  
   访问：https://nhdnjgozjcbdrarwliwg.supabase.co

2. **进入 SQL 编辑器**  
   点击左侧菜单的 **"SQL Editor"**

3. **创建新查询**  
   点击 **"New Query"** 按钮

4. **复制 SQL 脚本**  
   打开项目中的 `supabase-setup.sql` 文件  
   **全选并复制所有内容** (Ctrl+A → Ctrl+C)

5. **粘贴并执行**  
   粘贴到 Supabase SQL 编辑器中  
   点击右下角的 **"Run"** 按钮（或按 Ctrl+Enter）

6. **验证成功**  
   应该看到：✅ "Success. No rows returned"  
   
7. **检查表格**  
   点击左侧 **"Table Editor"**  
   应该能看到 4 个新表：
   - `live_sessions` ✓
   - `historical_sessions` ✓
   - `doctor_notes` ✓
   - `recovery_metrics` ✓

---

## 🚀 第二步：部署到 Vercel（获取分享链接）

### Vercel 登录窗口已打开！

**您现在应该看到一个终端提示，显示：**
```
Visit https://vercel.com/oauth/device?user_code=VHFC-SMDK
Press [ENTER] to open the browser
```

### 操作步骤：

1. **按回车键（ENTER）**  
   这会在浏览器中打开 Vercel 登录页面

2. **登录 Vercel**  
   - 如果已有账号：直接登录
   - 如果没有账号：
     - 选择 "Continue with GitHub" 或 "Continue with Email"
     - 完成注册（免费）

3. **授权设备**  
   在浏览器中点击 **"Confirm"** 授权

4. **等待终端显示成功**  
   回到终端，应该看到：
   ```
   ✓ Authenticated successfully
   ```

5. **运行部署命令**  
   在终端输入：
   ```bash
   vercel --yes --prod
   ```

6. **等待部署完成**（约 1-2 分钟）  
   你会看到进度条和构建日志

7. **获取分享链接！**  
   部署成功后，会显示类似：
   ```
   ✅ Production: https://pt-assessment-simulator-xxxxx.vercel.app
   ```

   **这就是您的分享链接！** 🎉

---

## 📱 第三步：测试多用户同步

1. **复制 Vercel 提供的 URL**

2. **在多个设备打开**  
   - 电脑浏览器
   - 手机浏览器
   - 平板浏览器
   - 不同的浏览器窗口

3. **测试实时同步**  
   - 在任意一个窗口点击右下角的 **"+"** 按钮
   - 选择 "Update Live Session" 或 "Add Historical Session"
   - 输入数据并保存
   - **所有其他窗口会立即更新！** ⚡

4. **测试医生备注**  
   - 在 Doctor's Notes 区域点击 "Edit"
   - 输入内容并保存
   - 其他窗口也会同步更新

---

## 🎯 PT 测试使用场景

### 场景 1：评估患者改善情况

1. 打开 **Historical Performance** 区域
2. 查看 **"ROM Progress Over Sessions"** 柱状图
3. 对比 Session 1 和 Session 4 的 ROM 值
4. 判断：ROM 从 85° 增加到 110° = **有改善** ✅

### 场景 2：识别错误模式

1. 查看 **"Error Flags per Session"** 图表
2. 注意 Session 1 有 3 个错误，Session 4 只有 1 个
3. 结论：错误减少 = **补偿动作改善** ✅

### 场景 3：决定是否调整计划

1. 查看 **Recovery Metrics** 区域
2. 检查：
   - Recovery Rate: 72% (↑ 从 65%)
   - Pain Level: 3/10 (↓ 从 5/10)
   - Functional Score: 78/100 (↑ 从 68)
3. 查看 **Doctor's Notes** 获取建议
4. 决定：继续当前计划，2周后增加目标次数

---

## 🆘 故障排除

### 问题 1：网页打开后没有数据显示

**原因**：还没运行 Supabase SQL 脚本  
**解决**：回到"第一步"，执行 SQL 脚本

### 问题 2：点击 + 按钮无法添加数据

**检查**：  
1. 按 F12 打开浏览器控制台
2. 查看 Console 面板是否有错误
3. 确认 Supabase 表格是否创建成功

### 问题 3：Vercel 部署失败

**解决**：
```bash
# 重新构建
npm run build

# 如果成功，再部署
vercel --prod
```

---

## 📞 需要帮助？

- 查看 `README.md` 了解详细功能说明
- 查看 `DEPLOYMENT.md` 了解部署细节
- 检查浏览器控制台 (F12) 查看错误信息

---

## ✅ 完成检查清单

- [ ] Supabase SQL 脚本已执行
- [ ] Vercel 账户已登录
- [ ] 项目已部署到生产环境
- [ ] 获得分享链接
- [ ] 在多个窗口测试实时同步
- [ ] 验证所有功能正常

**全部完成后，您就可以分享链接给 PT 进行测试了！** 🎉
