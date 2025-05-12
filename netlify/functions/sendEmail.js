const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    };
  }

  try {
    const { to, subject, text, html } = JSON.parse(event.body);

    // Configurar el transporter usando el servicio SMTP de Netlify
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Configurar el correo
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Correo enviado exitosamente' })
    };
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al enviar el correo' })
    };
  }
}; 