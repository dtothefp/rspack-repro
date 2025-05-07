import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isRunningWebpack = !!process.env.WEBPACK;
const isRunningRspack = !!process.env.RSPACK;
if (!isRunningRspack && !isRunningWebpack) {
  throw new Error("Unknown bundler");
}

const alias = {
  'alias': 'alias-resolve',
};

class ResolverPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap(
      ResolverPlugin.name,
      (compilation, { normalModuleFactory }) => {
        normalModuleFactory.hooks.beforeResolve.tap(
          ResolverPlugin.name,
          (resolveData) => {
            if (resolveData.request === 'alias') {
              // Ideally if we return here the alias would be processed and we would received a subsequent request
              // for 'alias-resolve' and we could resolve the full path to that.
              return;
            }

            if (resolveData.request === 'direct-resolve' || resolveData.request === 'alias-resolve') {
              console.log('resolveData', resolveData.request)
              resolveData.request = path.resolve(__dirname, 'src', `${resolveData.request}.js`)
            }
          }
        );
      }
    );
  }
}

/**
 * @type {import('webpack').Configuration | import('@rspack/cli').Configuration}
 */
const config = {
  mode: "development",
  devtool: false,
  entry: {
    main: "./src/index",
  },
  resolve: {alias},
  plugins: [new HtmlWebpackPlugin(), new ResolverPlugin()],
  output: {
    clean: true,
    path: isRunningWebpack
      ? path.resolve(__dirname, "webpack-dist")
      : path.resolve(__dirname, "rspack-dist"),
    filename: "[name].js",
  },
  experiments: {
    css: true,
  },
};

export default config;
