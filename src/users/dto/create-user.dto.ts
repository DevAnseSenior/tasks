import { IsDateString, IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    name!: string;

    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(6, { message: 'The password must be at least 6 characters long.' })
    @MaxLength(20, { message:  'The password must be a maximum of 20 characters long.' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message: 'The password must contain at least one uppercase letter, one lowercase letter, and one number.'
    })
    password!: string;

    @IsDateString()
    dateOfBirth!: string;
}
