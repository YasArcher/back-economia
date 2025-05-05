import { IUnitOfWork } from '../../../domain/unitOfWork/IUnitOfWork';
import { LoginUserDTO } from '../dto/LoginUserDTO';
import { CreateSessionDTO } from '../../session/dto/CreateSessionDTO';
import jwt from 'jsonwebtoken';

export class LoginUserService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(
    dto: LoginUserDTO,
    ipAddress: string,
    userAgent: string
  ): Promise<{ token: string; role: string }> {
    const { email, password } = dto;

    await this.unitOfWork.start();
    try {
      const user = await this.unitOfWork.userRepository.findByEmail(email);
      if (!user) {
        throw new Error('Invalid credentials');
      }

      if (user.password_hash !== password) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign(
        { userId: user.id, role: user.role }, // puedes incluir el rol en el token también
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '48h' }
      );

      const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000);

      const sessionDto: CreateSessionDTO = {
        userId: user.id,
        token,
        ipAddress,
        userAgent,
        expiresAt,
      };

      await this.unitOfWork.sessionRepository.create(sessionDto);

      await this.unitOfWork.complete();
      return {
        token,
        role: user.role
      };
    } catch (error) {
      await this.unitOfWork.rollback();
      throw error;
    }
  }
}