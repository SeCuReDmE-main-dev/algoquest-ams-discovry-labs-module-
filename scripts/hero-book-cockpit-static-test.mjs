import assert from 'node:assert/strict';
import fs from 'node:fs';

const root = new URL('..', import.meta.url);
const panel = fs.readFileSync(new URL('./services/heroBookPanel.ts', root), 'utf8');
const tools = fs.readFileSync(new URL('./services/algoQuestWebMcp.ts', root), 'utf8');
assert.match(panel, /HERO_BOOK_PANEL_SCHEMA/);
assert.match(panel, /HeroBookPanelState\.v1/);
assert.match(panel, /LEGACY_HERO_BOOK_PANEL_SCHEMA/);
assert.match(panel, /STALE_HERO_BOOK_REVISION/);
assert.equal((panel.match(/deck\('/g) || []).length, 6, 'six Hero Book decks must remain registered');
assert.match(panel, /symbolic-weapon/);
assert.match(panel, /canonical_state_owner: 'algoquest'/);
assert.equal((tools.match(/name: 'algoquest_/g) || []).length, 10, 'ten corrected AlgoQuest domain tools are required');
assert.equal((tools.match(/name: 'securedme_/g) || []).length, 2, 'two shared SecuredMe tools are required');
assert.match(tools, /registerAlgoQuestWebMcp/);
assert.match(tools, /typeof document/);
assert.match(tools, /HUMAN_APPROVAL_REQUIRED_OR_EXPIRED/);
console.log('Hero Book cockpit static contract passed.');
