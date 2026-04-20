# Init Workflow

## Overview

Initializes a project for team collaboration.

## New Project Init

1. Scan project structure (language, framework, existing conventions)
2. Check default skills availability (karpathy-guidelines, systematic-debugging, writing-skills)
   - If missing → auto-install from `default-skills/` to project skills directory
3. Generate `CLAUDE.md` with project-level conventions
4. Generate `CLAUDE.local.template.md` for team members
5. Create `.claude/memory/` directory structure
6. Ensure `CLAUDE.local.md` in `.gitignore`
7. Initialize memory with project context

## Existing Project Import

1. Analyze existing project patterns and conventions
2. Generate `CLAUDE.md` capturing discovered patterns
3. Generate `CLAUDE.local.template.md`
4. Setup `.claude/memory/` if not exists
5. Create initial project memory (architecture, key decisions)

## Skill Auto-Install

If a default skill is missing:
1. Copy from `workinclaude/default-skills/<skill>.md` to project skills directory
2. Log installation in init output