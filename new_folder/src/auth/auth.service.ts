import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
  ) {}

  async validateAndLogin(
    username: string,
    password: string,
  ): Promise<{ token: string }> {
    this.logger.log(
      'Login attempt - Request body: ' +
        JSON.stringify({
          username,
          hasPassword: !!password,
        }),
    );

    const adminUsername = this.config.get<string>('ADMIN_USERNAME');
    const adminPassword = this.config.get<string>('ADMIN_PASSWORD');
    const jwtSecret = this.config.get<string>('JWT_SECRET');

    this.logger.log(
      'Environment check: ' +
        JSON.stringify({
          hasAdminUsername: !!adminUsername,
          hasAdminPassword: !!adminPassword,
          hasJwtSecret: !!jwtSecret,
        }),
    );

    if (!adminUsername || !adminPassword) {
      this.logger.error('Missing admin credentials in environment');
      throw new InternalServerErrorException(
        'Admin credentials not configured',
      );
    }

    if (!jwtSecret) {
      this.logger.error('Missing JWT_SECRET in environment');
      throw new InternalServerErrorException('JWT secret not configured');
    }

    if (username === adminUsername && password === adminPassword) {
      try {
        const expiresIn = this.config.get<string>('JWT_EXPIRES_IN') || '1h';
        const token = await this.jwt.signAsync({ username }, { expiresIn });
        this.logger.log('Login successful for user: ' + username);
        return { token };
      } catch (error) {
        this.logger.error(
          'JWT signing error: ' + (error as Error).message,
          error as Error,
        );
        throw new InternalServerErrorException('Error generating token');
      }
    }

    this.logger.warn('Invalid login attempt for username: ' + username);
    throw new UnauthorizedException('Invalid credentials');
  }
}
