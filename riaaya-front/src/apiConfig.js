// Production API URL for Railway deployment
export const API_URL = import.meta.env.VITE_API_URL || "https://riaaya-production.up.railway.app";
```

**The added comment will force Vite to generate a new hash.**

Commit: "Force rebuild with production API URL"

---

## 🔄 **Alternative: Check Railway Environment Variables**

Wait - let me check something. Go to Railway → **handsome-courtesy** → **Variables** tab

**Screenshot the Variables page again.** 

I want to make sure `VITE_API_URL` is **exactly**:
```
VITE_API_URL=https://riaaya-production.up.railway.app

