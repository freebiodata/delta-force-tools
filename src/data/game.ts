/**
 * Delta Force game data — single source of truth for every calculator and chart.
 *
 * IMPORTANT ([VERIFY] policy):
 * Exact penetration percentages, damage values and armor stats change with game
 * patches. The defaults below are community-reported values (tier-gap model,
 * see sources on /methodology/). Before publishing, verify every number against
 * the current patch and update the `lastVerified` date. Nothing here is official.
 */

export const SITE = {
  brand: 'DF TOOLS',
  domain: 'deltaforcetools.top',
  game: 'Delta Force',
  disclaimer:
    'Unofficial fan-made toolkit. Not affiliated with or endorsed by TiMi Studio Group, Team Jade, or Tencent. Delta Force and related marks belong to their respective owners.',
};

/** Date the data below was last checked against the live game. Update on every patch review. */
export const lastVerified = '2026-10-08';

/** Ammo tiers 1–6. Colors are our UI heat-scale, not official game colors. */
export const TIERS = [
  { tier: 1, name: 'Tier 1' },
  { tier: 2, name: 'Tier 2' },
  { tier: 3, name: 'Tier 3' },
  { tier: 4, name: 'Tier 4' },
  { tier: 5, name: 'Tier 5' },
  { tier: 6, name: 'Tier 6' },
];

/**
 * Penetration chance by (ammoTier − armorTier) gap.
 * gap = 0 → same tier, positive → ammo tier above armor, negative → below.
 * Community-reported post-rebalance values [VERIFY every patch]:
 *   +2 and above ≈ 90–100%, +1 ≈ 75%, same tier ≈ 50%, −1 ≈ 25%, −2 ≈ 10%, −3 or less ≈ 5%.
 */
export const PEN_BY_GAP: Record<number, number> = {
  3: 1.0,
  2: 0.9,
  1: 0.75,
  0: 0.5,
  [-1]: 0.25,
  [-2]: 0.1,
  [-3]: 0.05,
};

/** Share of a blocked (non-penetrating) shot's damage that still reaches flesh. [VERIFY] */
export const BLOCKED_DAMAGE_SHARE = 0.3;

/** Defaults used by the TTK simulator. [VERIFY against current patch] */
export const DEFAULTS = {
  bodyHp: 100,
  armorDurability: 50,
  headMult: 2.0, // community estimate — headshot multiplier varies by helmet/armor [VERIFY]
  limbMult: 0.9,
};

/** Starter caliber reference. Damage/RPM values are illustrative placeholders — [VERIFY] every row before trusting output. */
export const CALIBERS = [
  { caliber: '9×19mm', role: 'SMG', exampleTier: '1–3', notes: 'Cheap, low recoil, struggles vs Tier 3+ armor.' },
  { caliber: '5.56×45mm', role: 'Assault rifle', exampleTier: '2–5', notes: 'Low recoil, wide ammo selection.' },
  { caliber: '5.45×39mm', role: 'Assault rifle', exampleTier: '2–5', notes: 'Similar role to 5.56, budget-friendly.' },
  { caliber: '7.62×39mm', role: 'Assault rifle', exampleTier: '3–5', notes: 'Harder hitting, more recoil.' },
  { caliber: '7.62×51mm', role: 'Battle rifle / DMR', exampleTier: '4–6', notes: 'High damage and penetration, expensive.' },
  { caliber: '12 Gauge', role: 'Shotgun', exampleTier: '1–4', notes: 'Devastating close range, tier-dependent slugs/buck.' },
];

/** Map an (ammo, armor) tier pair to a penetration chance. */
export function penChance(ammoTier: number, armorTier: number): number {
  const gap = Math.max(-3, Math.min(3, ammoTier - armorTier));
  return PEN_BY_GAP[gap] ?? 0.05;
}
