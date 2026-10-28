#!/usr/bin/env node
// Fetches the private `content/posts` submodule on Vercel using a GitHub App
// installation token. Runs as the first half of the Install Command
// (`node scripts/vercel-fetch-posts.mjs && pnpm install`), so it executes
// BEFORE dependencies exist and may only use Node.js built-ins.
import { execFileSync } from 'node:child_process';
import crypto from 'node:crypto';

function fail(message) {
  console.error(`[posts] ${message}`);
  process.exit(1);
}

function base64url(value) {
  return Buffer.from(value).toString('base64url');
}

const { GH_APP_ID, GH_APP_INSTALLATION_ID, GH_APP_PRIVATE_KEY_B64 } = process.env;

// Missing credentials mean different things in different places:
//  - Locally, `pnpm dev`/`pnpm build` run this same path, but developers
//    already have the submodule checked out via their own git credentials
//    (the App is Vercel-only), so absent creds are normal — inform and exit 0.
//  - On Vercel (which always sets `VERCEL=1`), absent creds are a
//    misconfiguration: proceeding to `pnpm install`/`pnpm build` here would
//    deploy a site with an EMPTY blog. Fail loudly instead of shipping it.
if (!GH_APP_ID || !GH_APP_INSTALLATION_ID || !GH_APP_PRIVATE_KEY_B64) {
  if (process.env.VERCEL) {
    fail(
      'running on Vercel but GH_APP_ID / GH_APP_INSTALLATION_ID / ' +
        'GH_APP_PRIVATE_KEY_B64 are not all set — refusing to build without ' +
        'the private content/posts submodule',
    );
  }
  console.log('[posts] no GitHub App credentials — assuming submodule already checked out');
  process.exit(0);
}

// 1. Build a signed RS256 JWT for GitHub App authentication. `exp` must be
//    <= now + 600 (GitHub rejects longer); `iat` is backdated for clock skew.
const now = Math.floor(Date.now() / 1000);
const pem = Buffer.from(GH_APP_PRIVATE_KEY_B64, 'base64').toString('utf8');

let jwt;
try {
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  // `iss` accepts the App's Client ID (`Iv23…`, GitHub's current
  // recommendation) or its numeric App ID.
  const iss = /^\d+$/.test(GH_APP_ID) ? Number(GH_APP_ID) : GH_APP_ID;
  const payload = base64url(
    JSON.stringify({ iat: now - 60, exp: now + 540, iss }),
  );
  const data = `${header}.${payload}`;
  const signature = crypto
    .sign('RSA-SHA256', Buffer.from(data), pem)
    .toString('base64url');
  jwt = `${data}.${signature}`;
} catch {
  fail('failed to sign the GitHub App JWT — check GH_APP_PRIVATE_KEY_B64');
}

// 2. Exchange the JWT for a short-lived installation token (HTTP 201).
let token;
try {
  const res = await fetch(
    `https://api.github.com/app/installations/${GH_APP_INSTALLATION_ID}/access_tokens`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'germanamz-build',
      },
    },
  );

  if (res.status !== 201) {
    fail(`installation token request failed — HTTP ${res.status}`);
  }

  ({ token } = await res.json());
} catch {
  fail('installation token request errored while contacting api.github.com');
}

if (!token) {
  fail('installation token response contained no token');
}

// 3. Fetch the submodule with the token, without leaking it.
//
// insteadOf (over GIT_ASKPASS): the rewrites are passed inline with `-c` so
// they live only for this one command and are never written to ~/.gitconfig —
// keeping the token out of persisted config entirely, unlike `git config
// --global`, and avoiding the extra on-disk helper script a GIT_ASKPASS
// approach needs. execFileSync is given an argument ARRAY (no shell), so the
// token is never expanded or echoed by a shell. The token does still appear
// in this process's argv (readable via the process table) for the life of the
// git call — an accepted tradeoff on Vercel's single-tenant, ephemeral build
// container with no untrusted co-tenants.
//
// `insteadOf` is a multivar, so all three `-c` rewrites apply together and
// `content/posts` authenticates over HTTPS whether `.gitmodules` registers it
// as an https, scp-style (`git@github.com:`), or `ssh://` GitHub URL.
// Prefer registering it as `https://github.com/germanamz/writing.git`.
const auth = `https://x-access-token:${token}@github.com/`;
const rewrites = [
  `url.${auth}.insteadOf=https://github.com/`,
  `url.${auth}.insteadOf=git@github.com:`,
  `url.${auth}.insteadOf=ssh://git@github.com/`,
];
const redact = (value) => String(value).split(token).join('***');

try {
  execFileSync(
    'git',
    [
      ...rewrites.flatMap((rewrite) => ['-c', rewrite]),
      'submodule',
      'update',
      '--init',
      'content/posts',
    ],
    { stdio: ['ignore', 'inherit', 'pipe'] },
  );
} catch (error) {
  if (error.stderr) {
    console.error(redact(error.stderr.toString()).trimEnd());
  }
  fail(redact(error.message));
}

console.log('[posts] fetched content/posts submodule');
