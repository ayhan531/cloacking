
async function testApi() {
    const url = 'https://flovazcomercial.com/api/sites/by-domain/flovazcomercial.com';
    try {
        console.log('--- FETCHING API ---');
        const response = await fetch(url);
        const data = await response.text();
        console.log('--- RAW API RESPONSE (FIRST 500 CHARS) ---');
        console.log(data.substring(0, 500));

        try {
            const json = JSON.parse(data);
            console.log('\n--- PARSED JSON INFO ---');
            console.log('Site Name:', json.name);
            console.log('Meta Title:', json.seoSettings.metaTitle);
        } catch (e) {
            console.log('\nResponse is NOT JSON');
        }
    } catch (e) {
        console.error('Error:', e.message);
    }
}

testApi();
