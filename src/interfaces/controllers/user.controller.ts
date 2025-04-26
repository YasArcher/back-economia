import { Request, Response } from 'express';
import { SqlServerUnitOfWork } from '../../infrastructure/unitOfWork/SqlServerUnitOfWork';
import { RegisterUserService } from '../../application/user/services/RegisterUserService';
import { LoginUserService } from '../../application/user/services/LoginUserService';
import { LogoutUserService } from '../../application/user/services/LogoutUserService';

export const registerUserController = async (req: Request, res: Response): Promise<void> => {
  const unitOfWork = new SqlServerUnitOfWork();
  const registerUserService = new RegisterUserService(unitOfWork);

  try {
    await registerUserService.execute(req.body);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUserController = async (req: Request, res: Response): Promise<void> => {
  const unitOfWork = new SqlServerUnitOfWork();
  const loginUserService = new LoginUserService(unitOfWork);

  const ipAddressHeader = req.headers['x-forwarded-for'];
  const ipAddress = req.ip || (Array.isArray(ipAddressHeader) ? ipAddressHeader[0] : ipAddressHeader) || req.socket.remoteAddress || '';
  const userAgent = req.headers['user-agent'] || 'Unknown';

  try {
    const token = await loginUserService.execute(req.body, ipAddress, userAgent);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

export const logoutUserController = async (req: Request, res: Response): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized: No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];
  const unitOfWork = new SqlServerUnitOfWork();
  const logoutUserService = new LogoutUserService(unitOfWork);

  try {
    await logoutUserService.execute(token);
    res.status(200).json({ message: 'Logout successful' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
