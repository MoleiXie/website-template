import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import AutoImport from 'unplugin-auto-import/vite'

// 自动生成sitemap.xml
import VitePluginSitemap from 'vite-plugin-sitemap'

// 自动生成robots.txt
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    server: {
      proxy: {
        '/api': {
          // 公共的一个测试api接口
          target: 'http://shanhe.kim',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/api')
        }
      }
    },
    ssgOptions: {
      script: 'async',      // 为script标签添加async属性
      formatting: 'minify', // 压缩html
      // 如果有需要爬取的动态路由，在这里配置
      crittersOptions: {
        preload: 'js-lazy'
      },
    },
    plugins: [
      tailwindcss(),
      VueRouter(),
      vue(),
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ['vue', 'vue-router'],

        // 生成 `auto-imports.d.ts` 声明文件
        dts: true,

        // 自动导入hooks
        dirs: ['src/composables/**'],

        // 生成相应的 .eslintrc-auto-import.json 文件
        eslintrc: {
          enabled: true,
        },

        // 自动导入 Vue 模板中的组件
        vueTemplate: true
      }),
      VitePluginSitemap({
        hostname: env.VITE_SITE_URL || 'https://your-domain.com',
        // 基于你的路由结构自动生成
        links: [
          {
            url: '/',
            lastmod: new Date().toISOString(),
            changefreq: 'daily',
            priority: 1.0
          },
          {
            url: '/about',
            changefreq: 'monthly',
            priority: 0.8
          },
          {
            url: '/users',
            changefreq: 'weekly',
            priority: 0.7
          },
          // 直接在这里添加动态路由，而不是使用 dynamicRoutes
          {
            url: '/users/1',
            lastmod: new Date().toISOString(),
            changefreq: 'weekly',
            priority: 0.6
          },
        ],
      }),
      viteStaticCopy({
        targets: [
          {
            // robots.txt 处理
            src: 'public/robots.txt',
            dest: '',
            transform: (content) => {
              return content
                .toString()
                .replace(
                  /Sitemap:.*$/m,
                  `Sitemap: ${env.VITE_SITE_URL}/sitemap.xml`
                )
            }
          }
        ]
      })
    ],
  }
})
