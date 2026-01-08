import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";


export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        // CredentialsProvider({
        //     name: "Credentials",
        //     credentials: {
        //         email: { label: "Email", type: "email" },
        //         password: { label: "Password", type: "password" },
        //     },
        //     async authorize(credentials) {
        //         // Implementar la lógica de autenticación
        //         // conectar con el backend
        //         return null;
        //     },
        // }),
    ],

    // CALLBACKS: Qué hacer en cada paso
    callbacks: {
        // Cuando alguien intenta hacer login (Google o Credentials)
        async signIn({ user, account, profile }) {
            // Si es login con Google, enviar datos al backend
            if (account?.provider === "google") {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: user.email,
                            name: user.name,
                            image: user.image,
                            googleId: account.providerAccountId,
                            provider: "google",
                        }),
                    });

                    if (!response.ok) {
                        console.error("Error al crear/actualizar usuario en backend");
                        return false;
                    }

                    const backendUser = await response.json();

                    // Agregar ID del backend al usuario
                    user.id = backendUser.id.toString();

                    return true;
                } catch (error) {
                    console.error("Error en signIn callback:", error);
                    return false;
                }
            }

            // Si es login con credentials, ya viene validado del authorize
            return true;
        },

        // Cuando se crea/actualiza el JWT token
        async jwt({ token, user, account }) {
            // Si es un login nuevo, agrega datos del usuario al token
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }

            if (account?.provider === "google") {
                token.provider = "google";
            }

            return token;
        },

        // Cuando el cliente accede a la sesión
        async session({ session, token }) {
            //pasa datos del token a la sesión
            if (session.user) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.provider = token.provider as string;
            }

            return session;
        }
    },


    pages: {
        signIn: "/auth/login",
    },

    session: {
        strategy: "jwt",
    },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// export default NextAuth(authOptions);

