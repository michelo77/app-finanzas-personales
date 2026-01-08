'use client';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function TestAuthPage() {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Cargando...</p>
                </div>
            </div>
        );
    }

    if (session) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                    <h1 className="text-3xl font-bold mb-6 text-center text-green-600">
                        ✅ Autenticado
                    </h1>

                    <div className="bg-gray-100 rounded-lg p-6 mb-6 space-y-3">
                        {session.user?.image && (
                            <div className="flex justify-center mb-4">
                                <img
                                    src={session.user.image}
                                    alt="Avatar"
                                    className="w-20 h-20 rounded-full border-4 border-blue-500"
                                />
                            </div>
                        )}

                        <div>
                            <p className="text-sm text-gray-500">ID</p>
                            <p className="font-mono text-sm bg-white p-2 rounded break-all">
                                {session.user?.id}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-semibold">{session.user?.email}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Nombre</p>
                            <p className="font-semibold">{session.user?.name}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Provider</p>
                            <p className="font-semibold capitalize">{session.provider || 'N/A'}</p>
                        </div>
                    </div>

                    <button
                        onClick={() => signOut({ callbackUrl: '/test-auth' })}
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
                    >
                        🚪 Cerrar Sesión
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        🔐 Prueba de Autenticación
                    </h1>
                    <p className="text-gray-600">
                        Inicia sesión con tu cuenta de Google
                    </p>
                </div>

                <button
                    onClick={() => signIn('google', { callbackUrl: '/test-auth' })}
                    className="w-full bg-white border-2 border-gray-300 hover:border-blue-500 text-gray-700 font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-3 transition duration-200 hover:shadow-md"
                >
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                    Continuar con Google
                </button>

                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>Al continuar, aceptas nuestros términos y condiciones</p>
                </div>
            </div>
        </div>
    );
}
