/** @type {import('next').NextConfig} */
// Proxy /api/* to the backend so the browser talks to the SAME origin as the site.
// This keeps auth cookies first-party (works on mobile Safari, which blocks 3rd-party cookies).
const API_TARGET = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api").replace(/\/api\/?$/, "");

const nextConfig = {
  reactStrictMode: true,
  images: { formats: ['image/avif', 'image/webp'] },
  async rewrites() {
    return [
      { source: '/api/:path*', destination: `${API_TARGET}/api/:path*` },
    ];
  },
};
export default nextConfig;
