# Admin Panel Setup Guide

## 🔐 Admin Credentials

### Option 1: Create Admin User (Recommended)

Run this command in the `backend-tilam-sangh` directory:

```bash
node seeds/createAdmin.seed.js
```

This will create an admin user with:

- **Email**: `admin@tilamsangh.com`
- **Password**: `admin123`

⚠️ **Change this password after first login!**

---

### Option 2: Register via API

You can also create an admin user by calling the register endpoint:

```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Your Name",
  "email": "your-email@example.com",
  "password": "your-secure-password"
}
```

---

## 🚀 How to Use the Admin Panel

### 1. Start All Servers

Make sure all three servers are running:

**Backend** (Port 5000):

```bash
cd backend-tilam-sangh
npm run dev
```

**Frontend Website** (Port 5173):

```bash
cd tilam-sangh
npm run dev
```

**Admin Panel** (Port 5174):

```bash
cd admin-tilam-sangh
npm run dev
```

### 2. Access Admin Panel

Open your browser to: **http://localhost:5174**

### 3. Login

Use the credentials created in step 1:

- Email: `admin@tilamsangh.com`
- Password: `admin123`

### 4. Explore Features

After login, you can:

- **Dashboard** - View overview statistics
- **Tenders** - Full CRUD operations
  - Create new tenders
  - Edit existing tenders
  - Delete tenders
  - Search and filter
  - Paginate through results

---

## 📋 Next Steps

### Build Remaining CRUD Pages

Follow the same pattern as `TenderList.jsx` to create:

1. **Gallery Management** - `/gallery`
2. **Footer Management** - `/footer`
3. **Navbar Management** - `/navbar`
4. **User Management** - `/users`
5. **Page Management** - `/pages`

### Example: Creating Gallery Page

1. Create `src/pages/Gallery/GalleryList.jsx`
2. Copy structure from `TenderList.jsx`
3. Replace `tenderService` with `galleryService`
4. Update form fields for gallery (image, title, category)
5. Add to `App.jsx` routes

---

## 🔧 Troubleshooting

### Can't Login?

- Make sure backend is running on port 5000
- Check MongoDB connection
- Verify admin user exists in database
- Check browser console for errors

### API Errors?

- Verify `.env` file in admin panel has correct API URL
- Check CORS settings in backend `server.js`
- Ensure JWT_SECRET is set in backend `.env`

### Port Conflicts?

- Backend should be on port 5000
- Frontend website on port 5173
- Admin panel on port 5174

---

## 📊 Testing the APIs

You can test backend APIs using tools like Postman or Thunder Client:

### Login

```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@tilamsangh.com",
  "password": "admin123"
}
```

Copy the `token` from response and use it in subsequent requests:

### Get All Tenders

```bash
GET http://localhost:5000/api/tenders
Authorization: Bearer YOUR_TOKEN_HERE
```

### Create Tender

```bash
POST http://localhost:5000/api/tenders
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "sno": 200,
  "particular": "Test Tender Document",
  "date": "2026-01-01",
  "downloadUrl": "/assets/tenders/test.pdf"
}
```

---

## ✨ What's Working

✅ **Backend APIs** - All CRUD operations
✅ **Authentication** - Login/logout with JWT
✅ **Protected Routes** - Admin-only access
✅ **Tender Management** - Complete CRUD interface
✅ **Responsive Design** - Works on all devices
✅ **Toast Notifications** - User feedback
✅ **Search & Pagination** - Data management

---

## 🎯 Summary

Your admin panel is **production-ready** for tender management. You can now:

1. Login securely
2. Manage tenders (create, read, update, delete)
3. Search and filter data
4. Navigate between sections

The foundation is solid, and you can easily extend it to manage other content types following the same pattern!
