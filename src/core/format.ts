// Swiss formatting: decimal point, apostrophe as thousands separator (1'250.50).

export function round(n: number, decimals = 2): number {
  const f = 10 ** decimals;
  return Math.round((n + Number.EPSILON) * f) / f;
}

export function num(n: number, maxDecimals = 2): string {
  const r = round(n, maxDecimals);
  const neg = r < 0;
  const [int, dec] = Math.abs(r).toString().split('.');
  const intFmt = int.replace(/\B(?=(\d{3})+(?!\d))/g, "'");
  return (neg ? '−' : '') + intFmt + (dec ? '.' + dec : '');
}

export function chf(n: number): string {
  const r = round(n, 2);
  const [int, dec = ''] = Math.abs(r).toFixed(2).split('.');
  return `CHF ${r < 0 ? '−' : ''}${int.replace(/\B(?=(\d{3})+(?!\d))/g, "'")}.${dec}`;
}

export function pct(n: number, maxDecimals = 2): string {
  return `${num(n, maxDecimals)} %`;
}

/** Parses user input like "12,5", "1'250.50", "CHF 30.–", "35 %", "3/4". Returns null if not a number. */
export function parseNumber(raw: string): number | null {
  let s = raw
    .trim()
    .toLowerCase()
    .replace(/chf|fr\.?|%|rp\.?/g, '')
    .replace(/[\s'’`]/g, '')
    .replace(/[.,][–-]$/, '')
    .replace(/[−–]/g, '-')
    .replace(',', '.');
  if (s === '') return null;
  const frac = s.match(/^(-?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/);
  if (frac) {
    const d = parseFloat(frac[2]);
    return d === 0 ? null : parseFloat(frac[1]) / d;
  }
  if (!/^-?(\d+\.?\d*|\.\d+)$/.test(s)) return null;
  s = s.replace(/\.$/, '');
  const v = parseFloat(s);
  return Number.isFinite(v) ? v : null;
}
