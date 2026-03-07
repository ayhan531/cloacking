import axios from 'axios';

const BUFFER_TOKEN = 'ZlGfyb_r6b79C5NCqiIhLmI8XexmQafl1egLnLvuFNq';

async function testBuffer() {
    console.log('Testing Buffer Beta API (api.buffer.com)...');

    try {
        const res = await axios({
            method: 'get',
            url: 'https://api.buffer.com/v1/profiles',
            headers: {
                'Authorization': `Bearer ${BUFFER_TOKEN}`,
            },
            // Prevent axios from adding any default content-type
        });
        console.log('Success:', JSON.stringify(res.data, null, 2));
    } catch (e: any) {
        console.error('Error:', e.response?.status, e.response?.data || e.message);
    }
}

testBuffer();
