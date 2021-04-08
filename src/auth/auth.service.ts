import {
 BadRequestException,
 Injectable,
 InternalServerErrorException,
 Logger,
} from '@nestjs/common';
import bcrypt from 'bcrypt';
import { PostgresErrorCode } from '../global/types/postgres-error-code.enum';
import type { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import type { AuthLoginDto } from './dto/auth-login.dto';
import type { AuthRegisterDto } from './dto/auth-register.dto';
import type { AuthUserTokenDto } from './dto/auth-user-token.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
  ) {}

  public async login(dto: AuthLoginDto): Promise<User> {
    const user = await this.usersService.findOne(dto.username);
    if (!user)
      throw new BadRequestException('Unknown user');

    const isMatching = await bcrypt.compare(dto.password, user.password);
    if (!isMatching)
      throw new BadRequestException('Wrong credentials provided');

    return user;
  }

  public async loginWithToken(dto: AuthUserTokenDto): Promise<User> {
    const token = this.extractToken(dto.token);
    if (!token)
      throw new BadRequestException('Invalid token');

    const user = await this.usersService.findOneByToken(token);
    if (!user)
      throw new BadRequestException('Unknown user');

    return user;
  }

  public async register(dto: AuthRegisterDto): Promise<User> {
    const user = await this.usersService.exists(dto);
    if (user)
      throw new BadRequestException('Account already exists');

    try {
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      const createdUser = await this.usersService.create({ ...dto, password: hashedPassword });
      return createdUser;
    } catch (unknownError: unknown) {
      const error = unknownError as Error & { code?: string };
      if (error?.code === PostgresErrorCode.UniqueViolation)
        throw new BadRequestException('Account already exists');

      this.logger.error(unknownError);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  private extractToken(header: unknown[] | string): string | null {
    if (Array.isArray(header) || !header)
      return null;

    const [scheme, value] = header.split(' ');
    if (scheme.toLowerCase() !== 'bearer')
      return null;

    return value;
  }
}
