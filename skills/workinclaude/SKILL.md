---
name: workinclaude
description: Use when setting up team collaboration workflows, planning features with brainstorming, developing with TDD, or managing team memory in project directory
---

# WorkInClaude Skill

## Overview

WorkInClaude is a composite skill for team collaboration that orchestrates existing superpowers skills to provide a unified workflow for project initialization, planning, development, and memory management. It combines brainstorming, writing-plans, test-driven development, and subagent-driven-development capabilities.

## Entry Points

| Command | Description |
|---------|-------------|
| `/workinclaude init` | Initialize new or existing project |
| `/workinclaude plan` | Start planning workflow |
| `/workinclaude develop` | Execute development workflow |
| `/workinclaude memory` | Manage team memory |

## Default Skills

- `karpathy-guidelines` - Avoid common LLM coding mistakes
- `superpowers:systematic-debugging` - Debug methodology
- `superpowers:writing-skills` - Skill creation

## Workflows

- `workflows/init.md` - Project initialization workflow
- `workflows/planning.md` - Feature planning workflow
- `workflows/development.md` - Development workflow with TDD
- `workflows/memory.md` - Team memory management workflow
