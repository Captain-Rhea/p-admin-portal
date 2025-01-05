export default defineNuxtConfig({
  ssr: true,
  nitro: {
    preset: 'static',
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'RHEA Solutions - บริการออกแบบเว็บไซต์และการตลาดออนไลน์',
      meta: [
        { name: 'theme-color', content: '#ffffff' },
        {
          name: 'description',
          content:
            'RHEA Solutions ผู้เชี่ยวชาญด้านการออกแบบเว็บไซต์ พัฒนา Web Application และการตลาดออนไลน์ ครบวงจร ช่วยให้ธุรกิจของคุณเติบโตในโลกดิจิทัล',
        },
        {
          name: 'keywords',
          content:
            'ออกแบบเว็บไซต์, พัฒนาเว็บแอปพลิเคชัน, การตลาดออนไลน์, รับทำเว็บไซต์, ออกแบบเว็บมืออาชีพ',
        },
        { name: 'author', content: 'RHEA Solutions Team' },
        {
          property: 'og:title',
          content: 'RHEA Solutions - บริการออกแบบเว็บไซต์และการตลาดออนไลน์',
        },
        {
          property: 'og:description',
          content:
            'RHEA Solutions ผู้เชี่ยวชาญด้านการออกแบบเว็บไซต์ พัฒนา Web Application และการตลาดออนไลน์ ครบวงจร เพื่อช่วยให้ธุรกิจของคุณเติบโตในโลกดิจิทัล',
        },
        { property: 'og:image', content: '/og-image.jpg' },
        {
          property: 'og:image:width',
          content: '1200',
        },
        {
          property: 'og:image:height',
          content: '630',
        },
        { property: 'og:url', content: 'https://rhea-solutions.com' },
      ],
      link: [
        { rel: 'canonical', href: 'https://rhea-solutions.com' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@100;200;300;400;500;600;700;800;900&display=swap',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  runtimeConfig: {
    public: {
      mainApi: 'http://localhost:3001',
      idpApi: 'https://idp.in-spect-pro.com',
      storageApi: 'https://storage.in-spect-pro.com',
    },
  },
  modules: [
    'nuxt-lucide-icons',
    '@hypernym/nuxt-anime',
    '@pinia/nuxt',
    '@nuxt/image-edge',
    '@nuxtjs/i18n',
  ],
  i18n: {
    locales: [
      { code: 'th', name: 'ภาษาไทย', language: 'th-TH', file: 'th.json' },
      { code: 'en', name: 'English', language: 'en-US', file: 'en.json' },
    ],
    strategy: 'prefix_and_default',
    defaultLocale: 'th',
    lazy: true,
    vueI18n: './i18n.config.ts',
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  css: ['~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
