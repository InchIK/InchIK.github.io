# **個人履歷網站 - 技術交接文件**

## 1. 專案總覽 (Project Overview)

本專案是一個動態的個人履歷網頁，旨在展示個人的專業技能、專案經驗與個人簡介。

此專案前端採用純 HTML/CSS/JavaScript 實現，並巧妙地整合了 **Firebase** 作為後端服務 (Backend-as-a-Service, BaaS)，實現了內容的動態管理和即時更新，同時也設計了離線備援機制。

**核心特色：**

*   **動態內容管理**：管理員登入後，可以直接在網頁上編輯個人資料、新增/修改/刪除技能區塊與相關專案。
*   **可管理的技能標籤**：在獨立的「技能列表」區塊中，以彩色橢圓形狀展示關鍵技能，並可透過管理介面即時增刪。
*   **即時資料庫**：所有內容主要儲存在 Firestore 中，任何修改都會即時同步。
*   **備援機制**：當 Firebase 無法連線時，系統會自動降級讀取本地的 `db/data.json` 檔案，確保網站在多數情況下依然能正常顯示。
*   **響應式設計**：網頁佈局能適應從桌面到手機等不同尺寸的裝置。

## 2. 技術架構 (Technical Architecture)

本專案為一個**無伺服器 (Serverless)** 架構的單頁應用 (SPA)，前端直接與後端服務溝通。

### **前端 (Frontend)**

*   **HTML5**: 負責網頁的整體結構，包含所有的 UI 元素與互動視窗 (Modal)。
*   **CSS3**: 負責所有視覺樣式與響應式設計。大量使用 CSS 變數 (`:root`) 來管理顏色與尺寸，便於統一修改風格。
*   **JavaScript (ESM)**:
    *   所有前端邏輯都集中在 `js/main.js` 中。
    *   採用現代 JavaScript 的模組化 (`import`) 與非同步語法 (`async/await`)。
    *   不依賴任何大型前端框架 (如 React, Vue)，直接操作 DOM 來渲染畫面。

### **後端與資料庫 (Backend & Database)**

本專案完全依賴 **Firebase** 提供的服務。

*   **Firebase Authentication**:
    *   **用途**: 處理管理員登入驗證。
    *   **機制**: 採用 Google 帳號彈出式視窗登入。在 `js/main.js` 中，有一個 `ADMIN_EMAIL` 常數。只有使用此信箱登入的 Google 帳號才會被授予管理員權限。
*   **Firestore (NoSQL 資料庫)**:
    *   **用途**: 作為主要的資料儲存中心。
    *   **結構**: 所有網站內容（個人資料、技能、專案等）都儲存在一個名為 `resume` 的 Collection 中的單一文件 `content` 內。這種設計簡化了資料讀取，一次請求即可獲取所有頁面所需內容。

### **資料流 (Data Flow)**

1.  **載入**: 瀏覽器載入 `index.html`，並執行 `js/main.js`。
2.  **資料獲取 (`hydrateData` 函式)**:
    *   **優先嘗試**: `loadFirestoreData` 函式會嘗試從 Firestore 讀取 `resume/content` 文件。
    *   **備援 #1**: 如果讀取 Firestore 失敗（例如網路問題或 Firebase 配置錯誤），`fetchStaticData` 函式會接著嘗試讀取專案內的 `db/data.json` 檔案。
    *   **備援 #2**: 如果連 `data.json` 也讀取失敗，系統會使用寫死在 `js/main.js` 裡的預設內容。
3.  **渲染**: 獲取資料後，`renderProfile()`、`renderSkillTags()` 和 `renderSkills()` 等函式會將資料動態渲染到 HTML 頁面上。
4.  **管理員操作**:
    *   管理員登入後，頁面會顯示「編輯」、「新增」等按鈕。
    *   點擊按鈕會觸發對應的互動視窗。
    *   在視窗中儲存變更後，`persistData` 函式會被呼叫。
    *   `persistData` 會將更新後的完整資料物件寫回 **Firestore**，完成資料同步。
    *   最後，重新渲染頁面 UI 以顯示最新內容。

## 3. 專案結構 (Project Structure)

```
InchIK.github.io/
├─── index.html             # 主 HTML 檔案，包含所有頁面結構與 Modal
├─── css/
│    └─── style.css         # 唯一的 CSS 檔案，包含所有樣式
├─── js/
│    └─── main.js           # 核心 JavaScript 檔案，包含所有應用程式邏輯
├─── db/
│    ├─── auth.json         # (未使用於主要邏輯) 可能是測試用的假資料
│    └─── data.json         # 靜態備援資料檔案
└─── assets/
     └─── photos/           # 存放所有圖片資源
```

## 4. 核心程式邏輯 (`js/main.js`)

這是整個專案的核心，以下是主要功能區塊的解析：

*   **常數與 DOM 元素**:
    *   檔案開頭定義了所有重要的常數（如 `ADMIN_EMAIL`）和獲取的 DOM 元素節點。
*   **資料初始化 (`hydrateData`, `loadRemoteData`)**:
    *   這是程式的進入點，負責協調從 Firestore 或靜態檔案載入資料的整個流程。
*   **資料正規化 (`normalizeData`, `normalizeSkills`, etc.)**:
    *   這些函式確保不論資料來源為何（Firestore, JSON, 或預設值），其物件結構都是一致且安全的，避免因缺少某些欄位而導致錯誤。
*   **渲染函式 (`renderProfile`, `renderSkills`, `renderSkillTags`)**:
    *   負責將資料轉換為 HTML 字串或 DOM 元素，並更新到頁面的對應區塊。
    *   `renderSkillTags` 會為每個標籤產生隨機背景色。
*   **管理員 UI (`syncAdminUI`)**:
    *   根據 `isAdmin` 這個布林值，來決定是否顯示管理員工具列與相關按鈕。這是在登入狀態改變時會被呼叫的關鍵函式。
*   **Firebase 互動**:
    *   `onAuthStateChanged`: 監聽 Firebase 的登入狀態，並據此更新 `isAdmin` 狀態。
    *   `signInWithPopup`, `signOut`: 處理登入與登出流程。
    *   `syncFirestoreData`: 負責將本地的資料變更寫回 Firestore。
*   **互動視窗 (Modal) 邏輯**:
    *   檔案後半部充滿了對各個 Modal（如個人資料、技能、專案、技能標籤）的事件監聽器。
    *   **開啟**: 點擊編輯/新增按鈕時，會將現有資料填入表單，並呼叫 `openDialog` 顯示視窗。
    *   **儲存**: 提交表單時，會從輸入框收集新資料，更新記憶體中的全域資料物件，呼叫 `persistData` 存回後端，然後重新渲染 UI 並關閉視窗。

## 5. 資料模型 (Data Model)

儲存在 Firestore 和 `data.json` 中的資料結構是一致的。

```json
{
  "profile": {
    "name": "string",
    "email": "string",
    "summary": "string",
    "avatar": "string (url or path)"
  },
  "skillTags": [
    "string",
    "string"
  ],
  "skills": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "imageUrl": "string (url or path)",
      "projects": [
        {
          "id": "string",
          "name": "string",
          "summary": "string (supports Markdown)",
          "createdAt": "ISO_string_date",
          "updatedAt": "ISO_string_date",
          "media": [
            {
              "id": "string",
              "type": "'image' | 'file'",
              "url": "string",
              "label": "string"
            }
          ]
        }
      ]
    }
  ]
}
```

## 6. 如何接手與開發 (Getting Started)

1.  **環境設定**:
    *   由於這是純前端專案，您只需要一個能提供本地服務的工具（例如 VS Code 的 `Live Server` 擴充功能）即可在本地端運行 `index.html`。
2.  **成為管理員**:
    *   打開 `js/main.js` 檔案。
    *   找到 `const ADMIN_EMAIL = "kungyc@gmail.com";` 這一行。
    *   將其信箱改為您自己的 Google 帳號信箱。
    *   在網頁上點擊「管理登入」，並使用您的 Google 帳號登入，即可獲得管理員權限。
3.  **Firebase 配置**:
    *   `index.html` 的 `<head>` 區塊中包含了 Firebase 的設定物件 `firebaseConfig`。如果未來需要更換 Firebase 專案，請在此處更新對應的配置金鑰。
4.  **開發流程**:
    *   **修改內容**: 建議直接透過管理員登入後在 UI 上進行操作，資料會自動同步到 Firestore。
        *   **編輯技能標籤**: 點擊管理列的「編輯技能標籤」按鈕進行增刪。
        *   **編輯其他區塊**: 透過對應的編輯按鈕進行操作。
    *   **修改樣式**: 所有樣式都在 `css/style.css`。
    *   **修改功能**: 所有互動邏輯都在 `js/main.js`。
    *   **更新備援資料**: 如果您透過 Firebase 更新了大量內容，建議手動將 Firestore `resume/content` 文件中的 JSON 內容複製一份，貼到 `db/data.json` 中，以確保備援資料也是最新的。