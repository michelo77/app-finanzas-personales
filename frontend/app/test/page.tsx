'use client';

import { useState } from 'react';

export default function TestPage() {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const testConnection = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3001');
            const data = await response.text();
            setMessage(`✅ Conexión exitosa! Backend: "${data}"`);
            console.log(data);
        } catch (error) {
            setMessage(`❌ Error: ${error}`);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Test de Conexión</h1>
                <button
                    onClick={testConnection}
                    disabled={loading}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    {loading ? 'Probando...' : 'Probar Conexión'}
                </button>
                {message && <p className="mt-4 p-4 bg-gray-50 rounded">{message}</p>}
            </div>
        </div>
    );
}