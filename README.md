# 🎭 Cloaking Platform - Web Sitesi Üreticisi

**Sınırsız sayıda cloaking sitesi oluşturabileceğin güçlü bir platform!**

Admin panelinden istediğin kadar site oluştur, her biri farklı domain ve içerikle çalışsın. Botlara ve masaüstü kullanıcılara kurumsal site göster, mobil kullanıcılara bahis sitesi göster.

---

## 🚀 Hızlı Başlangıç

### 1. Bağımlılıkları Yükle
\`\`\`bash
npm install
\`\`\`

### 2. Veritabanını Hazırla (SQL)
**ÖNEMLİ**: Admin paneline giriş yapabilmek için SQLite veritabanını hazırlamanız gerekli!

Detaylı kurulum için: **`ADMIN_CREDENTIALS.md`** dosyasına bak.

Kısa özet:
1. `npx prisma db push`
2. `npx tsx scripts/seed-admin.ts`
3. `npm run dev`

### 3. Development Server'ı Başlat
\`\`\`bash
npm run dev
\`\`\`

Tarayıcıda: `http://localhost:3000`

### 4. Admin Paneline Giriş Yap
\`\`\`
URL: http://localhost:3000/admin/login
Email: admin@example.com (senin oluşturduğun)
Şifre: Admin123! (senin oluşturduğun)
\`\`\`

---

## 📚 Önemli Dosyalar

| Dosya | Açıklama |
|-------|----------|
| **`ADMIN_CREDENTIALS.md`** | 🔐 Admin giriş bilgileri ve Firebase kurulum rehberi |
| **`FIREBASE_SETUP.md`** | 🔥 Detaylı Firebase kurulum talimatları |
| **`README.md`** | 📖 Bu dosya - Genel bilgiler |

---

## 🎯 Özellikler

### 🏭 Web Sitesi Üreticisi
- ✅ **Sınırsız Site Oluşturma**: Admin panelinden istediğin kadar site oluştur
- ✅ **Domain Bazlı Yönlendirme**: Her domain kendi yapılandırmasını kullanır
- ✅ **Aktif/Pasif Kontrol**: Siteleri anında aktif veya pasif yap
- ✅ **Kolay Yönetim**: Siteleri düzenle, sil, yönet

### 🎭 Gelişmiş Cloaking Sistemi
- ✅ **Bot Algılama**: Google, Bing ve diğer botları otomatik algılar
- ✅ **Cihaz Algılama**: Mobil/masaüstü ayrımı
- ✅ **Coğrafi Hedefleme**: Ülke bazlı içerik gösterimi
- ✅ **IP Geolocation**: Gerçek zamanlı konum tespiti

### 🏢 Mask Site (Botlar ve Desktop için)
- Modern kurumsal tasarım
- Hero section, özellikler, hizmetler
- Referanslar ve iletişim formu
- **Gizli SEO makalesi** (footer'da, sadece botlar görür)
- Tamamen özelleştirilebilir renkler

### 🎰 Betting Site (Mobil kullanıcılar için)
- Dinamik hero slider
- Bonus kartları
- Canlı kazananlar ticker
- Popup'lar
- Hızlı aksiyonlar
- Duyuru barı

### 🔧 Admin Panel
- Dashboard (istatistikler)
- Site yönetimi (oluştur, düzenle, sil)
- 4 sekmeli site oluşturma formu
- Gerçek zamanlı önizleme

---

## 📂 Proje Yapısı

\`\`\`
cloaking-platform/
├── app/
│   ├── admin/              # Admin panel
│   │   ├── dashboard/      # Dashboard sayfası
│   │   ├── sites/          # Site yönetimi (ÇOK ÖNEMLİ!)
│   │   ├── login/          # Admin girişi
│   │   └── layout.tsx      # Admin layout
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Ana sayfa (CloakedHome)
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── CloakedHome.tsx     # Ana cloaking logic
│   ├── MaskSite.tsx        # Kurumsal site görünümü
│   ├── BettingSite.tsx     # Bahis sitesi görünümü
│   └── AuthProvider.tsx    # Authentication context
├── lib/
│   ├── firebase.ts         # Firebase config
│   ├── types.ts            # TypeScript types
│   ├── utils.ts            # Utility functions
│   └── cloaking.ts         # Cloaking detection logic
├── public/                 # Static files
├── .env.local              # Environment variables (DÜZENLE!)
├── ADMIN_CREDENTIALS.md    # 🔐 Admin giriş bilgileri
├── FIREBASE_SETUP.md       # 🔥 Firebase kurulum rehberi
└── README.md               # Bu dosya
\`\`\`

---

## 🎨 Nasıl Kullanılır?

### 1. Admin Paneline Giriş
\`\`\`
http://localhost:3000/admin/login
\`\`\`

### 2. Yeni Site Oluştur
1. **Siteler** menüsüne tıkla
2. **"Yeni Site Oluştur"** butonuna tıkla
3. Formu doldur:
   - **Temel**: Site adı, domain
   - **Mask İçerik**: Kurumsal site içerikleri
   - **SEO**: Meta tags, gizli SEO makalesi
   - **Cloaking**: Hangi kullanıcılara ne gösterileceği
4. **"Site Oluştur"** butonuna tıkla

### 3. Site Yapılandırması

#### Mask İçeriği (Botlar ve Desktop için)
- Hero başlık ve alt başlık
- Özellikler (features)
- Hizmetler (services)
- Referanslar (testimonials)
- İletişim bilgileri
- Renk şeması

#### Betting İçeriği (Mobil kullanıcılar için)
- Bonuslar
- Canlı kazananlar
- Popup'lar
- Hero slider
- Hızlı aksiyonlar
- Duyurular

#### Cloaking Kuralları
- **Mask Gösterilecekler**:
  - Masaüstü kullanıcıları
  - Botlar (Google, Bing, vb.)
  - Belirli ülkelerden gelenler
  
- **Betting Gösterilecekler**:
  - Mobil kullanıcılar
  - Türkiye/Kıbrıs'tan gelenler

---

## 🚀 Production Build

### Statik Export (Namecheap, Shared Hosting)

\`\`\`bash
npm run build
\`\`\`

Bu komut `out/` klasöründe statik HTML dosyaları oluşturur. Bu dosyaları herhangi bir web hosting'e yükleyebilirsin.

### Deployment

1. `out/` klasörünün içeriğini hosting'ine yükle
2. Domain'ini ayarla
3. Firebase'de site yapılandırması oluştururken bu domain'i kullan

---

## 🔒 Güvenlik

### Firestore Security Rules

\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Sites collection - herkes okuyabilir, sadece admin yazabilir
    match /sites/{siteId} {
      allow read: if true;
      allow write: if request.auth != null && 
                     exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }
    
    // Admins collection - sadece admin okuyabilir
    match /admins/{adminId} {
      allow read: if request.auth != null && request.auth.uid == adminId;
      allow write: if false;
    }
  }
}
\`\`\`

---

## 🎯 Örnek Kullanım Senaryosu

### Senaryo: 3 Farklı Site Oluştur

**Site 1: Sigorta Sitesi**
- Domain: `insurance-example.com`
- Mask: Profesyonel sigorta şirketi
- Betting: Türk kullanıcılara bahis bonusları
- SEO: "sigorta, ticari sigorta, işletme sigortası"

**Site 2: Emlak Sitesi**
- Domain: `realestate-example.com`
- Mask: Emlak danışmanlık şirketi
- Betting: Türk kullanıcılara casino bonusları
- SEO: "emlak, gayrimenkul, ev alım satım"

**Site 3: Danışmanlık Sitesi**
- Domain: `consulting-example.com`
- Mask: İş danışmanlığı şirketi
- Betting: Türk kullanıcılara spor bahis bonusları
- SEO: "danışmanlık, iş danışmanlığı, strateji"

Her biri **aynı platformda** ama **farklı domain** ve **farklı içerikle** çalışır!

---

## 🛠 Teknik Detaylar

- **Framework**: Next.js 14 (App Router)
- **Stil**: Tailwind CSS v4
- **UI Components**: Radix UI (shadcn/ui)
- **Veritabanı**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Dil**: TypeScript
- **Export**: Statik HTML (Node.js gerektirmez)

---

## 📝 Notlar

- **Demo Mode**: Firebase olmadan da çalışır, ancak admin paneli ve veritabanı olmaz
- **Firebase Kurulumu**: Tam özellikler için Firebase kurulumu şart
- **Admin Paneli**: `/admin/sites` sayfasından sınırsız site oluşturabilirsin
- **Cloaking**: Mobil + TR/CY = Betting, diğerleri = Mask

---

## 🤝 Destek

Sorularınız için:
- **`ADMIN_CREDENTIALS.md`** - Admin giriş ve kurulum
- **`FIREBASE_SETUP.md`** - Detaylı Firebase kurulumu
- Firebase Console - Hata logları

---

## 📄 Lisans

MIT

---

**Not**: Bu platform eğitim amaçlıdır. Kullanımdan doğacak sorumluluk kullanıcıya aittir.

---

**İyi çalışmalar! 🚀**
