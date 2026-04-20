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