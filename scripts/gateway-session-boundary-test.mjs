import assert from 'node:assert/strict';
import fs from 'node:fs';

const hub = fs.readFileSync(new URL('../components/education/EducationHub.tsx', import.meta.url), 'utf8');
const client = fs.readFileSync(new URL('../services/gatewaySession.ts', import.meta.url), 'utf8');

assert.doesNotMatch(hub, /params\.get\(['"]role['"]\)/, 'production role must not come from query parameters');
assert.doesNotMatch(hub, /params\.set\(['"]role['"]/, 'production role must not be written to query parameters');
assert.doesNotMatch(hub, /localStorage\.(getItem|setItem)\([^\n]*(role|teacher|student)/i, 'production role must not come from local storage');
assert.doesNotMatch(hub, /setRole\s*=|setSessionRole/, 'production role switcher must be absent');
assert.match(client, /credentials:\s*'include'/, 'Gateway session fetch must include host cookie');
assert.match(client, /authorization_basis\?\.decision\s*!==\s*'allow'/, 'internal authorization must be enforced');
assert.match(client, /allowed_tools\?\.includes\('algoquest'\)/, 'AlgoQuest entitlement must be enforced');
assert.match(client, /pilotRoles\.has\(session\.role\)/, 'governance and unassigned roles must not enter the pilot');
assert.doesNotMatch(client, /access_token|refresh_token|id_token/, 'browser contract must not name provider tokens');
console.log('AlgoQuest Gateway session boundary passed');
