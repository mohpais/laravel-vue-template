import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from "url";
import path from 'path';

export default ({ mode }) => {
    const env = { ...process.env, ...loadEnv(mode, process.cwd()) };
    
    return defineConfig({
        plugins: [
            vue({
                template: {
                    transformAssetUrls: {
                        base: null,
                        includeAbsolute: false,
                    },
                },
            }),
            laravel({
                input: ['resources/css/app.css', 'resources/css/animate.css', 'resources/js/main.js'],
                refresh: true,
            }),
        ],
        resolve: {
            alias: {
                vue: 'vue/dist/vue.esm-bundler.js',
                '@': path.resolve(__dirname, './resources/js'),
            },
        },
        define: {
          "process.env": env,
        },
    })
}
// export default defineConfig({
//     plugins: [
//         vue({
//             template: {
//                 transformAssetUrls: {
//                     base: null,
//                     includeAbsolute: false,
//                 },
//             },
//         }),
//         laravel({
//             input: ['resources/css/app.css', 'resources/css/animate.css', 'resources/js/main.js'],
//             refresh: true,
//         }),
//     ],
//     resolve: {
//         alias: {
//             vue: 'vue/dist/vue.esm-bundler.js',
//             '@': path.resolve(__dirname, './resources/js'),
//         },
//     },
// });
