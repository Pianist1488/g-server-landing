import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import worker from "../dist/server/index.js";

const video = await readFile(new URL("../assets/hero-gpu.mp4", import.meta.url));
const videoUrl = "https://example.com/assets/hero-gpu.mp4";
const requestVideo = (options) => worker.fetch(new Request(videoUrl, options), {});

test("video GET returns the original bytes and playback headers", async () => {
  const response = await requestVideo();
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "video/mp4");
  assert.equal(response.headers.get("accept-ranges"), "bytes");
  assert.equal(response.headers.get("content-length"), String(video.length));
  assert.equal(response.headers.get("content-range"), null);
  assert.deepEqual(Buffer.from(await response.arrayBuffer()), video);
});

test("video HEAD returns full metadata without a body, even with Range", async () => {
  for (const headers of [{}, { range: "bytes=2-9" }]) {
    const response = await requestVideo({ method: "HEAD", headers });
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("content-type"), "video/mp4");
    assert.equal(response.headers.get("accept-ranges"), "bytes");
    assert.equal(response.headers.get("content-length"), String(video.length));
    assert.equal(response.headers.get("content-range"), null);
    assert.equal((await response.arrayBuffer()).byteLength, 0);
  }
});

test("video ranges return exactly the requested closed, open, or suffix bytes", async () => {
  for (const [range, start, end] of [
    ["bytes=0-0", 0, 0],
    ["bytes=2-9", 2, 9],
    ["bytes=10-", 10, video.length - 1],
    ["bytes=-17", video.length - 17, video.length - 1],
    [`bytes=${video.length - 1}-${video.length + 20}`, video.length - 1, video.length - 1],
    ["bytes=-999999999999999999999999", 0, video.length - 1],
    ["BYTES=0-999999999999999999999999", 0, video.length - 1],
  ]) {
    const response = await requestVideo({ headers: { range } });
    assert.equal(response.status, 206, range);
    assert.equal(response.headers.get("content-type"), "video/mp4", range);
    assert.equal(response.headers.get("accept-ranges"), "bytes", range);
    assert.equal(response.headers.get("content-length"), String(end - start + 1), range);
    assert.equal(response.headers.get("content-range"), `bytes ${start}-${end}/${video.length}`, range);
    assert.deepEqual(Buffer.from(await response.arrayBuffer()), video.subarray(start, end + 1), range);
  }
});

test("invalid and unsatisfiable byte ranges return 416 with the resource size", async () => {
  for (const range of [
    "bytes=", "bytes=-", "bytes=abc", "bytes=2-1", "bytes=-0",
    "bytes=0-1x", "bytes=0.5-2", `bytes=${video.length}-`,
    "bytes=999999999999999999999999-",
  ]) {
    const response = await requestVideo({ headers: { range } });
    assert.equal(response.status, 416, range);
    assert.equal(response.headers.get("content-range"), `bytes */${video.length}`, range);
    assert.equal(response.headers.get("content-length"), "0", range);
    assert.equal((await response.arrayBuffer()).byteLength, 0, range);
  }
});

test("multiple ranges and unsupported range units fall back to the full video", async () => {
  for (const range of ["bytes=0-1,8-9", "items=0-1"]) {
    const response = await requestVideo({ headers: { range } });
    assert.equal(response.status, 200, range);
    assert.equal(response.headers.get("content-range"), null, range);
    assert.equal(response.headers.get("content-length"), String(video.length), range);
    assert.deepEqual(Buffer.from(await response.arrayBuffer()), video, range);
  }
});

test("category images, the video poster, and existing WebP assets retain their bytes and MIME types", async () => {
  for (const [path, mime, source = path] of [
    ["/assets/categories/professional-gpu.webp", "image/webp"],
    ["/assets/categories/gpu-server.webp", "image/webp"],
    ["/assets/hero-gpu-poster.webp", "image/webp"],
    ["/assets/products/h200.webp", "image/webp"],
    ["/assets/hero.webp", "image/webp", "/assets/hero-transit-case.webp"],
  ]) {
    const response = await worker.fetch(new Request(`https://example.com${path}`), {});
    assert.equal(response.status, 200, path);
    assert.equal(response.headers.get("content-type"), mime, path);
    assert.deepEqual(Buffer.from(await response.arrayBuffer()), await readFile(new URL(`..${source}`, import.meta.url)), path);
  }
});

test("media routes do not accept POST or match unknown assets", async () => {
  const post = await requestVideo({ method: "POST" });
  assert.equal(post.status, 404);
  const missing = await worker.fetch(new Request("https://example.com/assets/missing.mp4"), {});
  assert.equal(missing.status, 404);
});
