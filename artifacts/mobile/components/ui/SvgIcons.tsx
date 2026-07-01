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

const GLYPH = "#FFF8EC"; // warm off-white used for glyph strokes/fills on every medallion

/* --------------------------------- badges --------------------------------- */

export function BadgeIcon({ id, size = 44, color, rimColor }: { id: BadgeIconId; size?: number; color?: string; rimColor?: string }) {
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
    case "master_sleuth": return <SleuthGlass size={size} color={color ?? "#D4962A"} rimColor={rimColor} />;
    default: return <StarShield size={size} color={color ?? "#D4962A"} rimColor={rimColor} />;
  }
}

function CrossedSwords({ size, color }: P) {
  const base = color!;
  return (
    <Medallion size={size!} base={base} glyph={
      <>
        <Line x1="8" y1="8" x2="24" y2="24" stroke={GLYPH} strokeWidth="2.4" strokeLinecap="round" />
        <Polygon points="8,8 5.6,4.8 10.4,6 8.9,10.8" fill={GLYPH} />
        <Line x1="24" y1="8" x2="8" y2="24" stroke={GLYPH} strokeWidth="2.4" strokeLinecap="round" />
        <Polygon points="24,8 26.4,4.8 21.6,6 23.1,10.8" fill={GLYPH} />
        <Circle cx="16" cy="16" r="2.1" fill={darken(base, 30)} stroke={GLYPH} strokeWidth="0.8" />
        <Circle cx="16" cy="16" r="1" fill="#E84040" />
      </>
    } />
  );
}

function BrokenBrother({ size, color }: P) {
  const base = color!;
  return (
    <Medallion size={size!} base={base} glyph={
      <>
        <Circle cx="10.5" cy="10.5" r="3.1" stroke={GLYPH} strokeWidth="1.9" fill="none" />
        <Circle cx="21.5" cy="21.5" r="3.1" stroke={GLYPH} strokeWidth="1.9" fill="none" />
        <Line x1="13.3" y1="13.3" x2="15.2" y2="15.2" stroke={GLYPH} strokeWidth="2.4" strokeLinecap="round" />
        <Line x1="16.8" y1="16.8" x2="18.7" y2="18.7" stroke={GLYPH} strokeWidth="2.4" strokeLinecap="round" />
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
          d="M17 26 C11 26 7.5 22.5 7.5 18.8 C7.5 15.3 11 13.4 14.5 15.2 C18 17 21.5 15.2 21.5 11.7 C21.5 8.8 18.5 7 16.7 8.9 C15.2 10.5 16.8 12.5 16.8 12.5"
          stroke={GLYPH} strokeWidth="2.5" strokeLinecap="round" fill="none"
        />
        <Circle cx="16.9" cy="8" r="2.4" fill={GLYPH} />
        <Circle cx="16.1" cy="7.4" r="0.7" fill={darken(base, 30)} />
        <Path d="M18.9 7.6 L21 6.6 L19.6 8.6 Z" fill={GLYPH} />
      </>
    } />
  );
}

function RainbowCoat({ size, color }: P) {
  const base = color!;
  return (
    <Medallion size={size!} base={base} glyph={
      <>
        <Path d="M16 7 L10 12 L8.2 24 L23.8 24 L22 12 Z" fill="none" stroke={GLYPH} strokeWidth="1.6" />
        <Rect x="10.7" y="13.8" width="10.6" height="2.1" fill="#FFD27A" opacity={0.95} />
        <Rect x="10.7" y="17.2" width="10.6" height="2.1" fill="#FF9F7A" opacity={0.95} />
        <Rect x="10.7" y="20.6" width="10.6" height="2.1" fill="#8FE0B0" opacity={0.95} />
        <Circle cx="16" cy="7" r="1.7" fill={GLYPH} />
      </>
    } />
  );
}

function ChainBroken({ size, color }: P) {
  const base = color!;
  return (
    <Medallion size={size!} base={base} glyph={
      <>
        <Rect x="6.5" y="12.5" width="7.4" height="7" rx="3.5" stroke={GLYPH} strokeWidth="2" fill="none" />
        <Rect x="18.1" y="12.5" width="7.4" height="7" rx="3.5" stroke={GLYPH} strokeWidth="2" fill="none" />
        <Line x1="13.9" y1="16" x2="18.1" y2="16" stroke={GLYPH} strokeWidth="2.4" strokeLinecap="round" strokeDasharray="1.8,1.8" />
      </>
    } />
  );
}

function Crown({ size, color }: P) {
  const base = color!;
  return (
    <Medallion size={size!} base={base} glyph={
      <>
        <Path d="M7.5 22 L7.5 13.5 L12.2 18.2 L16 7.5 L19.8 18.2 L24.5 13.5 L24.5 22 Z" fill={GLYPH} />
        <Rect x="7.5" y="22" width="17" height="2.8" rx="1.3" fill={GLYPH} />
        <Circle cx="16" cy="7.5" r="1.6" fill={darken(base, 25)} />
      </>
    } />
  );
}

function DoveCross({ size, color }: P) {
  const base = color!;
  return (
    <Medallion size={size!} base={base} glyph={
      <>
        <Line x1="16" y1="7.5" x2="16" y2="24.5" stroke={GLYPH} strokeWidth="2.3" strokeLinecap="round" />
        <Line x1="9.5" y1="13.5" x2="22.5" y2="13.5" stroke={GLYPH} strokeWidth="2.3" strokeLinecap="round" />
        <Path d="M18.8 11.2 C20.6 9.3 23.6 9.3 23.6 11.7 C23.6 13.5 21.8 14.4 20 14.1 Z" fill={GLYPH} />
        <Circle cx="22.4" cy="10.5" r="0.55" fill={darken(base, 30)} />
      </>
    } />
  );
}

function MagnifyGlass({ size, color }: P) {
  const base = color!;
  return (
    <Medallion size={size!} base={base} glyph={
      <>
        <Circle cx="13.5" cy="13.5" r="6.8" stroke={GLYPH} strokeWidth="2.6" fill="none" />
        <Line x1="18.3" y1="18.3" x2="24.5" y2="24.5" stroke={GLYPH} strokeWidth="2.8" strokeLinecap="round" />
      </>
    } />
  );
}

function Flame({ size, color }: P) {
  const base = color!;
  return (
    <Medallion size={size!} base={base} glyph={
      <>
        <Path d="M16 6.5 C14 10 11 11.8 11 16 C11 19.6 13.5 22.6 16 25 C18.5 22.6 21 19.6 21 16 C21 11.8 18 10 16 6.5 Z" fill={GLYPH} />
        <Path d="M16 13.8 C15 15.6 13.5 16.6 13.5 19 C13.5 20.8 14.7 22 16 23.2 C17.3 22 18.5 20.8 18.5 19 C18.5 16.6 17 15.6 16 13.8 Z" fill={darken(base, 10)} />
      </>
    } />
  );
}

function Scroll({ size, color }: P) {
  const base = color!;
  return (
    <Medallion size={size!} base={base} glyph={
      <>
        <Rect x="9" y="9" width="14" height="15" rx="2.2" fill="none" stroke={GLYPH} strokeWidth="1.8" />
        <Rect x="7.3" y="7.8" width="4.4" height="15" rx="2.2" fill="none" stroke={GLYPH} strokeWidth="1.6" />
        <Rect x="20.3" y="7.8" width="4.4" height="15" rx="2.2" fill="none" stroke={GLYPH} strokeWidth="1.6" />
        <Line x1="12.2" y1="13.2" x2="19.8" y2="13.2" stroke={GLYPH} strokeWidth="1.3" strokeLinecap="round" />
        <Line x1="12.2" y1="16.5" x2="19.8" y2="16.5" stroke={GLYPH} strokeWidth="1.3" strokeLinecap="round" />
        <Line x1="12.2" y1="19.8" x2="17.5" y2="19.8" stroke={GLYPH} strokeWidth="1.3" strokeLinecap="round" />
      </>
    } />
  );
}

function Scales({ size, color }: P) {
  const base = color!;
  return (
    <Medallion size={size!} base={base} glyph={
      <>
        <Line x1="16" y1="7.5" x2="16" y2="24.5" stroke={GLYPH} strokeWidth="2.3" strokeLinecap="round" />
        <Line x1="8.5" y1="11" x2="23.5" y2="11" stroke={GLYPH} strokeWidth="2.3" strokeLinecap="round" />
        <Path d="M6.5 11 C6.5 15.5 9.5 17.2 12 17.2 C14.5 17.2 17 15.5 17 11" fill="none" stroke={GLYPH} strokeWidth="1.4" />
        <Path d="M15 11 C15 15.5 17.5 17.2 20 17.2 C22.5 17.2 25.5 15.5 25.5 11" fill="none" stroke={GLYPH} strokeWidth="1.4" />
        <Rect x="12.8" y="23.2" width="6.4" height="2.1" rx="1" fill={GLYPH} />
      </>
    } />
  );
}

function StarShield({ size, color }: P) {
  const base = color!;
  return (
    <Medallion size={size!} base={base} glyph={
      <Polygon
        points="16,7.5 18,13 24,13 19.2,16.8 21,23 16,19.2 11,23 12.8,16.8 8,13 14,13"
        fill={GLYPH}
      />
    } />
  );
}

/** "Master Sleuth" = top detective: magnifying glass overlaid on a five-point
 * star, so it reads as both "investigation" and "top rank" at a glance. */
function SleuthGlass({ size, color }: P) {
  const base = color!;
  return (
    <Medallion size={size!} base={base} glyph={
      <>
        <Polygon
          points="15.5,6.5 17.3,11.2 22.3,11.2 18.3,14.4 19.8,19.5 15.5,16.5 11.2,19.5 12.7,14.4 8.7,11.2 13.7,11.2"
          fill={GLYPH} opacity={0.9}
        />
        <Circle cx="14.5" cy="16.5" r="5.4" fill={darken(base, 22)} stroke={GLYPH} strokeWidth="2.2" />
        <Line x1="18.3" y1="20.3" x2="23.5" y2="25.5" stroke={GLYPH} strokeWidth="2.6" strokeLinecap="round" />
      </>
    } />
  );
}

/* ---------------------------------- ranks ---------------------------------- */

export function RankIcon({ id, size = 40, color }: { id: RankIconId; size?: number; color?: string; rimColor?: string }) {
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
      <Circle cx="13.5" cy="13.5" r="6.8" stroke={GLYPH} strokeWidth="2.4" fill="none" />
      <Line x1="18.3" y1="18.3" x2="24.5" y2="24.5" stroke={GLYPH} strokeWidth="2.8" strokeLinecap="round" />
    </>
  } />;
}
function ClipboardBadge({ size, color }: P) {
  return <Medallion size={size!} base={color!} glyph={
    <>
      <Rect x="9.5" y="9.5" width="12" height="14.5" rx="2.2" stroke={GLYPH} strokeWidth="1.9" fill="none" />
      <Rect x="12.5" y="7" width="6" height="4.2" rx="1.4" stroke={GLYPH} strokeWidth="1.5" fill="none" />
      <Line x1="12" y1="15.5" x2="19.5" y2="15.5" stroke={GLYPH} strokeWidth="1.5" strokeLinecap="round" />
      <Line x1="12" y1="19" x2="19.5" y2="19" stroke={GLYPH} strokeWidth="1.5" strokeLinecap="round" />
    </>
  } />;
}
function FieldShield({ size, color }: P) {
  return <Medallion size={size!} base={color!} glyph={
    <Path d="M16 7 L23 10 L23 17.5 C23 21.3 19.8 24.5 16 25.8 C12.2 24.5 9 21.3 9 17.5 L9 10 Z" stroke={GLYPH} strokeWidth="2.1" fill="none" />
  } />;
}
function ScalesSmall({ size, color }: P) {
  return <Medallion size={size!} base={color!} glyph={
    <>
      <Line x1="16" y1="7.5" x2="16" y2="24.5" stroke={GLYPH} strokeWidth="2.3" strokeLinecap="round" />
      <Line x1="9" y1="11" x2="23" y2="11" stroke={GLYPH} strokeWidth="2.3" strokeLinecap="round" />
      <Rect x="12.8" y="23.2" width="6.4" height="2.1" rx="1" fill={GLYPH} />
    </>
  } />;
}
function Pillar({ size, color }: P) {
  return <Medallion size={size!} base={color!} glyph={
    <>
      <Rect x="11.5" y="8.5" width="9" height="14" stroke={GLYPH} strokeWidth="1.7" fill="none" />
      <Rect x="9.5" y="6" width="13" height="2.8" rx="1.2" fill={GLYPH} opacity={0.9} />
      <Rect x="9.5" y="23" width="13" height="2.8" rx="1.2" fill={GLYPH} opacity={0.9} />
    </>
  } />;
}
function StarBadge({ size, color }: P) {
  return <Medallion size={size!} base={color!} glyph={
    <Polygon points="16,6.5 18.5,12.3 25,12.9 20.1,17.1 21.5,23.5 16,20.2 10.5,23.5 11.9,17.1 7,12.9 13.5,12.3" fill={GLYPH} />
  } />;
}
function MasterCrown({ size, color }: P) {
  return <Medallion size={size!} base={color!} glyph={
    <>
      <Path d="M7.5 22 L7.5 12 L11.8 17 L16 6.5 L20.2 17 L24.5 12 L24.5 22 Z" fill={GLYPH} />
      <Rect x="7.5" y="22" width="17" height="2.6" rx="1.2" fill={GLYPH} />
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