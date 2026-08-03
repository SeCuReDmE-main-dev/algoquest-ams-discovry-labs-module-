import assert from 'node:assert/strict';
import { mageTwoHorizonsPrimaryFr } from '../services/heroBooks.js';

// ============================================================
// Phase 7 — Act Structure Validation
// Constraint: max 8 prompts per act (from V3 Action 91)
// ============================================================

const actCounts = {};
for (const prompt of mageTwoHorizonsPrimaryFr.prompt_nodes) {
  actCounts[prompt.act_id] = (actCounts[prompt.act_id] || 0) + 1;
}

for (const [actId, count] of Object.entries(actCounts)) {
  assert.ok(
    count <= 8,
    `Act ${actId} has ${count} prompts, max is 8`
  );
}

// All five acts must be present
for (let i = 1; i <= 5; i++) {
  assert.ok(
    actCounts[\`act-\${i}\`] >= 1,
    \`act-\${i} must have at least one prompt\`
  );
}

// Total must be exactly 40
assert.equal(
  mageTwoHorizonsPrimaryFr.prompt_nodes.length,
  40,
  'Mage adaptation must have exactly 40 prompts'
);

console.log('Phase 7 act structure validation passed');
