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