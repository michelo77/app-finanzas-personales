import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

// Extender los tipos de NextAuth para incluir campos personalizados
declare module "next-auth" {
    /**
     * Extender la interfaz Session para incluir campos adicionales
     */
    interface Session extends DefaultSession {
        user: {
            id: string;
            email: string;
            name?: string | null;
            image?: string | null;
        };
        provider?: string;
    }

    /**
     * Extender la interfaz User para incluir campos adicionales
     */
    interface User extends DefaultUser {
        id: string;
        name?: string | null;
        image?: string | null;
        googleId?: string | null;
        provider?: string;
    }
}

declare module "next-auth/jwt" {
    /**
     * Extender la interfaz JWT para incluir campos adicionales
     */
    interface JWT extends DefaultJWT {
        id?: string;
        provider?: string;
        name?: string | null;
        lastName?: string;
        image?: string | null;
        googleId?: string | null;
    }
}
