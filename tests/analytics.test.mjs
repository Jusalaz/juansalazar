import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';
const require = createRequire(import.meta.url);
const source = readFileSync(new URL('../src/lib/analytics/model.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const compiledModule = { exports: {} };
new Function('module', 'exports', 'require', compiled)(compiledModule, compiledModule.exports, require);
const { validateInput, summarize, daysInPeriod, bogotaDay, BUDGET_PATH } = compiledModule.exports;
const valid = { type: 'pageview', path: '/', visitor: 'b0a08663-71e3-4c98-9c4c-543cbd567261', session: '38dd6dac-5c91-4801-a314-e15aed314fed' };
test('collector accepts only public paths, known event types and anonymous identifiers', () => {
  assert.deepEqual(validateInput({ ...valid, email: 'ignored', budget: { balance: 100 } }), valid);
  for (const path of ['/adminsalazar', '/admin/login', '/?email=secret', '//evil.test', '/blog/a/../../admin', '/blog/x#secret']) assert.equal(validateInput({ ...valid, path }), null);
  assert.equal(validateInput({ ...valid, type: 'purchase' }), null);
  assert.equal(validateInput({ ...valid, visitor: 'someone@example.com' }), null);
  assert.equal(validateInput({ ...valid, type: 'blog_read' }), null);
  assert.equal(validateInput({ ...valid, type: 'download', path: '/blog/test' }), null);
  assert.ok(validateInput({ ...valid, type: 'download', path: BUDGET_PATH }));
});
test('periods use Colombia calendar boundaries, including UTC date rollover', () => {
  const now = new Date('2026-10-01T02:00:00Z');
  assert.equal(bogotaDay(now), '2026-09-30');
  assert.deepEqual(daysInPeriod(3, now), ['2026-09-28', '2026-09-29', '2026-09-30']);
});
test('visitor counts deduplicate across sessions, days, articles and download types', () => {
  const event = (type, path, visitor, session, day = '2026-09-21') => ({ type, path, visitor, session, day });
  const events = [
    event('pageview', '/', 'a', 's1'), event('pageview', '/blog/kuddos', 'a', 's1'),
    event('pageview', '/blog/kuddos', 'a', 's2'), event('pageview', '/blog/afectus', 'b', 's3'),
    event('blog_read', '/blog/kuddos', 'a', 's1'), event('blog_read', '/blog/afectus', 'a', 's2'),
    event('download', BUDGET_PATH, 'a', 's1'), event('budget_save', BUDGET_PATH, 'a', 's1'),
    event('pageview', '/', 'old', 'old', '2026-08-01'),
  ];
  const r = summarize(events, ['2026-09-20', '2026-09-21']);
  assert.equal(r.visitors, 2); assert.equal(r.visits, 3);
  assert.equal(r.downloaders, 1); assert.equal(r.downloads, 2);
  assert.equal(r.templateDownloads, 1); assert.equal(r.savedCopies, 1);
  assert.equal(r.readers, 1); assert.equal(r.reads, 2);
  assert.equal(r.blogs.find(b => b.path === '/blog/kuddos').opens, 2);
  assert.equal(r.daily[0].visits, 0); assert.equal(r.daily[1].visits, 3);
});
test('empty reports have zero counts and a complete daily series', () => {
  const r = summarize([], ['2026-09-20', '2026-09-21']);
  assert.equal(r.visits, 0); assert.equal(r.downloaders, 0); assert.equal(r.readers, 0);
  assert.equal(r.daily.length, 2); assert.deepEqual(r.blogs, []);
});
