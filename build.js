/* build.js — inline the engines into studio.html so it runs as a single file.
   Run with:  node build.js

   The engines stay the single source of truth; this only copies them in.
   Idempotent: re-run it after editing either engine and it replaces the
   previously inlined copy rather than stacking another one. */
'use strict';
const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const TARGET = path.join(DIR, 'studio.html');
const ENGINES = ['poster-engine.js', 'line-engine.js'];

let html = fs.readFileSync(TARGET, 'utf8');
const before = html.length;
const report = [];

for (const name of ENGINES){
  const src = fs.readFileSync(path.join(DIR, name), 'utf8');
  if (src.indexOf('</scr' + 'ipt') !== -1)
    throw new Error(name + ' contains a closing script tag and cannot be inlined safely');

  const marker = '/*<<< ' + name + ' >>>*/';
  const block = '<script>' + marker + '\n' + src.trim() + '\n</scr' + 'ipt>';

  // an external reference, or a previously inlined copy of the same engine
  const external = new RegExp('<script src="' + name.replace('.', '\\.') + '"\\s*></scr' + 'ipt>');
  const inlined  = new RegExp('<script>\\/\\*<<< ' + name.replace('.', '\\.') +
                              ' >>>\\*\\/[\\s\\S]*?<\\/scr' + 'ipt>');

  if (external.test(html)){ html = html.replace(external, block); report.push(name + ' — inlined (was external)'); }
  else if (inlined.test(html)){ html = html.replace(inlined, block); report.push(name + ' — refreshed'); }
  else throw new Error('no <script src="' + name + '"> or previous inline block found in studio.html');
}

fs.writeFileSync(TARGET, html, 'utf8');
report.forEach(r => console.log('  ' + r));
console.log('  studio.html  ' + before + ' -> ' + html.length + ' bytes, self-contained');
