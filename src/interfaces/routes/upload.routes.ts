import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { pool } from '../../config/sqlServerClient';

const router = express.Router();

// Ruta absoluta a la carpeta public (fuera de src)
const uploadPath = path.join(process.cwd(), 'public');

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

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

  const newLogoUrl = `/${file.filename}`;

  try {
    const connection = await pool.connect();

    // 1. Obtener logo anterior
    const result = await connection.request().query(`
      SELECT logo_url FROM ConfiguracionesGlobales WHERE id = 1
    `);

    const oldLogoUrl: string | undefined = result.recordset[0]?.logo_url;

    // 2. Eliminar imagen anterior (si existe y está en /public)
    if (oldLogoUrl && oldLogoUrl.startsWith('/public/')) {
      const oldImagePath = path.join(uploadPath, path.basename(oldLogoUrl));
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
        console.log('Imagen anterior eliminada:', oldImagePath);
      }
    }

    // 3. Actualizar nueva ruta en BD
    await connection.request().query(`
      UPDATE ConfiguracionesGlobales SET logo_url = '${newLogoUrl}' WHERE id = 1
    `);

    res.json({ filename: file.filename });
  } catch (err) {
    console.error('Error al procesar el logo:', err);
    res.status(500).json({ error: 'Error al procesar el logo' });
  }
});

export { router as uploadRouter };
