import { Expose } from 'class-transformer';
import { UserRole } from '@prisma/client';
export class User {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  password: string;

  @Expose()
  role: UserRole;

  @Expose()
  created_at: Date;
}
