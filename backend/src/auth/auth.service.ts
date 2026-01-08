import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OAuthLoginDto } from './dto/oauth-login.dto';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async oauthLogin(dto: OAuthLoginDto) {
        // Buscar usuario por googleId o email
        let user = await this.prisma.user.findFirst({
            where: {
                OR: [
                    { googleId: dto.googleId },
                    { email: dto.email }
                ]
            }
        });

        // Si no existe, crear nuevo
        if (!user) {
            // Separar nombre completo en name y lastName
            const [firstName, ...lastNameParts] = (dto.name || '').split(' ');

            user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    name: firstName || 'Usuario',
                    lastName: lastNameParts.join(' ') || '',
                    googleId: dto.googleId,
                    provider: dto.provider,
                    image: dto.image,
                    password: null, // OAuth no usa password
                }
            });
        } else {
            // Si existe, actualizar datos
            const [firstName, ...lastNameParts] = (dto.name || user.name).split(' ');

            user = await this.prisma.user.update({
                where: { id: user.id },
                data: {
                    name: firstName,
                    lastName: lastNameParts.join(' ') || user.lastName,
                    image: dto.image,
                    googleId: dto.googleId,
                }
            });
        }

        return {
            id: user.id,
            email: user.email,
            name: user.name,
            lastName: user.lastName,
            image: user.image,
        };
    }
}