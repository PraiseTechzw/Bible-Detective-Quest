import React from "react";
import Svg, {
  Path, Circle, G, Rect, Line, Polygon, Ellipse, Defs, LinearGradient as SvgGrad, Stop,
} from "react-native-svg";

export type BadgeIconId =
  | "first_blood" | "brotherhood_broken" | "deception_master" | "coat_of_colors"
  | "broken_chains" | "wisdoms_crown" | "gethsemane_witness" | "truth_seeker"
  | "on_fire" | "scripture_keeper" | "just_judge" | "master_sleuth";

export type RankIconId =
  | "rookie" | "junior" | "field" | "senior" | "lead" | "chief" | "master";

type P = { size?: number; color?: string; rimColor?: string };

/* ----------------------------- color helpers ----------------------------- */

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const num = parseInt(full, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}
function rgbToHex(r: number, g: number, b: number) {
  const c = (v: number) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}
function lighten(hex: string, amt: number) {
  const [r, g, b] = hexToRgb(hex);
  const f = amt / 100;
  return rgbToHex(r + (255 - r) * f, g + (255 - g) * f, b + (255 - b) * f);
}
function darken(hex: string, amt: number) {
  const [r, g, b] = hexToRgb(hex);
  const f = 1 - amt / 100;
  return rgbToHex(r * f, g * f, b * f);
}

/* ─────────────────────── shared medallion (rank + utility icons) ────────── */

function Medallion({
  size, base, glyph, flat = false,
}: { size: number; base: string; glyph: React.ReactNode; flat?: boolean }) {
  const rimDark = darken(base, flat ? 35 : 45);
  const ringDark = darken(base, 16);
  const rOuter = flat ? 15 : 15.5;
  const rInner = flat ? 12.6 : 13;
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      <Defs>
        <SvgGrad id="mg" x1="15%" y1="0%" x2="85%" y2="100%">
          <Stop offset="0%" stopColor={lighten(base, 24)} />
          <Stop offset="55%" stopColor={base} />
          <Stop offset="100%" stopColor={darken(base, 26)} />
        </SvgGrad>
      </Defs>
      <Circle cx="16" cy="16" r={rOuter} fill="url(#mg)" stroke={rimDark} strokeWidth={flat ? 0.9 : 1.1} />
      <Circle cx="16" cy="16" r={rInner} fill="none" stroke={ringDark} strokeWidth={0.6} opacity={0.5} />
      <Ellipse cx="11.5" cy="9.5" rx="6.5" ry="3.5" fill="#FFFFFF" opacity={0.15} />
      <G>{glyph}</G>
    </Svg>
  );
}

const GLYPH = "#FFF8EC";

/* ══════════════════════════════════ BADGES ═══════════════════════════════════
 * Each badge is a full unique-shaped SVG — heater shields, 5-pt stars,
 * hexagons, crown silhouette, teardrop flame, open scroll, diamond, olive
 * wreath circle, and an 8-pt star seal.
 * viewBox 0 0 48 56 (slightly taller than wide, like a real award).
 * ══════════════════════════════════════════════════════════════════════════ */

const W = "#FFF5E6"; // warm parchment white for badge glyphs

export function BadgeIcon({ id, size = 60 }: { id: BadgeIconId; size?: number; color?: string; rimColor?: string }) {
  switch (id) {
    case "first_blood":        return <FirstBloodBadge size={size} />;
    case "brotherhood_broken": return <BrotherhoodBadge size={size} />;
    case "deception_master":   return <DeceptionBadge size={size} />;
    case "coat_of_colors":     return <CoatBadge size={size} />;
    case "broken_chains":      return <ChainsBadge size={size} />;
    case "wisdoms_crown":      return <CrownBadgeSvg size={size} />;
    case "gethsemane_witness": return <GethsemaneBadge size={size} />;
    case "truth_seeker":       return <TruthBadge size={size} />;
    case "on_fire":            return <FireBadge size={size} />;
    case "scripture_keeper":   return <ScrollBadgeSvg size={size} />;
    case "just_judge":         return <JudgeBadge size={size} />;
    case "master_sleuth":      return <MasterBadge size={size} />;
    default:                   return <MasterBadge size={size} />;
  }
}

/** Heater Shield — The First Murder (Cain & Abel) */
function FirstBloodBadge({ size }: { size: number }) {
  const h = Math.round(size * 1.17);
  return (
    <Svg width={size} height={h} viewBox="0 0 48 56">
      <Defs>
        <SvgGrad id="fb_g" x1="25%" y1="0%" x2="75%" y2="100%">
          <Stop offset="0%" stopColor="#C04040" /><Stop offset="55%" stopColor="#8B1A2C" /><Stop offset="100%" stopColor="#3A0010" />
        </SvgGrad>
      </Defs>
      <Path d="M 24 3 L 44 11 L 44 31 C 44 44.5 24 53.5 24 53.5 C 24 53.5 4 44.5 4 31 L 4 11 Z" fill="url(#fb_g)" stroke="#E84040" strokeWidth="1.7" />
      <Ellipse cx="16" cy="12" rx="11" ry="5" fill="#FFFFFF" opacity="0.14" />
      <Line x1="8" y1="20" x2="40" y2="20" stroke="#E84040" strokeWidth="0.9" opacity="0.5" />
      <Line x1="15" y1="15" x2="33" y2="38" stroke={W} strokeWidth="2.3" strokeLinecap="round" />
      <Polygon points="15,15 12,10.5 17.3,11.5 16,16.5" fill={W} />
      <Line x1="33" y1="15" x2="15" y2="38" stroke={W} strokeWidth="2.3" strokeLinecap="round" />
      <Polygon points="33,15 36,10.5 30.7,11.5 32,16.5" fill={W} />
      <Circle cx="24" cy="26" r="3" fill="#E84040" stroke={W} strokeWidth="1" />
      <Circle cx="24" cy="26" r="1.4" fill="#FF8080" />
      <Path d="M 24 49.5 C 22.5 47.5 21.5 45.5 21.5 44 C 21.5 42.3 22.6 41 24 41 C 25.4 41 26.5 42.3 26.5 44 C 26.5 45.5 25.5 47.5 24 49.5 Z" fill="#E84040" />
    </Svg>
  );
}

/** Hexagon + Broken Ring — Brotherhood Broken */
function BrotherhoodBadge({ size }: { size: number }) {
  const h = Math.round(size * 1.17);
  return (
    <Svg width={size} height={h} viewBox="0 0 48 56">
      <Defs>
        <SvgGrad id="bh_g" x1="25%" y1="0%" x2="75%" y2="100%">
          <Stop offset="0%" stopColor="#B05050" /><Stop offset="55%" stopColor="#7A2A2A" /><Stop offset="100%" stopColor="#300808" />
        </SvgGrad>
      </Defs>
      <Path d="M 24 4 L 43 14.5 L 43 37.5 L 24 48 L 5 37.5 L 5 14.5 Z" fill="url(#bh_g)" stroke="#C84040" strokeWidth="1.7" />
      <Path d="M 24 9 L 39.5 17.5 L 39.5 34.5 L 24 43 L 8.5 34.5 L 8.5 17.5 Z" fill="none" stroke="#C84040" strokeWidth="0.7" opacity="0.4" />
      <Ellipse cx="16" cy="12" rx="10" ry="4.5" fill="#FFFFFF" opacity="0.12" />
      <Path d="M 10 27 A 14 14 0 0 1 38 27" stroke={W} strokeWidth="2.8" fill="none" strokeLinecap="round" />
      <Path d="M 10 27 A 14 14 0 0 0 38 27" stroke={W} strokeWidth="2.8" fill="none" strokeLinecap="round" opacity="0.35" />
      <Line x1="21" y1="14.5" x2="27" y2="14.5" stroke="#7A2A2A" strokeWidth="5" />
      <Path d="M 21.5 14.5 L 24 11 L 26.5 14.5" stroke="#FF8080" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx="14.5" cy="30.5" r="3" fill={W} opacity="0.9" />
      <Path d="M 11 41 C 11 36.5 12.6 34 14.5 34 C 16.4 34 18 36.5 18 41" stroke={W} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <Circle cx="33.5" cy="30.5" r="3" fill={W} opacity="0.9" />
      <Path d="M 30 41 C 30 36.5 31.6 34 33.5 34 C 35.4 34 37 36.5 37 41" stroke={W} strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </Svg>
  );
}

/** Diamond — Deception Master (Jacob & Esau birthright stew deal) */
function DeceptionBadge({ size }: { size: number }) {
  const h = Math.round(size * 1.17);
  return (
    <Svg width={size} height={h} viewBox="0 0 48 56">
      <Defs>
        <SvgGrad id="dm_g" x1="20%" y1="0%" x2="80%" y2="100%">
          <Stop offset="0%" stopColor="#50A050" /><Stop offset="55%" stopColor="#2E7A2E" /><Stop offset="100%" stopColor="#0E3A0E" />
        </SvgGrad>
      </Defs>
      <Path d="M 24 3 L 44 28 L 24 53 L 4 28 Z" fill="url(#dm_g)" stroke="#3A8B3A" strokeWidth="1.7" />
      <Path d="M 24 9 L 39 28 L 24 47 L 9 28 Z" fill="none" stroke="#3A8B3A" strokeWidth="0.8" opacity="0.45" />
      <Ellipse cx="16" cy="15" rx="7" ry="3.5" fill="#FFFFFF" opacity="0.15" />
      <Path d="M 24 44 C 17 42 13 37 13 31 C 13 26 17.5 23 21.5 24.5 C 25 26 28.5 23 28.5 19 C 28.5 15.5 26 13.5 24 15" stroke={W} strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <Circle cx="24" cy="14" r="3" fill={W} />
      <Circle cx="22.8" cy="13.2" r="0.9" fill="#2E7A2E" />
      <Circle cx="25.2" cy="13.2" r="0.9" fill="#2E7A2E" />
      <Path d="M 26.5 14.5 L 29.5 12.8 L 28 16 Z" fill={W} />
    </Svg>
  );
}

/** Heater Shield + Colour Stripes — Coat of Colors (Joseph) */
function CoatBadge({ size }: { size: number }) {
  const h = Math.round(size * 1.17);
  return (
    <Svg width={size} height={h} viewBox="0 0 48 56">
      <Defs>
        <SvgGrad id="cc_g" x1="20%" y1="0%" x2="80%" y2="100%">
          <Stop offset="0%" stopColor="#7060D8" /><Stop offset="55%" stopColor="#4A38C0" /><Stop offset="100%" stopColor="#1A1050" />
        </SvgGrad>
      </Defs>
      <Path d="M 24 3 L 44 11 L 44 31 C 44 44.5 24 53.5 24 53.5 C 24 53.5 4 44.5 4 31 L 4 11 Z" fill="url(#cc_g)" stroke="#7B68EE" strokeWidth="1.7" />
      <Ellipse cx="16" cy="12" rx="11" ry="5" fill="#FFFFFF" opacity="0.13" />
      <Line x1="8" y1="19" x2="40" y2="19" stroke="#7B68EE" strokeWidth="0.9" opacity="0.5" />
      <Path d="M 11 22 L 37 22 L 37 28 L 11 28 Z" fill="#FFD060" opacity="0.92" />
      <Path d="M 10.5 28 L 37.5 28 L 37.5 34 L 10.5 34 Z" fill="#E06040" opacity="0.92" />
      <Path d="M 11 34 L 37 34 L 36 40.5 L 12 40.5 Z" fill="#50C080" opacity="0.92" />
      <Circle cx="24" cy="19" r="2.8" fill={W} stroke="#7B68EE" strokeWidth="0.9" />
    </Svg>
  );
}

/** 5-Point Star — Broken Chains (Samson) */
function ChainsBadge({ size }: { size: number }) {
  const h = Math.round(size * 1.17);
  return (
    <Svg width={size} height={h} viewBox="0 0 48 56">
      <Defs>
        <SvgGrad id="bc_g" x1="20%" y1="0%" x2="80%" y2="100%">
          <Stop offset="0%" stopColor="#5090C8" /><Stop offset="55%" stopColor="#2E6A9E" /><Stop offset="100%" stopColor="#0E2A48" />
        </SvgGrad>
      </Defs>
      <Polygon points="24,4 30,21 46,21 33.5,31.5 38,49 24,39.5 10,49 14.5,31.5 2,21 18,21" fill="url(#bc_g)" stroke="#4A8BC8" strokeWidth="1.5" />
      <Ellipse cx="18" cy="14" rx="9" ry="4" fill="#FFFFFF" opacity="0.13" />
      <Rect x="13" y="23" width="9" height="7" rx="3.5" stroke={W} strokeWidth="2.1" fill="none" />
      <Rect x="26" y="23" width="9" height="7" rx="3.5" stroke={W} strokeWidth="2.1" fill="none" />
      <Line x1="22" y1="26.5" x2="26" y2="26.5" stroke={W} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1.5,1.5" />
      <Path d="M 23.5 24 L 24.5 21 L 24.5 24.5 L 26.5 22 L 24 26.5" stroke="#88D0FF" strokeWidth="1.3" fill="none" strokeLinecap="round" />
    </Svg>
  );
}

/** Crown Silhouette — Wisdom's Crown (Solomon) */
function CrownBadgeSvg({ size }: { size: number }) {
  const h = Math.round(size * 1.17);
  return (
    <Svg width={size} height={h} viewBox="0 0 48 56">
      <Defs>
        <SvgGrad id="wc_g" x1="20%" y1="0%" x2="80%" y2="100%">
          <Stop offset="0%" stopColor="#C88830" /><Stop offset="55%" stopColor="#906010" /><Stop offset="100%" stopColor="#3A1A00" />
        </SvgGrad>
      </Defs>
      <Path d="M 5 47 L 5 18 L 15 30 L 24 6 L 33 30 L 43 18 L 43 47 Z" fill="url(#wc_g)" stroke="#D4962A" strokeWidth="1.7" />
      <Ellipse cx="15" cy="21" rx="7" ry="3.5" fill="#FFFFFF" opacity="0.14" />
      <Rect x="5" y="42" width="38" height="5.5" rx="2.2" fill="#D4962A" opacity="0.75" />
      <Circle cx="24" cy="9" r="3.5" fill="#E84040" stroke={W} strokeWidth="1" />
      <Circle cx="24" cy="9" r="1.6" fill="#FF8080" />
      <Circle cx="7.5" cy="18" r="2.6" fill="#4A8BC8" stroke={W} strokeWidth="0.9" />
      <Circle cx="40.5" cy="18" r="2.6" fill="#50C080" stroke={W} strokeWidth="0.9" />
      <Line x1="12" y1="33" x2="36" y2="33" stroke={W} strokeWidth="1.2" opacity="0.5" />
      <Line x1="12" y1="37.5" x2="36" y2="37.5" stroke={W} strokeWidth="1.2" opacity="0.5" />
      <Polygon points="24,28.5 26.3,34.5 32.5,34.5 27.5,38 29.5,44 24,40.5 18.5,44 20.5,38 15.5,34.5 21.7,34.5" fill={W} opacity="0.75" />
    </Svg>
  );
}

/** Circular Olive Wreath — Gethsemane Witness */
function GethsemaneBadge({ size }: { size: number }) {
  const h = Math.round(size * 1.17);
  return (
    <Svg width={size} height={h} viewBox="0 0 48 56">
      <Defs>
        <SvgGrad id="gw_g" x1="20%" y1="0%" x2="80%" y2="100%">
          <Stop offset="0%" stopColor="#7070C8" /><Stop offset="55%" stopColor="#4A4A9B" /><Stop offset="100%" stopColor="#1A1A50" />
        </SvgGrad>
      </Defs>
      <Circle cx="24" cy="27" r="23" fill="url(#gw_g)" stroke="#8080D8" strokeWidth="1.7" />
      <Ellipse cx="15" cy="13" rx="11" ry="5.5" fill="#FFFFFF" opacity="0.12" />
      <Circle cx="24" cy="27" r="18.5" fill="none" stroke="#6060B8" strokeWidth="0.9" opacity="0.6" />
      <Path d="M 8.5 27 C 8.5 18 14 11.5 22 10" stroke="#70C870" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <Ellipse cx="9" cy="22" rx="3.5" ry="2" transform="rotate(-32 9 22)" fill="#70C870" />
      <Ellipse cx="13" cy="16" rx="3.5" ry="2" transform="rotate(-52 13 16)" fill="#70C870" />
      <Ellipse cx="18" cy="12" rx="3" ry="1.8" transform="rotate(-70 18 12)" fill="#70C870" />
      <Path d="M 39.5 27 C 39.5 18 34 11.5 26 10" stroke="#70C870" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <Ellipse cx="39" cy="22" rx="3.5" ry="2" transform="rotate(32 39 22)" fill="#70C870" />
      <Ellipse cx="35" cy="16" rx="3.5" ry="2" transform="rotate(52 35 16)" fill="#70C870" />
      <Ellipse cx="30" cy="12" rx="3" ry="1.8" transform="rotate(70 30 12)" fill="#70C870" />
      <Line x1="24" y1="19" x2="24" y2="37" stroke={W} strokeWidth="2.9" strokeLinecap="round" />
      <Line x1="16.5" y1="24" x2="31.5" y2="24" stroke={W} strokeWidth="2.9" strokeLinecap="round" />
      <Path d="M 29 20.5 C 31 19 34 19 34 21.5 C 34 23 32.5 23.8 31 23.5 Z" fill={W} />
      <Circle cx="32.8" cy="20.3" r="0.75" fill="#4A4A9B" />
    </Svg>
  );
}

/** 8-Point Compass Star — Truth Seeker (all 6 cases) */
function TruthBadge({ size }: { size: number }) {
  const h = Math.round(size * 1.17);
  return (
    <Svg width={size} height={h} viewBox="0 0 48 56">
      <Defs>
        <SvgGrad id="ts_g" x1="20%" y1="0%" x2="80%" y2="100%">
          <Stop offset="0%" stopColor="#9060D0" /><Stop offset="55%" stopColor="#6A30A8" /><Stop offset="100%" stopColor="#2A1050" />
        </SvgGrad>
      </Defs>
      <Path d="M 24 3 L 27.5 14 L 35.5 8.5 L 34 19.5 L 45 19 L 37 26.5 L 45 34 L 34 33.5 L 35.5 44.5 L 27.5 38.5 L 24 50 L 20.5 38.5 L 12.5 44.5 L 14 33.5 L 3 34 L 11 26.5 L 3 19 L 14 19.5 L 12.5 8.5 L 20.5 14 Z" fill="url(#ts_g)" stroke="#A870E8" strokeWidth="1.3" />
      <Ellipse cx="17" cy="16" rx="9" ry="4" fill="#FFFFFF" opacity="0.13" />
      <Circle cx="24" cy="27" r="10.5" fill="none" stroke="#A870E8" strokeWidth="1" opacity="0.55" />
      <Line x1="24" y1="17" x2="24" y2="37" stroke={W} strokeWidth="2.2" strokeLinecap="round" />
      <Line x1="14" y1="27" x2="34" y2="27" stroke={W} strokeWidth="2.2" strokeLinecap="round" />
      <Line x1="17" y1="20" x2="31" y2="34" stroke={W} strokeWidth="1.3" opacity="0.55" />
      <Line x1="31" y1="20" x2="17" y2="34" stroke={W} strokeWidth="1.3" opacity="0.55" />
      <Circle cx="24" cy="27" r="2.8" fill="#A870E8" stroke={W} strokeWidth="0.9" />
      <Circle cx="24" cy="27" r="1.4" fill={W} />
      <Circle cx="24" cy="17.5" r="2" fill="#A870E8" stroke={W} strokeWidth="0.8" />
    </Svg>
  );
}

/** Teardrop Flame — On Fire (streak badge) */
function FireBadge({ size }: { size: number }) {
  const h = Math.round(size * 1.17);
  return (
    <Svg width={size} height={h} viewBox="0 0 48 56">
      <Defs>
        <SvgGrad id="of_g" x1="20%" y1="0%" x2="80%" y2="100%">
          <Stop offset="0%" stopColor="#E88030" /><Stop offset="55%" stopColor="#C05010" /><Stop offset="100%" stopColor="#601000" />
        </SvgGrad>
        <SvgGrad id="of_fl" x1="50%" y1="0%" x2="50%" y2="100%">
          <Stop offset="0%" stopColor="#FFE040" /><Stop offset="100%" stopColor="#FF6010" />
        </SvgGrad>
      </Defs>
      <Path d="M 24 3 C 36 14 42 23 42 32 C 42 44 34 53 24 53 C 14 53 6 44 6 32 C 6 23 12 14 24 3 Z" fill="url(#of_g)" stroke="#E87020" strokeWidth="1.7" />
      <Ellipse cx="15" cy="14" rx="7.5" ry="3.5" fill="#FFFFFF" opacity="0.14" />
      <Path d="M 24 12 C 20 18 17 22 17 28 C 17 32.5 20.5 36.5 24 39 C 27.5 36.5 31 32.5 31 28 C 31 22 28 18 24 12 Z" fill="url(#of_fl)" opacity="0.95" />
      <Path d="M 24 21 C 22 24.5 20.5 27 20.5 30 C 20.5 32.5 22 34.5 24 36 C 26 34.5 27.5 32.5 27.5 30 C 27.5 27 26 24.5 24 21 Z" fill="#FFE040" opacity="0.85" />
      <Circle cx="17" cy="44" r="2.2" fill="#E87020" opacity="0.7" />
      <Circle cx="31" cy="44" r="2.2" fill="#E87020" opacity="0.7" />
    </Svg>
  );
}

/** Open Scroll — Scripture Keeper (Level 5) */
function ScrollBadgeSvg({ size }: { size: number }) {
  const h = Math.round(size * 1.17);
  return (
    <Svg width={size} height={h} viewBox="0 0 48 56">
      <Defs>
        <SvgGrad id="sk_g" x1="20%" y1="0%" x2="80%" y2="100%">
          <Stop offset="0%" stopColor="#C09820" /><Stop offset="55%" stopColor="#907000" /><Stop offset="100%" stopColor="#3A2800" />
        </SvgGrad>
      </Defs>
      <Rect x="7" y="8" width="34" height="40" rx="4" fill="url(#sk_g)" stroke="#D4A020" strokeWidth="1.7" />
      <Rect x="3" y="7" width="7" height="42" rx="3.5" fill="#C09820" stroke="#D4A020" strokeWidth="1.3" />
      <Rect x="38" y="7" width="7" height="42" rx="3.5" fill="#C09820" stroke="#D4A020" strokeWidth="1.3" />
      <Path d="M 10 11 C 8 13 8 43 10 45" stroke="#806000" strokeWidth="1.3" fill="none" opacity="0.5" />
      <Path d="M 38 11 C 40 13 40 43 38 45" stroke="#806000" strokeWidth="1.3" fill="none" opacity="0.5" />
      <Ellipse cx="19" cy="13" rx="8" ry="3.2" fill="#FFFFFF" opacity="0.13" />
      <Line x1="14" y1="21" x2="34" y2="21" stroke={W} strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
      <Line x1="14" y1="26.5" x2="34" y2="26.5" stroke={W} strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
      <Line x1="14" y1="32" x2="28" y2="32" stroke={W} strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
      <Line x1="14" y1="37.5" x2="32" y2="37.5" stroke={W} strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
      <Circle cx="24" cy="44.5" r="5.5" fill="#C09820" stroke={W} strokeWidth="0.9" />
      <Polygon points="24,40.5 25.4,43.3 28.5,43.3 26,45.3 27,48.2 24,46.4 21,48.2 22,45.3 19.5,43.3 22.6,43.3" fill={W} opacity="0.9" />
    </Svg>
  );
}

/** Hexagon — Just Judge (3 cases solved) */
function JudgeBadge({ size }: { size: number }) {
  const h = Math.round(size * 1.17);
  return (
    <Svg width={size} height={h} viewBox="0 0 48 56">
      <Defs>
        <SvgGrad id="jj_g" x1="20%" y1="0%" x2="80%" y2="100%">
          <Stop offset="0%" stopColor="#A040C8" /><Stop offset="55%" stopColor="#7020A0" /><Stop offset="100%" stopColor="#280040" />
        </SvgGrad>
      </Defs>
      <Path d="M 24 4 L 43 14.5 L 43 37.5 L 24 48 L 5 37.5 L 5 14.5 Z" fill="url(#jj_g)" stroke="#9020C0" strokeWidth="1.7" />
      <Path d="M 24 9 L 39.5 17.5 L 39.5 34.5 L 24 43 L 8.5 34.5 L 8.5 17.5 Z" fill="none" stroke="#9020C0" strokeWidth="0.8" opacity="0.45" />
      <Ellipse cx="16" cy="12" rx="9" ry="4" fill="#FFFFFF" opacity="0.13" />
      <Line x1="24" y1="15" x2="24" y2="39" stroke={W} strokeWidth="2" strokeLinecap="round" />
      <Line x1="12" y1="20.5" x2="36" y2="20.5" stroke={W} strokeWidth="2" strokeLinecap="round" />
      <Path d="M 10 20.5 C 10 25.5 12.5 28 16 28 C 19.5 28 22 25.5 22 20.5" fill="none" stroke={W} strokeWidth="1.6" />
      <Path d="M 26 20.5 C 26 25.5 28.5 28 32 28 C 35.5 28 38 25.5 38 20.5" fill="none" stroke={W} strokeWidth="1.6" />
      <Rect x="21" y="37.5" width="6" height="2.5" rx="1.2" fill={W} />
    </Svg>
  );
}

/** Ornate 8-Point Star Seal — Master Sleuth (Legendary, Level 10) */
function MasterBadge({ size }: { size: number }) {
  const h = Math.round(size * 1.17);
  return (
    <Svg width={size} height={h} viewBox="0 0 48 56">
      <Defs>
        <SvgGrad id="mb_g" x1="20%" y1="0%" x2="80%" y2="100%">
          <Stop offset="0%" stopColor="#E8C040" /><Stop offset="45%" stopColor="#D4962A" /><Stop offset="100%" stopColor="#5A3000" />
        </SvgGrad>
        <SvgGrad id="mb_in" x1="30%" y1="20%" x2="70%" y2="80%">
          <Stop offset="0%" stopColor="#3A2A10" /><Stop offset="100%" stopColor="#150800" />
        </SvgGrad>
      </Defs>
      <Path d="M 24 3 L 27.5 14 L 35.5 8.5 L 34 19.5 L 45 19 L 37 26.5 L 45 34 L 34 33.5 L 35.5 44.5 L 27.5 38.5 L 24 50 L 20.5 38.5 L 12.5 44.5 L 14 33.5 L 3 34 L 11 26.5 L 3 19 L 14 19.5 L 12.5 8.5 L 20.5 14 Z" fill="url(#mb_g)" stroke="#E8C040" strokeWidth="1.3" />
      <Ellipse cx="17" cy="15" rx="8.5" ry="4" fill="#FFFFFF" opacity="0.18" />
      <Circle cx="24" cy="27" r="12.5" fill="url(#mb_in)" stroke="#D4962A" strokeWidth="1.6" />
      <Circle cx="24" cy="27" r="9.5" fill="none" stroke="#D4962A" strokeWidth="0.8" opacity="0.55" />
      <Circle cx="21.5" cy="24.5" r="5.8" fill="none" stroke="#D4962A" strokeWidth="2.4" />
      <Line x1="25.5" y1="28.5" x2="30.5" y2="33.5" stroke="#D4962A" strokeWidth="2.7" strokeLinecap="round" />
      <Circle cx="21.5" cy="24.5" r="2.5" fill="none" stroke="#E8C040" strokeWidth="0.8" opacity="0.4" />
      <Circle cx="24" cy="7.5" r="1.3" fill="#E8C040" />
      <Circle cx="24" cy="46.5" r="1.3" fill="#E8C040" />
      <Circle cx="7.5" cy="26.5" r="1.3" fill="#E8C040" />
      <Circle cx="40.5" cy="26.5" r="1.3" fill="#E8C040" />
    </Svg>
  );
}

/* ══════════════════════════════ RANK ICONS ═══════════════════════════════════
 * Rank icons live inside the circular RankCrest (≈36px inside a 78px ring).
 * Each shows unique detective / military rank insignia per tier.
 * ══════════════════════════════════════════════════════════════════════════ */

export function RankIcon({ id, size = 40, color }: { id: RankIconId; size?: number; color?: string; rimColor?: string }) {
  switch (id) {
    case "rookie":  return <RookieRank  size={size} color={color ?? "#7A85A3"} />;
    case "junior":  return <JuniorRank  size={size} color={color ?? "#2ECC8E"} />;
    case "field":   return <FieldRank   size={size} color={color ?? "#4A7EE8"} />;
    case "senior":  return <SeniorRank  size={size} color={color ?? "#9B59B6"} />;
    case "lead":    return <LeadRank    size={size} color={color ?? "#D4962A"} />;
    case "chief":   return <ChiefRank   size={size} color={color ?? "#F5A623"} />;
    case "master":  return <MasterRank  size={size} color={color ?? "#E84040"} />;
    default:        return <RookieRank  size={size} color={color ?? "#7A85A3"} />;
  }
}

/** Rookie — single V-chevron. First day. The coffee is terrible. */
function RookieRank({ size, color }: P) {
  return <Medallion size={size!} base={color!} glyph={
    <>
      <Path d="M 9.5 19 L 16 26 L 22.5 19" stroke={GLYPH} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <Line x1="9.5" y1="23" x2="22.5" y2="23" stroke={GLYPH} strokeWidth="1.1" opacity="0.35" />
    </>
  } />;
}

/** Junior — double V-chevrons. Getting the hang of ancient crime scenes. */
function JuniorRank({ size, color }: P) {
  return <Medallion size={size!} base={color!} glyph={
    <>
      <Path d="M 9.5 14 L 16 21 L 22.5 14" stroke={GLYPH} strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M 9.5 20 L 16 27 L 22.5 20" stroke={GLYPH} strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  } />;
}

/** Field — triple chevrons + star pip. Out in the desert. Literally. */
function FieldRank({ size, color }: P) {
  return <Medallion size={size!} base={color!} glyph={
    <>
      <Polygon points="16,7 17,9.5 19.8,9.5 17.6,11.1 18.4,13.8 16,12.3 13.6,13.8 14.4,11.1 12.2,9.5 15,9.5" fill={GLYPH} />
      <Path d="M 9.5 15.5 L 16 22.5 L 22.5 15.5" stroke={GLYPH} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M 9.5 20.5 L 16 27.5 L 22.5 20.5" stroke={GLYPH} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  } />;
}

/** Senior — 3 horizontal rank bars + star. Knows their Leviticus. */
function SeniorRank({ size, color }: P) {
  return <Medallion size={size!} base={color!} glyph={
    <>
      <Polygon points="16,7 17.2,10.5 21,10.5 18,12.8 19.1,16.3 16,14.2 12.9,16.3 14,12.8 11,10.5 14.8,10.5" fill={GLYPH} />
      <Rect x="9.5" y="18.5" width="13" height="2.5" rx="1.2" fill={GLYPH} />
      <Rect x="9.5" y="22.5" width="13" height="2.5" rx="1.2" fill={GLYPH} />
      <Rect x="9.5" y="26.5" width="13" height="2.5" rx="1.2" fill={GLYPH} />
    </>
  } />;
}

/** Lead — detective shield + star + authority bars. The one signing warrants. */
function LeadRank({ size, color }: P) {
  return <Medallion size={size!} base={color!} glyph={
    <>
      <Path d="M 16 7 L 22.5 9.5 L 22.5 17 C 22.5 20.5 19.8 23.5 16 24.5 C 12.2 23.5 9.5 20.5 9.5 17 L 9.5 9.5 Z" stroke={GLYPH} strokeWidth="1.9" fill="none" />
      <Polygon points="16,10.5 17,13 19.8,13 17.5,14.8 18.3,17.5 16,16 13.7,17.5 14.5,14.8 12.2,13 15,13" fill={GLYPH} />
      <Line x1="8" y1="27.5" x2="24" y2="27.5" stroke={GLYPH} strokeWidth="2.2" strokeLinecap="round" />
      <Line x1="8" y1="31" x2="24" y2="31" stroke={GLYPH} strokeWidth="1.3" strokeLinecap="round" opacity="0.65" />
    </>
  } />;
}

/** Chief — 6-point sheriff star + inner circle badge. Top of the precinct. */
function ChiefRank({ size, color }: P) {
  return <Medallion size={size!} base={color!} glyph={
    <>
      <Polygon points="16,7 18.6,11.8 24,11.8 20.2,15.5 21.5,21 16,18.1 10.5,21 11.8,15.5 8,11.8 13.4,11.8" fill={GLYPH} />
      <Circle cx="16" cy="26" r="4.5" fill="none" stroke={GLYPH} strokeWidth="1.9" />
      <Circle cx="16" cy="26" r="1.8" fill={GLYPH} />
    </>
  } />;
}

/** Master — ornate sunburst compass seal. A living legend in the precinct. */
function MasterRank({ size, color }: P) {
  return <Medallion size={size!} base={color!} glyph={
    <>
      <Circle cx="16" cy="16" r="8.5" fill="none" stroke={GLYPH} strokeWidth="1.7" />
      <Circle cx="16" cy="16" r="5.5" fill="none" stroke={GLYPH} strokeWidth="0.9" opacity="0.55" />
      <Line x1="16" y1="7" x2="16" y2="25" stroke={GLYPH} strokeWidth="1.7" strokeLinecap="round" />
      <Line x1="7" y1="16" x2="25" y2="16" stroke={GLYPH} strokeWidth="1.7" strokeLinecap="round" />
      <Line x1="9.7" y1="9.7" x2="22.3" y2="22.3" stroke={GLYPH} strokeWidth="1" opacity="0.55" />
      <Line x1="22.3" y1="9.7" x2="9.7" y2="22.3" stroke={GLYPH} strokeWidth="1" opacity="0.55" />
      <Circle cx="16" cy="16" r="2.8" fill={GLYPH} />
      <Circle cx="16" cy="7.5" r="1.3" fill={GLYPH} />
      <Circle cx="16" cy="24.5" r="1.3" fill={GLYPH} />
      <Circle cx="7.5" cy="16" r="1.3" fill={GLYPH} />
      <Circle cx="24.5" cy="16" r="1.3" fill={GLYPH} />
    </>
  } />;
}

/* -------------------------- small utility icons -------------------------- */
/* Same medallion treatment, thinner rim so they stay legible at 16-22px. */

function U({ size = 26, color = "#D4962A", glyph }: { size?: number; color?: string; glyph: React.ReactNode }) {
  return <Medallion size={size} base={color} flat glyph={glyph} />;
}

export function IconFolder(p: P) {
  return <U {...p} glyph={<Path d="M8 12.5 C8 11.2 9 10.2 10.4 10.2 L13.8 10.2 L15.2 12 L21.8 12 C23.1 12 24 12.9 24 14.2 L24 20.5 C24 21.8 23.1 22.6 21.8 22.6 L10.4 22.6 C9 22.6 8 21.8 8 20.5 Z" stroke={GLYPH} strokeWidth="1.7" fill="none" strokeLinejoin="round" />} />;
}
export function IconAward(p: P) {
  return <U {...p} glyph={
    <>
      <Circle cx="16" cy="12.5" r="5.2" stroke={GLYPH} strokeWidth="1.8" fill="none" />
      <Path d="M12.4 16.6 L9.8 23.5 L16 20.8 L22.2 23.5 L19.6 16.6" stroke={GLYPH} strokeWidth="1.8" fill="none" strokeLinejoin="round" />
    </>
  } />;
}
export function IconZap(p: P) {
  return <U {...p} glyph={<Path d="M18 7 L10.5 16.5 L15.5 16.5 L14 25 L21.5 15 L16.5 15 Z" fill={GLYPH} />} />;
}
export function IconShield(p: P) {
  return <U {...p} glyph={<Path d="M16 7 L23 10 L23 16.5 C23 20.5 20.2 24.2 16 25.5 C11.8 24.2 9 20.5 9 16.5 L9 10 Z" stroke={GLYPH} strokeWidth="1.8" fill="none" strokeLinejoin="round" />} />;
}
export function IconPlayCircle(p: P) {
  return <U {...p} glyph={<Polygon points="12,9.5 23,16 12,22.5" fill={GLYPH} />} />;
}
export function IconCoin(p: P) {
  return <U {...p} glyph={<Line x1="16" y1="10" x2="16" y2="22" stroke={GLYPH} strokeWidth="2.4" strokeLinecap="round" />} />;
}
export function IconClock(p: P) {
  return <U {...p} glyph={
    <>
      <Circle cx="16" cy="16" r="8" stroke={GLYPH} strokeWidth="1.6" fill="none" />
      <Line x1="16" y1="10.5" x2="16" y2="16" stroke={GLYPH} strokeWidth="2.2" strokeLinecap="round" />
      <Line x1="16" y1="16" x2="19.8" y2="19" stroke={GLYPH} strokeWidth="2.2" strokeLinecap="round" />
    </>
  } />;
}
export function IconHeart(p: P) {
  return <U {...p} glyph={<Path d="M16 24 C16 24 8.5 18.5 8.5 13.3 C8.5 10.6 10.6 8.5 13.1 8.5 C14.8 8.5 16 9.6 16 9.6 C16 9.6 17.2 8.5 18.9 8.5 C21.4 8.5 23.5 10.6 23.5 13.3 C23.5 18.5 16 24 16 24 Z" fill={GLYPH} />} />;
}
export function IconCalendar(p: P) {
  return <U {...p} glyph={
    <>
      <Rect x="8.5" y="9.5" width="15" height="14" rx="2" stroke={GLYPH} strokeWidth="1.8" fill="none" />
      <Line x1="8.5" y1="13.8" x2="23.5" y2="13.8" stroke={GLYPH} strokeWidth="1.7" />
      <Line x1="12" y1="7.5" x2="12" y2="11.5" stroke={GLYPH} strokeWidth="1.7" strokeLinecap="round" />
      <Line x1="20" y1="7.5" x2="20" y2="11.5" stroke={GLYPH} strokeWidth="1.7" strokeLinecap="round" />
    </>
  } />;
}
export function IconUsers(p: P) {
  return <U {...p} glyph={
    <>
      <Circle cx="12.5" cy="12.5" r="3.2" stroke={GLYPH} strokeWidth="1.7" fill="none" />
      <Path d="M7 23 C7 19.2 9.4 17.2 12.5 17.2 C15.6 17.2 18 19.2 18 23" stroke={GLYPH} strokeWidth="1.7" fill="none" strokeLinecap="round" />
      <Circle cx="21" cy="12.8" r="2.5" stroke={GLYPH} strokeWidth="1.3" fill="none" />
      <Path d="M18.5 23 C18.5 20 19.9 18.2 22 18" stroke={GLYPH} strokeWidth="1.3" fill="none" strokeLinecap="round" />
    </>
  } />;
}
export function IconBook(p: P) {
  return <U {...p} glyph={
    <>
      <Path d="M9.5 9.5 C9.5 8.5 10.3 7.6 11.4 7.6 L22 7.6 C23.1 7.6 23.9 8.5 23.9 9.5 L23.9 22.5 C23.9 23.5 23.1 24.4 22 24.4 L11.4 24.4 C10.3 24.4 9.5 23.5 9.5 22.5 Z" stroke={GLYPH} strokeWidth="1.6" fill="none" />
      <Line x1="12.3" y1="12.2" x2="21" y2="12.2" stroke={GLYPH} strokeWidth="1.3" strokeLinecap="round" />
      <Line x1="12.3" y1="15.7" x2="21" y2="15.7" stroke={GLYPH} strokeWidth="1.3" strokeLinecap="round" />
      <Line x1="12.3" y1="19.2" x2="18" y2="19.2" stroke={GLYPH} strokeWidth="1.3" strokeLinecap="round" />
    </>
  } />;
}
export function IconLock(p: P) {
  return <U {...p} glyph={
    <>
      <Rect x="10" y="15.5" width="12" height="10" rx="2" stroke={GLYPH} strokeWidth="1.8" fill="none" />
      <Path d="M12.5 15.5 L12.5 12 C12.5 9.5 14 7.7 16 7.7 C18 7.7 19.5 9.5 19.5 12 L19.5 15.5" stroke={GLYPH} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <Circle cx="16" cy="20" r="1.4" fill={GLYPH} />
    </>
  } />;
}
export function IconCheck(p: P) {
  return <U {...p} glyph={<Path d="M9.5 16.5 L14 21 L22.5 11" stroke={GLYPH} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />} />;
}
export function IconFire(p: P) {
  return <U {...p} glyph={<Path d="M16 7 C14 10 11.5 12 11.5 15.7 C11.5 18.7 13.6 21.3 16 23 C18.4 21.3 20.5 18.7 20.5 15.7 C20.5 12 18 10 16 7 Z" fill={GLYPH} />} />;
}
export function IconStar(p: P) {
  return <U {...p} glyph={<Polygon points="16,7 18.4,12.4 24.2,12.4 19.5,16.2 21.3,22 16,18.4 10.7,22 12.5,16.2 7.8,12.4 13.6,12.4" fill={GLYPH} />} />;
}
export function IconSettings(p: P) {
  return <U {...p} glyph={
    <>
      <Circle cx="16" cy="16" r="4" stroke={GLYPH} strokeWidth="1.9" fill="none" />
      <Path d="M16 8.5 L16 11 M16 21 L16 23.5 M8.5 16 L11 16 M21 16 L23.5 16 M11 11 L12.7 12.7 M19.3 19.3 L21 21 M21 11 L19.3 12.7 M12.7 19.3 L11 21" stroke={GLYPH} strokeWidth="1.9" strokeLinecap="round" />
    </>
  } />;
}
export function IconArrowRight(p: P) {
  return <U {...p} glyph={
    <>
      <Line x1="8.5" y1="16" x2="21" y2="16" stroke={GLYPH} strokeWidth="2.6" strokeLinecap="round" />
      <Path d="M16.5 10.5 L22.5 16 L16.5 21.5" stroke={GLYPH} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  } />;
}
export function IconArrowLeft(p: P) {
  return <U {...p} glyph={
    <>
      <Line x1="23.5" y1="16" x2="11" y2="16" stroke={GLYPH} strokeWidth="2.6" strokeLinecap="round" />
      <Path d="M15.5 10.5 L9.5 16 L15.5 21.5" stroke={GLYPH} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  } />;
}
export function IconInfo(p: P) {
  return <U {...p} glyph={
    <>
      <Line x1="16" y1="14.5" x2="16" y2="22" stroke={GLYPH} strokeWidth="2.6" strokeLinecap="round" />
      <Circle cx="16" cy="10" r="1.5" fill={GLYPH} />
    </>
  } />;
}
export function IconMoreVertical(p: P) {
  return <U {...p} glyph={
    <>
      <Circle cx="16" cy="9.5" r="1.5" fill={GLYPH} />
      <Circle cx="16" cy="16" r="1.5" fill={GLYPH} />
      <Circle cx="16" cy="22.5" r="1.5" fill={GLYPH} />
    </>
  } />;
}
export function IconBookmark(p: P) {
  return <U {...p} glyph={
    <Path d="M10 8.5 L22 8.5 C22.9 8.5 23.6 9.2 23.6 10.1 L23.6 24 L16 20.2 L8.4 24 L8.4 10.1 C8.4 9.2 9.1 8.5 10 8.5 Z" stroke={GLYPH} strokeWidth="1.7" fill="none" strokeLinejoin="round" />
  } />;
}
export function IconNote(p: P) {
  return <U {...p} glyph={
    <>
      <Rect x="9.2" y="8.8" width="13.6" height="14.4" rx="1.8" stroke={GLYPH} strokeWidth="1.7" fill="none" />
      <Line x1="12" y1="13" x2="20" y2="13" stroke={GLYPH} strokeWidth="1.4" strokeLinecap="round" />
      <Line x1="12" y1="16.5" x2="20" y2="16.5" stroke={GLYPH} strokeWidth="1.4" strokeLinecap="round" />
      <Line x1="12" y1="20" x2="17" y2="20" stroke={GLYPH} strokeWidth="1.4" strokeLinecap="round" />
    </>
  } />;
}
export function IconMarker(p: P) {
  return <U {...p} glyph={
    <>
      <Path d="M11 8.8 L21 8.8 L18.2 15.3 L19.3 17.7 L16.3 17.7 L15.2 15.3 Z" stroke={GLYPH} strokeWidth="1.6" fill="none" strokeLinejoin="round" />
      <Path d="M13.2 17.8 L12 23.2 L16 21.2 L20 23.2 L18.8 17.8" stroke={GLYPH} strokeWidth="1.6" fill="none" strokeLinejoin="round" />
    </>
  } />;
}
export function IconMap(p: P) {
  return <U {...p} glyph={
    <>
      <Polygon points="8.5,13 13.5,10.5 18.5,13 23.5,10.5 23.5,21.5 18.5,24 13.5,21.5 8.5,24" stroke={GLYPH} strokeWidth="1.7" fill="none" strokeLinejoin="round" />
      <Line x1="13.5" y1="10.5" x2="13.5" y2="21.5" stroke={GLYPH} strokeWidth="1.3" />
      <Line x1="18.5" y1="13" x2="18.5" y2="24" stroke={GLYPH} strokeWidth="1.3" />
    </>
  } />;
}
export function IconScroll(p: P) {
  return <U {...p} glyph={
    <>
      <Rect x="10.5" y="8" width="11" height="16" rx="1.8" stroke={GLYPH} strokeWidth="1.6" fill="none" />
      <Line x1="13" y1="13" x2="19" y2="13" stroke={GLYPH} strokeWidth="1.3" strokeLinecap="round" />
      <Line x1="13" y1="16.5" x2="19" y2="16.5" stroke={GLYPH} strokeWidth="1.3" strokeLinecap="round" />
      <Line x1="13" y1="20" x2="17" y2="20" stroke={GLYPH} strokeWidth="1.3" strokeLinecap="round" />
    </>
  } />;
}
export function IconUser(p: P) {
  return <U {...p} glyph={
    <>
      <Circle cx="16" cy="12.5" r="4" stroke={GLYPH} strokeWidth="1.8" fill="none" />
      <Path d="M8.5 24 C8.5 19.7 11.7 16.8 16 16.8 C20.3 16.8 23.5 19.7 23.5 24" stroke={GLYPH} strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </>
  } />;
}
export function IconTrendingUp(p: P) {
  return <U {...p} glyph={
    <>
      <Path d="M9 21 L14 15.5 L17.3 19 L23 12.5" stroke={GLYPH} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <Path d="M19.8 12.5 L23 12.5 L23 15.7" stroke={GLYPH} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  } />;
}
export function IconWarning(p: P) {
  return <U {...p} glyph={
    <>
      <Path d="M16 8.5 L23.5 22.5 L8.5 22.5 Z" stroke={GLYPH} strokeWidth="1.9" fill="none" strokeLinejoin="round" />
      <Line x1="16" y1="14" x2="16" y2="18" stroke={GLYPH} strokeWidth="2.1" strokeLinecap="round" />
      <Circle cx="16" cy="20.4" r="1" fill={GLYPH} />
    </>
  } />;
}
export function IconHome(p: P) {
  return <U {...p} glyph={<Path d="M8.5 16.5 L16 9.5 L23.5 16.5 L23.5 23.5 L19.5 23.5 L19.5 18 L12.5 18 L12.5 23.5 L8.5 23.5 Z" stroke={GLYPH} strokeWidth="1.8" fill="none" strokeLinejoin="round" />} />;
}
export function IconTrash(p: P) {
  return <U {...p} glyph={
    <>
      <Rect x="10.5" y="13.5" width="11" height="11" rx="1.5" stroke={GLYPH} strokeWidth="1.7" fill="none" />
      <Line x1="8.5" y1="13.5" x2="23.5" y2="13.5" stroke={GLYPH} strokeWidth="1.7" strokeLinecap="round" />
      <Line x1="13" y1="10" x2="19" y2="10" stroke={GLYPH} strokeWidth="1.7" strokeLinecap="round" />
    </>
  } />;
}
export function IconGavel(p: P) {
  return <U {...p} glyph={
    <>
      <Rect x="7.5" y="20.5" width="9" height="4.2" rx="1.2" fill={GLYPH} opacity={0.85} />
      <Line x1="12" y1="20.5" x2="20.5" y2="12" stroke={GLYPH} strokeWidth="2.3" strokeLinecap="round" />
      <Rect x="18.3" y="8.2" width="6.4" height="4.2" rx="1.2" fill={GLYPH} transform="rotate(45 21.5 10.3)" />
    </>
  } />;
}
export function IconVibration(p: P) {
  return <U {...p} glyph={
    <>
      <Rect x="13" y="8.5" width="6" height="15" rx="2" stroke={GLYPH} strokeWidth="1.7" fill="none" />
      <Line x1="7.5" y1="12.5" x2="10" y2="12.5" stroke={GLYPH} strokeWidth="1.7" strokeLinecap="round" />
      <Line x1="7.5" y1="16" x2="10" y2="16" stroke={GLYPH} strokeWidth="1.7" strokeLinecap="round" />
      <Line x1="7.5" y1="19.5" x2="10" y2="19.5" stroke={GLYPH} strokeWidth="1.7" strokeLinecap="round" />
      <Line x1="22" y1="12.5" x2="24.5" y2="12.5" stroke={GLYPH} strokeWidth="1.7" strokeLinecap="round" />
      <Line x1="22" y1="16" x2="24.5" y2="16" stroke={GLYPH} strokeWidth="1.7" strokeLinecap="round" />
      <Line x1="22" y1="19.5" x2="24.5" y2="19.5" stroke={GLYPH} strokeWidth="1.7" strokeLinecap="round" />
    </>
  } />;
}
export function IconSparkles(p: P) {
  return <U {...p} glyph={<Path d="M16 6.5 L17.2 11.7 L22 10.7 L18.5 14.3 L23.2 16.2 L18.5 18.1 L22 21.7 L17.2 20.7 L16 26 L14.8 20.7 L10 21.7 L13.5 18.1 L8.8 16.2 L13.5 14.3 L10 10.7 L14.8 11.7 Z" fill={GLYPH} />} />;
}
export function IconCheckCircle(p: P) {
  return <Medallion size={p.size ?? 56} base={p.color ?? "#2ECC8E"} glyph={
    <Path d="M9.5 16 L14.8 21.5 L22.5 10.5" stroke={GLYPH} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  } />;
}
export function IconBookOpen(p: P) {
  return <Medallion size={p.size ?? 40} base={p.color ?? "#D4962A"} glyph={
    <>
      <Path d="M8 10 C8 8.9 8.9 8 10 8 L16 8 L16 24 L10 24 C8.9 24 8 23.1 8 22 Z" stroke={GLYPH} strokeWidth="1.6" fill="none" />
      <Path d="M16 8 L22 8 C23.1 8 24 8.9 24 10 L24 22 C24 23.1 23.1 24 22 24 L16 24 Z" stroke={GLYPH} strokeWidth="1.6" fill="none" />
      <Line x1="10.5" y1="12.3" x2="14.3" y2="12.3" stroke={GLYPH} strokeWidth="1.1" strokeLinecap="round" />
      <Line x1="17.7" y1="12.3" x2="21.5" y2="12.3" stroke={GLYPH} strokeWidth="1.1" strokeLinecap="round" />
      <Line x1="10.5" y1="16" x2="14.3" y2="16" stroke={GLYPH} strokeWidth="1.1" strokeLinecap="round" />
      <Line x1="17.7" y1="16" x2="21.5" y2="16" stroke={GLYPH} strokeWidth="1.1" strokeLinecap="round" />
    </>
  } />;
}
export function IconSun(p: P) {
  return <Medallion size={p.size ?? 44} base={p.color ?? "#4A7EE8"} glyph={
    <>
      <Circle cx="16" cy="16" r="4.6" stroke={GLYPH} strokeWidth="2" fill="none" />
      <Line x1="16" y1="8" x2="16" y2="10" stroke={GLYPH} strokeWidth="2" strokeLinecap="round" />
      <Line x1="16" y1="22" x2="16" y2="24" stroke={GLYPH} strokeWidth="2" strokeLinecap="round" />
      <Line x1="8" y1="16" x2="10" y2="16" stroke={GLYPH} strokeWidth="2" strokeLinecap="round" />
      <Line x1="22" y1="16" x2="24" y2="16" stroke={GLYPH} strokeWidth="2" strokeLinecap="round" />
      <Line x1="10.3" y1="10.3" x2="11.7" y2="11.7" stroke={GLYPH} strokeWidth="2" strokeLinecap="round" />
      <Line x1="20.3" y1="20.3" x2="21.7" y2="21.7" stroke={GLYPH} strokeWidth="2" strokeLinecap="round" />
      <Line x1="20.3" y1="11.7" x2="21.7" y2="10.3" stroke={GLYPH} strokeWidth="2" strokeLinecap="round" />
      <Line x1="10.3" y1="21.7" x2="11.7" y2="20.3" stroke={GLYPH} strokeWidth="2" strokeLinecap="round" />
    </>
  } />;
}
export function IconDifficultyDot({ size = 26, level = 1 }: { size?: number; level?: 1 | 2 | 3 }) {
  const base = level === 1 ? "#2ECC8E" : level === 2 ? "#F5A623" : "#E84040";
  return <Medallion size={size} base={base} flat glyph={<Circle cx="16" cy="16" r="4.2" fill={GLYPH} />} />;
}
