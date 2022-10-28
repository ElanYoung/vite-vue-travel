import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue2 from '@vitejs/plugin-vue2';
import px2vp from 'postcss-px2vp';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import { viteMockServe } from 'vite-plugin-mock';

export default ({ command, mode }) => {
  const isBuild = command === 'build';
  const { VITE_PORT, VITE_BASE_URL } = loadEnv(mode, process.cwd());
  return defineConfig({
    base: VITE_BASE_URL,
    plugins: [
      vue2(),
      Components({
        resolvers: [VantResolver()],
        // 开启语法提示
        dts: true,
      }),
      viteMockServe({
        // 设置模拟数据存储文件夹
        mockPath: 'mock',
        // 是否开启支持TypeScript
        supportTs: false,
        // 忽略_开头文件
        ignore: /^\_/,
        // 设置是否启用本地模拟数据文件
        localEnabled: !isBuild,
        // 设置打包是否启用 mock 功能
        prodEnabled: isBuild,
        // 动态控制生产环境是否开启 mock 功能
        injectCode: `
          import { setupProdMockServer } from '../mock/_index';
          setupProdMockServer();
        `,
        // 是否在控制台显示请求日志
        logger: true,
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        // '~@vant': fileURLToPath(new URL('./node_modules/@vant', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${resolve('src/style/variables.less')}";`,
          },
          javascriptEnabled: true,
        },
      },
      postcss: {
        plugins: [
          px2vp({
            // 转化单位
            unitToConvert: 'px',
            // UI设计稿宽度
            viewportWidth(rule) {
              const file = rule.source?.input.file;
              // 根据文件名动态配置viewport width
              if (file?.includes('vant')) return 375;
              return 750;
            },
            // 转换后精度，即小数点位数
            unitPrecision: 6,
            // 指定转换的CSS属性的单位，*代表全部css属性的单位都进行转换
            propList: ['*'],
            // 指定需要转换成的视窗单位，默认vw
            viewportUnit: 'vw',
            // 指定字体需要转换成的视窗单位，默认vw
            fontViewportUnit: 'vw',
            // 指定不转换为视窗单位的类名，
            selectorBlackList: ['wrap'],
            // 默认值1，小于或等于1px则不进行转换
            minPixelValue: 1,
            // 是否在媒体查询的css代码中也进行转换，默认false
            mediaQuery: true,
            // 是否转换后直接更换属性值
            replace: true,
            // 设置忽略文件，用正则做目录名匹配
            exclude: [/node_modules/, /\/src\/assets\//, /index.html/],
            // 是否处理横屏情况
            landscape: false,
          }),
        ],
      },
    },
    server: {
      // 是否开启 https
      https: false,
      // 端口号
      port: VITE_PORT,
      // 监听所有地址
      host: '0.0.0.0',
      // 服务启动时是否自动打开浏览器
      open: true,
      // 允许跨域
      cors: true,
      // 自定义代理规则
      proxy: {},
    },
    build: {
      // 设置最终构建的浏览器兼容目标
      target: 'es2015',
      // 构建后是否生成 source map 文件
      sourcemap: false,
      //  chunk 大小警告的限制（以 kbs 为单位）
      chunkSizeWarningLimit: 2000,
      // 启用/禁用 gzip 压缩大小报告
      reportCompressedSize: false,
    },
  });
};
