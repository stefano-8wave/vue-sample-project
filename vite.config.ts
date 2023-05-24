import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VolverResolver } from '@volverjs/ui-vue/resolvers/unplugin'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            imports: ['vue'],
            dts: 'src/auto-imports.d.ts',
            dirs: [],
            vueTemplate: true,
            eslintrc: {
                enabled: true,
            },
        }),
        Components({
            extensions: ['vue'],
            // allow auto import and register components
            include: [/\.vue$/, /\.vue\?vue/],
            dts: 'src/components.d.ts',
            exclude: [
                /[\\/]ui-vue[\\/]/,
                /[\\/]\.git[\\/]/,
                /[\\/]\.nuxt[\\/]/,
            ],
            resolvers: [
                VolverResolver({
                    importStyle: 'scss',
                    directives: true,
                }),
            ],
        }),
    ],
    resolve: {
        alias: {
            '~/': `${path.resolve(__dirname, 'src')}/`,
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "./src/assets/scss/settings" as *;`,
            },
        },
    },
    optimizeDeps: {
        exclude: ['@volverjs/ui-vue'],
        force: true,
    },

    build: {
        sourcemap: true,
    },
})
