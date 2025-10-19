# Firebase 經歷新增「職務」欄位設定指南

## 目前的資料結構

目前經歷（experience）包含：
- `company`（公司名稱）
- `years`（年資）
- `skills`（技能標籤陣列）

## 新增「職務」欄位

### 1. 進入 Firebase Console

1. 前往 https://console.firebase.google.com/
2. 選擇你的專案
3. 點擊左側選單的「Firestore Database」

### 2. 編輯現有資料

#### 方式一：透過 Firebase Console 手動編輯

1. 找到你的文件（document），通常路徑是：
   ```
   portfolios/{你的文件ID}
   ```

2. 找到 `aboutMe` 欄位，展開它

3. 找到 `experiences` 陣列，展開它

4. 對每一個經歷項目新增 `position` 欄位：
   - 點擊該經歷項目旁的「＋」圖示
   - 欄位名稱：`position`
   - 類型：`string`
   - 值：輸入職務名稱（例如：`Senior DevOps Engineer`）

#### 範例資料結構

新增後的每個經歷項目應該看起來像這樣：

```
experiences (array)
  └─ 0 (map)
      ├─ id: "exp-1"
      ├─ company: "某某公司"
      ├─ position: "資深雲端工程師"  ← 新增這個欄位
      ├─ years: "2020-2023"
      └─ skills (array)
          ├─ 0: "Kubernetes"
          ├─ 1: "Docker"
          └─ 2: "AWS"
```

### 3. 完整範例資料

```json
{
  "aboutMe": {
    "location": "台北市, 台灣",
    "experiences": [
      {
        "id": "exp-1",
        "company": "Google",
        "position": "Senior DevOps Engineer",
        "years": "2020-2023",
        "skills": ["Kubernetes", "Docker", "AWS"]
      },
      {
        "id": "exp-2",
        "company": "Microsoft",
        "position": "Cloud Solutions Architect",
        "years": "2018-2020",
        "skills": ["Azure", "Terraform", "Python"]
      }
    ],
    "education": [...],
    "certificates": [...],
    "websites": [...]
  }
}
```

## 欄位說明

| 欄位名稱 | 類型 | 必填 | 說明 | 範例 |
|---------|------|------|------|------|
| `id` | string | 是 | 唯一識別碼 | "exp-1" |
| `company` | string | 是 | 公司名稱 | "Google" |
| `position` | string | 是 | 職務名稱 | "Senior DevOps Engineer" |
| `years` | string | 是 | 任職年份 | "2020-2023" |
| `skills` | array | 否 | 技能標籤陣列 | ["Kubernetes", "Docker"] |

## 測試檢查清單

完成設定後，請檢查：

- [ ] 每個經歷項目都有 `position` 欄位
- [ ] `position` 欄位的值是字串（string）類型
- [ ] 重新載入網頁後，可以在「編輯關於我」看到職務欄位
- [ ] 可以正常編輯和儲存職務資訊
- [ ] 前台顯示正常（公司 - 職務 - 年資格式）

## 常見問題

### Q: 如果我有多筆經歷資料怎麼辦？
A: 需要為每一筆經歷都新增 `position` 欄位。

### Q: 舊的經歷沒有 position 欄位會怎樣？
A: 程式會自動處理，顯示為空字串，但建議補上完整資料。

### Q: 可以用中文職務名稱嗎？
A: 可以，支援中英文。

### Q: position 可以留空嗎？
A: 技術上可以，但建議填寫完整資訊以獲得最佳顯示效果。

## 下一步

完成 Firebase 設定後，前端程式碼也需要相應修改才能顯示和編輯職務欄位。
