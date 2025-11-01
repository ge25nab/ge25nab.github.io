#!/usr/bin/env node

/**
 * Build script for both GitHub Pages and Custom Domain versions
 * This script builds two versions:
 * 1. GitHub Pages version (basePath: '/ge25nab.github.io')
 * 2. Custom Domain version (basePath: '')
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('\n🚀 Building for both domains...\n');

const outDir = path.join(__dirname, '..', 'out');
const outGitHubPages = path.join(__dirname, '..', 'out-gh-pages');
const outCustomDomain = path.join(__dirname, '..', 'out-custom-domain');

// Clean function
function cleanDir(dir) {
  if (fs.existsSync(dir)) {
    console.log(`Cleaning ${dir}...`);
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

// Build function
function build(env, targetDir) {
  console.log(`\n📦 Building for ${env.MODE || 'unknown'}...`);
  console.log(`   Base Path: ${env.NEXT_PUBLIC_BASE_PATH || '(empty)'}`);
  
  try {
    // Clean target directory
    cleanDir(outDir);
    
    // Set environment variables
    const buildEnv = { ...process.env, ...env };
    
    // Generate feeds
    console.log('   Generating feeds...');
    execSync('npm run generate:feeds', {
      env: buildEnv,
      stdio: 'inherit',
      cwd: path.join(__dirname, '..'),
    });
    
    // Build
    console.log('   Building...');
    // For custom domain, unset GITHUB_PAGES if it's empty
    if (env.GITHUB_PAGES === '') {
      delete buildEnv.GITHUB_PAGES;
    }
    execSync('next build', {
      env: buildEnv,
      stdio: 'inherit',
      cwd: path.join(__dirname, '..'),
    });
    
    // Copy to target directory
    if (targetDir !== outDir) {
      console.log(`   Copying to ${targetDir}...`);
      if (fs.existsSync(targetDir)) {
        fs.rmSync(targetDir, { recursive: true, force: true });
      }
      fs.cpSync(outDir, targetDir, { recursive: true });
    }
    
    console.log(`   ✅ Build complete for ${env.MODE || 'unknown'}\n`);
  } catch (error) {
    console.error(`   ❌ Build failed for ${env.MODE || 'unknown'}:`, error.message);
    process.exit(1);
  }
}

// Build GitHub Pages version
build(
  {
    GITHUB_PAGES: 'true',
    NEXT_PUBLIC_BASE_URL: 'https://ge25nab.github.io/ge25nab.github.io',
    NEXT_PUBLIC_BASE_PATH: '/ge25nab.github.io',
    MODE: 'GitHub Pages',
  },
  outGitHubPages
);

// Build Custom Domain version
build(
  {
    GITHUB_PAGES: '',
    NEXT_PUBLIC_BASE_URL: 'https://xingcheng-zhou.com',
    NEXT_PUBLIC_BASE_PATH: '',
    MODE: 'Custom Domain',
  },
  outCustomDomain
);

console.log('\n✅ All builds complete!\n');
console.log('📁 Build outputs:');
console.log(`   GitHub Pages:    ${outGitHubPages}`);
console.log(`   Custom Domain:   ${outCustomDomain}`);
console.log('\n📝 Next steps:');
console.log('   1. GitHub Pages: Deploy the out-gh-pages directory to GitHub Pages');
console.log('   2. Custom Domain: Deploy the out-custom-domain directory to xingcheng-zhou.com');
console.log('');

