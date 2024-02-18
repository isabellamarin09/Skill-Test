import vue from "@vitejs/plugin-vue";
import laravel from "laravel-vite-plugin";
import AutoImport from "unplugin-auto-import/vite";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";
import { PrimeVueResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.ts",
            ssr: "resources/js/ssr.ts",
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
            script: {
                defineModel: true,
            },
        }),
        AutoImport({
            imports: [
                "vue",
                "vue-router",
                "@vueuse/core",
                {
                    "@vueuse/integrations/useAxios": ["useAxios"],
                    axios: [
                        ["default", "axios"], // import { default as axios } from 'axios',
                    ],
                },
            ],
            dts: "resources/js/types/auto-imports.d.ts",
            dirs: ["resources/js/Composables"],
            eslintrc: {
                enabled: true,
                globalsPropValue: true,
            },
            vueTemplate: true,
        }),
        Components({
            resolvers: [PrimeVueResolver(), IconsResolver()],
            dirs: ["resources/js/Components", "resources/js/Pages"],
            extensions: ["vue"],
            dts: "resources/js/types/components.d.ts",
            deep: true,
        }),
        Icons({
            autoInstall: true,
            compiler: "vue3",
        }),
    ],
});
