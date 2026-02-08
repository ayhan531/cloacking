
async function testBotView() {
    const url = 'https://flovazcomercial.com/';
    try {
        console.log('--- FETCHING BOT VIEW ---');
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
            }
        });
        const data = await response.text();
        console.log('--- BOT VIEW TITLE ---');
        const titleMatch = data.match(/<title>(.*?)<\/title>/);
        console.log(titleMatch ? titleMatch[1] : 'No title found');

        console.log('\n--- FETCHING USER VIEW ---');
        const responseUser = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        const dataUser = await responseUser.text();
        console.log('--- USER VIEW TITLE ---');
        const titleMatchUser = dataUser.match(/<title>(.*?)<\/title>/);
        console.log(titleMatchUser ? titleMatchUser[1] : 'No title found');
    } catch (e) {
        console.error('Error fetching site:', e.message);
    }
}

testBotView();
