# Multi-Agent D&D GM Data Model

## Core Design Principles

1. **Facts vs. Ideas Distinction** - Separate established reality from potential fiction
2. **Semantic Search Enabled** - Tag narrative data for creative agent queries
3. **Agent Behavior Boundaries** - Categories reflect how different agents interact with data
4. **Property-Based Flexibility** - Attach behaviors to entities rather than rigid hierarchies
5. **Time Horizon Management** - Different data persistence for immediate vs. long-term needs

## Fiction Classification System

**Applies to all entity types** - Characters, Geography, Organizations, Political Entities, and Story Structure

### Established Fiction
**Definition**: What has actually happened or been revealed in-game
- Player actions and their consequences
- Revealed NPC information and backstories
- World events that have occurred during play

### Stable Potential Fiction
**Definition**: Planned lore unlikely to change based on story direction
- Pre-planned NPC backstories and hidden motivations
- Fixed world history and established geography
- "The merchant is secretly the cult leader" type revelations

### Speculative Potential Fiction
**Definition**: Ideas that might pivot based on story direction
- "What if we introduce a plague subplot?"
- Multiple possible NPC reaction paths
- Contingent story branches and optional encounters

**Special Constraint**: For Player Characters, agents may only create potential fiction that recontextualizes existing player-established details, never inventing new backstory wholesale.

## Story Structure Detail

## Story Structure × Fiction Classification Matrix

### Scenes
**Established Fiction**: What has happened in this scene?
- High fidelity tracking (standard LLM message threads)
- Immediate actions, dialogue, and outcomes
- "You tried to jump across the drawbridge, but took an embarrassing faceplant in front of the prince"

**Stable Potential Fiction**: Core opportunities and complications that make this scene significant
- Key dramatic tensions and story hooks
- Character motivations driving the scene

**Speculative Potential Fiction**: Bonus opportunities and complications that might emerge
- Improvisational possibilities as the scene evolves
- Unexpected directions the interaction could take

### Threads
**Established Fiction**: What has happened in this thread, and what do the PCs know?
- Mid-fidelity summaries of thread progression
- PC knowledge about upcoming opportunities and complications
- "The prince hired you to defeat his other suitors and then disappear, because he's secretly in love with the cook"

**Stable Potential Fiction**: What don't the PCs know yet about this thread?
- Hidden information and planned revelations
- NPC secrets and background motivations

**Speculative Potential Fiction**: What might send this thread in a different direction?
- Potential branching points and offshoots
- Alternative resolution paths

### Arcs
**Established Fiction**: What has happened in this arc, and what do the PCs know about their goals?
- Low-fidelity bullet points highlighting significant developments
- PC understanding of core conflicts and objectives

**Stable Potential Fiction**: Core mysteries and secrets of the overarching story
- Campaign-level hidden information
- Long-term antagonist plans and motivations

**Speculative Potential Fiction**: Exciting twists that could emerge as the story continues
- Major plot pivots and surprising revelations
- Alternative campaign directions and climaxes

**Note**: All "Established Fiction" is fundamentally the same - it's information the PCs already know, whether immediate scene details or long-term arc knowledge, just tracked at different fidelity levels.

## Core Entity Types

### Characters
**Player Characters**
- Never authored by agents, only tracked
- Managed by dedicated Character PAs
- Full mechanical and narrative data

**NPCs**
- All NPCs start minimal and become more complex as needed
- Managed by Actor agents (assigned on-demand)
- Complexity grows organically as established/potential fiction accumulates
- "The guard at the gate" → "Marcus, who's secretly funding the rebellion"

### Geography

#### Physical Geography
- **Regions** - Large-scale areas (kingdoms, forests, mountain ranges)
- **Locations** - Specific visitable places (towns, dungeons, landmarks)  
- **Environments** - Tactical/atmospheric spaces (combat maps, room descriptions)

#### Human Geography
- **Settlements** - Where people live (village through metropolis)
- **Organizations** - Groups with agency (guilds, cults, armies)
- **Political Entities** - Power structures (kingdoms, noble houses, governments)

### Story Structure

**Scenes** - "Next 15 minutes of story"
- Immediate action and dialogue
- Managed by Narrator
- Turn-by-turn resolution

**Threads** - "Quest log maintenance" 
- Ongoing storylines across sessions
- Coordinated by Director
- Session-to-session continuity

**Arcs** - "Building to something satisfying"
- Campaign-level movements and themes
- Managed by Showrunner
- Multi-session narrative progression

## Data Structure Approach

### Database Architecture
**Core Entity Tables**: Lean structured data for minimum viable entity information
- Characters, Locations, Organizations, Political Entities, etc.
- Primarily mechanical data and basic identifiers

**Facts Table**: Rich, flat semantic data with flexible entity linking
- All narrative information stored as linkable facts
- Many-to-many relationships enable multiple discovery pathways
- Single fact can inform multiple entities simultaneously

### Structured Mechanical Data
```json
Character {
  "id": "lord_blackwood",
  "stats": { "hp": 25, "ac": 16, "level": 3 },
  "inventory": [Item],
  "conditions": [Status],
  "abilities": [Spell, Skill]
}
```

### Semantic Narrative Data
```json
Fact {
  "content": "Lord Blackwood fears his daughter will discover his deal with the demons",
  "fiction_type": "stable_potential",
  "linked_entities": [
    {"type": "npc", "id": "lord_blackwood"},
    {"type": "npc", "id": "lady_elara_blackwood"},
    {"type": "organization", "id": "demon_cult"},
    {"type": "political_entity", "id": "blackwood_domain"},
    {"type": "thread", "id": "expose_lord_blackwood"}
  ],
  "relationships": ["parent_child", "guilty_secret"],
  "context_tags": ["political", "personal", "supernatural"],
  "is_critical": false,
  "semantic_vectors": [...]
}
```

### Multi-Pathway Discovery
A single fact becomes discoverable through multiple agent queries:
- **Writer** searching "juicy gossip about demon cult" → finds the fact via organization link
- **Director** querying "Expose Lord Blackwood thread progress" → finds the fact via thread link
- **Character PA** for Lady Elara seeking "family secrets" → finds the fact via character link
- **Setting Supervisor** for Blackwood Castle looking for "dark activities" → finds the fact via location link

## Semantic Search Examples

**Writer querying "juicy gossip"**:
- Returns facts tagged: `guilty_secret`, `romantic_entanglement`, `political_scandal`

**Director searching "rising tension"**:
- Finds: `unresolved_conflict`, `ticking_time_bomb`, `mounting_pressure`

**Off-Camera Thinker looking for "neglected consequences"**:
- Surfaces: established facts with `follow_up_needed`, `ripple_effect_pending`

## Agent Ownership by Story Structure

**Scenes**: Narrator, Combat Choreographer, Character PAs
- Managing immediate action and real-time interactions
- High-fidelity tracking of current events

**Threads**: Director, Dramaturg, Setting Supervisors
- Coordinating ongoing storylines and continuity
- Mid-fidelity management of session-to-session elements

**Arcs**: Showrunner, Off-Camera Thinker
- Managing campaign-level narrative and long-term consequences
- Low-fidelity oversight of overarching themes and progression