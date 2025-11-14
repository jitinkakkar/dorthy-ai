# 🚂 Railway Deployment Guide

This guide walks you through deploying Dorthy AI on Railway from your GitHub repository.

---

## ✅ Prerequisites

Before deploying, ensure you have:
- ✅ Railway account ([sign up here](https://railway.app))
- ✅ OpenAI API key (`OPENAI_API_KEY`)
- ✅ Vector Store ID (`VECTOR_STORE_ID`)
- ✅ GitHub repository pushed with latest code

---

## 📦 Step 1: Create New Project

1. Log in to [Railway](https://railway.app)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Authorize Railway to access your GitHub account
5. Select the **`dorthy-ai`** repository

Railway will automatically detect both services thanks to the `railway.toml` configuration file:
- **dorthy-backend** (Python/FastAPI)
- **dorthy-frontend** (Node.js/Vite)

---

## 🔐 Step 2: Configure Backend Environment Variables

Click on the **dorthy-backend** service and add the following environment variables:

### Required Variables:
```bash
OPENAI_API_KEY=sk-proj-your-actual-api-key-here
VECTOR_STORE_ID=vs_your-vector-store-id-here
```

### How to Add:
1. Click on **dorthy-backend** service
2. Go to **Variables** tab
3. Click **"New Variable"**
4. Add each variable name and value
5. Click **"Deploy"** to apply changes

---

## 🌐 Step 3: Configure Frontend Environment Variables

Click on the **dorthy-frontend** service and add:

### Required Variable:
```bash
BACKEND_URL=https://dorthy-backend-production.up.railway.app
```

**⚠️ Important:** Replace the URL above with your actual backend service URL from Railway.

### How to Find Backend URL:
1. Click on **dorthy-backend** service
2. Go to **Settings** → **Domains**
3. Copy the generated Railway URL (e.g., `https://dorthy-backend-production.up.railway.app`)
4. Add it to frontend's `BACKEND_URL` variable

### Optional (for local dev):
```bash
VITE_CHATKIT_API_DOMAIN_KEY=domain_pk_localhost_dev
```

---

## 🎯 Step 4: Get ChatKit Domain Key (Production)

For production deployment with ChatKit, you need to allowlist your domain:

1. Go to [OpenAI Domain Allowlist](https://platform.openai.com/settings/organization/security/domain-allowlist)
2. Click **"Add Domain"**
3. Enter your Railway frontend domain (e.g., `dorthy-frontend-production.up.railway.app`)
4. Copy the generated `domain_pk_...` key
5. Add it to your frontend environment variables:
   ```bash
   VITE_CHATKIT_API_DOMAIN_KEY=domain_pk_your-actual-key-here
   ```

---

## 🚀 Step 5: Deploy!

Railway will automatically build and deploy both services. You can monitor the deployment in the **Deployments** tab.

### Deployment Process:
1. **Backend:**
   - Installs Python dependencies with `uv sync`
   - Starts FastAPI server on port assigned by Railway
   - Health check available at `/health`

2. **Frontend:**
   - Installs Node.js dependencies with `npm install`
   - Builds production assets with `npm run build`
   - Serves with Vite preview server

---

## 🔍 Step 6: Verify Deployment

### Check Backend:
Visit: `https://your-backend-url.railway.app/health`

Expected response:
```json
{"status": "healthy"}
```

### Check Frontend:
Visit: `https://your-frontend-url.railway.app`

You should see the Dorthy AI chat interface.

---

## 📝 Step 7: Custom Domain (Optional)

To use a custom domain:

1. Go to your service **Settings** → **Domains**
2. Click **"Custom Domain"**
3. Enter your domain (e.g., `dorthy.yourdomain.com`)
4. Add the CNAME record to your DNS provider:
   ```
   CNAME dorthy -> your-service.railway.app
   ```
5. Wait for DNS propagation (5-60 minutes)
6. Update your ChatKit domain allowlist with the new domain

---

## 🔄 Automatic Deployments

Railway automatically deploys on every push to your main branch!

To trigger a new deployment:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

---

## 🐛 Troubleshooting

### Backend Issues:

**Error: "OPENAI_API_KEY not set"**
- Check that environment variables are set in Railway dashboard
- Redeploy after adding variables

**Error: "Health check timeout"**
- Check backend logs in Railway dashboard
- Ensure port binding is correct (`--port $PORT`)

### Frontend Issues:

**Blank screen or CORS errors:**
- Ensure `BACKEND_URL` points to correct backend service
- Check that both services are deployed and running

**ChatKit domain error:**
- Add your Railway domain to OpenAI's domain allowlist
- Set `VITE_CHATKIT_API_DOMAIN_KEY` environment variable

### View Logs:
1. Click on the service having issues
2. Go to **Deployments** tab
3. Click on the latest deployment
4. View real-time logs

---

## 💰 Pricing

Railway offers:
- **Hobby Plan:** $5/month + usage
- **Free Trial:** $5 credit for new accounts

Estimated monthly cost: ~$10-20 depending on traffic

---

## 📚 Additional Resources

- [Railway Documentation](https://docs.railway.app/)
- [OpenAI ChatKit Docs](https://platform.openai.com/docs/guides/chatkit)
- [Project README](./README.md)
- [Setup Guide](./SETUP_GUIDE.md)

---

## ✅ Deployment Checklist

- [ ] Railway account created
- [ ] GitHub repository connected
- [ ] Backend environment variables set (`OPENAI_API_KEY`, `VECTOR_STORE_ID`)
- [ ] Frontend environment variables set (`BACKEND_URL`)
- [ ] ChatKit domain allowlisted and key added
- [ ] Both services deployed successfully
- [ ] Backend health check passes
- [ ] Frontend loads and chatbot works
- [ ] Custom domain configured (optional)

---

**Need help?** Open an issue or check the Railway logs for detailed error messages.

