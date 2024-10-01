/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (isServer) {
            // Menghindari Webpack dari proses ini di client-side
            config.externals.push('@xenova/transformers');
        }

        return config;
    },
    experimental: {
        serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
    },
};

export default nextConfig;
