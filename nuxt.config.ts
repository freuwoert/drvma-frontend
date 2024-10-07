import { MiddlewareManager } from "./classes/router/MiddlewareManager"
import middlewareConfig from './middleware.config'

export default defineNuxtConfig({
    hooks: {
        'pages:extend'(pages) {
            new MiddlewareManager()
            .setMapping(middlewareConfig.mapping)
            .applyTo(pages)
        },
    },

    vite: {
        css: {
            preprocessorOptions: {
                sass: {
                    api: 'modern',
                },
            },
        },
    },

    css: [
        '~/assets/css/app.sass'
    ],

    modules: [
        'dayjs-nuxt',
        'floating-vue/nuxt',
        '@pinia/nuxt',
        '@nuxt/test-utils/module',
        "@nuxtjs/tailwindcss",
    ],

    devtools: {
        enabled: true,
    },

    pinia: {
        storesDirs: ['./stores/**'],
    },

    dayjs: {
        locales: ['de', 'en'],
        defaultLocale: 'de',
        plugins: ['relativeTime'],
    },

    runtimeConfig: {
        public: {
            backendUrl: `${process.env.BASE_PROTOCOL ?? 'http://'}${process.env.BACKEND_DOMAIN ?? 'localhost:8000'}`,
            frontendUrl: `${process.env.BASE_PROTOCOL ?? 'http://'}${process.env.FRONTEND_DOMAIN ?? 'localhost:3000'}`,
            websiteUrl: `${process.env.BASE_PROTOCOL ?? 'http://'}${process.env.WEBSITE_DOMAIN ?? 'localhost:3001'}`,
            screensUrl: `${process.env.BASE_PROTOCOL ?? 'http://'}${process.env.SCREENS_DOMAIN ?? 'localhost:3002'}`,
            adminPermissions: ['system.super-admin', 'system.admin'],
            superAdminPermissions: ['system.super-admin'],
        },
    },
    
    compatibilityDate: '2024-07-16',
})