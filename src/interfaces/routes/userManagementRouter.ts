import express from 'express';
import { pool } from '../../config/sqlServerClient';

const router = express.Router();
// Crear nuevo usuario con rol
router.post('/', async (req: any, res: any) => {
    const { name, email, password, roleId } = req.body;
  
    if (!name || !email || !password || !roleId) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }
  
    try {
      const connection = await pool.connect();
  
      // Insertar el nuevo usuario y obtener el ID generado
      const result = await connection.query(`
        INSERT INTO users (name, email, password, created_at)
        OUTPUT INSERTED.id
        VALUES ('${name}', '${email}', '${password}', GETDATE())
      `);
  
      const userId = result.recordset[0].id;
  
      // Insertar asignación de rol
      await connection.query(`
        INSERT INTO user_roles (user_id, role_id, assigned_at)
        VALUES (${userId}, ${roleId}, GETDATE())
      `);
  
      res.status(201).send('Usuario creado correctamente');
    } catch (err) {
      console.error('Error al crear usuario:', err);
      res.status(500).json({ error: 'Error al crear usuario' });
    }
  });
  
// Obtener todos los usuarios con el nombre del rol
router.get('/', async (_req, res) => {
  try {
    const connection = await pool.connect();
    const result = await connection.query(`
   SELECT
    u.id,
    u.name,  -- Ajusta si el campo se llama distinto
    u.email,
    u.password_hash,
    r.name AS role,  -- Cambiado de 'nombre' a 'name'
    ur.assigned_at
FROM users u
LEFT JOIN user_roles ur ON u.id = ur.user_id
LEFT JOIN roles r ON ur.role_id = r.id

    `);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al obtener usuarios:', err);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Actualizar usuario (nombre, correo y rol)
router.put('/:id', async (req: any, res: any) => {
    const { id } = req.params;
    const { username, email, roleId, password } = req.body;
  
    if (!username || !email || !roleId) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }
  
    try {
      const connection = await pool.connect();
  
      // Armar consulta dinámica para incluir la contraseña solo si se envía
      let updateUserQuery = `
        UPDATE users
        SET name = '${username}', email = '${email}'`;
  
        if (password && password.trim() !== '') {
            updateUserQuery += `, password_hash = '${password}'`; // usa el nombre correcto de la columna
          }
          
  
      updateUserQuery += ` WHERE id = ${id}`;
  
      await connection.query(updateUserQuery);
  
      // Verificar si ya existe un rol asignado
      const existingRole = await connection.query(`
        SELECT id FROM user_roles WHERE user_id = ${id}
      `);
  
      if (existingRole.recordset.length > 0) {
        await connection.query(`
          UPDATE user_roles
          SET role_id = ${roleId}, assigned_at = GETDATE()
          WHERE user_id = ${id}
        `);
      } else {
        await connection.query(`
          INSERT INTO user_roles (user_id, role_id, assigned_at)
          VALUES (${id}, ${roleId}, GETDATE())
        `);
      }
  
      res.send('Usuario actualizado correctamente');
    } catch (err) {
      console.error('Error al actualizar usuario:', err);
      res.status(500).json({ error: 'Error al actualizar usuario' });
    }
  });
  
  

  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const connection = await pool.connect();
  
      // Eliminar roles asignados primero
      await connection.query(`DELETE FROM user_roles WHERE user_id = ${id}`);
  
      // Luego eliminar el usuario
      await connection.query(`DELETE FROM users WHERE id = ${id}`);
  
      res.send('Usuario eliminado correctamente');
    } catch (err) {
      console.error('Error al eliminar usuario:', err);
      res.status(500).json({ error: 'Error al eliminar usuario' });
    }
  });
  
// Obtener todos los roles
router.get('/roles', async (_req, res) => {
    try {
      const connection = await pool.connect();
      const result = await connection.query(`
        SELECT id, name AS nombre FROM roles
      `);
      res.json(result.recordset);
    } catch (err) {
      console.error('Error al obtener roles:', err);
      res.status(500).json({ error: 'Error al obtener roles' });
    }
  });
  
export { router as userManagementRouter };
