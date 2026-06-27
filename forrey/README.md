# 🏥 Trafalgar — Shifohona Boshqaruv Tizimi (Backend)

---

## 📌 English (For AI / Developer)

### Project Overview
**Trafalgar** is a hospital management system backend API built with **Node.js**, **Express**, and **MongoDB (Mongoose)**. It manages the complete patient flow from arrival to payment and prescription.

### Three Frontends (separate React+Vite apps — DO NOT TOUCH)
| Folder | Purpose |
|--------|--------|
| `admin/` | Admin & Reception panel — register patients, assign doctors, handle payments |
| `doctors/` | Doctor panel — view appointments, write diagnoses & prescriptions |
| `kassa/` | Cash register panel — payment handling |

### Backend Architecture

```
Trafalgar/backend/
├── .env                          ← Secret keys (JWT_SECRET, MONGO_URI, etc.)
├── index.js                      ← Entry point — Express app setup
├── package.json
└── src/
    ├── config/
    │   └── db.js                 ← MongoDB connection (Mongoose)
    ├── models/
    │   ├── user.model.js         ← Admin, Doctor, Reception accounts
    │   ├── patient.model.js      ← Patient records (NO login)
    │   ├── doctor.model.js       ← Doctor profiles + schedule
    │   ├── appointment.model.js  ← Appointments (patient + doctor + time)
    │   └── prescription.model.js ← Prescriptions (diagnosis + medicines + cost)
    ├── controllers/
    │   ├── auth.controller.js    ← Register, Login, Refresh, Logout (bcrypt + JWT)
    │   ├── patient.controller.js ← CRUD for patients
    │   ├── doctor.controller.js  ← CRUD for doctors + schedule management
    │   ├── appointment.controller.js ← Create & list appointments
    │   └── prescription.controller.js ← Create prescriptions, handle payments
    ├── middlewares/
    │   └── auth.middleware.js    ← Token verification (protect) + Role check (authorize)
    └── routes/
        ├── index.js              ← Merge all routes
        ├── auth.routes.js        ← /api/auth
        ├── patient.routes.js     ← /api/patients
        ├── doctor.routes.js      ← /api/doctors
        ├── appointment.routes.js ← /api/appointments
        └── prescription.routes.js ← /api/prescriptions
```

### Key Design Decisions

1. **Models contain NO logic** — only Mongoose schemas. No bcrypt, no JWT.
2. **Controllers contain ALL business logic** — bcrypt hashing, JWT creation, validation. No separate utils/helpers folder.
3. **Middleware as gatekeeper** — `protect` checks JWT, `authorize` checks roles. Applied per-route.
4. **JWT dual-token system** — accessToken (15 min) + refreshToken (7 days, stored in DB).
5. **Patients have NO accounts** — only Admin, Doctor, Reception have User accounts.
6. **Admin creates Doctor accounts** — Doctors get credentials from Admin.

### Models (5 total)

| Model | Fields | Purpose |
|-------|--------|--------|
| **User** | name, email, password(bcrypt), role, refreshToken | Auth accounts |
| **Patient** | fullName, phone, birthDate, gender, illness, specialty, status | Patient records |
| **Doctor** | fullName, specialty, room, userId→User, schedule[{date,time,isBusy}] | Doctor profiles |
| **Appointment** | patient→Patient, doctor→Doctor, date, time, status | Appointment linking |
| **Prescription** | appointment→Appointment, patient→Patient, doctor→Doctor, diagnosis, medicines[{name,dosage,instructions,days}], tests[], totalCost, status | Doctor → Admin → Payment |

### API Endpoints (14 total)

| # | Method | URL | Who | What |
|---|--------|-----|-----|------|
| 01 | POST | /api/auth/register | Anyone | Create account |
| 02 | POST | /api/auth/login | Anyone | Get tokens |
| 03 | POST | /api/auth/refresh | Anyone | Refresh accessToken |
| 04 | POST | /api/doctors | Admin | Add doctor |
| 05 | POST | /api/doctors/:id/schedule | Admin | Add doctor schedule |
| 06 | POST | /api/patients | Admin/Reception | Register patient |
| 07 | GET | /api/patients?status=kutmoqda | Admin/Reception | Queue 1: waiting patients |
| 08 | GET | /api/patients/search?q=name | Admin/Reception | Search patients |
| 09 | GET | /api/doctors/search?specialty=X&date=Y | Admin/Reception | Find available doctors |
| 10 | POST | /api/appointments | Admin/Reception | ★ Assign patient to doctor |
| 11 | GET | /api/appointments | Doctor | Doctor sees their queue |
| 12 | POST | /api/prescriptions | Doctor | ★ Write prescription → Admin |
| 13 | GET | /api/prescriptions/pending | Admin/Reception | Queue 2: pending payments |
| 14 | PATCH | /api/prescriptions/:id/pay | Admin/Reception | ★ Mark as paid → Done |

### Patient Flow (5 steps)

```
🚪 1. Patient arrives → Admin records (name, phone, illness, etc.)
📋 2. Admin registers patient → assigns specialty → finds free doctor → books appointment
👨‍⚕️ 3. Doctor examines patient → diagnoses → prescribes medicines
📤 4. Doctor writes prescription with cost → sends to Admin
💳 5. Admin shows prescription → patient pays → status=to'landi → prescription given ✓
```

### Admin sees TWO queues:
- **Queue 1** (`/api/patients?status=kutmoqda`) — New patients waiting for doctor assignment
- **Queue 2** (`/api/prescriptions/pending`) — Patients who finished consultation, waiting to pay

### Auth Rules
- `POST /api/auth/register` — open (no token needed)
- `POST /api/auth/login` — open
- `POST /api/auth/refresh` — open (sends refreshToken in body)
- `POST /api/auth/logout` — protected (needs accessToken)
- Patient routes → admin, reception only
- Doctor create/schedule → admin only
- Appointment create → admin, reception only
- Prescription create → doctor only
- Prescription pending/pay → admin, reception only

### Environment Variables (.env)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/shifohona
ACCESS_TOKEN_SECRET=your-access-secret-key
REFRESH_TOKEN_SECRET=your-refresh-secret-key
```

### Tech Stack
- **Runtime:** Node.js
- **Framework:** Express 5
- **Database:** MongoDB + Mongoose 9
- **Auth:** JWT + bcrypt
- **Other:** cors, dotenv

---

## 📌 O'zbekcha (Men uchun — Foydalanuvchi)

### Loyiha nima?
**Trafalgar — Shifohona Boshqaruv Tizimi**. Bu backend API klinika yoki shifohonani raqamlashtirish uchun kerak. Bemor kelganidan to'lov qilguniga qadar barcha jarayonni boshqaradi.

### Tizimda kimlar bor va ular nima qiladi?

👤 **Admin (Reception)** — Klinikaning eshigi. Vazifalari:
- Bemorlarni ro'yxatga olish (ism, telefon, kasallik)
- Bemor kasalligiga qarab, tegishli shifokorga yozish
- Shifokordan kelgan retseptni qabul qilish
- Bemor to'lovini qabul qilish va retsept berish

👨‍⚕️ **Shifokor** — Klinikaning mutaxassisi. Vazifalari:
- O'ziga yozilgan bemorlar ro'yxatini ko'rish
- Bemor bilan gaplashish, tashxis qo'yish
- Dorilar va tahlillarni belgilash
- Retseptni adminga yuborish

🚶 **Bemor** — Klinikaga kelgan odam. Login/register shart emas!

### 5 qadamlik jarayon:

1️⃣ Bemor keladi → Admin ma'lumotlarini yozadi (ism, tel, kasallik)
2️⃣ Admin bemorni ro'yxatga oladi → kasallikka mos shifokor topadi → vaqt belgilaydi
3️⃣ Shifokor bemorni ko'radi → tashxis qo'yadi → dori yozadi
4️⃣ Shifokor retseptni kassaga yuboradi (tashxis + dorilar + narx)
5️⃣ kassa retseptni ko'rsatadi → bemor to'laydi → retsept beriladi ✅

### Admin ikkita navbat ko'radi:
- **1-navbat:** Hali shifokorga yuborilmagan bemorlar
- **2-navbat:** Shifokor ko'rigi uhcunc kutib turgan bemorlar
- **3-navbat:** Shifokor ko'rib bo'lgan, to'lov kutayotgan bemorlar

### Qaysi fayl nima uchun kerak?

| Fayl | Nima qiladi? |
|------|-------------|
| `index.js` | Dastur ishga tushadigan joy. Express server + middleware ulash |
| `config/db.js` | MongoDB bazaga ulanish |
| `models/user.model.js` | Admin, shifokor, reception akkauntlari qanday saqlanishi |
| `models/patient.model.js` | Bemor haqidagi ma'lumotlar qanday saqlanishi |
| `models/doctor.model.js` | Shifokor profili va ish jadvali qanday saqlanishi |
| `models/appointment.model.js` | Qabul (bemor+shifokor+vaqt) qanday saqlanishi |
| `models/prescription.model.js` | Retsept (tashxis+dori+narx) qanday saqlanishi |
| `controllers/auth.controller.js` | Ro'yxatdan o'tish, kirish, token yangilash |
| `controllers/patient.controller.js` | Bemor qo'shish, qidirish, ro'yxatini olish |
| `controllers/doctor.controller.js` | Shifokor qo'shish, jadval ber
