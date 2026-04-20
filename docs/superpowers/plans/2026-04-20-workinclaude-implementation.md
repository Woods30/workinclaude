# WorkinClaude Skill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a composite skill for team collaboration workflows including planning (brainstorming+TDD), development, testing, and memory management.

**Architecture:** Composite skill that delegates to existing superpowers skills (brainstorming, writing-plans, tdd, subagent-driven-development). Provides init, planning, development, and memory workflows. Uses text-based memory in `.claude/memory/` for team sharing.

**Tech Stack:** Claude Code skills framework, markdown-based templates

---

## File Structure Map

```
workinclaude/                          # Main skill directory
├── SKILL.md                           # Main orchestration (entry points)
├── workflows/
│   ├── init.md                        # Init workflow
│   ├── planning.md                   # Planning workflow
│   ├── development.md                # Development workflow
│   └── memory.md                     # Memory management workflow
├── templates/
│   ├── CLAUDE.local.template.md      # Local config template
│   └── memory/
│       ├── user_template.md
│       ├── feedback_template.md
│       ├── project_template.md
│       └── reference_template.md
├── default-skills/                    # Bundled default skills
│   ├── karpathy-guidelines.md
│   ├── systematic-debugging.md
│   └── writing-skills.md
└── scripts/
    └── init-project.js               # Project initialization script
```

---

## Task 1: Create Directory Structure

**Files:**
- Create: `workinclaude/`
- Create: `workinclaude/workflows/`
- Create: `workinclaude/templates/memory/`
- Create: `workinclaude/default-skills/`
- Create: `workinclaude/scripts/`

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p workinclaude/workflows
mkdir -p workinclaude/templates/memory
mkdir -p workinclaude/default-skills
mkdir -p workinclaude/scripts
```

- [ ] **Step 2: Verify directories created**

Run: `find workinclaude -type d`
Expected: All 5 directories listed

- [ ] **Step 3: Commit**

```bash
git add workinclaude/
git commit -m "feat(workinclaude): create directory structure"
```

---

## Task 2: Create SKILL.md (Main Orchestration)

**Files:**
- Create: `workinclaude/SKILL.md`

- [ ] **Step 1: Write SKILL.md with frontmatter and overview**

```markdown
---
name: workinclaude
description: Use when setting up team collaboration workflows, planning features with brainstorming, developing with TDD, or managing team memory in project directory
---

# WorkinClaude

## Overview

A composite skill that orchestrates team collaboration workflows: planning, development, testing, and memory management. Uses brainstorming + TDD methodology and maintains project memory across sessions.

**Core principle:** Standardized team workflows with flexible execution.

## Entry Points

| Command | Description |
|---------|-------------|
| `/workinclaude init` | Initialize new or existing project |
| `/workinclaude plan` | Start planning workflow |
| `/workinclaude develop` | Execute development workflow |
| `/workinclaude memory` | Manage team memory |

## Default Skills (Always Active)

| Skill | Purpose |
|-------|---------|
| `karpathy-guidelines` | Avoid common LLM coding mistakes |
| `superpowers:systematic-debugging` | Debug methodology |
| `superpowers:writing-skills` | Skill creation |

## Workflows

See individual workflow files:
- `workflows/init.md` - Project initialization
- `workflows/planning.md` - Planning workflow
- `workflows/development.md` - Development workflow
- `workflows/memory.md` - Memory management
```

- [ ] **Step 2: Verify file created**

Run: `ls -la workinclaude/SKILL.md`
Expected: File exists with content

- [ ] **Step 3: Commit**

```bash
git add workinclaude/SKILL.md
git commit -m "feat(workinclaude): add main SKILL.md"
```

---

## Task 3: Create Workflow Files

**Files:**
- Create: `workinclaude/workflows/init.md`
- Create: `workinclaude/workflows/planning.md`
- Create: `workinclaude/workflows/development.md`
- Create: `workinclaude/workflows/memory.md`

- [ ] **Step 1: Write workflows/init.md**

```markdown
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
```

- [ ] **Step 2: Write workflows/planning.md**

```markdown
# Planning Workflow

## Overview

Invokes brainstorming + writing-plans for feature planning.

## Flow

1. Explore project context
2. Invoke `superpowers:brainstorming`
3. Generate design spec → `docs/superpowers/specs/`
4. Generate implementation plan → `docs/superpowers/plans/`
5. Transition to development

## Entry Point

`/workinclaude plan` → starts planning workflow
```

- [ ] **Step 3: Write workflows/development.md**

```markdown
# Development Workflow

## Overview

Executes implementation plan using subagent-driven development with TDD.

## Flow

1. Load implementation plan from `docs/superpowers/plans/`
2. For each task using `superpowers:subagent-driven-development`:
   - Create fresh worktree (if using worktrees)
   - Write failing test (RED) per `superpowers:test-driven-development`
   - Verify test fails correctly
   - Write minimal code (GREEN)
   - Verify test passes
   - Refactor if needed
   - Commit
3. Code review before completion

## Entry Point

`/workinclaude develop` → starts development workflow
```

- [ ] **Step 4: Write workflows/memory.md**

```markdown
# Memory Workflow

## Overview

Manages team memory in `.claude/memory/` using text-based markdown files.

## Memory Types

| Type | File | Purpose |
|------|------|---------|
| user | `user.md` | Team member roles and preferences |
| feedback | `feedback.md` | Team feedback on process |
| project | `project.md` | Project context, decisions, goals |
| reference | `reference.md` | External resources |

## Operations

| Operation | Manual Command | Auto (Context-Aware) |
|-----------|---------------|---------------------|
| Add | `/workinclaude memory add <type>` | Detect and prompt |
| Update | `/workinclaude memory update <type>` | Detect changes |
| Search | `/workinclaude memory search <query>` | Always available |
| List | `/workinclaude memory list` | Always available |

## Entry Points

- `/workinclaude memory` → list operations
- `/workinclaude memory add <type>` → add entry
- `/workinclaude memory update <type>` → update entry
- `/workinclaude memory search <query>` → search
```

- [ ] **Step 5: Verify all workflow files created**

Run: `ls -la workinclaude/workflows/`
Expected: 4 files listed (init.md, planning.md, development.md, memory.md)

- [ ] **Step 6: Commit**

```bash
git add workinclaude/workflows/
git commit -m "feat(workinclaude): add workflow files"
```

---

## Task 4: Create Templates

**Files:**
- Create: `workinclaude/templates/CLAUDE.local.template.md`
- Create: `workinclaude/templates/memory/user_template.md`
- Create: `workinclaude/templates/memory/feedback_template.md`
- Create: `workinclaude/templates/memory/project_template.md`
- Create: `workinclaude/templates/memory/reference_template.md`

- [ ] **Step 1: Write CLAUDE.local.template.md**

```markdown
# Local Configuration

## Personal Info
- Name:
- Role:

## Preferences
[Coding preferences, workflow preferences]

## Notes
[Personal notes, reminders]

---
This file is a TEMPLATE. Copy to CLAUDE.local.md and fill in your details.
CLAUDE.local.md is git-ignored - do NOT commit your local config.
```

- [ ] **Step 2: Write memory templates**

`user_template.md`:
```markdown
---
name: [username]
description: [one-line description]
type: user
---

# User Memory

## Role
[Team role and responsibilities]

## Preferences
[Coding preferences, workflow preferences]

## Background
[Relevant experience, skills, knowledge]
```

`feedback_template.md`:
```markdown
---
name: [feedback-name]
description: [one-line description]
type: feedback
---

# Feedback Memory

## Context
[What this feedback is about]

## Feedback
[Detailed feedback]

## Why
[Reason/background]

## How to Apply
[How this should shape behavior]
```

`project_template.md`:
```markdown
---
name: [project-memory-name]
description: [one-line description]
type: project
---

# Project Memory

## Context
[Project background, goals]

## Decisions
[Key architectural decisions]

## Constraints
[Known constraints, requirements]
```

`reference_template.md`:
```markdown
---
name: [reference-name]
description: [one-line description]
type: reference
---

# Reference Memory

## Resource
[External resource link or name]

## Purpose
[What this resource is used for]

## How to Use
[Usage notes, important details]
```

- [ ] **Step 3: Verify templates created**

Run: `find workinclaude/templates -type f`
Expected: 5 files listed

- [ ] **Step 4: Commit**

```bash
git add workinclaude/templates/
git commit -m "feat(workinclaude): add templates"
```

---

## Task 5: Create Default Skills

**Files:**
- Create: `workinclaude/default-skills/karpathy-guidelines.md`
- Create: `workinclaude/default-skills/systematic-debugging.md`
- Create: `workinclaude/default-skills/writing-skills.md`

- [ ] **Step 1: Write karpathy-guidelines.md**

```markdown
---
name: karpathy-guidelines
description: Behavioral guidelines to reduce common LLM coding mistakes. Use when writing, reviewing, or refactoring code.
license: MIT
---

# Karpathy Guidelines

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"
```

- [ ] **Step 2: Write systematic-debugging.md** (copy from existing skill)

```markdown
---
name: systematic-debugging
description: Use when encountering any bug, test failure, or unexpected behavior to trace root cause systematically.
---

# Systematic Debugging

## Overview

Debug systematically by isolating the problem, forming hypotheses, and testing them one at a time.

## Process

1. **Isolate** - Find the exact failure case
2. **Hypothesize** - Form a testable explanation
3. **Test** - Verify or refute the hypothesis
4. **Iterate** - Repeat until root cause found

## Key Principle

Never assume. Always verify. If you think you know, prove it.

See: `superpowers:systematic-debugging` for full guide.
```

- [ ] **Step 3: Write writing-skills.md** (reference to superpowers skill)

```markdown
---
name: writing-skills
description: Use when creating new skills, editing existing skills, or verifying skills work before deployment.
---

# Writing Skills Reference

## Overview

Writing skills follows TDD methodology - write tests first, then the skill.

## Key Points

1. Skills are reference guides for proven techniques
2. Follow RED-GREEN-REFACTOR cycle
3. Test with pressure scenarios
4. See `superpowers:writing-skills` for full guide.
```

- [ ] **Step 4: Verify default skills created**

Run: `ls -la workinclaude/default-skills/`
Expected: 3 files listed

- [ ] **Step 5: Commit**

```bash
git add workinclaude/default-skills/
git commit -m "feat(workinclaude): add default skills"
```

---

## Task 6: Create Init Script

**Files:**
- Create: `workinclaude/scripts/init-project.js`

- [ ] **Step 1: Write init-project.js**

```javascript
#!/usr/bin/env node
/**
 * WorkinClaude Project Initialization Script
 * Initializes a project for team collaboration
 */

const fs = require('fs');
const path = require('path');

const MEMORY_DIR = '.claude/memory';
const GITIGNORE_PATH = '.gitignore';
const CLAUDE_LOCAL_TEMPLATE = 'CLAUDE.local.template.md';
const CLAUDE_LOCAL = 'CLAUDE.local.md';

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created: ${dir}`);
  }
}

function ensureFile(file, content = '') {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, content);
    console.log(`Created: ${file}`);
  }
}

function addToGitIgnore(pattern) {
  if (!fs.existsSync(GITIGNORE_PATH)) return;
  
  const content = fs.readFileSync(GITIGNORE_PATH, 'utf8');
  if (!content.includes(pattern)) {
    fs.appendFileSync(GITIGNORE_PATH, `\n${pattern}`);
    console.log(`Added to .gitignore: ${pattern}`);
  }
}

function init() {
  console.log('WorkinClaude: Initializing project...\n');
  
  // Create memory directory
  ensureDir(MEMORY_DIR);
  
  // Create memory files from templates
  const memoryTemplates = path.join(__dirname, '../templates/memory');
  if (fs.existsSync(memoryTemplates)) {
    fs.readdirSync(memoryTemplates).forEach(file => {
      const src = path.join(memoryTemplates, file);
      const dest = path.join(MEMORY_DIR, file);
      if (!fs.existsSync(dest)) {
        fs.copyFileSync(src, dest);
        console.log(`Created memory: ${dest}`);
      }
    });
  }
  
  // Create CLAUDE.local.md from template if not exists
  const templatePath = path.join(__dirname, `../templates/${CLAUDE_LOCAL_TEMPLATE}`);
  if (fs.existsSync(templatePath) && !fs.existsSync(CLAUDE_LOCAL)) {
    fs.copyFileSync(templatePath, CLAUDE_LOCAL);
    console.log(`Created: ${CLAUDE_LOCAL} (fill in your details)`);
  }
  
  // Ensure CLAUDE.local.md is in .gitignore
  addToGitIgnore(CLAUDE_LOCAL);
  
  console.log('\nInitialization complete!');
  console.log('Next steps:');
  console.log('  1. Review and customize CLAUDE.md for your project');
  console.log('  2. Copy CLAUDE.local.template.md to CLAUDE.local.md');
  console.log('  3. Run /workinclaude plan to start planning');
}

init();
```

- [ ] **Step 2: Make script executable**

Run: `chmod +x workinclaude/scripts/init-project.js`

- [ ] **Step 3: Verify script exists**

Run: `ls -la workinclaude/scripts/init-project.js`
Expected: File exists and is executable

- [ ] **Step 4: Commit**

```bash
git add workinclaude/scripts/init-project.js
git commit -m "feat(workinclaude): add init script"
```

---

## Task 7: Final Verification

**Files:**
- Modify: `README.md` or create if needed

- [ ] **Step 1: Verify complete directory structure**

Run: `find workinclaude -type f | sort`
Expected output:
```
workinclaude/default-skills/karpathy-guidelines.md
workinclaude/default-skills/systematic-debugging.md
workinclaude/default-skills/writing-skills.md
workinclaude/scripts/init-project.js
workinclaude/SKILL.md
workinclaude/templates/CLAUDE.local.template.md
workinclaude/templates/memory/feedback_template.md
workinclaude/templates/memory/project_template.md
workinclaude/templates/memory/reference_template.md
workinclaude/templates/memory/user_template.md
workinclaude/workflows/development.md
workinclaude/workflows/init.md
workinclaude/workflows/memory.md
workinclaude/workflows/planning.md
```

- [ ] **Step 2: Verify skill loads correctly**

Run: `head -20 workinclaude/SKILL.md`
Expected: Valid markdown with frontmatter

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat(workinclaude): complete skill implementation"
```

---

## Spec Coverage Check

- [x] Directory structure
- [x] SKILL.md with entry points
- [x] 4 workflow files (init, planning, development, memory)
- [x] Templates (CLAUDE.local.template.md + 4 memory templates)
- [x] Default skills (karpathy-guidelines, systematic-debugging, writing-skills)
- [x] Init script
- [x] Tech stack conventions in spec (documented in design doc, not implementation)
- [x] Memory auto-detection (documented in design doc)
- [x] Skill auto-install (documented in init workflow)

## Placeholder Scan

- No "TBD" or "TODO" found
- All steps have concrete code
- No references to undefined functions
