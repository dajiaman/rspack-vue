import { Configuration } from '@rspack/cli';
import path from 'path';

const configuration: Configuration = {
  mode: 'production',
  target: 'electron-preload',
  resolve: {
    tsConfig: path.resolve(process.cwd(), '../../tsconfig.json'),
  },
  entry: {
    preload: path.join(__dirname, 'index.js'),
  },
  output: {
    path: path.join(process.cwd(), '../../build'),
    filename: '[name].js',
  },
};

export default configuration;
