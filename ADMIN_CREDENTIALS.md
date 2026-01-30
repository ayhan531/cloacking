# 🔐 Admin Panel Giriş Bilgileri (SQL Versiyonu)

Bu proje **SQLite (SQL)** veritabanı kullanacak şekilde güncellenmiştir. Artık Firebase kurulumuna gerek yoktur.

## 🚀 Hızlı Başlangıç

### 1. Bağımlılıkları Yükle
\`\`\`bash
npm install
\`\`\`

### 2. Veritabanını Hazırla (SQLite)
Aşağıdaki komut veritabanını oluşturacak ve tabloları hazırlayacaktır:
\`\`\`bash
npx prisma db push
\`\`\`

### 3. Varsayılan Admin Kullanıcısını Oluştur
Aşağıdaki komut `admin@example.com` kullanıcısını oluşturacaktır:
\`\`\`bash
npx tsx scripts/seed-admin.ts
\`\`\`

### 4. Uygulamayı Başlat
\`\`\`bash
npm run dev
\`\`\`

---

## 📋 Giriş Bilgileri

Varsayılan giriş bilgileri:
- **URL:** `http://localhost:3000/admin/login`
- **Email:** `admin@example.com`
- **Şifre:** `Admin123!`

---

## 🛠 Teknik Avantajlar

- **SQL Altyapısı**: SQLite veritabanı `prisma/dev.db` dosyasında saklanır. Yedeklemesi kolaydır.
- **NextAuth**: Güvenli oturum yönetimi ve JWT kullanılır.
- **Bcrypt**: Şifreler veritabanında güvenli bir şekilde hash'lenmiş olarak saklanır.
- **API Katmanı**: Tüm işlemler Next.js API rotaları üzerinden SQL veritabanına yapılır.

---

## 📂 Dosya Yapısı (SQL)

- `prisma/schema.prisma`: Veritabanı şeması.
- `prisma/dev.db`: SQLite veritabanı dosyası.
- `lib/prisma.ts`: Veritabanı bağlantı yardımcısı.
- `app/api/`: SQL işlemleri için API rotaları.
- `scripts/seed-admin.ts`: Admin oluşturma botu.

---

## 📦 Production (Yayına Alma)

1. Bir VPS veya Node.js destekleyen hosting (Vercel, Railway, DigitalOcean vb.) kullanın.
2. `DATABASE_URL` ve `NEXTAUTH_SECRET` environment variable'larını ayarlayın.
3. `npm run build` ile projeyi derleyin.
4. `npx prisma db push` ile veritabanını sunucuda hazırlayın.

**Not**: Artık Firebase config gerekmediği için `.env` dosyasında sadece `DATABASE_URL` ve `NEXTAUTH_SECRET` olması yeterlidir.
