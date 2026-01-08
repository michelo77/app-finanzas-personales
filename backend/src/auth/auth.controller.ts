import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OAuthLoginDto } from './dto/oauth-login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async oauthLogin(@Body() dto: OAuthLoginDto) {
        return this.authService.oauthLogin(dto);
    }
}
