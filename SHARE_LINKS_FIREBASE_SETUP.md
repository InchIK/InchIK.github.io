# 分享連結功能 - Firebase 設定指南

## 📋 功能說明

分享連結區塊顯示在頁面左側（頭像下方），以正方形圓角圖標呈現，支援：
- **隨機背景色**：每個圖標都有不同的HSL隨機色
- **智慧縮寫**：英文取首尾字母（如 GitHub → GH），中文取首字（如 個人部落格 → 個）
- **Hover 提示**：滑鼠移到圖標顯示說明文字
- **點擊跳轉**：開新視窗至目標網址
- **響應式佈局**：桌面5欄、平板4欄、手機3欄

---

## 🗄️ Firebase Firestore 設定

### 路徑
```
resume/content
```

### 資料結構

在現有的 `resume/content` document 中新增 `shareLinks` 欄位（陣列）：

```json
{
  "profile": { ... },
  "skills": [ ... ],
  "skillTags": [ ... ],
  "aboutMe": { ... },

  "shareLinks": [
    {
      "id": "share-1",
      "name": "GitHub",
      "description": "我的開源專案與程式碼",
      "url": "https://github.com/InchIK"
    },
    {
      "id": "share-2",
      "name": "LinkedIn",
      "description": "職涯與專業人脈",
      "url": "https://www.linkedin.com/in/inchik"
    },
    {
      "id": "share-3",
      "name": "個人部落格",
      "description": "技術筆記與學習心得",
      "url": "https://blog.example.com"
    },
    {
      "id": "share-4",
      "name": "Medium",
      "description": "技術文章分享平台",
      "url": "https://medium.com/@inchik"
    },
    {
      "id": "share-5",
      "name": "YouTube",
      "description": "教學影片頻道",
      "url": "https://youtube.com/@inchik"
    }
  ]
}
```

---

## 🔧 Firebase Console 手動設定步驟

### 方法一：透過 Firebase Console UI

1. 前往 [Firebase Console](https://console.firebase.google.com/)
2. 選擇你的專案
3. 左側選單點擊 **Firestore Database**
4. 找到 `resume` collection
5. 點擊 `content` document
6. 點擊頁面上方的 **編輯** 按鈕
7. 新增欄位：
   - 欄位名稱：`shareLinks`
   - 類型：**array**
8. 在陣列中新增物件，每個物件包含：
   - `id` (string)：唯一識別碼，例如 "share-1"
   - `name` (string)：分享名稱，例如 "GitHub"
   - `description` (string)：說明文字，例如 "我的開源專案"
   - `url` (string)：完整網址，例如 "https://github.com/InchIK"

### 方法二：透過程式碼（建議）

如果你有設定 Firebase Admin SDK，可以直接執行以下程式碼：

```javascript
const admin = require('firebase-admin');
const db = admin.firestore();

const shareLinksData = [
  {
    id: "share-1",
    name: "GitHub",
    description: "我的開源專案與程式碼",
    url: "https://github.com/InchIK"
  },
  {
    id: "share-2",
    name: "LinkedIn",
    description: "職涯與專業人脈",
    url: "https://www.linkedin.com/in/inchik"
  },
  {
    id: "share-3",
    name: "個人部落格",
    description: "技術筆記與學習心得",
    url: "https://blog.example.com"
  },
  {
    id: "share-4",
    name: "Medium",
    description: "技術文章分享平台",
    url: "https://medium.com/@inchik"
  }
];

await db.collection('resume').doc('content').update({
  shareLinks: shareLinksData
});
```

---

## 📝 欄位說明

| 欄位 | 類型 | 必填 | 說明 | 範例 |
|------|------|------|------|------|
| `id` | string | 是 | 唯一識別碼 | "share-1", "share-2" |
| `name` | string | 是 | 分享名稱（支援中英文） | "GitHub", "個人部落格" |
| `description` | string | 是 | 說明文字（Hover時顯示） | "我的開源專案與程式碼" |
| `url` | string | 是 | 完整網址（必須包含 http:// 或 https://） | "https://github.com/InchIK" |

---

## 🎨 圖標文字生成規則

### 英文名稱
取**首字母** + **尾字母**（大寫）

```
GitHub     → GH
LinkedIn   → LN
Medium     → MM
YouTube    → YE
Facebook   → FK
Instagram  → IM
Twitter    → TR
```

### 中文名稱
取**第一個字**

```
個人部落格  → 個
技術筆記    → 技
學習心得    → 學
開源專案    → 開
```

### 單字母
直接顯示該字母（大寫）

```
X  → X
```

---

## 🎨 背景色生成

- **色相（Hue）**：0-360° 隨機
- **飽和度（Saturation）**：60-80% 隨機
- **亮度（Lightness）**：50-65% 隨機
- **每次頁面載入都會重新生成隨機色彩**

---

## 💻 管理功能

登入管理員帳號後：

1. 點擊頂部工具列的 **「編輯分享連結」** 按鈕
2. 在彈出的管理視窗中：
   - **新增**：點擊「新增分享連結」按鈕
   - **編輯**：直接修改欄位內容
   - **刪除**：點擊項目右側的 × 按鈕
3. 完成後點擊 **「儲存」** 按鈕
4. 資料會自動同步到 Firebase Firestore

---

## 📱 響應式斷點

| 螢幕寬度 | 每列數量 | 間距 | 圖標尺寸 |
|----------|---------|------|----------|
| > 768px  | 5 個    | 1rem  | 標準 |
| ≤ 768px  | 5 個    | 0.8rem | 標準 |
| ≤ 600px  | 4 個    | 0.7rem | 稍小 |
| ≤ 500px  | 3 個    | 0.6rem | 更小 |
| ≤ 400px  | 3 個    | 0.5rem | 最小 |

---

## ✅ 測試步驟

### 1. 新增測試資料
在 Firebase Console 新增至少 3-5 個分享連結

### 2. 檢查顯示
- 重新整理頁面
- 確認圖標在頭像下方正確顯示
- 確認每個圖標有不同的背景色

### 3. 測試互動
- **Hover**：滑鼠移到圖標，應該顯示說明文字
- **點擊**：點擊圖標，應該開新視窗到目標網址
- **響應式**：調整瀏覽器寬度，確認網格自動調整

### 4. 測試管理功能（需登入）
- 點擊「編輯分享連結」按鈕
- 新增、編輯、刪除分享連結
- 儲存後確認畫面更新
- 重新整理頁面確認資料已同步至 Firebase

---

## 🐛 常見問題

### Q: 圖標沒有顯示？
A: 檢查 Firebase 中是否已正確新增 `shareLinks` 陣列，且至少有一個項目。

### Q: 點擊圖標沒反應？
A: 確認 `url` 欄位包含完整網址（http:// 或 https://）。

### Q: 中文名稱顯示不正確？
A: 確認 Firebase 資料編碼為 UTF-8，且名稱欄位正確儲存中文字元。

### Q: 顏色每次都一樣？
A: 這是正常的，顏色在頁面載入時隨機生成。重新整理頁面會產生新的隨機色彩。

---

## 📚 相關檔案

- **HTML**: `index.html` (第 94-97 行)
- **CSS**: `css/style.css` (第 2056-2302 行)
- **JavaScript**: `js/main.js` (第 182-188, 843-901, 1804-1860 行)

---

## 🎉 完成！

設定完成後，分享連結區塊會自動顯示在頁面左側，為訪客提供快速訪問你的社群平台與專業網站的入口。
