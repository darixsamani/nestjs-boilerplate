import { AuthGuard } from '@nestjs/passport';

export class JwtQuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}
