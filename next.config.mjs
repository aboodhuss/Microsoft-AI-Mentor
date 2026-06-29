import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  outputFileTracingRoot: projectDir,
};

export default nextConfig;
