import sql from 'mssql';

const dbConfig: sql.config = {
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  server: process.env.DB_SERVER || '',
  database: process.env.DB_DATABASE || '',
  options: {
    instanceName: process.env.DB_INSTANCE || '',
    encrypt: true,
    trustServerCertificate: true,
  },
};

export const pool = new sql.ConnectionPool(dbConfig);
export const connectDB = async () => {
  await pool.connect();
};