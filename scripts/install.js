#!/usr/bin/env node
/**
 * WorkinClaude Installation Script
 * Copies skill files from plugin to project skills directory
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PLUGIN_DIR = path.join(__dirname, '..');
const PLUGIN_SKILL_DIR = path.join(PLUGIN_DIR, 'skills', 'workinclaude');
const PROJECT_SKILLS_DIR = '.claude/skills';

const MEMORY_DIR = '.claude/memory';
const GITIGNORE_PATH = '.gitignore';
const CLAUDE_LOCAL = 'CLAUDE.local.md';
const CLAUDE_LOCAL_TEMPLATE = path.join(PLUGIN_SKILL_DIR, 'templates', 'CLAUDE.local.template.md');

const SUPERPOWERS_REPO = 'https://github.com/obra/superpowers.git';
const SUPERPOWERS_DIR = path.join(PLUGIN_DIR, 'skills', 'superpowers');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created: ${dir}`);
  }
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;

  ensureDir(dest);

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      ensureDir(destPath);
      copyDir(srcPath, destPath);
    } else {
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied: ${destPath}`);
      }
    }
  }
}

function addToGitIgnore(pattern) {
  if (!fs.existsSync(GITIGNORE_PATH)) {
    fs.writeFileSync(GITIGNORE_PATH, '');
  }

  const content = fs.readFileSync(GITIGNORE_PATH, 'utf8');
  if (!content.includes(pattern)) {
    fs.appendFileSync(GITIGNORE_PATH, `\n${pattern}`);
    console.log(`Added to .gitignore: ${pattern}`);
  }
}

function cloneSuperpowers() {
  if (fs.existsSync(SUPERPOWERS_DIR)) {
    console.log('superpowers already exists, skipping clone');
    return;
  }

  console.log('Cloning superpowers from GitHub...');
  try {
    execSync(`git clone ${SUPERPOWERS_REPO} ${SUPERPOWERS_DIR}`, { stdio: 'inherit' });
    console.log('superpowers cloned successfully');
  } catch (error) {
    console.error('Failed to clone superpowers:', error.message);
  }
}

function install() {
  console.log('WorkinClaude: Installing skill to project...\n');

  // Clone superpowers if not exists
  cloneSuperpowers();

  // Create project skills directory
  ensureDir(PROJECT_SKILLS_DIR);

  // Copy workinclaude skill
  const workinclaudeSrc = path.join(PLUGIN_DIR, 'skills', 'workinclaude');
  const workinclaudeDest = path.join(PROJECT_SKILLS_DIR, 'workinclaude');
  copyDir(workinclaudeSrc, workinclaudeDest);
  console.log(`\nSkill installed: ${workinclaudeDest}`);

  // Copy superpowers (if exists locally)
  if (fs.existsSync(SUPERPOWERS_DIR)) {
    const superpowersDest = path.join(PROJECT_SKILLS_DIR, 'superpowers');
    copyDir(SUPERPOWERS_DIR, superpowersDest);
    console.log(`Skill installed: ${superpowersDest}`);
  }

  // Copy karpathy-guidelines
  const karpathySrc = path.join(PLUGIN_DIR, 'skills', 'karpathy-guidelines');
  if (fs.existsSync(karpathySrc)) {
    const karpathyDest = path.join(PROJECT_SKILLS_DIR, 'karpathy-guidelines');
    copyDir(karpathySrc, karpathyDest);
    console.log(`Skill installed: ${karpathyDest}`);
  }

  // Create memory directory and copy templates
  ensureDir(MEMORY_DIR);

  const memoryTemplatesDir = path.join(PLUGIN_SKILL_DIR, 'templates', 'memory');
  if (fs.existsSync(memoryTemplatesDir)) {
    fs.readdirSync(memoryTemplatesDir).forEach(file => {
      const src = path.join(memoryTemplatesDir, file);
      const dest = path.join(MEMORY_DIR, file);
      if (!fs.existsSync(dest)) {
        fs.copyFileSync(src, dest);
        console.log(`Created memory: ${dest}`);
      }
    });
  }

  // Create CLAUDE.local.md from template if not exists
  if (fs.existsSync(CLAUDE_LOCAL_TEMPLATE) && !fs.existsSync(CLAUDE_LOCAL)) {
    fs.copyFileSync(CLAUDE_LOCAL_TEMPLATE, CLAUDE_LOCAL);
    console.log(`Created: ${CLAUDE_LOCAL} (fill in your details)`);
  }

  // Ensure CLAUDE.local.md is in .gitignore
  addToGitIgnore(CLAUDE_LOCAL);

  console.log('\nInstallation complete!');
  console.log('Next: Restart Claude Code or run /workinclaude init');
}

install();
