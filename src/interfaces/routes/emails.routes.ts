import express from 'express';
import { sendPasswordEmail } from '../../services/emailService';

const router = express.Router();

router.post('/send-password', async (req:any, res:any) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Faltan el correo o la contraseña' });
  }

  try {
    console.log('📨 Ejecutando envío de correo desde endpoint');
    await sendPasswordEmail(email, password);
    res.status(200).json({ message: 'Correo enviado correctamente' });
  } catch (error) {
    console.error('❌ Error en el endpoint de envío de correo:', error);
    res.status(500).json({ error: 'No se pudo enviar el correo' });
  }
});

export { router as emailRouter };
