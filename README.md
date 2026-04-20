# WorkinClaude

Team collaboration skill with brainstorming + TDD workflows for Claude Code.

## Overview

WorkinClaude is a composite skill that orchestrates team collaboration workflows:
- **Planning** - Brainstorming + writing-plans for feature design
- **Development** - Subagent-driven development with TDD
- **Memory** - Team memory management in `.claude/memory/`
- **Init** - Project initialization for team collaboration

## Installation

### For Claude Code Users

1. Add to your `settings.json`:
```json
{
  "extraKnownMarketplaces": {
    "workinclaude-local": {
      "source": {
        "source": "file",
        "path": "/path/to/workinclaude/.claude-plugin/marketplace.json"
      }
    }
  }
}
```

2. Enable in `enabledPlugins`:
```json
{
  "enabledPlugins": {
    "workinclaude@workinclaude-local": true
  }
}
```

### For Project Initialization

```bash
node scripts/init-project.js
```

## Usage

- `/workinclaude init` - Initialize project for team collaboration
- `/workinclaude plan` - Start planning workflow
- `/workinclaude develop` - Execute development workflow
- `/workinclaude memory` - Manage team memory

## Structure

```
workinclaude/
├── .claude-plugin/        # Plugin configuration
│   ├── marketplace.json
│   ├── plugin.json
│   └── hooks/
├── skills/
│   └── workinclaude/      # Main skill
│       ├── SKILL.md
│       ├── workflows/
│       ├── templates/
│       └── default-skills/
├── scripts/
│   ├── init-project.js
│   └── install.js
└── docs/
```

## License

MIT
