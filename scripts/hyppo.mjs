import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const env = Object.fromEntries(
  readFileSync(join(ROOT, '.env'), 'utf8')
    .split('\n')
    .filter((l) => l.includes('='))
    .map((l) => {
      const i = l.indexOf('=');
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);

const KEY = process.env.HYPPO_NOVA_KEY ?? env.HYPPO_NOVA_KEY;
if (!KEY) throw new Error('HYPPO_NOVA_KEY not set — see .env.example');

const BASE = 'https://hyppohq.io/api/v1';

export async function api(method, path, body) {
  const headers = { 'x-api-key': KEY };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  const res = await fetch(BASE + path, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${path} -> ${res.status} ${text.slice(0, 300)}`);
  return JSON.parse(text);
}

export function urlOf(job) {
  const hit = [
    job.output_url,
    job.result_url,
    job.image_url,
    job.url,
    Array.isArray(job.output_urls) && job.output_urls[0],
    Array.isArray(job.outputs) && job.outputs[0],
    Array.isArray(job.results) && (job.results[0]?.url ?? job.results[0]),
    job.output?.url,
    job.result?.url,
  ].find((c) => typeof c === 'string' && c.startsWith('http'));
  if (!hit) throw new Error(`no url in job: ${JSON.stringify(job).slice(0, 400)}`);
  return hit;
}

/** Submit every job first, then poll the batch. Never serialize generations. */
export async function runBatch(specs, onDone, { timeoutMs = 480000 } = {}) {
  const jobs = [];
  for (const spec of specs) {
    process.stdout.write(`submit ${spec.slug} ... `);
    const { data } = await api('POST', '/ai/nova', spec.payload);
    const id = data.job_id ?? data.id;
    console.log(id);
    jobs.push({ slug: spec.slug, id });
  }

  const waiting = new Map(jobs.map((j) => [j.id, j.slug]));
  const deadline = Date.now() + timeoutMs;

  while (waiting.size && Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, 5000));
    for (const [id, slug] of [...waiting]) {
      const { data } = await api('GET', `/ai/nova/${id}`);
      const status = String(data.status ?? '').toLowerCase();
      if (['completed', 'succeeded', 'success', 'done'].includes(status)) {
        const buf = Buffer.from(await (await fetch(urlOf(data))).arrayBuffer());
        await onDone(slug, buf);
        waiting.delete(id);
      } else if (['failed', 'error', 'cancelled'].includes(status)) {
        console.error(`FAILED ${slug}: ${JSON.stringify(data).slice(0, 300)}`);
        waiting.delete(id);
      }
    }
    if (waiting.size) console.log(`  waiting on ${waiting.size}`);
  }

  console.log(waiting.size ? `timed out: ${[...waiting.values()].join(', ')}` : 'all done');
}
