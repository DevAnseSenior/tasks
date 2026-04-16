import { Body, Controller, HttpCode, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "./decorators/public.decorator";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller('auth')
@Public()
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(200)
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('refresh')
    @HttpCode(200)
    async refresh(@Body('refresh_token') refreshToken: string) {
        return this.authService.refreshTokens(refreshToken);
    }
}