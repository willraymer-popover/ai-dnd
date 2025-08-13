# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a multi-agent D&D Game Master system built with Next.js and assistant-ui. The system decomposes the complex GM role into specialized agents that collaborate to create a sophisticated gaming experience.

## Key Commands

```bash
# Development
pnpm dev          # Start development server on localhost:3000

# Build & Production
pnpm build        # Build for production
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint
pnpm lint:fix     # Run ESLint with auto-fix
pnpm type-check   # Run TypeScript type checking (tsc --noEmit)
```

## Architecture

### Core Stack
- **Next.js 15** with App Router
- **assistant-ui** for chat interface components
- **AI SDK** (Vercel AI SDK v5) with custom agent toolkit
- **TypeScript** with strict mode enabled
- **Tailwind CSS v4** for styling
- **pnpm** as package manager
- **Supabase** for data persistence (configured but not yet implemented)

### Multi-Agent System Design

The system uses a hierarchical agent architecture with specialized roles:

**Executive Level:**
- **Showrunner**: Campaign vision and long-term story arcs
- **Director**: Session pacing and scene transitions
- **Dramaturg**: World consistency and lore management

**Department Heads:**
- **Narrator**: Primary player interface and improv responses
- **Writer**: Dialogue and descriptive text creation
- **Combat Choreographer**: Tactical encounter management

**Specialized Support:**
- **Character PAs**: Individual agents tracking PCs and important NPCs
- **Setting Supervisors**: Location-specific atmosphere and details
- **Rules Arbitrator**: Mechanical decisions and rule interpretations
- **Off-Camera Thinker**: World simulation beyond player perception

### Key Files
- `/app/MyRuntimeProvider.tsx`: Runtime provider with agent selection context
- `/app/api/chat/route.ts`: Main chat endpoint handling agent routing
- `/lib/ai/agents/index.ts`: Agent definitions (currently placeholder implementations)
- `/app/assistant.tsx`: Main chat interface component

### Local Dependencies
The project uses a local linked package `ai-sdk-v5-agent-toolkit` which provides the Agent class and cost tracking functionality.

## Data Model Design

### Fiction Classification System
All narrative data is classified into three categories:
- **Established Fiction**: What has happened or been revealed in-game
- **Stable Potential Fiction**: Planned lore unlikely to change (hidden NPC motivations, world history)
- **Speculative Potential Fiction**: Ideas that might pivot based on story direction

### Story Structure Hierarchy
- **Scenes**: Immediate action (15 minutes of story)
- **Threads**: Ongoing storylines (quest log maintenance)
- **Arcs**: Campaign-level themes (multi-session progression)

### Database Architecture (Planned)
- **Core Entity Tables**: Lean structured data for mechanical information
- **Facts Table**: Rich semantic data with flexible entity linking
- Enables multi-pathway discovery through semantic search
- Single facts can inform multiple entities simultaneously

### Entity Types
- **Characters**: PCs (never authored by agents) and NPCs (complexity grows organically)
- **Geography**: Physical (regions, locations, environments) and Human (settlements, organizations, political entities)
- **Story Structure**: Scenes, Threads, Arcs with different fidelity levels

## Implementation Status

Currently, the project has:
- Basic agent routing infrastructure
- Placeholder agent definitions (simpleAssistant, dungeonMaster, characterBuilder, ruleExpert)
- Chat interface with agent selection

The full multi-agent architecture described in `/docs/` is the target design but not yet implemented.