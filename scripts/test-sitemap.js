const http = require('http');

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/sitemap.xml',
    headers: {
        'host': 'haber-analiz2026.com',
        'user-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
    }
};

console.log('Testing /sitemap.xml for haber-analiz2026.com...');
// Note: This script assumes the server is running on port 3000 locally.
// Since I cannot run the server here, I will just inspect the code again.
