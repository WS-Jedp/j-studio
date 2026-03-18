# CTX

# Context-Driven Development (CDD)

### A Visual, Product-First Workflow for Software Engineers

---
# **CTX**

### Context-Driven Development for Product-Centered Engineering

> We don't bring non-technical people to code.
We bring engineers and scientists to product thinking.
> 

---

## 1. Why CTX Exists

Software today is faster than ever to produce — and more fragile than ever to understand.

AI tools, low-code platforms, and "vibe coding" editors are optimizing for one thing:

**speed of code generation**.

But in doing so, they introduce a deeper problem:

- loss of intent
- loss of product reasoning
- loss of architectural coherence
- loss of collective memory

The industry response has been:

> "Let's bring non-technical people closer to code."
> 

CTX takes the opposite stance.

### **This is the wrong direction.**

The real bottleneck is not code.

The bottleneck is **product thinking inside technical work**.

---

## 2. The Core Idea

CTX is built on a simple but radical belief:

> Great software emerges when engineers think in product concepts, not just in code.
> 

Engineers and scientists already have:

- deep analytical skills
- system-level reasoning
- rigor and discipline

What they lack is not ability —

it's **a system that speaks product natively in technical environments**.

CTX introduces that system.

---

## 3. What Is CTX?

**CTX is a context-first development workflow**, implemented as:

- a **CTX Skill** — a model-agnostic instruction set that teaches any AI model how to reason, plan, and develop following CTX conventions
- a **Visual Plugin** — an authoring and automation companion for VS Code (and compatible editors) that makes working with context files fast, intuitive, and powerful

It is:

- not a new programming language
- not a replacement for your editor
- not a project management tool

CTX is a **cognitive layer** that sits on top of your codebase and transforms it into:

- a **living product map**
- a **reasoned system**
- a **self-documenting architecture**
- a **safe, high-speed environment for AI-assisted development**

---

## 4. Who CTX Is For

CTX is built **exclusively for technical people**:

### Primary users

- Software Engineers
- Platform Engineers
- Data Scientists
- Applied Scientists
- Technical Founders
- Systems Architects

### Not for

- Non-technical users
- Low-code audiences
- Prompt-only workflows
- "Just generate code" use cases

CTX assumes you **care about correctness, coherence, and long-term evolution**.

---

## 5. The Problem CTX Solves

### Modern development suffers from 5 systemic failures:

1. **Product intent lives outside the code**
2. **Features exist implicitly, not explicitly**
3. **Context is lost between changes**
4. **AI operates without boundaries**
5. **Speed scales faster than understanding**

CTX addresses all five by making **context a first-class citizen**.

---

## 6. Context-Driven Development (CDD)

CTX is built around **Context-Driven Development**, a methodology where:

- context is explicit
- intent is structured
- relationships are visible
- reasoning is preserved

Every meaningful unit in the system has a **context file**.

---

## 7. The CTX Skill

The CTX Skill is the **foundation of the entire system**.

It is a structured instruction set — a markdown document — that any AI model can consume as context to understand, reason about, and develop software following CTX conventions.

### Why it matters

The Skill is what makes CTX model-agnostic. It doesn't matter whether you use Claude, GPT, Gemini, Grok, or any other model. Any model that reads the CTX Skill gains the ability to:

- understand the context hierarchy (`App → Capability → Module → Feature → Spec`)
- interpret changes in context files semantically, not just syntactically
- generate technically correct plans from context-level changes
- maintain architectural coherence when modifying or creating context
- communicate impact across context levels before touching code

### What the Skill covers

The CTX Skill is a self-contained document that includes:

- the philosophy and principles of Context-Driven Development
- the full context hierarchy with frontmatter contracts per level
- how to interpret a git diff of a context file semantically
- how to generate a technical plan from a contextual change
- how to maintain hierarchy coherence (parent references, guardrails, depends_on)
- how to identify cross-context impact before writing code
- conventions for the `@` pointer syntax and anchor references
- real examples from a reference product

### How engineers use the Skill today

Without any plugin or editor integration, an engineer can:

1. Add the CTX Skill as context to any AI chat session
2. Edit or create a `*.context.md` file
3. Ask the model to read the git diff of that file
4. Receive a semantically interpreted plan — what changed, why it matters, what code needs to change, what other contexts are affected
5. Approve and execute the plan

This is the minimum viable loop. It creates immediate value from day one, in any editor, with any model.

---

## 8. The CTX Context Model

CTX introduces a **formal context hierarchy**, mirrored visually in a node graph.

### 8.1 App Context (`app.context.md`)

The root of the system.

Defines:

- product purpose
- product principles
- architectural rules
- global guardrails
- AI behavior constraints

This answers:

> Why does this product exist?
> 

---

### 8.2 Capability Context (`.capability.context.md`)

Defines a **large product/technical domain** above modules.

Capabilities represent:

- domain architecture
- cross-module boundaries
- shared constraints

They answer:

> Which domain does this change belong to, and what are its boundaries?
> 

---

### 8.3 Module Context (`.module.context.md`)

Defines **bounded domains**.

Modules represent:

- ownership
- responsibility
- domain boundaries inside a capability

They answer:

> What does this part of the system own — and what does it not?
> 

---

### 8.4 Feature Context (`.feature.context.md`)

The core unit of product reasoning.

A feature is:

- a product capability
- a reusable system behavior
- an explicit contract

Each feature declares:

- its **category** (product, capability, policy, etc.)
- its purpose
- its flows
- its dependencies
- its guardrails
- its contracts

This answers:

> What problem does this solve, and how should it be used?
> 

---

### 8.5 Spec Context (`.spec.context.md`)

Spec is a **sub-feature context** used to deepen a specific technical point without inflating the parent feature.

A spec:

- belongs to one feature (`feature: <feature-id>`)
- narrows scope to a focused detail
- is ideal for precise implementation guidance

This answers:

> What exact implementation detail must be preserved or evolved?
> 

---

### 8.6 Context Groups (`context_group`)

Optional grouping for:

- flows
- experiments
- sub-contexts

Used to keep complexity flat without exploding files.

---

### 8.7 Hierarchy and parent links

CTX models context hierarchy as:

`App -> Capability -> Module -> Feature -> Spec`

Recommended parent references:

- `module.context.md` includes `capability: <capability-id>`
- `feature.context.md` includes `module: <module-id>`
- `spec.context.md` includes `feature: <feature-id>`

---

### 8.8 Explorer interaction and deterministic creation

In CTX Explorer (Plugin):

- clicking a node opens its source `*.context.md` file directly
- Details panel syncs from the active editor context

For Explorer-driven creation (`capability`, `module`, `feature`, `spec`), CTX uses deterministic paths:

`<parent-dir>/<last-id-segment>/<kind>.context.md`

And sets a default entrypoint in frontmatter:

`entrypoints.path = <new-folder>/index.ts` (workspace-relative, no code scaffold).

---

### 8.9 Frontmatter Contract (strict by kind)

For `app`, `capability`, `module`, and `feature`, CTX applies a strict frontmatter contract:

- required keys are validated
- unknown keys raise warnings (except custom extension keys prefixed with `x_`)
- key types are validated (`string`, `enum`, `string[]`, `entrypoints[]`, `contracts`)
- editor completions and hover docs are driven by the same schema

This keeps context files predictable, reviewable, and safer for AI-driven plan generation.

#### 8.9.1 `app` frontmatter

| Property | What it is | Why to set it | Example |
|---|---|---|---|
| `kind` | Context type | Enables app-level rules and hierarchy | `kind: app` |
| `id` | Stable app id | Root reference for the graph | `id: verso` |
| `title` | Human title | Visible label in UI/prompts | `title: Verso` |
| `description` | One-line scope | Fast intent scan for humans/AI | `description: Product mission and constraints` |
| `status` | Lifecycle state | Signals maturity and priority | `status: active` |
| `version` | App unit semantic version | Tracks release evolution for app-level changes | `version: 1.2.0` |
| `repo_type` | Repo topology (`single`/`multi`) | Affects path and ownership assumptions | `repo_type: single` |
| `architecture_style` | Main code architecture style | Constrains implementation strategy | `architecture_style: clean` |
| `environments` | Runtime environments | Makes deployment scope explicit | `environments: [dev, qa, prod]` |
| `default_stack` | Stack defaults | Prevents cross-stack drift in changes | `default_stack.frontend: React` |
| `categories` | Allowed taxonomy values | Source of truth for `category` completions | `categories: [product, capability, policy]` |
| `principles` | Global principles | Product/engineering direction | `principles: ["Simple and intuitive"]` |
| `guardrails` | Global hard limits | Prevents unsafe product behavior | `guardrails: ["Never interrupt reading flow"]` |
| `ai_behavior` | AI allow/restrict policy | Adds explicit model boundaries | `ai_behavior.allowed/restricted` |
| `ctx_conventions` | Repo-local CTX conventions | Documents naming/scanner/pointer rules | `ctx_conventions.context_extensions` |
| `owners` *(optional)* | Responsible maintainers | Ownership and review routing | `owners: ["@platform-team"]` |
| `tags` *(optional)* | Search/grouping labels | Easier navigation/filtering | `tags: [platform]` |
| `agent` *(optional)* | Pointers to `AGENTS.md`/skills | Agent guidance linked to context | `agent.main: "@AGENTS.md"` |

**Recommended `architecture_style` values**

- `clean`
- `hexagonal`
- `layered`
- `modular_monolith`
- `microservices`
- `event_driven`
- `mvc`

**`status` values (all strict kinds)**

- `active`: current context for ongoing evolution
- `stable`: mature context, minimal changes expected
- `in_progress`: context under active construction
- `draft`: draft, not yet a reliable source of truth
- `deprecated`: context in retirement, avoid new investment

**`version` format (all versioned units)**

- `MAJOR.MINOR.PATCH` semver (e.g. `1.4.2`)
- Source of truth: `/.ctx/versions.json`
- Frontmatter `version` is aligned by `CTX: Version Apply Bump`

**`repo_type` values (`app`)**

- `single`: one main repo/workspace
- `multi`: multiple coordinated repos/workspaces

**`feature_kind` values (`feature`)**

- `ui`: interface behavior and experience
- `service`: application/domain logic orchestration
- `hook`: reusable hook/composable-based logic
- `api`: endpoints and API contracts
- `db`: persistence, queries and data schema
- `policy`: compliance/security/business rules
- `capability`: reusable domain capability block
- `integration`: integration with external systems
- `cli`: command line behavior
- `worker`: async/background job execution

#### 8.9.2 `capability` frontmatter

| Property | What it is | Why to set it | Example |
|---|---|---|---|
| `kind` | Context type | Enables capability-level rules | `kind: capability` |
| `id` | Stable capability id | Parent for module linkage | `id: verso.learning` |
| `title` | Human title | Explorer and prompt label | `title: Learning Capability` |
| `description` | Domain summary | Fast scope understanding | `description: Learning engine domain architecture` |
| `status` | Lifecycle state | Migration/priority signal | `status: active` |
| `version` | Capability semantic version | Tracks domain release evolution | `version: 0.4.0` |
| `category` | Taxonomy category | Consistent domain grouping | `category: capability` |
| `guardrails` | Domain constraints | Protects cross-module invariants | `guardrails: ["Do not leak PII"]` |
| `depends_on` *(optional)* | Domain dependencies | Impact mapping and traceability | `depends_on: [verso.policy.privacy]` |
| `entrypoints` *(optional)* | Main code targets | Faster navigation and patch targeting | `entrypoints.path: src/capabilities/learning/index.ts` |
| `app` *(optional)* | App id link | Useful in multi-app workspaces | `app: verso` |
| `owners` *(optional)* | Maintainers | Ownership clarity | `owners: ["@platform-team"]` |
| `tags` *(optional)* | Labels | Discoverability | `tags: [learning]` |
| `agent` *(optional)* | Agent pointers | Domain-specific automation hints | `agent.skills` |

#### 8.9.3 `module` frontmatter

| Property | What it is | Why to set it | Example |
|---|---|---|---|
| `kind` | Context type | Enables module rules and hierarchy | `kind: module` |
| `id` | Stable module id | Parent for feature linkage | `id: verso.learning.sessions` |
| `title` | Human title | UI/prompt readability | `title: Learning Sessions` |
| `description` | Module summary | Clarifies ownership fast | `description: Owns reading session orchestration` |
| `status` | Lifecycle state | Priority and support signal | `status: active` |
| `version` | Module semantic version | Tracks deployable/logical unit evolution | `version: 0.9.1` |
| `capability` | Parent capability id | Enforces `Capability -> Module` relationship | `capability: verso.learning` |
| `guardrails` | Module invariants | Avoids boundary regressions | `guardrails: ["Do not own content delivery"]` |
| `depends_on` *(optional)* | Context dependencies | Safer refactor impact analysis | `depends_on: [verso.content.universe]` |
| `entrypoints` *(optional)* | Main module files | Faster navigation/actions | `entrypoints.role: module-root` |
| `domain` *(optional)* | Ownership boundaries | Documents owns / does_not_own | `domain.boundaries.owns` |
| `features` *(optional)* | Curated feature ids | Explicit module map (if needed) | `features: [verso.learning.reading-session]` |
| `category` *(optional)* | Taxonomy category | Cross-module grouping | `category: capability` |
| `owners` *(optional)* | Maintainers | Review ownership | `owners: ["@learning-team"]` |
| `tags` *(optional)* | Labels | Discoverability | `tags: [learning]` |
| `agent` *(optional)* | Agent pointers | Module-specific automation hints | `agent.main` |

#### 8.9.4 `feature` frontmatter

| Property | What it is | Why to set it | Example |
|---|---|---|---|
| `kind` | Context type | Enables feature-level workflow rules | `kind: feature` |
| `id` | Stable feature id | References and impact tracking | `id: verso.learning.reading-session` |
| `title` | Human title | Readable label for UI/prompts | `title: Reading Session` |
| `description` | Feature value summary | Fast intent understanding | `description: Tracks a free reading session without interruption` |
| `status` | Lifecycle state | Prioritization + migration signal | `status: active` |
| `version` | Feature semantic version | Tracks behavior-level release evolution | `version: 2.3.0` |
| `module` | Parent module id | Enforces `Module -> Feature` relation | `module: verso.learning` |
| `category` | Taxonomy category | Risk posture and policy grouping | `category: product` |
| `feature_kind` | Implementation nature | Better prompt focus and code shape expectations | `feature_kind: ui` |
| `entrypoints` | Primary code files | Patch/navigation target source | `entrypoints.path: src/modules/.../index.ts` |
| `contracts` | Inputs/outputs contract | Explicit behavior boundary | `contracts.inputs/outputs` |
| `guardrails` | Non-negotiable constraints | Prevents behavior regressions | `guardrails: ["Never interrupt an active reading session"]` |
| `depends_on` *(optional)* | Context dependencies | Impact visibility and review safety | `depends_on: [verso.content.universe]` |
| `metrics` *(optional)* | Success metrics | Connects code to outcomes | `metrics.primary: sessions_completed` |
| `exposes` *(optional)* | Public API/event surface | Explicit downstream contract | `exposes.api` |
| `owners` *(optional)* | Maintainers | Approval/ownership flow | `owners: ["@product-team"]` |
| `tags` *(optional)* | Labels | Filtering/navigation | `tags: [learning]` |
| `agent` *(optional)* | Agent pointers | Feature-level automation guidance | `agent.skills` |
| `x_*` *(optional)* | Custom extension keys | Safe local extension without schema conflicts | `x_ctx_notes: ...` |

---

### 8.10 Frontmatter Hover in editor

When you hover a frontmatter property key in `*.context.md`, `*.ctx.md`, or `*.ctxt.md`, CTX shows:

- what the property is
- why it matters
- whether it is required/optional
- expected type
- recommended enum values (when applicable)
- definition of each enum value (what it means in practice)
- concrete YAML example

This is schema-driven and specific to `app`, `capability`, `module`, and `feature`.

---

### 8.11 CTX Pointer Syntax (`@`)

CTX pointers are inline references from context files to code, other context files, or specific anchors within them.

The pointer syntax uses `@` as its single entry point.

#### Syntax

```
@path/to/file
@path/to/file:#@ctx-anchor-id
@path/to/file:#SymbolName
```

#### How it works in the editor (Plugin)

- typing `@` inside any `*.context.md` file opens the file selector from the workspace
- continuing to type narrows the file suggestions
- after selecting a file, typing `:#` opens anchor/symbol suggestions from that file
- `#@ctx-anchor-id` is the recommended form — explicit, stable, and CTX-managed
- `#SymbolName` is the fallback — links to a known exported symbol

#### Hover behavior

Hovering any `@` pointer shows:

- the target file path
- the resolved anchor or symbol (if present)
- a preview of the target content

#### Examples

```markdown
## Implementation reference
@src/modules/learning/sessions/ReadingSessionService.ts
@src/modules/learning/sessions/ReadingSessionService.ts:#@ctx:session-close
@src/modules/learning/levels/LevelUnlockService.ts:#LevelUnlockService
```

#### Using `@` in frontmatter

```yaml
agent:
  main: "@AGENTS.md"
entrypoints:
  - path: "@src/modules/learning/sessions/index.ts"
```

#### Anchors in code (`#@ctx:anchor-id`)

To make a symbol referenceable by a stable CTX anchor, add the annotation in code:

```typescript
// #@ctx:session-close
export function closeReadingSession(sessionId: string): SessionSummary {
  ...
}
```

This anchor is then referenced as:

```
@src/modules/learning/sessions/ReadingSessionService.ts:#@ctx:session-close
```

---

## 9. Feature Categories (Critical)

Every feature declares its **category**.

This single decision changes everything.

Categories include:

- `product`
- `capability`
- `policy`
- `infrastructure`
- `integration`
- `shared`
- `experimental`

Categories define:

- how engineers should treat a feature
- how AI is allowed to interact with it
- how risky changes are
- how dependencies are enforced

---

## 10. The Engineer Workflow

CTX supports two coexisting workflows depending on the tools available. Both share the same underlying loop: **context first, code second**.

---

### 10.1 Workflow without the Plugin (Skill-only)

This is the minimum viable loop. It requires only the CTX Skill loaded into any AI model session and a code editor.

The current development flow without CTX is:

1. Engineer opens the repository
2. Engineer describes what they need to the model directly in technical terms
3. Model generates a plan; engineer approves or rejects
4. Model implements code
5. Engineer approves or rejects the changes

**The CTX Skill-only flow:**

1. Engineer opens the repository — from the first moment, the model has access to the context files and understands the product intent, architecture, and guardrails
2. Engineer edits or creates a `*.context.md` file, thinking in product terms, not technical terms
3. Model reads the git diff of that context file and interprets it semantically — what changed, what it means in the product, what the technical impact is
4. Model communicates impact clearly: which other contexts are affected, what risks exist, what the plan implies — the engineer understands the *why* before any code is touched
5. Engineer asks the model to generate a technical plan from the context change
6. If the engineer approves the plan, the model implements the changes following CTX conventions — maintaining context coherence, respecting guardrails, updating entrypoints
7. Engineer reviews and approves the code changes

**What this unlocks:** engineers interact with product intent, not implementation details. The model becomes a translator between context and code, not a free-form code generator.

---

### 10.2 Workflow with the Plugin

The Plugin adds authoring assistance, visual navigation, and command automation on top of the Skill-only flow. It does not replace the Skill — it amplifies it.

1. Engineer opens the repository — the Plugin renders the context tree in the sidebar (`App → Capability → Module → Feature → Spec`), immediately visible
2. Engineer clicks a node to open its context file or creates a new one using the Explorer
3. Engineer edits the context file with full authoring assistance: schema validation, hover docs, `@` pointer autocompletion, frontmatter completions
4. The Plugin detects the git delta and highlights which other contexts may be affected, without requiring model interaction
5. Engineer runs a CTX command from the command palette or sidebar:
   - **Generate Plan** — sends the context diff to the model and returns a structured technical plan
   - **Show Impact** — displays which contexts and code files are directly affected by the change
   - **Create Plan** — generates and persists a plan for review
   - **Apply Plan** — executes the approved plan through the model
   - **Regenerate Plan** — discards and rebuilds the plan from the current context state
6. If the engineer approves the plan, the model implements the changes
7. Engineer reviews and approves the code changes

**What the Plugin adds over Skill-only:** visual context navigation, automated impact detection, command-driven model interaction, and authoring guardrails — all without requiring the engineer to describe what to do in natural language.

---

## 11. The DevLog Layer (Future Vision)

CTX plans to introduce a **Development Log (DevLog)** as a future capability.

This is not a task, ticket, or commit.

A DevLog is a **scientific work session** that captures:

- observations
- hypotheses
- experiments
- results
- bugs
- decisions
- learnings

It transforms development into a **repeatable reasoning process**, modeled after the scientific method:

1. Observation
2. Hypothesis
3. Intervention
4. Result
5. Learning
6. Decision

---

## 12. Knowledge as a First-Class Artifact (Future Vision)

CTX will generate **archived learnings** (`kind: learned`) as a future capability.

These will be:

- permanent
- committed
- searchable
- linked to features and flows

Over time, the codebase becomes a **knowledge system**, not just a repository.

---

## 13. Live, Bidirectional Context (Future Vision)

In a future version, CTX will work **before commits** in real time:

- the context graph updates live as files change
- impacted features are highlighted automatically
- dependencies react in real time
- risks become visible instantly

This will be achieved via file watchers, dependency graphs, and working-state overlays.

---

## 14. Architecture Overview

### CTX is built as:

- a **CTX Skill** — model-agnostic markdown instruction set, the foundation of the system
- a **VS Code Plugin** — visual authoring and automation companion (compatible with Cursor, and other VS Code-based editors)
- model-agnostic by design — works with Claude, GPT, Gemini, Grok, or any model that can read context

### Two-part MVP

**Part 1 — The CTX Skill**

A self-contained markdown document that any AI model consumes as context. No editor required. No plugin required. Immediate value from day one.

The Skill is the proof that CTX Frame works: if any model can follow it correctly — generating coherent context, respecting hierarchy, translating context changes into technical plans — the system is sound.

**Part 2 — The CTX Plugin**

A VS Code plugin that adds:

- visual context tree (sidebar Explorer)
- authoring assistance (snippets, hover docs, schema validation, `@` pointer autocompletion)
- CTX commands (`Generate Plan`, `Show Impact`, `Apply Plan`, `Regenerate Plan`)
- context diff visualization and impact detection

The Plugin does not replace the Skill. It makes working with the Skill faster, more visual, and less error-prone.

---

## 15. AI, But With Discipline

CTX does not "let AI code freely".

It **constrains AI through context**.

AI sees:

- only relevant context
- explicit boundaries
- feature categories
- guardrails
- past learnings

This allows:

> Vibe-coding speed without losing engineering depth.
> 

---

## 16. What CTX Is Not

CTX is not:

- a replacement for Git
- a Jira competitor
- a low-code platform
- a non-technical tool

CTX is a **thinking system for engineers**.

---

## 17. Why CTX Is Different

Every other tool asks:

> "How do we help more people write code?"
> 

CTX asks:

> "How do we help engineers build better products — faster — without losing rigor?"
> 

That is the difference.

---

## 18. The Vision

CTX starts as:

- a CTX Skill (model-agnostic instruction set)
- a visual context companion (Plugin)

It evolves into:

- a product-aware editor
- a reasoning layer for AI
- a knowledge system for software

Ultimately:

> CTX turns codebases into systems that understand themselves.
> 

---

## 19. Final Statement

> We don't bring non-technical people to code.
We bring engineers and scientists to product thinking.
> 

CTX is not about writing more code.

It is about **building better systems, consciously and at speed**.