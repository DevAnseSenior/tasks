import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { UserRole } from "../users/entities/user.entity";
import { UsersService } from "../users/users.service";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const usersService = app.get(UsersService);
    const configService = app.get(ConfigService)

    const adminEmail = configService.get('ADMIN_EMAIL');
    const adminPassword = configService.get('ADMIN_PASSWORD'); 
    const adminName = configService.get('ADMIN_NAME');
    const existingAdmin = await usersService.findByEmail(adminEmail);

    if (!existingAdmin) {
        await usersService.create({
            email: adminEmail,
            password: adminPassword,
            name: adminName,
            dateOfBirth: '1990-01-01',
            role: UserRole.ADMIN
        });
        console.log('✅ Admin created');
    } else {
        console.log('⚠️ Admin user already exists');
    }

    await app.close();
}

bootstrap();