# 🌱 AgriGuide: Smart Agriculture Platform

AgriGuide is a modern, full-stack web application designed to empower farmers, agri-entrepreneurs, and consumers. It provides a seamless platform for crop management, marketplace trading, weather insights, and more—all in one place.

---

## 🚀 Features

- **Marketplace:** Buy and sell agricultural products with real-time pricing.
- **Crop Management:** Access crop data, growth stages, and expert recommendations.
- **Weather Intelligence:** Get hyperlocal weather forecasts and alerts.
- **Order & Cart System:** Smooth e-commerce experience for agri-products.
- **Admin Dashboard:** Powerful tools for platform management and analytics.
- **Secure Authentication:** User and admin roles, protected routes.
- **Payment Integration:** Razorpay for secure online payments.

---

## 🗂️ File Structure

```text
project/
├── BACKEND/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── createAdminUser.js
│   ├── server.js
│   └── package.json
├── FRONTEND/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── config/
│   │   ├── contexts/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── index.html
│   └── tailwind.config.js
```

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Payments:** Razorpay
- **Cloud Services:** Cloudinary (images), Nodemailer (emails)
- **Deployment:** Vercel

---

## ⚡ Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd project
```

### 2. Setup Environment Variables
- Create a `.env` file in both `BACKEND/` and `FRONTEND/` as needed.
- Example for backend:
  ```env
  MONGO_URI=your_mongodb_uri
  JWT_SECRET=your_jwt_secret
  ADMIN_EMAIL=youradmin@example.com
  ADMIN_PASSWORD=yourpassword
  RAZORPAY_KEY_ID=your_razorpay_key_id
  RAZORPAY_KEY_SECRET=your_razorpay_key_secret
  EMAIL_USER=your_email@example.com
  EMAIL_PASS=your_email_password
  ```

### 3. Install Dependencies
```bash
cd BACKEND && npm install
cd ../FRONTEND && npm install
```

### 4. Run the Application
- **Backend:**
  ```bash
  cd BACKEND
  npm start
  ```
- **Frontend:**
  ```bash
  cd FRONTEND
  npm run dev
  ```

### 5. Create Admin User
- Run the script to create an admin user:
  ```bash
  cd BACKEND
  node createAdminUser.js
  ```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgements

- Thanks to all contributors and the open-source community! 