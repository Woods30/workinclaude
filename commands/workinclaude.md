---
description: "Team collaboration workflows with brainstorming + TDD"
---

# WorkinClaude

Team collaboration skill with integrated planning, development, and memory management workflows.

## Usage

`/workinclaude <command>`

## Commands

### init
Initialize project for team collaboration:
```
/workinclaude init
```

### plan
Start planning workflow with brainstorming:
```
/workinclaude plan
```

### develop
Execute development workflow with TDD:
```
/workinclaude develop
```

### memory
Manage team memory:
```
/workinclaude memory add <type>
/workinclaude memory list
/workinclaude memory search <query>
```

## What it does

1. **Init**: Sets up CLAUDE.md, CLAUDE.local.md template, .claude/memory/ structure
2. **Plan**: Invokes brainstorming + writing-plans workflow
3. **Develop**: Uses subagent-driven development with TDD
4. **Memory**: Manages team knowledge in .claude/memory/

## Examples

```
/workinclaude init
/workinclaude plan
/workinclaude develop
/workinclaude memory list
```

## Notes

- Run in project root directory
- Restart Claude Code after first installation to load new skills
