import { Request, Response } from 'express';
import { getUsersUseCase } from '../../application/getUsers.usecase';

export const getUsersController = async (req: Request, res: Response) => {
  const users = await getUsersUseCase.execute();
  res.json(users);
};
