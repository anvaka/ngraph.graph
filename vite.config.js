import { defineConfig } from 'vite';

// Build this CommonJS module as library for browsers via UMD and ESM outputs.
// The source exports a factory function via module.exports = createGraph.
// We'll expose it as `createGraph` global for UMD consumers, matching previous browserify -s output.
export default defineConfig({
  build: {
    lib: {
      entry: 'index.js',
      name: 'createGraph',
      fileName: (format) => `ngraph.graph.${format}.js`,
      formats: ['umd', 'es'],
    },
    rollupOptions: {
      output: {
        exports: 'default',
      },
    },
    sourcemap: true,
    outDir: 'dist',
    emptyOutDir: false,
    minify: 'esbuild',
  },
  test: {
  include: ['test/**/*.js'],
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      reportsDirectory: 'coverage',
    },
  },
});
