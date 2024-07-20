export default {
    loading: {
        color: 'white', // <-- color
        height: '5px' // <-- height
    },
    ssr: true,
    target: 'server',
    router: {
        // Contoh menambahkan penanganan error untuk route dinamis
        extendRoutes(routes, resolve) {
            routes.push({
                path: '*',
                component: resolve(__dirname, 'layouts/error.vue'),
                name: 'error'
            });
        }
    },

    head: {
        title: 'nuxt-cms',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [{
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: ''
            }
        ],
        link: [{
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico'
            },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap'
            }
        ],
    },
    css: [
        '@/assets/css/main.css',
        'bootstrap-icons/font/bootstrap-icons.css'
    ],
    plugins: [],
    components: true,
    buildModules: [
        '@nuxtjs/tailwindcss'
    ],
    auth: {
        strategies: {
            local: {
                token: {
                    property: 'token',
                    required: true,
                    type: 'Bearer'
                },
                user: {
                    property: 'user',
                    // autoFetch: true
                },
                endpoints: {
                    login: {
                        url: '/api/admin/login',
                        method: 'post'
                    },
                    logout: {
                        url: '/api/admin/logout',
                        method: 'post'
                    },
                    user: {
                        url: '/api/admin/user',
                        method: 'get'
                    }
                }
            }
        },
        redirect: {
            login: '/login',
            logout: '/login',
            callback: '/login',
            home: '/admin/dashboard'
        }
    },

    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth-next',
        'nuxt-multiselect',
        //https://github.com/avil13/vue-sweetalert2
        'vue-sweetalert2/nuxt',

    ],
    axios: {
        baseURL: 'https://api.arlchoose.id'
    },
    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},

    layoutTransition: {
        name: 'layout',
        mode: 'out-in'
    },
    pageTransition: {
        name: 'page',
        mode: 'out-in'
    }
};