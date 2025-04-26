import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { registerRoutes } from './interfaces/routes';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

registerRoutes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
