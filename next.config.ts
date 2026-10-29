import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  serverExternalPackages: ["@prisma/client", "bcryptjs"], // ← nombre actualizado
  poweredByHeader: false,
  images: {
    // AVIF/WebP: imágenes más livianas sin cambiar los archivos originales
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
        ],
      },
    ];
  },
};

export default nextConfig;