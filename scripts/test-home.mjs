import assert from 'node:assert/strict';
import vm from 'node:vm';
import worker from '../dist/server/index.js';

const html = await (await worker.fetch(new Request('https://example.com/'), {})).text();
assert.equal((html.match(/<h1>/g) || []).length, 1);
assert.ok(!html.includes('<form'));
assert.ok(!html.includes('/api/lead'));
assert.ok(!html.toLowerCase().includes('telegram'));
assert.ok(html.includes('mailto:info@nasledie77.ru'));
assert.ok(html.includes('href="/privacy"'));
assert.ok(html.includes("requested+'\\nКоличество:"));
assert.ok(!html.includes('hero__kicker'));
assert.ok(!html.includes('hero__motion'));
assert.ok(!/<video[^>]*\bloop\b/.test(html));
const playback = html.slice(html.indexOf('const video='), html.indexOf('</script>', html.indexOf('const video=')));
for (const reduce of [false, true]) {
  const preference = new EventTarget();
  preference.matches = reduce;
  const video = {
    dataset: { src: '/assets/hero-gpu.mp4' }, muted: false, plays: 0, pauses: 0,
    play() { this.plays++; return Promise.resolve(); },
    pause() { this.pauses++; },
  };
  vm.runInNewContext(playback, {
    document: { querySelector: () => video }, matchMedia: () => preference,
  });
  assert.equal(video.plays, reduce ? 0 : 1);
  assert.equal(video.src, reduce ? undefined : '/assets/hero-gpu.mp4');
  if (!reduce) assert.equal(video.muted, true);
  preference.matches = true;
  preference.dispatchEvent(new Event('change'));
  assert.equal(video.pauses, 1);
}
const productPaths = [...new Set([...html.matchAll(/href="(\/(?:nvidia|samsung)-[^"]+)"/g)].map(m => m[1]))];
assert.equal(productPaths.length, 8);
for (const path of productPaths) {
  assert.equal((await worker.fetch(new Request(`https://example.com${path}`), {})).status, 200);
}
const privacy = await worker.fetch(new Request('https://example.com/privacy'), {});
assert.equal(privacy.status, 200);
const privacyHtml = await privacy.text();
assert.ok(privacyHtml.includes('ООО «НАСЛЕДИЕ»'));
assert.ok(privacyHtml.includes('ИНН 7716828623'));
const disabledLeadApi = await worker.fetch(new Request('https://example.com/api/lead', { method: 'POST', body: '{}' }), {});
assert.equal(disabledLeadApi.status, 404);
console.log('Homepage, email/phone contacts, privacy page, reduced motion, and eight product pages passed.');
