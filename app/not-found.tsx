import { redirect } from 'next/navigation';

/**
 * 🛠️ GLOBAL 404 REDIRECTOR
 * Google Search Console'da 404 hataları birikmesin diye 
 * bulunamayan her sayfayı anasayfaya 301 (Permanent) olarak yönlendirir.
 */
export default function NotFound() {
    redirect('/');
}
