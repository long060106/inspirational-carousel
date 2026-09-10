/* poster-engine.js — shared analysis engine for the inspirational carousel.
   Classic script (no modules) so it loads over file:// . Exposes window.PosterEngine. */
(function (root) {
'use strict';

/* ---------- colour ---------- */
const hex = h => [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)];
const toHex = c => '#' + c.map(v => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2,'0')).join('');

function rgb2hsl(r,g,b){
  r/=255; g/=255; b/=255;
  const mx = Math.max(r,g,b), mn = Math.min(r,g,b), d = mx-mn;
  let h = 0;
  if (d){
    if (mx === r) h = ((g-b)/d) % 6;
    else if (mx === g) h = (b-r)/d + 2;
    else h = (r-g)/d + 4;
  }
  h *= 60; if (h < 0) h += 360;
  const l = (mx+mn)/2;
  return [h, d ? d/(1 - Math.abs(2*l - 1)) : 0, l];
}
function hsl2rgb(h,s,l){
  const c = (1 - Math.abs(2*l - 1))*s, x = c*(1 - Math.abs((h/60) % 2 - 1)), m = l - c/2;
  let t;
  if (h < 60) t = [c,x,0]; else if (h < 120) t = [x,c,0]; else if (h < 180) t = [0,c,x];
  else if (h < 240) t = [0,x,c]; else if (h < 300) t = [x,0,c]; else t = [c,0,x];
  return [(t[0]+m)*255, (t[1]+m)*255, (t[2]+m)*255];
}
function relLum(c){
  const f = v => { v /= 255; return v <= .03928 ? v/12.92 : Math.pow((v+.055)/1.055, 2.4); };
  return .2126*f(c[0]) + .7152*f(c[1]) + .0722*f(c[2]);
}
const ratio = (a,b) => { const x = relLum(a), y = relLum(b); return (Math.max(x,y)+.05)/(Math.min(x,y)+.05); };

/* ---------- placement zones ---------- */
const ZONES = [
  {n:'upper-left',   x:.05, y:.06, w:.52, h:.24, al:'left'},
  {n:'upper-right',  x:.44, y:.05, w:.51, h:.21, al:'right'},
  {n:'centre-left',  x:.04, y:.40, w:.44, h:.22, al:'left'},
  {n:'centre-right', x:.50, y:.40, w:.45, h:.22, al:'right'},
  {n:'lower-left',   x:.06, y:.62, w:.58, h:.30, al:'left'},
  {n:'lower-right',  x:.40, y:.62, w:.55, h:.30, al:'right'},
  {n:'lower band',   x:.06, y:.76, w:.88, h:.17, al:'left'}
];

const SW = 200, SH = 300;

/* Draw any image into a fixed 200x300 cover-fit sample and analyse it.
   Throws SecurityError on a cross-origin image without CORS headers. */
function sampleImage(img){
  const c = document.createElement('canvas');
  c.width = SW; c.height = SH;
  const x = c.getContext('2d', {willReadFrequently:true});
  const s = Math.max(SW/img.width, SH/img.height);
  const dw = img.width*s, dh = img.height*s;
  x.drawImage(img, (SW-dw)/2, (SH-dh)/2, dw, dh);
  return x.getImageData(0,0,SW,SH);
}

function analyze(imgData){
  const d = imgData.data;
  const lum = new Float32Array(SW*SH);
  const px = [];
  for (let i=0, p=0; i<d.length; i+=4, p++){
    const r = d[i], g = d[i+1], b = d[i+2];
    const l = (.2126*r + .7152*g + .0722*b)/255;
    lum[p] = l;
    const mx = Math.max(r,g,b), mn = Math.min(r,g,b);
    px.push({r, g, b, l, c: (mx-mn)/255});
  }

  const byL = px.slice().sort((a,b) => a.l - b.l);
  const N = byL.length;
  const mean = arr => {
    const t = arr.reduce((a,v) => [a[0]+v.r, a[1]+v.g, a[2]+v.b], [0,0,0]);
    return [t[0]/arr.length, t[1]/arr.length, t[2]/arr.length];
  };
  const shadow    = mean(byL.slice(0, Math.floor(N*.15)));
  const mid       = mean(byL.slice(Math.floor(N*.40), Math.floor(N*.60)));
  const highlight = mean(byL.slice(Math.floor(N*.92)));

  const byC = px.slice().sort((a,b) => b.c - a.c);
  const top = byC.slice(0, Math.floor(N*.03));
  const topChroma = top.length ? top[Math.floor(top.length/2)].c : 0;
  const accent = topChroma > .18 ? mean(top) : highlight.slice();

  // tonal statistics
  const p5 = byL[Math.floor(N*.05)].l, p95 = byL[Math.floor(N*.95)].l;
  const median = byL[Math.floor(N*.5)].l;

  /* A single bright rim-light or a chrome reflection can dominate the
     top-8%-luminance "highlight" sample, which then skews warm/cool for the
     whole frame off one small hot spot. warmCast is a second, independent
     read — a chroma-weighted mean of red-vs-blue over EVERY pixel — so a
     photo's actual dominant cast wins even when the brightest patch disagrees. */
  let wrb = 0, wgt = 0;
  for (let i=0; i<px.length; i++){
    const p = px[i], w = p.c*p.c;
    wrb += (p.r - p.b)*w; wgt += w;
  }
  const warmCast = wgt ? Math.max(-1, Math.min(1, (wrb/wgt)/255)) : 0;

  /* Holistic "how much of this frame is actually calm" — independent of the
     seven fixed placement rectangles below, which can under-read a huge dark
     backdrop if it happens to fall outside all seven. Same edge measure, but
     over every pixel rather than a handful of named boxes. */
  let calmPix = 0, calmN = 0;
  for (let y=0; y<SH-1; y++) for (let x=0; x<SW-1; x++){
    const p = y*SW + x;
    const e = Math.abs(lum[p]-lum[p+1]) + Math.abs(lum[p]-lum[p+SW]);
    if (e < 0.035) calmPix++;
    calmN++;
  }
  const calmFrac = calmN ? calmPix/calmN : 0;

  const zones = ZONES.map(z => {
    const x0 = Math.floor(z.x*SW), x1 = Math.floor((z.x+z.w)*SW);
    const y0 = Math.floor(z.y*SH), y1 = Math.floor((z.y+z.h)*SH);
    let edge = 0, sum = 0, n = 0;
    for (let y=y0; y<y1-1; y++) for (let x=x0; x<x1-1; x++){
      const p = y*SW + x;
      edge += Math.abs(lum[p] - lum[p+1]) + Math.abs(lum[p] - lum[p+SW]);
      sum += lum[p]; n++;
    }
    return Object.assign({}, z, {
      detail: n ? edge/n : 1,
      meanL:  n ? sum/n : .5,
      area:   z.w*z.h
    });
  });

  const maxD = Math.max.apply(null, zones.map(z => z.detail)) || 1;
  const minD = Math.min.apply(null, zones.map(z => z.detail));
  zones.forEach(z => {
    const calm     = 1 - z.detail/maxD;
    const headroom = Math.abs(z.meanL - .5)*2;
    const size     = z.area/.18;
    // size gets more weight than before — a bigger calm zone should win over a
    // merely-calm small one, since the header is now sized to fill whatever
    // zone gets picked and a cramped winner just forces a small headline
    z.score = calm*0.52 + headroom*0.20 + Math.min(1, size)*0.28;
  });
  zones.sort((a,b) => b.score - a.score);

  // horizontal detail profile -> where the subject actually sits
  let wsum = 0, wtot = 0;
  for (let x=0; x<SW-1; x++){
    let e = 0;
    for (let y=0; y<SH-1; y++){
      const p = y*SW + x;
      e += Math.abs(lum[p] - lum[p+1]) + Math.abs(lum[p] - lum[p+SW]);
    }
    wsum += e*x; wtot += e;
  }
  const subjectX = wtot ? (wsum/wtot)/SW : .5;

  // the strip a watermark actually sits on, so its colour can be solved locally
  let tr = 0, tg = 0, tb = 0, tn = 0;
  const topRows = Math.max(1, Math.floor(SH * 0.08));
  for (let y = 0; y < topRows; y++) for (let x = 0; x < SW; x++){
    const i = (y*SW + x)*4;
    tr += d[i]; tg += d[i+1]; tb += d[i+2]; tn++;
  }
  const topBand = [tr/tn, tg/tn, tb/tn];

  return {
    shadow, mid, highlight, accent, zones, subjectX, topBand,
    stats: {p5, p95, median, range: p95 - p5, topChroma, maxD, minD, warmCast, calmFrac}
  };
}

/* ---------- type colour derivation ---------- */
function solveL(hue, s, ground, target, ideal){
  let best = null, bestGap = 9, fb = null, fbR = -1;
  for (let L = .04; L <= .97; L += .01){
    const c = hsl2rgb(hue, s, L), r = ratio(c, ground);
    if (r > fbR){ fbR = r; fb = c; }
    if (r >= target){
      const gap = Math.abs(L - ideal);
      if (gap < bestGap){ bestGap = gap; best = c; }
    }
  }
  return best || fb;
}

function deriveType(st, zone){
  const hs = rgb2hsl(st.highlight[0], st.highlight[1], st.highlight[2]);
  const hue = hs[0], sat = hs[1];
  const bgL = zone ? zone.meanL : .3;
  const ground = bgL < .42 ? st.shadow : st.mid;
  const dark = relLum(ground) < .18;
  const sAt = m => Math.min(.45, Math.max(.06, sat*m));

  const head = solveL(hue, sAt(.55), ground, 7, dark ? .86 : .20);
  const hL   = rgb2hsl(head[0], head[1], head[2])[2];
  const kick = solveL(hue, sAt(.85), ground, 4.5,
                      dark ? Math.max(.18, hL - .24) : Math.min(.86, hL + .24));

  let acc = st.accent;
  const as = rgb2hsl(acc[0], acc[1], acc[2]);
  if (ratio(acc, ground) < 3.5) acc = solveL(as[0], as[1], ground, 3.5, dark ? .60 : .38);

  return {
    head: toHex(head), kick: toHex(kick), accent: toHex(acc),
    hr: ratio(head, ground), kr: ratio(kick, ground), ground: toHex(ground)
  };
}

/* ---------- poster suitability score ----------
   Not "is this a nice photo" — "will this survive the grade and hold a statement". */
function score(st, imgW, imgH){
  const s = st.stats;
  const best = st.zones[0];
  const t = deriveType(st, best);
  const clamp = v => Math.min(1, Math.max(0, v));

  // somewhere to put the type at all
  const space = clamp(best.score);

  // a busy subject AND a calm field — a flat, uniformly busy frame has nowhere to breathe
  const separation = s.maxD ? clamp((s.maxD - s.minD)/s.maxD) : 0;

  // can the header actually clear its target against that zone
  const contrast = clamp(t.hr/12);

  // tonal range: crushed-flat plates die under a matte lift
  const range = clamp((s.range - .25)/.55);

  // this aesthetic is low-key; a bright even snapshot fights the grade
  const mood = clamp(1 - Math.abs(s.median - .32)/.38);

  // one saturated note carries the accent colour
  const accent = clamp(s.topChroma/.35);

  // croppability to 9:16 — panoramas lose the subject
  const ar = imgW/imgH;
  const crop = clamp(1 - Math.abs(Math.log(ar/0.5625))*0.42);

  const total = (space*.28 + separation*.20 + contrast*.16 +
                 range*.14 + mood*.12 + accent*.10) * (0.55 + 0.45*crop);

  return {
    total, parts: {space, separation, contrast, range, mood, accent, crop},
    zone: best, type: t
  };
}

/* ---------- readable traits ----------
   Turns the numbers above into the handful of qualities a designer would
   actually name when looking at the frame. These are what the line engine
   matches statements against. */
function traits(st, sc){
  const s = st.stats;
  const clamp = v => Math.min(1, Math.max(0, v));
  const hue = rgb2hsl(st.highlight[0], st.highlight[1], st.highlight[2])[0];
  const acc = rgb2hsl(st.accent[0], st.accent[1], st.accent[2]);
  // warmth peaks at orange (35 deg) and bottoms out at its opposite
  const wHighlight = Math.cos((hue - 35) * Math.PI/180);
  // average the highlight-hue read against the whole-frame chroma-weighted
  // read — one small hot spot (a rim light, a chrome reflection) can no
  // longer flip the call on its own the way a single-sample hue could.
  const w = (wHighlight + (s.warmCast || 0)) / 2;
  const accHue = acc[0], accChroma = clamp(s.topChroma/.32);

  const t = {
    dark:     clamp((.45 - s.median)/.34),
    bright:   clamp((s.median - .45)/.34),
    warm:     clamp(w),
    cool:     clamp(-w),
    chroma:   accChroma,
    // blend the zone-local space score with a holistic calm-pixel fraction —
    // a huge empty backdrop that falls outside all seven named rectangles
    // still registers instead of being scored as "no empty space here".
    empty:    clamp(sc.parts.space*0.55 + (s.calmFrac || 0)*0.45),
    isolated: clamp(sc.parts.separation*0.6 + (s.calmFrac || 0)*0.4),
    harsh:    clamp((s.range - .42)/.38),
    soft:     clamp(1 - (s.range - .42)/.38),
    red:      accChroma * ((accHue > 335 || accHue < 25) ? 1 : 0),
    neon:     accChroma * ((accHue > 140 && accHue < 285) ? 1 : 0)
  };
  t.hue = hue;
  return t;
}

/* Plain-language summary of the strongest traits, for showing the reasoning. */
const TRAIT_WORDS = {
  dark:'low-key', bright:'bright', warm:'warm', cool:'cool', chroma:'one saturated note',
  empty:'lots of empty space', isolated:'a subject against a calm field',
  harsh:'hard contrast', soft:'soft, flat range', red:'a red accent', neon:'a neon accent'
};
function describeTraits(t){
  return Object.keys(TRAIT_WORDS)
    .map(k => ({k, v: t[k]}))
    .filter(x => x.v > .45)
    .sort((a,b) => b.v - a.v)
    .slice(0,4)
    .map(x => TRAIT_WORDS[x.k])
    .join(' · ') || 'no strong character';
}

/* ---------- watermark colour ----------
   A watermark has the opposite job to the headline: it must be findable and
   then ignored. So it is solved for LOW contrast against the strip it sits on
   — around 2.6:1, legible but recessive — keeping the plate's own hue. */
/* solveL treats `target` as a floor and then optimises for a pleasant
   lightness, which is right for a headline and wrong for a watermark. This
   lands ON the ratio instead, staying on the chosen side of the ground. */
function solveNearRatio(hue, sat, ground, target, lighter){
  const gl = relLum(ground);
  let best = null, bestGap = 1e9;
  for (let L = 0.03; L <= 0.98; L += 0.01){
    const c = hsl2rgb(hue, sat, L);
    if ((relLum(c) > gl) !== lighter) continue;
    const gap = Math.abs(ratio(c, ground) - target);
    if (gap < bestGap){ bestGap = gap; best = c; }
  }
  return best || hsl2rgb(hue, sat, lighter ? 0.75 : 0.25);
}

function deriveWatermark(st, target){
  const hs = rgb2hsl(st.highlight[0], st.highlight[1], st.highlight[2]);
  const ground = st.topBand || st.mid;
  const gl = relLum(ground);
  const dark = gl < 0.2;
  const sat = Math.min(0.22, Math.max(0.04, hs[1] * 0.30));
  const c = solveNearRatio(hs[0], sat, ground, target || 2.6, dark);
  return {
    hex: toHex(c),
    opacity: gl < 0.05 ? 62 : gl > 0.6 ? 44 : 52,
    ratio: ratio(c, ground),
    ground: toHex(ground)
  };
}

/* 9:16 crop rect centred on the subject, clamped inside the frame */
function cropRect(st, w, h){
  const target = 9/16;
  let cw, ch;
  if (w/h > target){ ch = h; cw = h*target; } else { cw = w; ch = w/target; }
  let x = st.subjectX*w - cw/2;
  x = Math.min(w - cw, Math.max(0, x));
  const y = Math.min(h - ch, Math.max(0, (h - ch)*0.42));
  return {x, y, w: cw, h: ch};
}

root.PosterEngine = {
  hex, toHex, rgb2hsl, hsl2rgb, relLum, ratio,
  ZONES, SW, SH, sampleImage, analyze, solveL, deriveType, score, cropRect,
  traits, describeTraits, TRAIT_WORDS, deriveWatermark, solveNearRatio
};

if (typeof module !== 'undefined' && module.exports) module.exports = root.PosterEngine;

})(typeof window !== 'undefined' ? window : globalThis);
