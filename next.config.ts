import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'standalone',
    // basePath: '/admin',
    // assetPrefix: '/admin/',
    eslint: {
        // Предупреждение: Это позволяет завершить сборки в продакшене, даже если
        // в вашем проекте есть ошибки ESLint.
        ignoreDuringBuilds: true,
    },
    typescript: {
        // !! ПРЕДУПРЕЖДЕНИЕ !!
        // Опасно позволить завершить сборки в продакшене, даже если
        // в вашем проекте есть ошибки типов.
        // !! ПРЕДУПРЕЖДЕНИЕ !!
        ignoreBuildErrors: true,
    },
    // Удалите или закомментируйте следующую строку
    // missingSuspenseWithCSRBailout: false
};

export default nextConfig;
