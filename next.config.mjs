/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ui.aceternity.com',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    async rewrites() {
        return [{ source: '/favicon.ico', destination: '/icon' }];
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
