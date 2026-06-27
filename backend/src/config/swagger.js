const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '🏥 Shifohona Boshqaruv Tizimi API',
      version: '1.0.0',
      description: `
## Trafalgar — Shifohona (Kasalxona) Boshqaruv Tizimi

Bu API klinika yoki shifohonani raqamlashtirish uchun yaratilgan. Bemor kelganidan to'lov qilguniga qadar barcha jarayonni boshqaradi.

### Tizimda kimlar bor?
- **Admin / Reception** — Bemorni ro'yxatga oladi, shifokorga yozadi, to'lov qabul qiladi
- **Shifokor (Doctor)** — Bemorlarni ko'radi, tashxis qo'yadi, retsept yozadi
- **Bemor (Patient)** — Login/register shart emas! Admin tomonidan ro'yxatga olinadi

### 5 qadamlik jarayon:
1️⃣ Bemor keladi → Admin ma'lumotlarini yozadi
2️⃣ Admin bemorni shifokorga yozadi (ixtisoslik + vaqt)
3️⃣ Shifokor bemorni ko'radi, tashxis qo'yadi
4️⃣ Shifokor retseptni adminga yuboradi
5️⃣ Admin to'lovni qabul qiladi → retsept beriladi ✅

### Autentifikatsiya
- **JWT accessToken** (15 daqiqa) + **refreshToken** (7 kun)
- Header: \`Authorization: Bearer <token>\`
- Faqat **Admin**, **Shifokor**, **Reception** akkauntlarga ega
- Bemorlar login qilmaydi!
      `,
      contact: { name: 'Trafalgar Team' }
    },
    servers: [
      { url: 'http://localhost:5000', description: 'Local development' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Login qilib olingan accessToken: Bearer eyJhbGci...'
        }
      },
      schemas: {
        RegisterInput: {
          type: 'object',
          required: ['name', 'email', 'password', 'role'],
          properties: {
            name: { type: 'string', example: 'Adminbek' },
            email: { type: 'string', example: 'admin@shifohona.uz' },
            password: { type: 'string', example: 'parol123' },
            role: { type: 'string', enum: ['admin', 'doctor', 'reception'], example: 'admin' }
          }
        },
        LoginInput: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', example: 'admin@shifohona.uz' },
            password: { type: 'string', example: 'parol123' }
          }
        },
        RefreshInput: {
          type: 'object',
          required: ['refreshToken'],
          properties: {
            refreshToken: { type: 'string', example: 'eyJhbGciOiJSUzI1NiIs...' }
          }
        },
        PatientInput: {
          type: 'object',
          required: ['fullName', 'phone', 'illness'],
          properties: {
            fullName: { type: 'string', example: 'Ali Valiyev' },
            phone: { type: 'string', example: '+998901234567' },
            birthDate: { type: 'string', example: '1990-05-15' },
            gender: { type: 'string', enum: ['erkak', 'ayol'], example: 'erkak' },
            illness: { type: 'string', example: "Bosh og'rig'i, bosim ko'tarilgan" },
            specialty: { type: 'string', example: 'Kardiolog' }
          }
        },
        DoctorInput: {
          type: 'object',
          required: ['fullName', 'specialty', 'userId'],
          properties: {
            fullName: { type: 'string', example: 'Dr. Akbar Karimov' },
            specialty: { type: 'string', example: 'Kardiolog' },
            room: { type: 'string', example: '105' },
            userId: { type: 'string', example: '665abc123...' }
          }
        },
        ScheduleInput: {
          type: 'object',
          required: ['date', 'time'],
          properties: {
            date: { type: 'string', example: '2025-06-20' },
            time: { type: 'string', example: '09:00' }
          }
        },
        AppointmentInput: {
          type: 'object',
          required: ['patientId', 'doctorId', 'date', 'time'],
          properties: {
            patientId: { type: 'string', example: '665abc...' },
            doctorId: { type: 'string', example: '665def...' },
            date: { type: 'string', example: '2025-06-20' },
            time: { type: 'string', example: '09:00' }
          }
        },
        PrescriptionInput: {
          type: 'object',
          required: ['appointmentId', 'diagnosis', 'medicines', 'totalCost'],
          properties: {
            appointmentId: { type: 'string', example: '665ghi...' },
            diagnosis: { type: 'string', example: 'Arterial gipertenziya 1-daraja' },
            medicines: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string', example: 'Enalapril' },
                  dosage: { type: 'string', example: '5mg' },
                  instructions: { type: 'string', example: 'kuniga 2 marta' },
                  days: { type: 'number', example: 14 }
                }
              }
            },
            tests: { type: 'array', items: { type: 'string' }, example: ['Qon tahlili', 'EKG'] },
            totalCost: { type: 'number', example: 150000 },
            notes: { type: 'string', example: 'Tuzni kamaytiring, dam oling' }
          }
        }
      }
    },
    paths: {
      // ────────────────── AUTH ──────────────────
      '/api/auth/register': {
        post: {
          tags: ['Auth'],
          summary: 'Yangi admin/shifokor/reception akkaunt yaratish',
          description: 'Parol avtomatik bcrypt bilan hash qilinadi',
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/RegisterInput' } } } },
          responses: {
            201: { description: 'Foydalanuvchi yaratildi', content: { 'application/json': { schema: { type: 'object', properties: { success: { type: 'boolean', example: true }, message: { type: 'string' }, data: { type: 'object' } } } } } },
            400: { description: 'Bu email allaqachon mavjud' },
            500: { description: 'Server xatosi' }
          }
        }
      },
      '/api/auth/login': {
        post: {
          tags: ['Auth'],
          summary: 'Kirish — accessToken + refreshToken olish',
          description: 'Muvaffaqiyatli kirishda ikkala token va foydalanuvchi ma\'lumotlari qaytadi',
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginInput' } } } },
          responses: {
            200: { description: 'Tokenlar va foydalanuvchi ma\'lumotlari' },
            401: { description: 'Email yoki parol xato' }
          }
        }
      },
      '/api/auth/refresh': {
        post: {
          tags: ['Auth'],
          summary: 'Eskirgan accessToken ni yangilash',
          description: 'refreshToken yordamida yangi accessToken olish',
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/RefreshInput' } } } },
          responses: {
            200: { description: 'Yangi accessToken' },
            401: { description: 'Refresh token yaroqsiz yoki eskirdi' }
          }
        }
      },
      '/api/auth/logout': {
        post: {
          tags: ['Auth'],
          summary: 'Chiqish — refreshTokenni o\'chirish',
          description: 'Header da accessToken talab qilinadi',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'Chiqildi' },
            401: { description: 'Token yo\'q yoki yaroqsiz' }
          }
        }
      },

      // ────────────────── PATIENTS ──────────────────
      '/api/patients': {
        post: {
          tags: ['Patients'],
          summary: 'Yangi bemor ro\'yxatga olish (1-qadam)',
          description: 'Faqat Admin/Reception. Header: Bearer TOKEN',
          security: [{ bearerAuth: [] }],
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/PatientInput' } } } },
          responses: { 201: { description: 'Bemor yaratildi' }, 401: { description: 'Ruxsat yo\'q' } }
        },
        get: {
          tags: ['Patients'],
          summary: 'Bemorlar ro\'yxati (1-navbat: ?status=kutmoqda)',
          description: 'Faqat Admin/Reception. Filter: ?status=kutmoqda',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'status', in: 'query', schema: { type: 'string', enum: ['kutmoqda', 'yozilgan'] } }],
          responses: { 200: { description: 'Bemorlar ro\'yxati' } }
        }
      },
      '/api/patients/search': {
        get: {
          tags: ['Patients'],
          summary: 'Bemor qidirish (?q=Alisher)',
          description: 'Ism yoki telefon bo\'yicha qidirish',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'q', in: 'query', schema: { type: 'string' }, description: 'Qidiruv so\'zi' }],
          responses: { 200: { description: 'Topilgan bemorlar' } }
        }
      },
      '/api/patients/{id}': {
        get: {
          tags: ['Patients'],
          summary: 'Bitta bemorni olish',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Bemor ma\'lumotlari' }, 404: { description: 'Bemor topilmadi' } }
        }
      },

      // ────────────────── DOCTORS ──────────────────
      '/api/doctors': {
        post: {
          tags: ['Doctors'],
          summary: 'Yangi shifokor qo\'shish',
          description: 'Faqat Admin. Avval User yaratib, so\'ng Doctor profilini qo\'shing',
          security: [{ bearerAuth: [] }],
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/DoctorInput' } } } },
          responses: { 201: { description: 'Shifokor yaratildi' } }
        },
        get: {
          tags: ['Doctors'],
          summary: 'Barcha shifokorlar ro\'yxati',
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: 'Shifokorlar ro\'yxati' } }
        }
      },
      '/api/doctors/search': {
        get: {
          tags: ['Doctors'],
          summary: 'Ixtisoslik bo\'yicha qidirish (?specialty=X&date=Y)',
          description: '★ Bo\'sh shifokorlar va bo\'sh vaqtlarni topish (2-qadam)',
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: 'specialty', in: 'query', schema: { type: 'string' }, description: 'Ixtisoslik (masalan: Kardiolog)' },
            { name: 'date', in: 'query', schema: { type: 'string' }, description: 'Sana (masalan: 2025-06-20)' }
          ],
          responses: { 200: { description: 'Topilgan shifokorlar va bo\'sh vaqtlar' } }
        }
      },
      '/api/doctors/{id}/schedule': {
        post: {
          tags: ['Doctors'],
          summary: 'Shifokorga vaqt jadvali qo\'shish',
          description: 'Faqat Admin',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/ScheduleInput' } } } },
          responses: { 200: { description: 'Vaqt qo\'shildi' } }
        }
      },

      // ────────────────── APPOINTMENTS ──────────────────
      '/api/appointments': {
        post: {
          tags: ['Appointments'],
          summary: '★ Admin bemorni shifokorga yozadi (2-qadam)',
          description: 'Vaqtni band qiladi, patient statusi "yozilgan" bo\'ladi',
          security: [{ bearerAuth: [] }],
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/AppointmentInput' } } } },
          responses: { 201: { description: 'Qabul yaratildi' } }
        },
        get: {
          tags: ['Appointments'],
          summary: 'Qabullar ro\'yxati',
          description: 'Shifokor: faqat o\'zinikini. Admin: hammasini. Filter: ?status=kutmoqda',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'status', in: 'query', schema: { type: 'string', enum: ['kutmoqda', 'bajarildi'] } }],
          responses: { 200: { description: 'Qabullar ro\'yxati' } }
        }
      },

      // ────────────────── PRESCRIPTIONS ──────────────────
      '/api/prescriptions': {
        post: {
          tags: ['Prescriptions'],
          summary: '★ Shifokor retsept yozadi (4-qadam)',
          description: 'Faqat Doctor. Qabul statusi "bajarildi" bo\'ladi. Admin 2-navbatda ko\'radi',
          security: [{ bearerAuth: [] }],
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/PrescriptionInput' } } } },
          responses: { 201: { description: 'Retsept adminga yuborildi' } }
        }
      },
      '/api/prescriptions/pending': {
        get: {
          tags: ['Prescriptions'],
          summary: '★ To\'lov kutayotgan retseptlar (2-navbat)',
          description: 'Faqat Admin/Reception. Shifokor yozgan, hali to\'lanmagan retseptlar',
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: 'To\'lov kutayotgan retseptlar' } }
        }
      },
      '/api/prescriptions/{id}/pay': {
        patch: {
          tags: ['Prescriptions'],
          summary: '★ Bemor to\'lov qildi (5-qadam)',
          description: 'Faqat Admin/Reception. Status "to\'landi" bo\'ladi. Jarayon tugadi ✅',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: "To'lov qabul qilindi, retsept berildi" } }
        }
      }
    },
    tags: [
      { name: 'Auth', description: '🔐 Kirish va ro\'yxatdan o\'tish' },
      { name: 'Patients', description: '🚶 Bemorlar (Admin/Reception)' },
      { name: 'Doctors', description: '👨‍⚕️ Shifokorlar' },
      { name: 'Appointments', description: '📅 Qabullar' },
      { name: 'Prescriptions', description: '💊 Retseptlar va to\'lov' }
    ]
  },
  apis: [],
};

module.exports = swaggerJsdoc(swaggerOptions);
