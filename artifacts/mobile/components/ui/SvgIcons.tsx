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

/* -------------------------------- medallion ------------------------------- */
/**
 * Shared "premium coin" base: gradient fill, beveled rim, inner ring shadow,
 * and a soft top-left shine. Every icon below renders its glyph on top of this.
 * Each instance lives in its own <Svg>, so a fixed gradient id is safe (no
 * cross-icon collisions in react-native-svg, since <Defs> scope to the Svg).
 */
function Medallion({
  size,
  base,
  glyph,
  flat = false,
}: {
  size: number;
  base: string;
  glyph: React.ReactNode;
  flat?: boolean; // smaller utility icons get a thinner rim
}) {
  const rimDark = darken(base, flat ? 35 : 45);
  const ringDark = darken(base, 16);
  const rOuter = flat ? 14.5 : 15;
  const rInner = flat ? 12 : 12.5;
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      <Defs>
        <SvgGrad id="mg" x1="15%" y1="0%" x2="85%" y2="100%">
          <Stop offset="0%" stopColor={lighten(base, 24)} />
          <Stop offset="55%" stopColor={base} />
          <Stop offset="100%" stopColor={darken(base, 26)} />
        </SvgGrad>
      </Defs>
      <Circle cx="16" cy="16" r={rOuter} fill="url(#mg)" stroke={rimDark} strokeWidth={flat ? 0.75 : 1} />
      <Circle cx="16" cy="16" r={rInner} fill="none" stroke={ringDark} strokeWidth={0.6} opacity={0.5} />
      <Ellipse cx="11.5" cy="9.5" rx="6.5" ry="3.5" fill="#FFFFFF" opacity={0.15} />
      <G>{glyph}</G>
    </Svg>
  );
}

const GLYPH = "#FFF8EC"; // warm off-white used for glyph strokes/fills on every medallion

/* --------------------------------- badges --------------------------------- */

export function BadgeIcon({ id, size = 32, color, rimColor }: { id: BadgeIconId; size?: number; color?: string; rimColor?: string }) {
  switch (id) {
    case "first_blood": return <CrossedSwords size={size} color={color ?? "#E84040"} rimColor={rimColor} />;
    case "brotherhood_broken": return <BrokenBrother size={size} color={color ?? "#C84040"} rimColor={rimColor} />;
    case "deception_master": return <Snake size={size} color={color ?? "#3A8B3A"} rimColor={rimColor} />;
    case "coat_of_colors": return <RainbowCoat size={size} color={color ?? "#7B68EE"} rimColor={rimColor} />;
    case "broken_chains": return <ChainBroken size={size} color={color ?? "#4A8BC8"} rimColor={rimColor} />;
    case "wisdoms_crown": return <Crown size={size} color={color ?? "#C89030"} rimColor={rimColor} />;
    case "gethsemane_witness": return <DoveCross size={size} color={color ?? "#8888D8"} rimColor={rimColor} />;
    case "truth_seeker": return <MagnifyGlass size={size} color={color ?? "#A060C8"} rimColor={rimColor} />;
    case "on_fire": return <Flame size={size} color={color ?? "#E87020"} rimColor={rimColor} />;
    case "scripture_keeper": return <Scroll size={size} color={color ?? "#C0A020"} rimColor={rimColor} />;
    case "just_judge": return <Scales size={size} color={color ?? "#A030D0"} rimColor={rimColor} />;
    case "master_sleuth": return <StarShield size={size} color={color ?? "#D4962A"} rimColor={rimColor} />;
    default: return <StarShield size={size} color={color ?? "#D4962A"} rimColor={rimColor} />;
  }
}

function CrossedSwords({ size, color }: P) {
  const base = color!;
  return (
    <Medallion size={size!} base={base} glyph={
      <>
        <Line x1="9" y1="9" x2="23" y2="23" stroke={GLYPH} strokeWidth="2" strokeLinecap="round" />
        <Polygon points="9,9 7,6.3 11,7.3 9.7,11" fill={GLYPH} />
        <Line x1="23" y1="9" x2="9" y2="23" stroke={GLYPH} strokeWidth="2" strokeLinecap="round" />
        <Polygon points="23,9 25,6.3 21,7.3 22.3,11" fill={GLYPH} />
        <Circle cx="16" cy="16" r="1.8" fill={darken(base, 30)} stroke={GLYPH} strokeWidth="0.6" />
      </>
    } />
  );
}

function BrokenBrother({ size, color }: P) {
  const base = color!;
  return (
    <Medallion size={size!} base={base} glyph={
      <>
        <Circle cx="11" cy="11" r="2.6" stroke={GLYPH} strokeWidth="1.6" fill="none" />
        <Circle cx="21" cy="21" r="2.6" stroke={GLYPH} strokeWidth="1.6" fill="none" />
        <Line x1="13.2" y1="13.2" x2="15" y2="15" stroke={GLYPH} strokeWidth="2.2" strokeLinecap="round" />
        <Line x1="17" y1="17" x2="18.8" y2="18.8" stroke={GLYPH} strokeWidth="2.2" strokeLinecap="round" />
      </>
    } />
  );
}

function Snake({ size, color }: P) {
  const base = color!;
  return (
    <Medallion size={size!} base={base} glyph={
      <>
        <Path
          d="M16 25 C11 25 8 22 8 19 C8 16 11 14.5 14 16 C17 17.5 20 16 20 13 C20 10.5 17.5 9 16 10.5 C14.7 11.8 16 13.5 16 13.5"
          stroke={GLYPH} strokeWidth="2.2" strokeLinecap="round" fill="none"
        />
        <Circle cx="16" cy="9" r="2.1" fill={GLYPH} />
        <Circle cx="15.3" cy="8.5" r="0.6" fill={darken(base, 30)} />
      </>
    } />
  );
}

function RainbowCoat({ size, color }: P) {
  const base = color!;
  return (
    <Medallion size={size!} base={base} glyph={
      <>
        <Path d="M16 8 L11 12 L9.5 23 L22.5 23 L21 12 Z" fill="none" stroke={GLYPH} strokeWidth="1.4" />
        <Rect x="11.5" y="14" width="9" height="1.8" fill="#FFD27A" opacity={0.9} />
        <Rect x="11.5" y="17" width="9" height="1.8" fill="#FF9F7A" opacity={0.9} />
        <Rect x="11.5" y="20" width="9" height="1.8" fill="#8FE0B0" opacity={0.9} />
        <Circle cx="16" cy="8" r="1.4" fill={GLYPH} />
      </>
    } />
  );
}

function ChainBroken({ size, color }: P) {
  const base = color!;
  return (
    <Medallion size={size!} base={base} glyph={
      <>
        <Rect x="8" y="13" width="6.5" height="6" rx="3" stroke={GLYPH} strokeWidth="1.8" fill="none" />
        <Rect x="17.5" y="13" width="6.5" height="6" rx="3" stroke={GLYPH} strokeWidth="1.8" fill="none" />
        <Line x1="14.5" y1="16" x2="17.5" y2="16" stroke={GLYPH} strokeWidth="2.2" strokeLinecap="round" strokeDasharray="1.6,1.6" />
      </>
    } />
  );
}

function Crown({ size, color }: P) {
  const base = color!;
  return (
    <Medallion size={size!} base={base} glyph={
      <>
        <Path d="M9 21 L9 14 L13 18 L16 9 L19 18 L23 14 L23 21 Z" fill={GLYPH} />
        <Rect x="9" y="21" width="14" height="2.4" rx="1.2" fill={GLYPH} />
        <Circle cx="16" cy="9" r="1.4" fill={darken(base, 25)} />
      </>
    } />
  );
}

function DoveCross({ size, color }: P) {
  const base = color!;
  return (
    <Medallion size={size!} base={base} glyph={
      <>
        <Line x1="16" y1="9" x2="16" y2="23" stroke={GLYPH} strokeWidth="2" strokeLinecap="round" />
        <Line x1="10.5" y1="14" x2="21.5" y2="14" stroke={GLYPH} strokeWidth="2" strokeLinecap="round" />
        <Path d="M19 12 C20.5 10.5 23 10.5 23 12.5 C23 14 21.5 14.7 20 14.5 Z" fill={GLYPH} />
      </>
    } />
  );
}

function MagnifyGlass({ size, color }: P) {
  const base = color!;
  return (
    <Medallion size={size!} base={base} glyph={
      <>
        <Circle cx="14" cy="14" r="6" stroke={GLYPH} strokeWidth="2.4" fill="none" />
        <Line x1="18.2" y1="18.2" x2="23" y2="23" stroke={GLYPH} strokeWidth="2.6" strokeLinecap="round" />
      </>
    } />
  );
}

function Flame({ size, color }: P) {
  const base = color!;
  return (
    <Medallion size={size!} base={base} glyph={
      <>
        <Path d="M16 8 C14.5 11 12 12.5 12 16 C12 19 14 21.5 16 23.5 C18 21.5 20 19 20 16 C20 12.5 17.5 11 16 8 Z" fill={GLYPH} />
        <Path d="M16 14.5 C15.2 16 14 16.8 14 18.8 C14 20.3 15 21.3 16 22.3 C17 21.3 18 20.3 18 18.8 C18 16.8 16.8 16 16 14.5 Z" fill={darken(base, 10)} />
      </>
    } />
  );
}

function Scroll({ size, color }: P) {
  const base = color!;
  return (
    <Medallion size={size!} base={base} glyph={
      <>
        <Rect x="10" y="10" width="12" height="13" rx="2" fill="none" stroke={GLYPH} strokeWidth="1.6" />
        <Rect x="8.5" y="9" width="4" height="13" rx="2" fill="none" stroke={GLYPH} strokeWidth="1.4" />
        <Rect x="19.5" y="9" width="4" height="13" rx="2" fill="none" stroke={GLYPH} strokeWidth="1.4" />
        <Line x1="13" y1="14" x2="19" y2="14" stroke={GLYPH} strokeWidth="1.1" strokeLinecap="round" />
        <Line x1="13" y1="17" x2="19" y2="17" stroke={GLYPH} strokeWidth="1.1" strokeLinecap="round" />
        <Line x1="13" y1="20" x2="17" y2="20" stroke={GLYPH} strokeWidth="1.1" strokeLinecap="round" />
      </>
    } />
  );
}

function Scales({ size, color }: P) {
  const base = color!;
  return (
    <Medallion size={size!} base={base} glyph={
      <>
        <Line x1="16" y1="9" x2="16" y2="23" stroke={GLYPH} strokeWidth="2" strokeLinecap="round" />
        <Line x1="10" y1="12" x2="22" y2="12" stroke={GLYPH} strokeWidth="2" strokeLinecap="round" />
        <Path d="M8.5 12 C8.5 15.5 11 16.8 13 16.8 C15 16.8 17 15.5 17 12" fill="none" stroke={GLYPH} strokeWidth="1.2" />
        <Path d="M15 12 C15 15.5 17.5 16.8 19.5 16.8 C21.5 16.8 23.5 15.5 23.5 12" fill="none" stroke={GLYPH} strokeWidth="1.2" />
        <Rect x="13.5" y="22" width="5" height="1.8" rx="0.9" fill={GLYPH} />
      </>
    } />
  );
}

function StarShield({ size, color }: P) {
  const base = color!;
  return (
    <Medallion size={size!} base={base} glyph={
      <Polygon
        points="16,10 17.5,14 22,14 18.5,17 19.8,22 16,19.5 12.2,22 13.5,17 10,14 14.5,14"
        fill={GLYPH}
      />
    } />
  );
}

/* ---------------------------------- ranks ---------------------------------- */

export function RankIcon({ id, size = 32, color }: { id: RankIconId; size?: number; color?: string; rimColor?: string }) {
  switch (id) {
    case "rookie": return <MagnifySimple size={size} color={color ?? "#7A85A3"} />;
    case "junior": return <ClipboardBadge size={size} color={color ?? "#2ECC8E"} />;
    case "field": return <FieldShield size={size} color={color ?? "#4A7EE8"} />;
    case "senior": return <ScalesSmall size={size} color={color ?? "#9B59B6"} />;
    case "lead": return <Pillar size={size} color={color ?? "#D4962A"} />;
    case "chief": return <StarBadge size={size} color={color ?? "#F5A623"} />;
    case "master": return <MasterCrown size={size} color={color ?? "#E84040"} />;
    default: return <MagnifySimple size={size} color={color ?? "#7A85A3"} />;
  }
}

function MagnifySimple({ size, color }: P) {
  return <Medallion size={size!} base={color!} glyph={
    <>
      <Circle cx="14" cy="14" r="6" stroke={GLYPH} strokeWidth="2.2" fill="none" />
      <Line x1="18" y1="18" x2="23" y2="23" stroke={GLYPH} strokeWidth="2.6" strokeLinecap="round" />
    </>
  } />;
}
function ClipboardBadge({ size, color }: P) {
  return <Medallion size={size!} base={color!} glyph={
    <>
      <Rect x="11" y="11" width="10" height="12" rx="2" stroke={GLYPH} strokeWidth="1.6" fill="none" />
      <Rect x="13.5" y="9" width="5" height="3.5" rx="1.2" stroke={GLYPH} strokeWidth="1.3" fill="none" />
      <Line x1="13" y1="16" x2="19" y2="16" stroke={GLYPH} strokeWidth="1.3" strokeLinecap="round" />
      <Line x1="13" y1="19" x2="19" y2="19" stroke={GLYPH} strokeWidth="1.3" strokeLinecap="round" />
    </>
  } />;
}
function FieldShield({ size, color }: P) {
  return <Medallion size={size!} base={color!} glyph={
    <Path d="M16 9 L21.5 11.5 L21.5 17 C21.5 20 19 22.5 16 23.5 C13 22.5 10.5 20 10.5 17 L10.5 11.5 Z" stroke={GLYPH} strokeWidth="1.8" fill="none" />
  } />;
}
function ScalesSmall({ size, color }: P) {
  return <Medallion size={size!} base={color!} glyph={
    <>
      <Line x1="16" y1="9" x2="16" y2="23" stroke={GLYPH} strokeWidth="2" strokeLinecap="round" />
      <Line x1="10.5" y1="12" x2="21.5" y2="12" stroke={GLYPH} strokeWidth="2" strokeLinecap="round" />
      <Rect x="13.5" y="22" width="5" height="1.8" rx="0.9" fill={GLYPH} />
    </>
  } />;
}
function Pillar({ size, color }: P) {
  return <Medallion size={size!} base={color!} glyph={
    <>
      <Rect x="12.5" y="10" width="7" height="11" stroke={GLYPH} strokeWidth="1.4" fill="none" />
      <Rect x="11" y="8" width="10" height="2.4" rx="1" fill={GLYPH} opacity={0.9} />
      <Rect x="11" y="21" width="10" height="2.4" rx="1" fill={GLYPH} opacity={0.9} />
    </>
  } />;
}
function StarBadge({ size, color }: P) {
  return <Medallion size={size!} base={color!} glyph={
    <Polygon points="16,9 18,13.5 23,14 19.3,17.2 20.3,22 16,19.5 11.7,22 12.7,17.2 9,14 14,13.5" fill={GLYPH} />
  } />;
}
function MasterCrown({ size, color }: P) {
  return <Medallion size={size!} base={color!} glyph={
    <>
      <Path d="M9.5 21 L9.5 13 L13 17 L16 8 L19 17 L22.5 13 L22.5 21 Z" fill={GLYPH} />
      <Rect x="9.5" y="21" width="13" height="2.2" rx="1" fill={GLYPH} />
    </>
  } />;
}

/* -------------------------- small utility icons -------------------------- */
/* Same medallion treatment, thinner rim so they stay legible at 16-22px. */

function U({ size = 20, color = "#D4962A", glyph }: { size?: number; color?: string; glyph: React.ReactNode }) {
  return <Medallion size={size} base={color} flat glyph={glyph} />;
}

export function IconFolder(p: P) {
  return <U {...p} glyph={<Path d="M9 12 C9 11 9.6 10.4 10.6 10.4 L13.4 10.4 L14.6 11.8 L21.4 11.8 C22.4 11.8 23 12.4 23 13.4 L23 20 C23 21 22.4 21.6 21.4 21.6 L10.6 21.6 C9.6 21.6 9 21 9 20 Z" stroke={GLYPH} strokeWidth="1.4" fill="none" strokeLinejoin="round" />} />;
}
export function IconAward(p: P) {
  return <U {...p} glyph={
    <>
      <Circle cx="16" cy="13" r="4.4" stroke={GLYPH} strokeWidth="1.5" fill="none" />
      <Path d="M13 16.5 L11 22 L16 20 L21 22 L19 16.5" stroke={GLYPH} strokeWidth="1.5" fill="none" strokeLinejoin="round" />
    </>
  } />;
}
export function IconZap(p: P) {
  return <U {...p} glyph={<Path d="M17.5 9 L11.5 16.5 L15.5 16.5 L14.5 23 L20.5 15.5 L16.5 15.5 Z" fill={GLYPH} />} />;
}
export function IconShield(p: P) {
  return <U {...p} glyph={<Path d="M16 9 L21.5 11.2 L21.5 16.5 C21.5 19.8 19.2 22.8 16 23.8 C12.8 22.8 10.5 19.8 10.5 16.5 L10.5 11.2 Z" stroke={GLYPH} strokeWidth="1.5" fill="none" strokeLinejoin="round" />} />;
}
export function IconPlayCircle(p: P) {
  return <U {...p} glyph={<Polygon points="13,11 21,16 13,21" fill={GLYPH} />} />;
}
export function IconCoin(p: P) {
  return <U {...p} glyph={<Line x1="16" y1="12" x2="16" y2="20" stroke={GLYPH} strokeWidth="2" strokeLinecap="round" />} />;
}
export function IconClock(p: P) {
  return <U {...p} glyph={
    <>
      <Line x1="16" y1="11.5" x2="16" y2="16" stroke={GLYPH} strokeWidth="2" strokeLinecap="round" />
      <Line x1="16" y1="16" x2="19" y2="18.5" stroke={GLYPH} strokeWidth="2" strokeLinecap="round" />
    </>
  } />;
}
export function IconHeart(p: P) {
  return <U {...p} glyph={<Path d="M16 22 C16 22 10 17.5 10 13.5 C10 11.5 11.6 10 13.5 10 C14.8 10 16 10.9 16 10.9 C16 10.9 17.2 10 18.5 10 C20.4 10 22 11.5 22 13.5 C22 17.5 16 22 16 22 Z" fill={GLYPH} />} />;
}
export function IconCalendar(p: P) {
  return <U {...p} glyph={
    <>
      <Rect x="10" y="11" width="12" height="11" rx="1.6" stroke={GLYPH} strokeWidth="1.5" fill="none" />
      <Line x1="10" y1="14.5" x2="22" y2="14.5" stroke={GLYPH} strokeWidth="1.4" />
    </>
  } />;
}
export function IconUsers(p: P) {
  return <U {...p} glyph={
    <>
      <Circle cx="13.5" cy="13" r="2.6" stroke={GLYPH} strokeWidth="1.4" fill="none" />
      <Path d="M9 21 C9 18 11 16.5 13.5 16.5 C16 16.5 18 18 18 21" stroke={GLYPH} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <Circle cx="20" cy="13" r="2" stroke={GLYPH} strokeWidth="1.1" fill="none" />
    </>
  } />;
}
export function IconBook(p: P) {
  return <U {...p} glyph={
    <>
      <Path d="M10.5 10.5 C10.5 9.7 11.1 9 12 9 L21 9 C21.9 9 22.5 9.7 22.5 10.5 L22.5 21 C22.5 21.8 21.9 22.5 21 22.5 L12 22.5 C11.1 22.5 10.5 21.8 10.5 21 Z" stroke={GLYPH} strokeWidth="1.3" fill="none" />
      <Line x1="13.5" y1="14" x2="19.5" y2="14" stroke={GLYPH} strokeWidth="1.1" strokeLinecap="round" />
      <Line x1="13.5" y1="17" x2="19.5" y2="17" stroke={GLYPH} strokeWidth="1.1" strokeLinecap="round" />
    </>
  } />;
}
export function IconLock(p: P) {
  return <U {...p} glyph={
    <>
      <Rect x="11.5" y="15" width="9" height="8" rx="1.6" stroke={GLYPH} strokeWidth="1.5" fill="none" />
      <Path d="M13.5 15 L13.5 12.5 C13.5 10.8 14.6 9.5 16 9.5 C17.4 9.5 18.5 10.8 18.5 12.5 L18.5 15" stroke={GLYPH} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </>
  } />;
}
export function IconCheck(p: P) {
  return <U {...p} glyph={<Path d="M11.5 16 L14.5 19 L20.5 12.5" stroke={GLYPH} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />} />;
}
export function IconFire(p: P) {
  return <U {...p} glyph={<Path d="M16 9 C14.5 11.5 12.5 13 12.5 16 C12.5 18.5 14.3 20.7 16 22 C17.7 20.7 19.5 18.5 19.5 16 C19.5 13 17.5 11.5 16 9 Z" fill={GLYPH} />} />;
}
export function IconStar(p: P) {
  return <U {...p} glyph={<Polygon points="16,9 18,13.7 23,13.7 19,17 20.5,22 16,19 11.5,22 13,17 9,13.7 14,13.7" fill={GLYPH} />} />;
}
export function IconSettings(p: P) {
  return <U {...p} glyph={
    <>
      <Circle cx="16" cy="16" r="3" stroke={GLYPH} strokeWidth="1.6" fill="none" />
      <Path d="M16 10 L16 12 M16 20 L16 22 M10 16 L12 16 M20 16 L22 16" stroke={GLYPH} strokeWidth="1.6" strokeLinecap="round" />
    </>
  } />;
}
export function IconArrowRight(p: P) {
  return <U {...p} glyph={
    <>
      <Line x1="10" y1="16" x2="20" y2="16" stroke={GLYPH} strokeWidth="2.2" strokeLinecap="round" />
      <Path d="M16.5 12 L20.5 16 L16.5 20" stroke={GLYPH} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  } />;
}
export function IconArrowLeft(p: P) {
  return <U {...p} glyph={
    <>
      <Line x1="22" y1="16" x2="12" y2="16" stroke={GLYPH} strokeWidth="2.2" strokeLinecap="round" />
      <Path d="M15.5 12 L11.5 16 L15.5 20" stroke={GLYPH} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  } />;
}
export function IconInfo(p: P) {
  return <U {...p} glyph={
    <>
      <Line x1="16" y1="15" x2="16" y2="20.5" stroke={GLYPH} strokeWidth="2.2" strokeLinecap="round" />
      <Circle cx="16" cy="11.5" r="1.2" fill={GLYPH} />
    </>
  } />;
}
export function IconMap(p: P) {
  return <U {...p} glyph={
    <>
      <Polygon points="10,13 14,11 18,13 22,11 22,20 18,22 14,20 10,22" stroke={GLYPH} strokeWidth="1.4" fill="none" strokeLinejoin="round" />
      <Line x1="14" y1="11" x2="14" y2="20" stroke={GLYPH} strokeWidth="1.1" />
      <Line x1="18" y1="13" x2="18" y2="22" stroke={GLYPH} strokeWidth="1.1" />
    </>
  } />;
}
export function IconScroll(p: P) {
  return <U {...p} glyph={
    <>
      <Rect x="12" y="10" width="8" height="12" rx="1.4" stroke={GLYPH} strokeWidth="1.3" fill="none" />
      <Line x1="14" y1="14" x2="18" y2="14" stroke={GLYPH} strokeWidth="1.1" strokeLinecap="round" />
      <Line x1="14" y1="17" x2="18" y2="17" stroke={GLYPH} strokeWidth="1.1" strokeLinecap="round" />
    </>
  } />;
}
export function IconUser(p: P) {
  return <U {...p} glyph={
    <>
      <Circle cx="16" cy="13.5" r="3.2" stroke={GLYPH} strokeWidth="1.5" fill="none" />
      <Path d="M10.5 22 C10.5 18.7 12.9 16.5 16 16.5 C19.1 16.5 21.5 18.7 21.5 22" stroke={GLYPH} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </>
  } />;
}
export function IconTrendingUp(p: P) {
  return <U {...p} glyph={
    <>
      <Path d="M11 19 L15 15 L17.5 17.5 L21 14" stroke={GLYPH} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <Path d="M18.5 14 L21 14 L21 16.5" stroke={GLYPH} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  } />;
}
export function IconWarning(p: P) {
  return <U {...p} glyph={
    <>
      <Path d="M16 11 L21.5 21.5 L10.5 21.5 Z" stroke={GLYPH} strokeWidth="1.6" fill="none" strokeLinejoin="round" />
      <Line x1="16" y1="15.5" x2="16" y2="18.5" stroke={GLYPH} strokeWidth="1.8" strokeLinecap="round" />
      <Circle cx="16" cy="20.2" r="0.8" fill={GLYPH} />
    </>
  } />;
}
export function IconHome(p: P) {
  return <U {...p} glyph={<Path d="M11 16 L16 11.5 L21 16 L21 22 L18 22 L18 18 L14 18 L14 22 L11 22 Z" stroke={GLYPH} strokeWidth="1.5" fill="none" strokeLinejoin="round" />} />;
}
export function IconTrash(p: P) {
  return <U {...p} glyph={
    <>
      <Rect x="12" y="13.5" width="8" height="9" rx="1.2" stroke={GLYPH} strokeWidth="1.4" fill="none" />
      <Line x1="10.5" y1="13.5" x2="21.5" y2="13.5" stroke={GLYPH} strokeWidth="1.4" strokeLinecap="round" />
      <Line x1="14" y1="10.5" x2="18" y2="10.5" stroke={GLYPH} strokeWidth="1.4" strokeLinecap="round" />
    </>
  } />;
}
export function IconGavel(p: P) {
  return <U {...p} glyph={
    <>
      <Rect x="9.5" y="19" width="7" height="3.5" rx="1" fill={GLYPH} opacity={0.85} />
      <Line x1="13" y1="19" x2="20" y2="12" stroke={GLYPH} strokeWidth="2" strokeLinecap="round" />
      <Rect x="18" y="9" width="5.2" height="3.4" rx="1" fill={GLYPH} transform="rotate(45 20.6 10.7)" />
    </>
  } />;
}
export function IconVibration(p: P) {
  return <U {...p} glyph={
    <>
      <Rect x="13.5" y="10" width="5" height="12" rx="1.6" stroke={GLYPH} strokeWidth="1.4" fill="none" />
      <Line x1="9.5" y1="13" x2="11.3" y2="13" stroke={GLYPH} strokeWidth="1.4" strokeLinecap="round" />
      <Line x1="9.5" y1="16" x2="11.3" y2="16" stroke={GLYPH} strokeWidth="1.4" strokeLinecap="round" />
      <Line x1="20.7" y1="13" x2="22.5" y2="13" stroke={GLYPH} strokeWidth="1.4" strokeLinecap="round" />
      <Line x1="20.7" y1="16" x2="22.5" y2="16" stroke={GLYPH} strokeWidth="1.4" strokeLinecap="round" />
    </>
  } />;
}
export function IconSparkles(p: P) {
  return <U {...p} glyph={<Path d="M16 9 L16.9 13 L20.5 12.2 L18 15 L21.5 16.5 L18 18 L20.5 20.8 L16.9 20 L16 24 L15.1 20 L11.5 20.8 L14 18 L10.5 16.5 L14 15 L11.5 12.2 L15.1 13 Z" fill={GLYPH} />} />;
}
export function IconCheckCircle(p: P) {
  return <Medallion size={p.size ?? 44} base={p.color ?? "#2ECC8E"} glyph={
    <Path d="M11 16 L15.5 20.5 L21.5 12.5" stroke={GLYPH} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  } />;
}
export function IconBookOpen(p: P) {
  return <Medallion size={p.size ?? 32} base={p.color ?? "#D4962A"} glyph={
    <>
      <Path d="M9.5 11 C9.5 10.2 10.2 9.5 11 9.5 L16 9.5 L16 22 L11 22 C10.2 22 9.5 21.3 9.5 20.5 Z" stroke={GLYPH} strokeWidth="1.4" fill="none" />
      <Path d="M16 9.5 L21 9.5 C21.8 9.5 22.5 10.2 22.5 11 L22.5 20.5 C22.5 21.3 21.8 22 21 22 L16 22 Z" stroke={GLYPH} strokeWidth="1.4" fill="none" />
      <Line x1="11.5" y1="13" x2="14.5" y2="13" stroke={GLYPH} strokeWidth="1" strokeLinecap="round" />
      <Line x1="17.5" y1="13" x2="20.5" y2="13" stroke={GLYPH} strokeWidth="1" strokeLinecap="round" />
    </>
  } />;
}
export function IconSun(p: P) {
  return <Medallion size={p.size ?? 36} base={p.color ?? "#4A7EE8"} glyph={
    <>
      <Circle cx="16" cy="16" r="4" stroke={GLYPH} strokeWidth="1.8" fill="none" />
      <Line x1="16" y1="9.5" x2="16" y2="11" stroke={GLYPH} strokeWidth="1.8" strokeLinecap="round" />
      <Line x1="16" y1="21" x2="16" y2="22.5" stroke={GLYPH} strokeWidth="1.8" strokeLinecap="round" />
      <Line x1="9.5" y1="16" x2="11" y2="16" stroke={GLYPH} strokeWidth="1.8" strokeLinecap="round" />
      <Line x1="21" y1="16" x2="22.5" y2="16" stroke={GLYPH} strokeWidth="1.8" strokeLinecap="round" />
    </>
  } />;
}
export function IconDifficultyDot({ size = 22, level = 1 }: { size?: number; level?: 1 | 2 | 3 }) {
  const base = level === 1 ? "#2ECC8E" : level === 2 ? "#F5A623" : "#E84040";
  return <Medallion size={size} base={base} flat glyph={<Circle cx="16" cy="16" r="3.4" fill={GLYPH} />} />;
}