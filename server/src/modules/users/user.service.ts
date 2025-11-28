import bcrypt from 'bcryptjs';
import { prisma } from '../../config/db.js';
import { CreateUserDTO } from './user.types.js';

export class UserService {
  /**
   * Cria um novo usuário
   */
  async createUser(data: CreateUserDTO) {
    const { password, ...userData } = data;

    // Hash da senha
    const passwordHash = await bcrypt.hash(password, 10);

    // Cria usuário no banco
    const user = await prisma.user.create({
      data: {
        ...userData,
        passwordHash,
      },
    });

    return user;
  }

  /**
   * Busca usuário por email
   */
  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  /**
   * Busca usuário por ID
   */
  async findById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  /**
   * Verifica se a senha está correta
   */
  async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  /**
   * Lista todos os usuários (sem senha)
   */
  async listUsers() {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}

export const userService = new UserService();
