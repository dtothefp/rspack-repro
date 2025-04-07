import { defineConfig } from "@rsbuild/core";

export default defineConfig({
  output: {
    distPath: {
      root: "./rsbuild-dist",
    },
  },
  tools: {
    rspack: {
      module: {
        rules: [
          {
            test: /\.js$/,
            loader: require.resolve('./src/example-loader'),
          },
        ],
      },
      resolveLoader: {
        alias: {
          "import-module-example": require.resolve('./src/import-module-example-loader')
        }
      },
    },
  },
});
