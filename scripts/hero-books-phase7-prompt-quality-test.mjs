import assert from 'node:assert/strict';
import { mageTwoHorizonsPrimaryFr } from '../services/heroBooks.js';

// ============================================================
// Phase 7 — Prompt Quality Validation
// Tests: unique titles, unique texts, capability diversity,
//        prerequisite depth, and node-type diversity
// ============================================================

const nodes = mageTwoHorizonsPrimaryFr.prompt_nodes;

// --- Test 1: Unique titles ---
const titles = nodes.map(p => p.title);
const uniqueTitles = new Set(titles);
assert.equal(
  titles.length,
  uniqueTitles.size,
  `All prompt titles must be unique. Duplicates: ${titles.filter((t, i) => titles.indexOf(t) !== i).join(', ')}`
);

// --- Test 2: Unique prompt texts ---
const texts = nodes.map(p => p.prompt_text);
const uniqueTexts = new Set(texts);
assert.equal(
  texts.length,
  uniqueTexts.size,
  `All prompt texts must be unique. Duplicates found.`
);

// --- Test 3: Capability diversity ---
// text-fallback must not dominate (max 30% of prompts)
const capabilityUsage = {};
for (const prompt of nodes) {
  for (const cap of prompt.capability_refs) {
    capabilityUsage[cap] = (capabilityUsage[cap] || 0) + 1;
  }
}
const textFallbackCount = capabilityUsage['builder:text-fallback'] || 0;
const textFallbackRatio = textFallbackCount / nodes.length;
assert.ok(
  textFallbackRatio < 0.35,
  `text-fallback used in ${(textFallbackRatio * 100).toFixed(0)}% of prompts, max 35%`
);

// At least 6 distinct builder capabilities must be used
const builderCaps = Object.keys(capabilityUsage).filter(c => c.startsWith('builder:'));
assert.ok(
  builderCaps.length >= 6,
  `Only ${builderCaps.length} distinct builder capabilities used, need at least 6`
);

// --- Test 4: Prerequisite depth ---
// Graph must not be flat: max depth must be >= 4
function calculateDepth(promptId, allNodes, visited = new Set()) {
  if (visited.has(promptId)) return 0; // cycle guard
  visited.add(promptId);
  const node = allNodes.find(n => n.prompt_id === promptId);
  if (!node || !node.prerequisites || node.prerequisites.length === 0) return 1;
  return 1 + Math.max(...node.prerequisites.map(pre => calculateDepth(pre, allNodes, new Set(visited))));
}

const depths = nodes.map(p => calculateDepth(p.prompt_id, nodes));
const maxDepth = Math.max(...depths);
assert.ok(
  maxDepth >= 4,
  `Prompt graph too flat: max depth ${maxDepth}, expected >= 4`
);

// --- Test 5: Not all prerequisites point to p02 ---
const prereqTargets = {};
for (const prompt of nodes) {
  for (const pre of prompt.prerequisites) {
    prereqTargets[pre] = (prereqTargets[pre] || 0) + 1;
  }
}
const p02Deps = prereqTargets['mage-p02-first-vector'] || 0;
assert.ok(
  p02Deps <= 8,
  `Too many prompts depend directly on p02: ${p02Deps}, max 8`
);

// --- Test 6: Node type diversity ---
const nodeTypes = new Set(nodes.map(p => p.node_type));
assert.ok(
  nodeTypes.size >= 5,
  `Only ${nodeTypes.size} distinct node types, need at least 5`
);

// --- Test 7: Evidence kind diversity ---
const evidenceKinds = new Set(nodes.map(p => p.evidence_kind));
assert.ok(
  evidenceKinds.size >= 6,
  `Only ${evidenceKinds.size} distinct evidence kinds, need at least 6`
);

// --- Test 8: No circular dependencies ---
function hasCycle(promptId, allNodes, visiting = new Set()) {
  if (visiting.has(promptId)) return true;
  visiting.add(promptId);
  const node = allNodes.find(n => n.prompt_id === promptId);
  if (!node) return false;
  for (const pre of (node.prerequisites || [])) {
    if (hasCycle(pre, allNodes, new Set(visiting))) return true;
  }
  return false;
}

for (const node of nodes) {
  assert.ok(
    !hasCycle(node.prompt_id, nodes),
    `Circular dependency detected involving ${node.prompt_id}`
  );
}

console.log('Phase 7 prompt quality validation passed');
