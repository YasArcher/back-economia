import nodemailer from 'nodemailer';

export async function sendPasswordEmail(to: string, password: string) {
  const OUTLOOK_USER = 'eortiz5364@uta.edu.ec';
  const OUTLOOK_PASS = 'tvdnbcswljxrxmpf';
  const OUTLOOK_HOST = 'smtp-mail.outlook.com';
  const OUTLOOK_PORT = 587;

  console.log('📧 Enviando correo a:', to);
  console.log('🌐 Usando servidor SMTP:', OUTLOOK_HOST);

  try {
    const transporter = nodemailer.createTransport({
      host: OUTLOOK_HOST,
      port: OUTLOOK_PORT,
      secure: false,
      auth: {
        user: OUTLOOK_USER,
        pass: OUTLOOK_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
      logger: true,
      debug: true,
    });

    const info = await transporter.sendMail({
      from: `"Sistema de Usuarios UTA" <${OUTLOOK_USER}>`,
      to,
      subject: 'Tu contraseña de acceso',
      text: `Hola,

Tu contraseña es: ${password}

Por favor cámbiala después de iniciar sesión.`,
    });

    console.log(`✅ Correo enviado correctamente: ${info.messageId}`);
  } catch (error) {
    console.error('❌ Error al enviar el correo:', error);
  }
}
