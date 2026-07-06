import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        tailwindcss(),
        react(),
    ],
    build: {
        chunkSizeWarningLimit: 500,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('framer-motion')) return 'vendor-framer';
                    if (id.includes('recharts')) return 'vendor-recharts';
                    if (id.includes('@inertiajs/react')) return 'vendor-inertia';
                    if (id.includes('@fontsource/poppins')) return 'vendor-fonts';
                    if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) return 'vendor-react';
                },
            },
        },
    },
    server: {
        cors: true,
        host: '0.0.0.0', // Tetap gunakan ini agar bisa diakses dari HP/perangkat lain dalam satu Wi-Fi
        hmr: {
            host: process.env.VITE_HMR_HOST || 'localhost',
            protocol: process.env.VITE_HMR_PROTOCOL || 'ws',
            clientPort: process.env.VITE_HMR_PORT ? Number(process.env.VITE_HMR_PORT) : undefined,
        },
        // PERBAIKAN: Menambahkan '127.0.0.1' dan semua subdomain '.test' (jika pakai Laragon/Herd)
        allowedHosts: process.env.VITE_ALLOWED_HOSTS
            ? process.env.VITE_ALLOWED_HOSTS.split(',')
            : ['localhost', '127.0.0.1', '.test'], 
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});