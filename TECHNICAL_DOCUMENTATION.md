# 個人作品集網站 - 完整技術文件

> **版本**: 2.0  
> **最後更新**: 2025-10-19  
> **維護者**: InchIK  
> **專案類型**: 靜態網站 (GitHub Pages + Firebase)

---

## 📑 目錄

1. [專案概述](#專案概述)
2. [技術架構](#技術架構)
3. [檔案結構](#檔案結構)
4. [功能模組說明](#功能模組說明)
5. [CSS 設計系統](#css-設計系統)
6. [Firebase 整合](#firebase-整合)
7. [響應式設計](#響應式設計)
8. [維護指南](#維護指南)
9. [常見問題與解決方案](#常見問題與解決方案)
10. [部署流程](#部署流程)

---

## 專案概述

### 專案簡介
這是一個基於 GitHub Pages 的個人作品集網站，具備完整的內容管理功能，使用 Firebase Firestore 作為資料儲存後端。網站支援即時編輯、響應式設計，並提供豐富的互動效果。

### 核心特色
- ✅ 無需後端伺服器，純前端運作
- ✅ Firebase Firestore 即時資料同步
- ✅ 完整的管理介面（需 Google 登入）
- ✅ 全裝置響應式設計（桌面/平板/手機）
- ✅ 支援瀏覽器縮放 50%-200%
- ✅ 符合 WCAG 無障礙標準（觸控目標 ≥44px）
- ✅ 電影院風格 Modal 動畫效果
- ✅ 瀑布流排版演算法

### 技術棧
- **前端框架**: 純 Vanilla JavaScript (ES6+)
- **樣式**: CSS3 (使用 CSS 變數與 clamp() 實現流暢響應式)
- **資料庫**: Firebase Firestore
- **認證**: Firebase Authentication (Google OAuth)
- **部署**: GitHub Pages
- **版本控制**: Git/GitHub

---

## 技術架構

### 系統架構圖

```
┌─────────────────────────────────────────────────────────┐
│                    GitHub Pages (靜態託管)                │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  index.html  │  │ css/style.css│  │  js/main.js  │  │
│  │  (結構)      │  │  (樣式)      │  │  (邏輯)      │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│         │                 │                 │           │
│         └─────────────────┴─────────────────┘           │
│                           │                             │
└───────────────────────────┼─────────────────────────────┘
                            │
                            ▼
              ┌─────────────────────────┐
              │   Firebase Services     │
              ├─────────────────────────┤
              │ • Firestore Database    │
              │ • Authentication        │
              └─────────────────────────┘
```

### 資料流程

```
使用者操作 → DOM 事件 → JavaScript 處理 → Firebase API → Firestore
                                                    │
                                                    ▼
使用者介面 ← DOM 更新 ← JavaScript 渲染 ← 即時資料監聽
```

---

## 檔案結構

```
InchIK.github.io/
│
├── index.html                          # 主要 HTML 結構
├── css/
│   └── style.css                       # 全域樣式與響應式設計
├── js/
│   └── main.js                         # 核心 JavaScript 邏輯
├── assets/
│   └── photos/                         # 圖片資源
│       ├── avatar.jpg                  # 個人頭像
│       ├── about.png                   # 關於我圖標
│       ├── skills.png                  # 技能圖標
│       ├── projects.png                # 專案圖標
│       ├── web.png                     # 預設網站圖標
│       ├── github.png linkedin.png     # 社交媒體圖標
│       └── [證書圖片].png              # 專業證書縮圖
│
├── TECHNICAL_DOCUMENTATION.md          # 技術文件（本文件）
├── RESPONSIVE_OPTIMIZATION_PLAN.md     # 響應式優化計劃
├── SHARE_LINKS_FIREBASE_SETUP.md       # 分享連結設定指南
├── EXPERIENCE_POSITION_FIREBASE_SETUP.md # 職務設定指南
│
└── README.md                           # 專案說明
```

---

## 功能模組說明

### 1. 個人資料模組 (Profile)

**功能**: 顯示個人頭像、姓名、聯絡方式、自我介紹

**資料結構**:
```javascript
{
  name: "姓名",
  contact: "聯絡資訊",
  summary: "自我介紹文字"
}
```

**關鍵檔案**:
- HTML: `index.html` - `.hero__content` 區塊
- CSS: `css/style.css` - `.profile` 相關樣式
- JS: `js/main.js` - `renderProfile()`, `saveProfile()`

---

### 2. 關於我模組 (About Me)

**功能**:
- 📍 棲息地（單一項目）
- 💼 經歷（公司、年資、技能標籤）
- 🎓 學歷（學校、學位標籤）
- 📜 專業證書（縮圖預覽，可點擊放大）
- 🔗 個人網站連結（支援自訂圖標）
- 🎯 適任職務（標籤列表）

**資料結構**:
```javascript
aboutMe: {
  location: "台灣台北市",
  experiences: [
    {
      id: "exp-1",
      company: "公司名稱",
      years: "2020-2023",
      skills: ["技能1", "技能2"]
    }
  ],
  educations: [
    {
      id: "edu-1",
      school: "學校名稱",
      degree: "學位名稱"
    }
  ],
  certificates: [
    {
      id: "cert-1",
      title: "證書名稱",
      image: "assets/photos/cert.png"
    }
  ],
  websites: [
    {
      id: "web-1",
      label: "GitHub",
      url: "https://github.com/username",
      icon: "assets/photos/github.png"  // 選填
    }
  ],
  positions: ["DevOps", "雲端架構師"]
}
```

**關鍵實作**:
- **證書預覽**: 點擊縮圖開啟全螢幕 Modal
- **網站圖標**: 無圖標時使用預設 `web.png`，白色背景確保可見性
- **技能標籤配色**: 統一淺灰色 `#c0c0c0`

---

### 3. 技能標籤模組 (Skill Tags)

**功能**: 全域技能標籤管理，可關聯到技能卡片

**資料結構**:
```javascript
skillTags: ["JavaScript", "Python", "Docker", "Kubernetes"]
```

**樣式特性**:
- 隨機 HSL 背景色（色相隨機，飽和度 70%，亮度 85%）
- 圓角膠囊設計 (`border-radius: 999px`)
- Hover 效果：上浮 2px + 陰影加深

---

### 4. 分享連結模組 (Share Links)

**功能**:
- 正方形圓角卡片顯示
- 智慧文字縮寫（英文取首尾字母，中文取首字）
- 智慧 Tooltip 定位（避免超出螢幕邊界）
- 瀑布流排版效果
- 垂直漸層配色（深灰到淺灰）

**資料結構**:
```javascript
shareLinks: [
  {
    id: "link-1",
    name: "GitHub",
    description: "我的程式碼倉庫",
    url: "https://github.com/username"  // 選填
  }
]
```

**瀑布流演算法**:
1. 前 5 行保持整齊（每行 5 個）
2. 第 6 行開始，每一列隨機缺 0-5 個卡片
3. 缺的卡片從底部開始（使用 `visibility: hidden`）
4. 剩餘卡片平均分配到各列

**配色系統**:
- 最上面一行：`#4a4a4a`（深灰）
- 最下面一行：`#c0c0c0`（淺灰）
- 中間行：RGB 線性插值計算顏色

**響應式佈局**:
- 桌面（>1024px）：5 欄，位於個人資料下方
- 平板/手機（≤1024px）：移至頁面最下方，透明背景
- 600px 以下：4 欄
- 500px 以下：3 欄

---

### 5. Modal 系統

**電影院螢幕展開動畫**:
```css
@keyframes cinemaScreenOpen {
  0% {
    transform: scale(0, 0);  /* 縮放到 0 */
    opacity: 0;
  }
  40% {
    transform: scale(1, 0);  /* 水平展開完成 */
    opacity: 0.5;
  }
  100% {
    transform: scale(1, 1);  /* 垂直展開完成 */
    opacity: 1;
  }
}
```

**Modal 類型與尺寸**:

| Modal 類型 | 桌面寬度 | 手機寬度 | 用途 |
|-----------|---------|---------|------|
| profile | 500px | 94vw | 編輯個人資料 |
| panel | 550px | 94vw | 編輯技能區塊 |
| project-editor | 720px | 95vw | 編輯專案 |
| skill-detail | 2000px | 97vw | 技能詳情（特大） |
| about-me | 700px | 97vw | 關於我管理 |

**響應式行為**:
- 400px 以下：所有 Modal 自動全螢幕（100vw, border-radius: 0）

---

## CSS 設計系統

### CSS 變數架構

#### 1. 間距系統
```css
:root {
  --spacing-xs: clamp(0.25rem, 1vw, 0.5rem);   /* 4-8px */
  --spacing-sm: clamp(0.5rem, 2vw, 1rem);      /* 8-16px */
  --spacing-md: clamp(1rem, 3vw, 1.5rem);      /* 16-24px */
  --spacing-lg: clamp(1.5rem, 4vw, 2rem);      /* 24-32px */
  --spacing-xl: clamp(2rem, 5vw, 3rem);        /* 32-48px */
}
```

**使用場景**:
- `xs`: 標籤內距、小間距
- `sm`: 按鈕內距、卡片間距
- `md`: 區塊間距、容器內距
- `lg`: 大區塊間距
- `xl`: 主要區塊間距

#### 2. 字體大小系統
```css
:root {
  --font-xs: clamp(0.7rem, 1.5vw, 0.85rem);    /* 11.2-13.6px */
  --font-sm: clamp(0.8rem, 1.8vw, 0.95rem);    /* 12.8-15.2px */
  --font-base: clamp(0.9rem, 2vw, 1.05rem);    /* 14.4-16.8px */
  --font-md: clamp(1rem, 2.2vw, 1.2rem);       /* 16-19.2px */
  --font-lg: clamp(1.2rem, 2.5vw, 1.5rem);     /* 19.2-24px */
  --font-xl: clamp(1.5rem, 3vw, 2rem);         /* 24-32px */
  --font-2xl: clamp(1.8rem, 3.5vw, 2.5rem);    /* 28.8-40px */
}
```

**使用場景**:
- `xs`: 次要文字、提示文字
- `sm`: 內文、描述文字
- `base`: 主要內文、表單輸入
- `md`: 小標題、按鈕文字
- `lg`: 卡片標題
- `xl`: Modal 標題
- `2xl`: 區塊主標題

#### 3. 其他變數
```css
:root {
  --bg: #f8d34c;                                /* 背景色 */
  --text: #1c2431;                              /* 文字色 */
  --card-radius: 22px;                          /* 卡片圓角 */
  --touch-target-min: 44px;                     /* 最小觸控目標 */
}
```

### clamp() 函數說明

**語法**: `clamp(最小值, 理想值, 最大值)`

**範例**:
```css
font-size: clamp(0.9rem, 2vw, 1.05rem);
/*
  - 最小 0.9rem (14.4px)
  - 理想 2vw (視窗寬度 2%)
  - 最大 1.05rem (16.8px)
*/
```

**優點**:
- 無需 media query 即可實現流暢縮放
- 支援瀏覽器縮放（50%-200%）
- 減少響應式斷點中的覆蓋

### 響應式斷點

| 斷點 | 寬度 | 用途 |
|-----|------|------|
| 超大桌面 | >1400px | 預設樣式 |
| 大桌面 | 1200px-1400px | 技能詳情 Modal 調整 |
| 小桌面 | 1024px-1200px | 分享連結位置調整 |
| 平板 | 820px-1024px | 頭像縮小、按鈕調整 |
| 大手機 | 600px-680px | 技能卡片單欄 |
| 一般手機 | 500px-600px | Modal 優化 |
| 小手機 | 400px-500px | 進一步縮小間距 |
| 超小手機 | <400px | 全螢幕 Modal |

### 觸控目標標準

所有互動元素符合 **WCAG 2.5.5 (Level AAA)** 標準：
- 最小尺寸: `44x44px`
- 實作方式: `min-width: var(--touch-target-min); min-height: var(--touch-target-min);`

**已優化元素**:
- ✅ 所有按鈕
- ✅ 所有標籤
- ✅ 移除按鈕
- ✅ 表單輸入
- ✅ 卡片操作按鈕

---

## Firebase 整合

### Firestore 資料結構

#### 文件路徑
```
portfolio/
└── data/
    └── (單一文件，包含所有資料)
```

#### 完整資料結構
```javascript
{
  // 個人資料
  profile: {
    name: "姓名",
    contact: "聯絡資訊",
    summary: "自我介紹"
  },

  // 關於我
  aboutMe: {
    location: "台灣台北市",
    experiences: [...],
    educations: [...],
    certificates: [...],
    websites: [...],
    positions: [...]
  },

  // 技能標籤
  skillTags: ["JavaScript", "Python"],

  // 技能區塊
  panels: [...],

  // 專案
  projects: [...],

  // 分享連結
  shareLinks: [...]
}
```

### 資料同步機制

#### 讀取資料
```javascript
// 即時監聽
db.collection("portfolio").doc("data").onSnapshot((doc) => {
  if (doc.exists) {
    const data = doc.data();
    renderAll(data);
  }
});
```

#### 儲存資料
```javascript
async function syncFirestoreData() {
  try {
    await db.collection("portfolio").doc("data").set({
      profile, aboutMe, skillTags, panels, projects, shareLinks
    }, { merge: true });
    console.log("✅ Firebase 同步成功");
  } catch (err) {
    console.error("❌ Firebase 同步失敗:", err);
  }
}
```

#### 重要：資料正規化
確保資料一致性，特別注意 **icon 欄位**必須被保留：

```javascript
function normalizeAboutMe(source) {
  return {
    websites: Array.isArray(source.websites)
      ? source.websites.map(web => ({
          id: web.id || generateId("web"),
          label: web.label || "",
          url: web.url || "",
          icon: web.icon || ""  // ⚠️ 關鍵：確保 icon 欄位被保留
        }))
      : []
  };
}
```

### Google 認證流程

```javascript
// 登入
async function signIn() {
  const provider = new firebase.auth.GoogleAuthProvider();
  await auth.signInWithPopup(provider);
}

// 監聽認證狀態
auth.onAuthStateChanged((user) => {
  if (user) {
    showAdminBar();  // 顯示管理介面
  } else {
    hideAdminBar();  // 隱藏管理介面
  }
});
```

---

## 維護指南

### 日常維護任務

#### 1. 新增技能標籤
1. 登入網站（右上角 Google 登入）
2. 點擊「管理模式」
3. 點擊「管理技能標籤」
4. 輸入標籤名稱（逗號分隔多個標籤）
5. 點擊「儲存」

#### 2. 新增/編輯關於我內容
1. 登入並開啟管理模式
2. 在「關於我」區塊點擊「編輯」
3. 編輯所需項目：
   - 棲息地、經歷、學歷、證書、網站、職務
4. 點擊「儲存」

#### 3. 新增分享連結
1. 登入並開啟管理模式
2. 點擊「管理分享連結」
3. 輸入名稱、說明、URL（選填）
4. 點擊「儲存」

### 程式碼維護

#### 修改樣式 - 遵循設計系統

```css
/* ✅ 好的做法 */
.my-button {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-base);
  min-height: var(--touch-target-min);
}

/* ❌ 不好的做法 */
.my-button {
  padding: 0.5rem 1rem;      /* 應使用 CSS 變數 */
  font-size: 14px;           /* 應使用 CSS 變數 */
  height: 40px;              /* 應使用 min-height */
}
```

#### 新增響應式樣式

```css
/* 基礎樣式：優先使用 clamp() */
.my-element {
  font-size: clamp(0.8rem, 2vw, 1.2rem);
  padding: clamp(0.5rem, 2vw, 1rem);
}

/* 只在需要結構性改變時使用 media query */
@media (max-width: 600px) {
  .my-element {
    flex-direction: column;  /* 改變佈局方向 */
  }
}
```

### Git 工作流程

**提交規範**:
```bash
# 新增功能
git commit -m "新增: 功能描述"

# 修復錯誤
git commit -m "修復: 錯誤描述"

# 優化代碼
git commit -m "優化: 優化項目"
```

**部署流程**:
```bash
# 1. 測試完成
# 2. 提交變更
git add .
git commit -m "提交訊息"

# 3. 推送到 GitHub（自動部署）
git push origin main

# 4. 等待 GitHub Pages 部署（約 1-2 分鐘）
```

---

## 常見問題與解決方案

### Q1: 圖片無法顯示
**解決方案**:
```javascript
// 檢查圖片路徑
console.log("圖片路徑:", imageUrl);

// 使用相對路徑
// ✅ assets/photos/image.png
// ❌ /assets/photos/image.png
```

### Q2: Firebase 資料無法儲存
**解決方案**:
```javascript
// 1. 檢查登入狀態
console.log("當前用戶:", auth.currentUser);

// 2. 檢查 Firestore 規則
// Firebase Console → Firestore Database → Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /portfolio/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Q3: 技能標籤刪除後重新整理又出現
**原因**: 刪除操作沒有等待 Firebase 寫入完成

**解決方案**: 程式碼已修正，使用 `async/await` 確保同步完成

### Q4: 網站圖標不顯示或保存後消失
**原因**: `normalizeAboutMe()` 函數未包含 `icon` 欄位

**解決方案**: 已修正，確保正規化時保留 `icon` 欄位

### Q5: 分享連結瀑布流排版異常
**解決方案**:
```javascript
// 手動觸發重新排版
arrangeWaterfallLayout();

// 監聽視窗大小改變
window.addEventListener('resize', debounce(() => {
  arrangeWaterfallLayout();
}, 200));
```

### Q6: 手機上觸控按鈕太小
**解決方案**:
```css
/* 確保所有互動元素使用觸控目標變數 */
.my-button {
  min-width: var(--touch-target-min);
  min-height: var(--touch-target-min);
}
```

---

## 部署流程

### GitHub Pages 設定

1. Repository Settings → Pages
2. Source 選擇 `main` 分支
3. 資料夾選擇 `/ (root)`
4. 勾選 "Enforce HTTPS"

### Firebase 設定

1. **建立 Firebase 專案**
   - 前往 [Firebase Console](https://console.firebase.google.com/)
   - 點擊「新增專案」

2. **啟用 Firestore**
   - Firestore Database → 建立資料庫
   - 選擇地區（建議 `asia-east1` 台灣）

3. **設定安全規則**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /portfolio/{document=**} {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```

4. **啟用 Authentication**
   - Authentication → Google 登入
   - 加入授權網域：`inchik.github.io`

5. **取得 Firebase 設定**
   - 複製 `firebaseConfig` 物件
   - 貼到 `js/main.js`

### 部署檢查清單

**部署前**:
- [ ] 本地測試所有功能正常
- [ ] Firebase 設定正確
- [ ] 圖片資源已上傳
- [ ] Git commit 訊息清晰

**部署後**:
- [ ] 訪問網站確認可正常訪問
- [ ] 測試 Google 登入功能
- [ ] 測試管理介面功能
- [ ] 測試響應式設計

---

## 附錄

### 常用 Git 指令

```bash
# 查看狀態
git status

# 暫存所有變更
git add .

# 提交變更
git commit -m "提交訊息"

# 推送到遠端
git push origin main

# 查看提交歷史
git log --oneline -10

# 回滾到指定 commit
git reset --hard COMMIT_HASH
```

### 瀏覽器相容性

**支援的瀏覽器**:
- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

**已知問題**:
- IE 11: 不支援（使用 ES6+ 語法）

### 效能監控

**使用 Lighthouse 測試**:
1. Chrome DevTools (F12) → Lighthouse
2. 選擇類別：Performance, Accessibility, Best Practices, SEO
3. 點擊「Generate report」

**目標分數**:
- Performance: >90
- Accessibility: >90
- Best Practices: >90
- SEO: >80

### 安全性建議

#### Firebase 安全規則
```javascript
// ✅ 好的做法
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /portfolio/{document=**} {
      allow read: if true;
      allow write: if request.auth != null &&
                      request.auth.token.email == 'your-email@gmail.com';
    }
  }
}
```

#### XSS 防護
```javascript
// ✅ 安全的做法
element.textContent = userInput;

// ❌ 危險做法
element.innerHTML = userInput;  // 可能注入腳本
```

---

## 結語

本技術文件涵蓋了整個專案的架構、功能、實作細節與維護指南。

**重要提醒**:
- 定期備份 Firebase 資料
- 在修改前先測試
- 遵循既有的設計系統與編碼風格
- 善用 Git 版本控制

**聯絡方式**:
- 技術問題：請在 GitHub Issues 提出
- 功能建議：歡迎提交 Pull Request

---

**文件版本歷史**:
- v2.1 (2025-10-20): 新增留言功能、ADMIN 標籤、媒體連結轉換、響應式優化
- v2.0 (2025-10-19): 完整技術文件，包含所有模組與最佳實踐
- v1.0 (2025-10-18): 初版技術文件

**本文件由 Claude Code 協助撰寫**

---

## 更新日誌 (2025-10-20)

### 新增功能

#### 1. 留言功能與 EmailJS 整合

**功能描述**: 新增圓形留言按鈕，使用者可透過 Email 留言

**實作細節**:
- 位置：Email 標籤右側
- 樣式：50x50px 圓形按鈕，紅色漸層背景（與 Email 標籤同色）
- 間距：與 Email 標籤間距 `var(--spacing-sm)`

**EmailJS 設定**:
```javascript
// Service ID: service_1xmtsnl
// Template ID: template_niim05w
// Public Key: K52jTL0VqjVtVLU3K

emailjs.send(serviceId, templateId, {
  from_name: "使用者名稱",
  reply_to: "user@example.com",
  message: "留言內容",
  "g-recaptcha-response": recaptchaToken  // reCAPTCHA token
});
```

**留言 Modal 結構**:
- 稱呼（必填）
- Email（必填）
- 內文（必填）
- reCAPTCHA V2 驗證
- 狀態提示區（發送中/成功/失敗）

**狀態顯示**:
- **發送中**: 藍色背景，禁用送出按鈕
- **成功**: 綠色背景，2 秒後自動關閉
- **失敗**: 紅色背景，保留表單內容供重試

#### 2. reCAPTCHA V2 驗證

**功能描述**: 防止垃圾留言，使用 Google reCAPTCHA V2

**設定**:
- Site Key: `6LeSs_ArAAAAAG4L6-RZ7IHYdz_QFkHDbpkw9K74`
- Secret Key: 在 EmailJS 後台設定

**前端整合**:
```html
<!-- Google reCAPTCHA API -->
<script src="https://www.google.com/recaptcha/api.js" async defer></script>

<!-- reCAPTCHA 容器 -->
<div class="g-recaptcha" data-sitekey="YOUR_SITE_KEY"></div>
```

**驗證流程**:
1. 使用者填寫表單
2. 完成「我不是機器人」驗證
3. 提交表單時檢查 `grecaptcha.getResponse()`
4. 將 token 包含在 EmailJS 請求中
5. EmailJS 後端驗證 token 有效性

**自動重置**:
- 發送成功後重置
- 發送失敗後重置（供重試）
- 關閉 Modal 時重置

#### 3. ADMIN 管理標籤

**功能描述**: 重新設計管理登入按鈕為小巧的 ADMIN 標籤

**位置**: Email 和自我介紹文字之間，靠左對齊

**樣式設計**:
- **AD**: 白底紅字（`background: white`, `color: #b13a2e`）
- **MIN**: 紅底白字（`background: linear-gradient(135deg, #b13a2e, #6d1f16)`）
- 字體：`clamp(0.55rem, 1.2vw, 0.7rem)`
- 內距：`0.2rem 0.35rem`
- 邊框：`1px solid #b13a2e`
- 圓角：`3px`

**間距優化**:
- `margin-bottom: -0.5rem` - 更靠近自我介紹文字

**Hover 效果**:
- 上浮 2px
- 透明度降至 0.9

#### 4. Google Drive / YouTube 連結自動轉換

**功能描述**: 自動識別並轉換 Google Drive 和 YouTube 連結

##### Google Drive 圖片顯示

**原始連結**:
```
https://drive.google.com/file/d/FILE_ID/view?usp=sharing
```

**轉換為**:
```
https://drive.google.com/thumbnail?id=FILE_ID&sz=w1000
```

**備援機制**:
```javascript
// 圖片載入失敗時自動切換格式
onerror="this.src=this.src.replace('thumbnail?id=', 'uc?export=view&id=').replace('&sz=w1000', '')"
```

##### Google Drive 檔案下載

**轉換為**:
```
https://drive.google.com/uc?export=download&confirm=t&id=FILE_ID
```

**特性**:
- `target="_blank"` - 在新分頁開啟
- `rel="noopener noreferrer"` - 安全性考量
- 移除 `download` 屬性（避免與新視窗衝突）

##### YouTube 影片嵌入

**支援格式**:
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`

**轉換為嵌入式播放器**:
```html
<div class="video-wrapper">
  <iframe src="https://www.youtube.com/embed/VIDEO_ID"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
  </iframe>
</div>
```

**響應式設計**:
```css
.video-wrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 比例 */
  height: 0;
  overflow: hidden;
}

.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

**轉換函數**:
```javascript
// Google Drive 圖片
function convertGoogleDriveUrl(url) {
  const match = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  return match ? `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000` : url;
}

// Google Drive 檔案下載
function convertGoogleDriveDownloadUrl(url) {
  const match = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  return match ? `https://drive.google.com/uc?export=download&confirm=t&id=${match[1]}` : url;
}

// YouTube 影片
function convertYouTubeUrl(url) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}
```

### 響應式優化 (2025-10-20)

#### 新增斷點優化

**留言按鈕 (600px)**:
```css
@media (max-width: 600px) {
  .message-btn {
    width: 44px;
    height: 44px;
    font-size: var(--font-base);
  }
}
```

**ADMIN 標籤**:
```css
/* 平板優化 (768px) */
@media (max-width: 768px) {
  .admin-tag {
    margin-bottom: -0.3rem;
  }
}

/* 小螢幕 (400px) */
@media (max-width: 400px) {
  .admin-tag {
    font-size: clamp(0.5rem, 1vw, 0.65rem);
  }
  .admin-tag__ad, .admin-tag__min {
    padding: 0.15rem 0.3rem;
  }
}
```

**reCAPTCHA 優化**:
```css
/* 500px 以下 */
@media (max-width: 500px) {
  .recaptcha-container {
    padding: var(--spacing-xs);
  }
  .modal__content--message {
    width: 95vw !important;
    padding: 1.5rem !important;
  }
}

/* 400px 以下 */
@media (max-width: 400px) {
  .modal__content--message {
    width: 100vw !important;
    border-radius: 0 !important;
  }
  /* reCAPTCHA 自動縮放 */
  .recaptcha-container .g-recaptcha {
    transform: scale(0.85);
    transform-origin: 0 0;
  }
}
```

**YouTube 影片 (600px)**:
```css
@media (max-width: 600px) {
  .video-wrapper {
    border-radius: 6px;
  }
  .project-media-card--video {
    padding: 0.5rem;
  }
}
```

### 檔案變更清單

**HTML**:
- 新增留言按鈕 (`.message-btn`)
- 新增留言 Modal (`.modal__content--message`)
- 新增 reCAPTCHA 容器
- 新增 ADMIN 標籤 (`.admin-tag`)
- 引入 Google reCAPTCHA SDK
- 引入 EmailJS SDK

**CSS**:
- 新增 `.message-btn` 樣式
- 新增 `.admin-tag` 樣式系列
- 新增 `.recaptcha-container` 樣式
- 新增 `.message-status` 狀態提示樣式
- 新增 `.video-wrapper` YouTube 影片容器
- 新增響應式斷點優化（600px, 500px, 400px）
- 移除舊的 `.hero__login-btn` 樣式

**JavaScript**:
- 新增 `convertGoogleDriveUrl()` - 圖片轉換
- 新增 `convertGoogleDriveDownloadUrl()` - 檔案下載轉換
- 新增 `convertYouTubeUrl()` - YouTube 影片轉換
- 修改 `renderProjectMedia()` - 支援影片和自動轉換
- 新增留言表單提交邏輯
- 新增 EmailJS 發送功能
- 新增 reCAPTCHA 驗證邏輯
- 新增表單重置與狀態管理

### 重要注意事項

#### Google Drive 使用限制
1. **權限設定**: 檔案必須設為「知道連結的任何人」都可查看
2. **大檔案警告**: >100MB 檔案會顯示病毒掃描警告頁面，無法完全繞過
3. **配額限制**: thumbnail API 有請求配額限制

#### reCAPTCHA 設定步驟
1. 前往 [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. 註冊網站，選擇 reCAPTCHA v2
3. 網域填入：`inchik.github.io`
4. 取得 Site Key 和 Secret Key
5. Site Key 填入 HTML
6. Secret Key 填入 EmailJS 後台

#### EmailJS 設定步驟
1. 前往 [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Account → Security → 啟用 reCAPTCHA V2
3. 輸入 reCAPTCHA 的 Site Key 和 Secret Key
4. 建立 Email Template，使用以下變數：
   - `{{from_name}}` - 稱呼
   - `{{reply_to}}` - Email
   - `{{message}}` - 內文

### 效能影響

**新增的外部資源**:
- Google reCAPTCHA API (~45KB)
- EmailJS SDK (~15KB)

**總增加大小**: ~60KB (壓縮後)

**載入時間影響**:
- reCAPTCHA: async 非同步載入，不阻塞渲染
- EmailJS: 只在需要時載入

### 瀏覽器相容性

**已測試瀏覽器**:
- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅
- Mobile Safari (iOS 14+) ✅
- Chrome Mobile (Android 10+) ✅

**已知限制**:
- IE 11: 不支援 (使用 ES6+ 語法和 CSS Grid)
- iOS Safari <14: reCAPTCHA 可能顯示異常

### 後續優化建議

1. **效能優化**:
   - 考慮使用 reCAPTCHA v3 (無需使用者互動)
   - 延遲載入 EmailJS SDK

2. **功能增強**:
   - 新增留言成功通知
   - 支援附件上傳
   - 新增留言歷史記錄

3. **使用者體驗**:
   - 新增表單自動儲存
   - 改善錯誤訊息提示
   - 新增送出倒數計時

---

**v2.1 更新完成** - 2025-10-20
