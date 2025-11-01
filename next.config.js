/** @type {import('next').NextConfig} */
// Configuration for basePath
// - Default: Use custom domain (empty basePath) for xingcheng-zhou.com
// - If GITHUB_PAGES=true and no CUSTOM_DOMAIN: Use GitHub Pages subpath (/xingcheng.github.io)
const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const hasCustomDomain = !!process.env.CUSTOM_DOMAIN;
const customDomain = process.env.CUSTOM_DOMAIN || 'xingcheng-zhou.com';
const basePath = (isGitHubPages && !hasCustomDomain) ? '/xingcheng.github.io' : '';

// Log build configuration
console.log('\n\uD83D\uDCE6 Build Configuration:');
console.log(`   Domain: ${customDomain}`);
console.log(`   Base Path: ${basePath || '(empty - for custom domain)'}`);
console.log(`   Mode: ${isGitHubPages ? 'GitHub Pages' : 'Custom Domain'}\n`);

const nextConfig = {
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_CUSTOM_DOMAIN: customDomain,
  },
};

module.exports = nextConfig
