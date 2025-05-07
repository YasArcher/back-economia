import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { pool } from '../../config/sqlServerClient';

const router = express.Router();

// Ruta absoluta a /public
const uploadPath = path.join(process.cwd(), 'public');

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('Subiendo a:', uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post('/', upload.single('file'), async (req:any, res:any) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: 'No se subió ningún archivo' });

  const newImageUrl = `/${file.filename}`;

  try {
    const connection = await pool.connect();

    // Obtener imagen anterior
    const result = await connection.request().query(`
      SELECT imagen_url FROM HomeBanner WHERE id = 1
    `);
    const oldImageUrl: string | undefined = result.recordset[0]?.imagen_url;

    // Eliminar imagen anterior si está en /public
    if (oldImageUrl && oldImageUrl.startsWith('/')) {
      const oldImagePath = path.join(uploadPath, path.basename(oldImageUrl));
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
        console.log('Imagen anterior eliminada:', oldImagePath);
      }
    }

    // Actualizar imagen nueva
    await connection.request().query(`
      UPDATE HomeBanner SET imagen_url = '${newImageUrl}' WHERE id = 1
    `);

    res.json({ filename: file.filename });
  } catch (err) {
    console.error('Error al procesar el banner:', err);
    res.status(500).json({ error: 'Error al procesar la imagen del banner' });
  }
});

export { router as homeBannerUploadRouter };
