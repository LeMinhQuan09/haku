import vituum from 'vituum';
import * as path from 'path';
import tailwindcss from '@vituum/vite-plugin-tailwindcss';
import postcss from '@vituum/vite-plugin-postcss';
import posthtml from '@vituum/vite-plugin-posthtml';
import handlebarsPlugin from '@vituum/vite-plugin-handlebars';
import handlebars from 'handlebars';
import layouts from 'handlebars-layouts';
// import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import viteImagemin from '@vheemstra/vite-plugin-imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminWebp from 'imagemin-webp';
import imageminPngquant from 'imagemin-pngquant';
import imageminSVGO from 'imagemin-svgo';
import pluginPurgeCss from '@mojojoejo/vite-plugin-purgecss';
// import pictureSrcset from 'posthtml-picture-srcset';
import imports from 'vituum/plugins/imports.js';
import postcssSortMediaQueries from 'postcss-sort-media-queries';
import srcset from 'posthtml-sugar-srcset';

export default {
  plugins: [
    vituum(),
    imports({
      filenamePattern: { '+.scss': 'src/styles', '+.js': 'src/scripts' },
    }),
    handlebarsPlugin({
      helpers: {
        ...layouts(handlebars),
        times: function (n, block) {
          let accum = '';
          for (let i = 0; i < n; ++i) accum += block.fn(i);
          return accum;
        },
      },
      root: './src',
    }),
    viteImagemin({
      plugins: {
        jpg: imageminMozjpeg(),
        png: imageminPngquant(),
        // svg: imageminSVGO(),
      },
      makeWebp: {
        plugins: {
          jpg: imageminWebp(),
          png: imageminWebp(),
        },
      },
    }),
    tailwindcss(),
    postcss(),
    posthtml({
      // plugins: [srcset()],
    }),
    pluginPurgeCss({
      variables: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      sass: {
        quietDeps: true,
      },
    },
    postcss: {
      plugins: [
        postcssSortMediaQueries({
          sort: 'desktop-first',
        }),
      ],
    },
  },
  build: {
    target: 'modules',
    manifest: true,
    minify: 'terser',
    cssCodeSplit: false,
    terserOptions: {
      compress: {
        drop_console: true,
        toplevel: true,
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
};
