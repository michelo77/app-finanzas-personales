import { IsEmail, IsString, IsOptional } from "class-validator";

export class OAuthLoginDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsString()
    @IsOptional()
    image?: string;

    @IsString()
    googleId: string;

    @IsString()
    provider: string;
}