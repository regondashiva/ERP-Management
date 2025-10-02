# 🚀 Deployment Guide - ERP Management System

## Quick Deploy Options

### Option 1: Render.com (Recommended - FREE)

**Best for:** Full-stack apps with backend + frontend

#### Steps:
1. **Go to** [render.com](https://render.com) and sign up
2. **Connect your GitHub repository:** `regondashiva/ERP-Management`
3. **Create a Web Service for Backend:**
   - Name: `erp-management-api`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm run server`
   - Add Environment Variable:
     - `PORT` = `5000`
     - `NODE_ENV` = `production`

4. **Create a Static Site for Frontend:**
   - Name: `erp-management-client`
   - Build Command: `cd client && npm install && npm run build`
   - Publish Directory: `client/build`
   - Add Environment Variable:
     - `REACT_APP_API_URL` = `https://erp-management-api.onrender.com`

5. **Done!** Your app will be live at:
   - Backend: `https://erp-management-api.onrender.com`
   - Frontend: `https://erp-management-client.onrender.com`

---

### Option 2: Railway.app (Easy Deploy)

**Best for:** Quick deployment with automatic setup

#### Steps:
1. **Go to** [railway.app](https://railway.app)
2. **Click "New Project" → "Deploy from GitHub repo"**
3. **Select:** `regondashiva/ERP-Management`
4. **Railway will auto-detect** Node.js and deploy both services
5. **Add Environment Variables:**
   - `PORT` = `5000`
   - `NODE_ENV` = `production`

---

### Option 3: Vercel (Frontend) + Render (Backend)

**Best for:** Optimized frontend performance

#### Frontend on Vercel:
1. **Go to** [vercel.com](https://vercel.com)
2. **Import your GitHub repo:** `regondashiva/ERP-Management`
3. **Configure:**
   - Framework Preset: `Create React App`
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `build`
4. **Add Environment Variable:**
   - `REACT_APP_API_URL` = `https://your-backend-url.onrender.com`

#### Backend on Render:
- Follow the backend steps from Option 1

---

### Option 4: Heroku (Classic Option)

**Note:** Heroku no longer has a free tier, but it's still popular

#### Steps:
1. **Install Heroku CLI**
2. **Run these commands:**
```bash
heroku login
heroku create erp-management-api
git push heroku main
```

---

## 📝 Important Notes

### Before Deploying:

1. **Update API URL in Frontend:**
   - Edit `client/src/api.js`
   - Change `baseURL` to your deployed backend URL

2. **Environment Variables Needed:**
   - `PORT` (backend)
   - `NODE_ENV=production` (backend)
   - `REACT_APP_API_URL` (frontend)

3. **Database:**
   - Currently using JSON files (works for demo)
   - For production, consider MongoDB/PostgreSQL

### After Deployment:

1. **Test Login Credentials:**
   - Admin: `admin@college.edu` / `admin123`
   - Staff: `staff@college.edu` / `staff123`
   - Student: `student@college.edu` / `student123`

2. **Check CORS Settings:**
   - Update `server/index.js` if needed
   - Add your frontend URL to allowed origins

---

## 🔧 Quick Fixes

### If Backend Fails:
- Check logs for errors
- Verify `PORT` environment variable
- Ensure all dependencies are in `package.json`

### If Frontend Can't Connect:
- Verify `REACT_APP_API_URL` is correct
- Check CORS settings in backend
- Ensure backend is running

---

## 🎯 Recommended: Render.com

**Why?**
- ✅ Free tier available
- ✅ Easy setup
- ✅ Auto-deploy from GitHub
- ✅ Supports both frontend & backend
- ✅ SSL certificates included
- ✅ Good performance

**Deployment Time:** ~5-10 minutes

---

## 📞 Need Help?

If you encounter issues:
1. Check deployment logs
2. Verify environment variables
3. Test locally first with `npm run dev`
4. Check GitHub repository is public

---

**Your GitHub Repo:** https://github.com/regondashiva/ERP-Management
