# 孙延璐个人作品集 — 项目进度文档

> **每次新会话请先读此文件**，了解已完成内容和下一步任务。

---

## 一、项目概述

做一个**纯静态单页 HTML 个人作品集**，风格对齐 [goonsdesign.com](https://goonsdesign.com/)，包含三大板块：

1. **个人简历**
2. **AI 提效工具效果展示**
3. **AI 电商视频**

交付目录：`d:\sunyanlu.1\Desktop\yanlu-portfolio\`

---

## 二、设计系统（严格对齐 goonsdesign）

- **字体**：中文 `Noto Sans SC`；英文/数字 `Manrope`
- **主色**：品牌蓝 `#194BFE`；文字近黑 `#111`；背景浅灰白 `#F4F6F8` / 白
- **按钮**：胶囊形 `border-radius: 100px`，主 CTA 蓝底白字，次级描边
- **导航**：左品牌字标 + 右「联系我」胶囊 + 圆形汉堡菜单；滚动后毛玻璃
- **排版**：超大标题、大量留白、中英混排
- **禁止**：旧项目的奶油底+珊瑚粉 blob 主视觉

### 必须实现的交互

用 CDN（Lenis + GSAP + ScrollTrigger），不引入构建链：

1. **Lenis** 丝滑滚动
2. **slideUp / reveal**：区块进入视口上浮渐显
3. **横向 Marquee**：技能/工具名跑马灯
4. **数字 Counter**：关键指标滚到可见时计数
5. **Hero 动态文字轮播**：「广告产品 / AI 提效 / 电商视频」轮换
6. **案例区 hover**：大图微缩放 + 指标浮现
7. **移动端**：汉堡全屏菜单；触控友好

---

## 三、信息架构（单页长滚动）

```
Nav → Hero → Resume(#resume) → Tools(#tools) → Videos(#videos) → Contact(#contact)
```

### Hero
- 品牌：`孙延璐`
- 副标：`Advertising Product · AI Efficiency`
- Headline：结合创意与业务落地，打造可量化的广告产品作品
- CTA：`查看作品` → #tools；`下载简历` → PDF

### Section A · 个人简历 #resume
- 左侧身份卡（头像、联系方式、教育、技能标签）+ 右侧时间轴经历
- 教育：中国传媒大学广告学硕 2025.09-2028.06 / 西北政法广编本科 2021.09-2025.06
- 京东采销实习 2026.03-2026.07：ROI 4.4、毛利+18.7pp、GMV+147%、4款爆品、10+AI工具
- TikTok 广告投放(美区) 2024.10-2025.03：GMV 900→8000、ROI 2→5.6、150w+播放爆款
- TikTok Shop(东南亚+拉美) 2025.03-2025.10：Sora2 AI视频、50w+播放
- 奥美 AE助理 2023.01-2023.02
- 华商传媒 用户产品运营 2024.01-2024.03
- 技能：Cursor/Claude Code/Codex/GPT/Gemini/Sora/PS/PR/Excel/SQL/IELTS 6.5
- 电话：13289293889 / 邮箱：sunyanlu0710@163.com

### Section B · AI 提效工具 #tools
主推4款（大案例条，不是小卡片墙）：
1. **底表抓取助手** — 抓底表→出报名表→裸跑排查一条龙（截图：visual-dibiao.png / shot-dibiao.png）
2. **百补辅助提报助手** — 上传价格表自动批量提报百补（截图：visual-baibu.png / shot-baibu.png）
3. **自动退券+退官直 v2.3.4** — 按SPU批量退券/退促/退官直（截图：visual-tuijuan.png / shot-tuijuan.png）
4. **同款主图视频图搜助手 v2.32.3** — 京东SPU→1688找有主图视频的同款（截图：visual-tusou.png / shot-tusou.png）

其余工具收入「更多工具」折叠/横向列表：
- 公海池认领驳回助手 v3.9
- 黄金眼定时下载助手 v1.2.1
- 秒杀一键降价助手 v1.0.0
- 券下商品清单合并助手 v1.7.0
- 批量图片自动化 v3.1
- 王牌单品批量整列助手 v1.1.0
- 日报便签助手
- 百亿补贴报名助手（cursor成品）
- 自动删差评插件 4.0
- 京喜自营毛利分析看板
- 优惠券复盘看板
- 潜力品优化工具
- 毛利广告分析看板

手册 PDF 入口：`assets/resume/manual.pdf`

### Section C · AI 电商视频 #videos
视频文件清单（放入 assets/videos/）：
| 文件名 | 标题 | 备注 |
|--------|------|------|
| 01-假睫毛.mp4 | 假睫毛 | AI · Sora2 |
| 02-卷发棒.mp4 | 卷发棒 | AI · Sora2 |
| 03-鞋袜除臭喷雾.mp4 | 鞋袜除臭喷雾 | AI · Sora2 |
| 04-儿童电话手表.mp4 | 儿童电话手表 | AI · Sora2 |
| 05-护肤品.mp4 | 护肤品 | AI · Sora2 |
| 06-积木玩具.mp4 | 积木玩具 | AI · Sora2 |
| 07-项链饰品.mp4 | 项链饰品 | AI · Sora2 |
| 08-宠物保健品.mp4 | 宠物保健品 | AI · Sora2 |
| 09-男士香水.mp4 | 男士香水 | AI · Sora2 |
| 10-喷油瓶.mp4 | 喷油瓶 | AI · Sora2 |
| 11-SHAPSHE.mp4 | SHAPSHE 塑身衣 | TikTok Shop 美区 |
| 12-华商传媒.mp4 | 华商传媒·汽车知识 | 抖音内容 |

飞书源：https://nxh7r558yue.feishu.cn/wiki/AIiFwlJt5isfehkhE9nc56Sunic
JS 逻辑：扫描文件存在则播放，不存在显示占位+飞书链接。

### Contact
大字收尾 + 电话/邮箱/下载简历

---

## 四、素材来源与路径

| 素材 | 路径 | 说明 |
|------|------|------|
| 旧项目 | `d:\sunyanlu.1\Desktop\portfolio-ad-product\` | 文案骨架、图片、PDF |
| 简历PDF | `assets/resume/resume.pdf` | 已复制（最新版广告产品方向） |
| 头像 | `assets/resume/avatar.png` | 36KB |
| 手册PDF | `assets/resume/manual.pdf` | 3MB，AI提效工具完整手册 |
| 插件截图 | `assets/plugins/visual-*.png, shot-*.png` | 4款主推工具截图 |
| 手册页截图 | `assets/plugins/manual-01~13.png` | 手册每页截图 |
| 高清截图 | `assets/plugins/hires/p-03~13.png` | 高分辨率版本 |
| 桌面插件目录 | `d:\sunyanlu.1\Desktop\插件\` | 12个插件文件夹+手册 |
| 手册文本 | 已提取到 `d:\sunyanlu.1\Desktop\manual_text_extract.txt` | 5548字符 |

---

## 五、手册核心内容摘要（用于网页文案）

工具覆盖四大场景：**底表抓取、活动报名、商品批量操作、数据复盘**

### 主推4款工具详情：

**1. 底表抓取助手（含活动报名一条龙）**
- 功能：在京东后台抓取7类数据（商品底表、广告底表、百补/券/官直/秒杀/便宜包邮已提报）
- 亮点：多广告子账号免密切换、累积合并；内置活动报名出表工具自动匹配算价卡毛利
- 附加：裸跑排查——一键看出哪些SKU在六类活动里一个都没占上
- 形态：浏览器插件+网页工具

**2. 百补辅助提报助手**
- 功能：上传「SKU+提报价」表格，插件串行逐个自动提报百亿补贴
- 亮点：结束后导出成功/失败名单，报不上的跳过记原因
- 形态：浏览器插件

**3. 自动退券+退官直 v2.3.4**
- 功能：输入SPUID扫描，树形浮窗勾选要退的项，批量退券/退促/退官直
- 亮点：结果可导CSV
- 注意：退出不可逆
- 形态：浏览器插件

**4. 同款主图视频图搜助手 v2.32.3**
- 功能：输入京东SPU→取主图→1688图搜→找有主图视频的同款
- 亮点：多SPU自动新开标签排队跑，可预览下载，导明细CSV
- 形态：浏览器插件

### 其他工具简述：
- **秒杀降价助手**：SPU维度批量把秒杀价降到达标，自动算最高秒杀价
- **王牌单品批量整列助手**：报名页缺失列补「批量整列」填充
- **批量图片自动化 v3.1**：素材中心批量换图全流程自动跑
- **公海池认领驳回助手 v3.9**：批量认领/驳回自营商品，自动填三猎算售价
- **黄金眼定时下载助手 v1.2.1**：报表定时/一键导出，自动下载归档
- **券下商品清单合并助手 v1.7.0**：券管理后台多清单一键导出合并
- **优惠券复盘看板**：自动按批次ID匹配券种、按SPU补类目，看图出周报
- **潜力品优化工具**：筛出潜力品+四象限分类+建议动作
- **毛利广告分析看板**：异常品清单+潜力品清单+广告效率+环比归因
- **日报便签助手**：桌面工具（Python+Playwright打包exe）

数据安全：离线网页工具全部本机浏览器里算，不上传；插件只借用登录态，不碰密码。

---

## 六、已完成工作

- [x] 读取并分析简历 PDF 全部内容
- [x] 读取并分析执行计划 `孙延璐个人作品集-执行计划.md`
- [x] 提取手册 docx 文本内容（5548字符）
- [x] 探索旧项目 `portfolio-ad-product/` 完整结构（HTML/CSS/JS/图片）
- [x] 列出桌面插件目录 `插件\` 全部文件
- [x] 创建新项目目录 `yanlu-portfolio/` 及子目录
- [x] 复制所有素材（resume/plugins/hires）到新项目
- [x] 复制最新简历 PDF 为 `assets/resume/resume.pdf`
- [x] 板块 1：index.html 骨架 + Nav + Hero + Contact 全部完成
- [x] 板块 2：简历 Section 完成（身份卡 + 时间轴）
- [x] 简历内容对照 Word 原文全面修正（见下方【板块 2 细节记录】）
- [x] 证件照替换为 `证件照.jpg`（路径 `assets/resume/avatar.jpg`）
- [x] Hero 右侧三指标重新提炼为 4.4 ROI / 147% GMV / 150万+ 播放
- [x] 修复 ROI 显示为「4.4.4」的 bug（改为静态文本）
- [x] 时间轴加粗标题颜色改为品牌蓝

---

### 板块 2 细节记录（简历修正内容）

**身份卡**
- 目标岗位：广告产品实习生；实习时长：6个月以上
- 本科补全：新闻传播学院、辅修法学、GPA 3.77/4.0、专业排名 2/194（前1%）
- 技能分两组：AI 工具（Cursor/Claude Code/Codex/GPT/Gemini/Seedance/Midjourney/Nano Banana）+ 其他（PS/PR/剪映/Excel/SQL）

**时间轴**
- 分「实习经历」和「项目经历」两组
- 京东：补全四维度（基础运营/广告投放/爆品/AI提效），含履约毛利+654%、点击率+0.9pp、萤火虫agent
- TikTok 美区：公司名改为「西安晶闪科技」，补 CPA-150%、广告贡献90%+、达人50+
- 华商传媒：补「社区活跃」条目，「商业化分析」改为「商业化数据分析」
- 奥美：补具体项目名 Hipapa（海龟爸爸）儿童防晒霜，及报告页数
- TikTok Shop 东南亚+拉美：移至项目经历，补新加坡日GMV/墨西哥月GMV/WhatsApp建联数据

## 七、未完成工作（按板块拆分，逐个完成）

### 板块 1：HTML 骨架 + Nav + Hero + Contact（基础框架）✅
- [x] 写 index.html 整体结构、Nav 导航、Hero 首屏、Contact 页脚
- [x] 引入 CDN（Google Fonts、Lenis、GSAP、ScrollTrigger）
- [x] 写 styles.css 基础变量、Nav、Hero、Contact 样式
- [x] 写 main.js 基础功能（Lenis 初始化、Nav 滚动、汉堡菜单）

### 板块 2：个人简历 Section (#resume) ✅
- [x] HTML：左侧身份卡 + 右侧时间轴
- [x] CSS：简历区布局和样式
- [x] JS：reveal 动画

### 板块 3：AI 提效工具 Section (#tools) ✅
- [x] HTML：4款主推工具大案例条（左右交替布局）+ marquee 跑马灯 + 更多工具折叠列表
- [x] CSS：大条布局、hover 图片缩放 + 浮窗截图、marquee CSS 动画
- [x] JS：更多工具展开/收起

### 板块 4：AI 电商视频 Section (#videos) ✅
- [x] HTML：视频网格容器（JS 动态填充）
- [x] CSS：4列网格、9:16 竖版卡片、播放按钮 overlay、占位样式
- [x] JS：fetch HEAD 检测文件是否存在 → 有文件渲染 video 标签（点击播放/暂停）→ 无文件显示占位+飞书链接

### 板块 5：动效完善 + 响应式 + 联调 ✅
- [x] Hero 文字轮播：滑入滑出更流畅（防布局跳动、slide from above）
- [x] 全局 reveal：GSAP clearProps 防止动画后残留 transform；IO 兜底 threshold 降至 0.1
- [x] 响应式：已覆盖 1024/768 断点（工具大条、视频网格、简历卡）
- [x] 数字 Counter：只对 data-target 的 span 计数，ROI 静态展示不参与
- [x] Hero stat 修正：4 黑 + .4 蓝拆分展示，万+ 单位对齐底部
- [x] 视频卡片 is-playing：蓝色描边 + 播放按钮 overlay 隐藏
- [x] prefers-reduced-motion：所有动画禁用兜底
- [x] section:empty display:none 已移除（sections 已全部填充）

### 板块 6：视频文件
- [ ] 飞书视频手动下载后放入 assets/videos/（需用户配合）
- [ ] 文件名格式：01-假睫毛.mp4 … 12-华商传媒.mp4

---

## 八、注意事项

- 纯静态，单入口 index.html，可本地双击打开（视频需 serve）
- 不破坏旧项目 `portfolio-ad-product`
- 色彩交互以 goonsdesign 为准，不要旧项目的奶油珊瑚风格
- 简历数据严格与 PDF 一致，不编造数字
- 隐私：电话邮箱按简历原文展示（求职用途）
- `prefers-reduced-motion` 减弱动效
- 图片写 alt 文本

---

## 九、goonsdesign 参考要点

网络限制导致无法直接抓取，以下基于执行计划的实测记录：
- 浅灰白背景 + 品牌蓝 `#194BFE` CTA
- Noto Sans（中文）+ Manrope（英文）
- 胶囊按钮 border-radius: 100px
- 超大标题 + 大量留白
- Lenis 丝滑滚动
- 区块 slideUp 渐显进入
- 案例大条布局（非卡片墙）
- 导航左品牌名 + 右联系胶囊 + 汉堡菜单
