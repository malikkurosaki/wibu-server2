/** @type {import('next').NextConfig} */
const nextConfig = {
    // webpack: (config, { isServer }) => {
    //     if (isServer) {
    //         // Menghindari bundling untuk library ini di sisi client
    //         config.externals.push('@xenova/transformers');
    //         config.externals.push('onnxruntime-node'); // Tambahkan ini jika hanya di server
    //     }

    //     return config;
    // },
    experimental: {
        serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
    },
};

export default nextConfig;
