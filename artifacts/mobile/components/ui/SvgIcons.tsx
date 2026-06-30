import React from "react";
import Svg, {
  Path, Circle, G, Rect, Line, Polygon, Ellipse, Defs, LinearGradient as SvgGrad, Stop, ClipPath,
} from "react-native-svg";

export type BadgeIconId =
  | "first_blood" | "brotherhood_broken" | "deception_master" | "coat_of_colors"
  | "broken_chains" | "wisdoms_crown" | "gethsemane_witness" | "truth_seeker"
  | "on_fire" | "scripture_keeper" | "just_judge" | "master_sleuth";

export type RankIconId =
  | "rookie" | "junior" | "field" | "senior" | "lead" | "chief" | "master";

type P = { size?: number; color?: string; rimColor?: string };

export function BadgeIcon({ id, size = 32, color, rimColor }: { id: BadgeIconId; size?: number; color?: string; rimColor?: string }) {
  switch (id) {
    case "first_blood": return <CrossedSwords size={size} color={color ?? "#E84040"} rimColor={rimColor ?? "#8B1A2C"} />;
    case "brotherhood_broken": return <BrokenBrother size={size} color={color ?? "#C84040"} rimColor={rimColor ?? "#8B3A3A"} />;
    case "deception_master": return <Snake size={size} color={color ?? "#3A8B3A"} rimColor={rimColor ?? "#2A6A2A"} />;
    case "coat_of_colors": return <RainbowCoat size={size} color={color ?? "#7B68EE"} rimColor={rimColor ?? "#5A48C8"} />;
    case "broken_chains": return <ChainBroken size={size} color={color ?? "#4A8BC8"} rimColor={rimColor ?? "#3A6890"} />;
    case "wisdoms_crown": return <Crown size={size} color={color ?? "#C89030"} rimColor={rimColor ?? "#A06020"} />;
    case "gethsemane_witness": return <DoveCross size={size} color={color ?? "#8888D8"} rimColor={rimColor ?? "#6060B8"} />;
    case "truth_seeker": return <MagnifyGlass size={size} color={color ?? "#A060C8"} rimColor={rimColor ?? "#7840B8"} />;
    case "on_fire": return <Flame size={size} color={color ?? "#E87020"} rimColor={rimColor ?? "#C86820"} />;
    case "scripture_keeper": return <Scroll size={size} color={color ?? "#C0A020"} rimColor={rimColor ?? "#907800"} />;
    case "just_judge": return <Scales size={size} color={color ?? "#A030D0"} rimColor={rimColor ?? "#9020C0"} />;
    case "master_sleuth": return <StarShield size={size} color={color ?? "#D4962A"} rimColor={rimColor ?? "#D4962A"} />;
    default: return <StarShield size={size} color={color ?? "#D4962A"} rimColor={rimColor ?? "#D4962A"} />;
  }
}

export function RankIcon({ id, size = 32, color, rimColor }: { id: RankIconId; size?: number; color?: string; rimColor?: string }) {
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

function CrossedSwords({ size, color, rimColor }: P) {
  const s = size!;
  return (
    <Svg width={s} height={s} viewBox="0 0 32 32">
      <G opacity={1}>
        <Line x1="5" y1="5" x2="27" y2="27" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <Polygon points="5,5 3,2 8,3 7,8" fill={color} />
        <Rect x="23" y="25" width="6" height="3" rx="1.5" fill={rimColor} />
        <Line x1="27" y1="5" x2="5" y2="27" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <Polygon points="27,5 29,2 24,3 25,8" fill={color} />
        <Rect x="3" y="25" width="6" height="3" rx="1.5" fill={rimColor} />
        <Circle cx="16" cy="16" r="2.5" fill={rimColor} />
      </G>
    </Svg>
  );
}

function BrokenBrother({ size, color, rimColor }: P) {
  const s = size!;
  return (
    <Svg width={s} height={s} viewBox="0 0 32 32">
      <G>
        <Path d="M8 8 C8 5 12 4 14 6 L16 8" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <Path d="M24 24 C24 27 20 28 18 26 L16 24" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <Path d="M9 14 L7 12 C5 10 6 7 8 7" stroke={rimColor} strokeWidth="2" strokeLinecap="round" fill="none" />
        <Path d="M23 18 L25 20 C27 22 26 25 24 25" stroke={rimColor} strokeWidth="2" strokeLinecap="round" fill="none" />
        <Line x1="14" y1="8" x2="18" y2="24" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <Circle cx="10" cy="9" r="3" stroke={color} strokeWidth="2" fill="none" />
        <Circle cx="22" cy="23" r="3" stroke={color} strokeWidth="2" fill="none" />
        <Line x1="15" y1="15" x2="17" y2="17" stroke={rimColor} strokeWidth="3" strokeLinecap="round" />
      </G>
    </Svg>
  );
}

function Snake({ size, color, rimColor }: P) {
  const s = size!;
  return (
    <Svg width={s} height={s} viewBox="0 0 32 32">
      <G>
        <Path
          d="M16 28 C10 28 6 24 6 20 C6 16 10 14 14 16 C18 18 22 16 22 12 C22 8 18 6 16 8 C14 10 16 13 16 13"
          stroke={color} strokeWidth="2.8" strokeLinecap="round" fill="none"
        />
        <Path d="M16 6 L14 4 M16 6 L18 4" stroke={rimColor} strokeWidth="2" strokeLinecap="round" />
        <Circle cx="16" cy="6" r="2.5" fill={color} />
        <Circle cx="14.8" cy="5.2" r="0.8" fill={rimColor} />
        <Circle cx="17.2" cy="5.2" r="0.8" fill={rimColor} />
      </G>
    </Svg>
  );
}

function RainbowCoat({ size, color, rimColor }: P) {
  const s = size!;
  return (
    <Svg width={s} height={s} viewBox="0 0 32 32">
      <G>
        <Path d="M16 4 L8 10 L6 28 L26 28 L24 10 Z" fill="none" stroke={color} strokeWidth="2" />
        <Rect x="9" y="12" width="14" height="3" rx="1" fill="#E84040" opacity={0.8} />
        <Rect x="9" y="16" width="14" height="3" rx="1" fill="#F5A623" opacity={0.8} />
        <Rect x="9" y="20" width="14" height="3" rx="1" fill={color} opacity={0.8} />
        <Rect x="9" y="24" width="14" height="3" rx="1" fill="#2ECC8E" opacity={0.8} />
        <Path d="M16 4 L10 8 L8 10" stroke={rimColor} strokeWidth="2" strokeLinecap="round" fill="none" />
        <Path d="M16 4 L22 8 L24 10" stroke={rimColor} strokeWidth="2" strokeLinecap="round" fill="none" />
        <Circle cx="16" cy="4" r="2" fill={rimColor} />
      </G>
    </Svg>
  );
}

function ChainBroken({ size, color, rimColor }: P) {
  const s = size!;
  return (
    <Svg width={s} height={s} viewBox="0 0 32 32">
      <G>
        <Rect x="4" y="12" width="9" height="8" rx="4" stroke={color} strokeWidth="2.5" fill="none" />
        <Rect x="19" y="12" width="9" height="8" rx="4" stroke={color} strokeWidth="2.5" fill="none" />
        <Line x1="13" y1="16" x2="15" y2="14" stroke={rimColor} strokeWidth="3" strokeLinecap="round" />
        <Line x1="17" y1="18" x2="19" y2="16" stroke={rimColor} strokeWidth="3" strokeLinecap="round" />
        <Line x1="15" y1="8" x2="15" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <Line x1="17" y1="20" x2="17" y2="24" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </G>
    </Svg>
  );
}

function Crown({ size, color, rimColor }: P) {
  const s = size!;
  return (
    <Svg width={s} height={s} viewBox="0 0 32 32">
      <G>
        <Path d="M4 24 L4 14 L10 20 L16 6 L22 20 L28 14 L28 24 Z" fill={color} stroke={rimColor} strokeWidth="1.5" />
        <Rect x="4" y="24" width="24" height="4" rx="2" fill={rimColor} />
        <Circle cx="16" cy="6" r="2.5" fill={rimColor} />
        <Circle cx="4" cy="14" r="2" fill={rimColor} />
        <Circle cx="28" cy="14" r="2" fill={rimColor} />
        <Circle cx="16" cy="19" r="2" fill={rimColor} />
        <Circle cx="10" cy="20" r="1.5" fill={rimColor} />
        <Circle cx="22" cy="20" r="1.5" fill={rimColor} />
      </G>
    </Svg>
  );
}

function DoveCross({ size, color, rimColor }: P) {
  const s = size!;
  return (
    <Svg width={s} height={s} viewBox="0 0 32 32">
      <G>
        <Line x1="16" y1="6" x2="16" y2="26" stroke={rimColor} strokeWidth="2.5" strokeLinecap="round" />
        <Line x1="8" y1="14" x2="24" y2="14" stroke={rimColor} strokeWidth="2.5" strokeLinecap="round" />
        <Path
          d="M20 10 C22 8 26 8 26 11 C26 13 24 14 22 14 L20 12 Z"
          fill={color} stroke={color} strokeWidth="1"
        />
        <Path d="M20 12 L20 9 C20 7 18 6 16 7" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <Path d="M22 14 C23 17 21 20 18 20 L16 18" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <Path d="M16 18 L14 20 L16 22" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </G>
    </Svg>
  );
}

function MagnifyGlass({ size, color, rimColor }: P) {
  const s = size!;
  return (
    <Svg width={s} height={s} viewBox="0 0 32 32">
      <G>
        <Circle cx="13" cy="13" r="9" stroke={color} strokeWidth="3" fill="none" />
        <Circle cx="13" cy="13" r="5" stroke={rimColor} strokeWidth="1.5" fill="none" />
        <Line x1="19.5" y1="19.5" x2="27" y2="27" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      </G>
    </Svg>
  );
}

function Flame({ size, color, rimColor }: P) {
  const s = size!;
  return (
    <Svg width={s} height={s} viewBox="0 0 32 32">
      <G>
        <Path
          d="M16 4 C14 8 10 10 10 15 C10 20 13 24 16 28 C19 24 22 20 22 15 C22 10 18 8 16 4 Z"
          fill={color} stroke={rimColor} strokeWidth="1.5"
        />
        <Path
          d="M16 14 C15 16 13 17 13 20 C13 22.5 14.5 24 16 26 C17.5 24 19 22.5 19 20 C19 17 17 16 16 14 Z"
          fill={rimColor}
        />
        <Path
          d="M16 4 C17 6 19 7 21 8 C20 10 20 12 20 14"
          stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity={0.5}
        />
      </G>
    </Svg>
  );
}

function Scroll({ size, color, rimColor }: P) {
  const s = size!;
  return (
    <Svg width={s} height={s} viewBox="0 0 32 32">
      <G>
        <Rect x="7" y="7" width="18" height="22" rx="3" fill="none" stroke={color} strokeWidth="2" />
        <Rect x="5" y="5" width="8" height="22" rx="4" fill="none" stroke={rimColor} strokeWidth="2" />
        <Rect x="19" y="5" width="8" height="22" rx="4" fill="none" stroke={rimColor} strokeWidth="2" />
        <Line x1="11" y1="12" x2="21" y2="12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <Line x1="11" y1="16" x2="21" y2="16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <Line x1="11" y1="20" x2="17" y2="20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      </G>
    </Svg>
  );
}

function Scales({ size, color, rimColor }: P) {
  const s = size!;
  return (
    <Svg width={s} height={s} viewBox="0 0 32 32">
      <G>
        <Line x1="16" y1="6" x2="16" y2="28" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <Line x1="8" y1="10" x2="24" y2="10" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <Line x1="8" y1="10" x2="6" y2="18" stroke={rimColor} strokeWidth="2" strokeLinecap="round" />
        <Line x1="24" y1="10" x2="26" y2="18" stroke={rimColor} strokeWidth="2" strokeLinecap="round" />
        <Path d="M4 18 C4 16 6 16 6 18 C6 21 8 22 10 22 C12 22 14 21 14 18 C14 16 16 16 16 18" fill="none" stroke={rimColor} strokeWidth="1.5" />
        <Path d="M16 18 C16 16 18 16 18 18 C18 21 20 22 22 22 C24 22 26 21 26 18 C26 16 28 16 28 18" fill="none" stroke={rimColor} strokeWidth="1.5" />
        <Rect x="12" y="26" width="8" height="3" rx="1.5" fill={color} />
        <Circle cx="16" cy="6" r="2" fill={rimColor} />
      </G>
    </Svg>
  );
}

function StarShield({ size, color, rimColor }: P) {
  const s = size!;
  return (
    <Svg width={s} height={s} viewBox="0 0 32 32">
      <G>
        <Path d="M16 3 L26 7 L26 17 C26 23 21 28 16 30 C11 28 6 23 6 17 L6 7 Z" fill="none" stroke={color} strokeWidth="2.5" />
        <Polygon
          points="16,10 17.5,14 22,14 18.5,17 19.8,22 16,19.5 12.2,22 13.5,17 10,14 14.5,14"
          fill={color}
        />
      </G>
    </Svg>
  );
}

function MagnifySimple({ size, color }: P) {
  const s = size!;
  return (
    <Svg width={s} height={s} viewBox="0 0 32 32">
      <G>
        <Circle cx="13" cy="13" r="8" stroke={color} strokeWidth="3" fill="none" />
        <Line x1="19" y1="19" x2="27" y2="27" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
        <Circle cx="11" cy="11" r="3" stroke={color} strokeWidth="1.5" fill="none" opacity={0.5} />
      </G>
    </Svg>
  );
}

function ClipboardBadge({ size, color }: P) {
  const s = size!;
  return (
    <Svg width={s} height={s} viewBox="0 0 32 32">
      <G>
        <Rect x="7" y="9" width="18" height="20" rx="3" stroke={color} strokeWidth="2.5" fill="none" />
        <Rect x="12" y="6" width="8" height="6" rx="2" stroke={color} strokeWidth="2" fill="none" />
        <Line x1="11" y1="16" x2="21" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <Line x1="11" y1="20" x2="21" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <Line x1="11" y1="24" x2="17" y2="24" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </G>
    </Svg>
  );
}

function FieldShield({ size, color }: P) {
  const s = size!;
  return (
    <Svg width={s} height={s} viewBox="0 0 32 32">
      <G>
        <Path d="M16 3 L28 8 L28 18 C28 24 22 29 16 31 C10 29 4 24 4 18 L4 8 Z" stroke={color} strokeWidth="2.5" fill="none" />
        <Line x1="16" y1="11" x2="16" y2="22" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <Line x1="11" y1="16" x2="22" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <Circle cx="12" cy="12" r="2" stroke={color} strokeWidth="1.5" fill="none" />
      </G>
    </Svg>
  );
}

function ScalesSmall({ size, color }: P) {
  const s = size!;
  return (
    <Svg width={s} height={s} viewBox="0 0 32 32">
      <G>
        <Line x1="16" y1="5" x2="16" y2="28" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <Line x1="7" y1="10" x2="25" y2="10" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <Path d="M5 10 L3 19 C3 22 7 23 10 23 C13 23 16 22 16 19 L14 10" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
        <Path d="M27 10 L29 19 C29 22 25 23 22 23 C19 23 16 22 16 19 L18 10" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
        <Rect x="12" y="26" width="8" height="3" rx="1.5" fill={color} />
      </G>
    </Svg>
  );
}

function Pillar({ size, color }: P) {
  const s = size!;
  return (
    <Svg width={s} height={s} viewBox="0 0 32 32">
      <G>
        <Rect x="10" y="7" width="12" height="19" rx="1" stroke={color} strokeWidth="2" fill="none" />
        <Rect x="7" y="5" width="18" height="4" rx="2" fill={color} opacity={0.7} />
        <Rect x="7" y="24" width="18" height="4" rx="2" fill={color} opacity={0.7} />
        <Line x1="13" y1="9" x2="13" y2="25" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity={0.5} />
        <Line x1="16" y1="9" x2="16" y2="25" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity={0.3} />
        <Line x1="19" y1="9" x2="19" y2="25" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity={0.5} />
      </G>
    </Svg>
  );
}

function StarBadge({ size, color }: P) {
  const s = size!;
  return (
    <Svg width={s} height={s} viewBox="0 0 32 32">
      <G>
        <Path d="M16 4 L20 12 L29 13 L23 19 L25 28 L16 23 L7 28 L9 19 L3 13 L12 12 Z" stroke={color} strokeWidth="2.5" fill="none" />
        <Circle cx="16" cy="17" r="4" fill={color} opacity={0.6} />
      </G>
    </Svg>
  );
}

function MasterCrown({ size, color }: P) {
  const s = size!;
  return (
    <Svg width={s} height={s} viewBox="0 0 32 32">
      <G>
        <Path d="M4 24 L4 12 L10 19 L16 5 L22 19 L28 12 L28 24 Z" stroke={color} strokeWidth="2.5" fill="none" />
        <Rect x="4" y="24" width="24" height="4" rx="2" stroke={color} strokeWidth="2" fill="none" />
        <Circle cx="16" cy="5" r="2.5" fill={color} />
        <Circle cx="4" cy="12" r="2" fill={color} />
        <Circle cx="28" cy="12" r="2" fill={color} />
        <Circle cx="10" cy="19" r="1.5" fill={color} opacity={0.6} />
        <Circle cx="22" cy="19" r="1.5" fill={color} opacity={0.6} />
        <Circle cx="16" cy="24" r="2" fill={color} opacity={0.4} />
        <Line x1="9" y1="26" x2="23" y2="26" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity={0.5} />
      </G>
    </Svg>
  );
}

export function IconFolder({ size = 22, color = "#D4962A" }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M3 8 C3 6 4 5 6 5 L10 5 L12 7 L18 7 C20 7 21 8 21 10 L21 18 C21 20 20 21 18 21 L6 21 C4 21 3 20 3 18 Z" stroke={color} strokeWidth="1.8" fill="none" strokeLinejoin="round" />
    </Svg>
  );
}

export function IconAward({ size = 22, color = "#D4962A" }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx="12" cy="9" r="6" stroke={color} strokeWidth="1.8" fill="none" />
      <Path d="M8 14 L5 22 L12 19 L19 22 L16 14" stroke={color} strokeWidth="1.8" fill="none" strokeLinejoin="round" />
    </Svg>
  );
}

export function IconZap({ size = 22, color = "#D4962A" }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M13 2 L4 14 L12 14 L11 22 L20 10 L12 10 Z" stroke={color} strokeWidth="1.8" fill="none" strokeLinejoin="round" />
    </Svg>
  );
}

export function IconShield({ size = 22, color = "#D4962A" }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M12 2 L20 6 L20 13 C20 17.5 16.5 21.5 12 23 C7.5 21.5 4 17.5 4 13 L4 6 Z" stroke={color} strokeWidth="1.8" fill="none" strokeLinejoin="round" />
    </Svg>
  );
}

export function IconPlayCircle({ size = 22, color = "#D4962A" }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.8" fill="none" />
      <Polygon points="10,8 18,12 10,16" fill={color} />
    </Svg>
  );
}

export function IconCoin({ size = 16, color = "#D4962A" }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill="none" />
      <Circle cx="12" cy="12" r="5" stroke={color} strokeWidth="1.5" fill="none" opacity={0.5} />
      <Line x1="12" y1="8" x2="12" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

export function IconClock({ size = 22, color = "#D4962A" }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill="none" />
      <Line x1="12" y1="7" x2="12" y2="12" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <Line x1="12" y1="12" x2="16" y2="15" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </Svg>
  );
}

export function IconHeart({ size = 22, color = "#9B59B6" }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M12 21 C12 21 3 14 3 8 C3 5 5.5 3 8 3 C10 3 12 5 12 5 C12 5 14 3 16 3 C18.5 3 21 5 21 8 C21 14 12 21 12 21 Z" stroke={color} strokeWidth="2" fill="none" />
    </Svg>
  );
}

export function IconCalendar({ size = 22, color = "#2ECC8E" }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect x="3" y="4" width="18" height="18" rx="3" stroke={color} strokeWidth="2" fill="none" />
      <Line x1="3" y1="10" x2="21" y2="10" stroke={color} strokeWidth="2" />
      <Line x1="8" y1="2" x2="8" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Line x1="16" y1="2" x2="16" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

export function IconUsers({ size = 22, color = "#F5A623" }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx="9" cy="8" r="4" stroke={color} strokeWidth="2" fill="none" />
      <Path d="M2 20 C2 16 5 14 9 14 C13 14 16 16 16 20" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
      <Circle cx="18" cy="8" r="3" stroke={color} strokeWidth="1.5" fill="none" />
      <Path d="M16 20 C16 17 17.5 15.5 20 15" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </Svg>
  );
}

export function IconBook({ size = 22, color = "#D4962A" }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M4 4 C4 3 5 2 6 2 L19 2 C20 2 21 3 21 4 L21 20 C21 21 20 22 19 22 L6 22 C5 22 4 21 4 20 Z" stroke={color} strokeWidth="1.8" fill="none" />
      <Line x1="4" y1="6" x2="21" y2="6" stroke={color} strokeWidth="1.5" />
      <Line x1="8" y1="10" x2="17" y2="10" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <Line x1="8" y1="14" x2="17" y2="14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <Line x1="8" y1="18" x2="13" y2="18" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  );
}

export function IconLock({ size = 20, color = "#7A85A3" }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect x="5" y="11" width="14" height="12" rx="2" stroke={color} strokeWidth="2" fill="none" />
      <Path d="M8 11 L8 7 C8 4.5 10 3 12 3 C14 3 16 4.5 16 7 L16 11" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
      <Circle cx="12" cy="17" r="2" fill={color} opacity={0.6} />
    </Svg>
  );
}

export function IconCheck({ size = 20, color = "#2ECC8E" }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill="none" />
      <Path d="M7 12 L10 15 L17 8" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

export function IconFire({ size = 18, color = "#F5A623" }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12 2 C10 6 7 8 7 13 C7 17 9.5 20 12 22 C14.5 20 17 17 17 13 C17 8 14 6 12 2 Z"
        stroke={color} strokeWidth="1.8" fill="none"
      />
      <Path
        d="M12 11 C11 13 10 14 10 17 C10 19 11 20.5 12 22 C13 20.5 14 19 14 17 C14 14 13 13 12 11 Z"
        fill={color} opacity={0.5}
      />
    </Svg>
  );
}

export function IconStar({ size = 20, color = "#D4962A" }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" stroke={color} strokeWidth="1.8" fill="none" />
    </Svg>
  );
}

export function IconSettings({ size = 20, color = "#7A85A3" }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx="12" cy="12" r="3.5" stroke={color} strokeWidth="2" fill="none" />
      <Path d="M12 2 L12 5 M12 19 L12 22 M2 12 L5 12 M19 12 L22 12 M4.9 4.9 L7.1 7.1 M16.9 16.9 L19.1 19.1 M4.9 19.1 L7.1 16.9 M16.9 7.1 L19.1 4.9" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

export function IconArrowRight({ size = 18, color = "#D4962A" }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M5 12 L19 12" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <Path d="M13 6 L19 12 L13 18" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

export function IconArrowLeft({ size = 18, color = "#D4962A" }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M19 12 L5 12" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <Path d="M11 6 L5 12 L11 18" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

export function IconInfo({ size = 18, color = "#4A7EE8" }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill="none" />
      <Line x1="12" y1="11" x2="12" y2="17" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <Circle cx="12" cy="7.5" r="1.2" fill={color} />
    </Svg>
  );
}

export function IconMap({ size = 22, color = "#4A7EE8" }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Polygon points="3,7 9,4 15,7 21,4 21,17 15,20 9,17 3,20" stroke={color} strokeWidth="1.8" fill="none" strokeLinejoin="round" />
      <Line x1="9" y1="4" x2="9" y2="17" stroke={color} strokeWidth="1.5" />
      <Line x1="15" y1="7" x2="15" y2="20" stroke={color} strokeWidth="1.5" />
    </Svg>
  );
}

export function IconScroll({ size = 22, color = "#9B59B6" }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect x="6" y="5" width="12" height="17" rx="2" stroke={color} strokeWidth="1.8" fill="none" />
      <Rect x="4" y="4" width="6" height="17" rx="3" stroke={color} strokeWidth="1.5" fill="none" />
      <Rect x="14" y="4" width="6" height="17" rx="3" stroke={color} strokeWidth="1.5" fill="none" />
      <Line x1="9" y1="9" x2="15" y2="9" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <Line x1="9" y1="12" x2="15" y2="12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  );
}

export function IconUser({ size = 22, color = "#9B59B6" }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx="12" cy="8" r="5" stroke={color} strokeWidth="2" fill="none" />
      <Path d="M3 21 C3 17 7 14 12 14 C17 14 21 17 21 21" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
    </Svg>
  );
}

export function IconTrendingUp({ size = 18, color = "#2ECC8E" }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M3 17 L9 11 L13 15 L21 7" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <Path d="M16 7 L21 7 L21 12" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

export function IconWarning({ size = 22, color = "#E84040" }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M12 3 L22 20 L2 20 Z" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round" />
      <Line x1="12" y1="10" x2="12" y2="15" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <Circle cx="12" cy="18" r="1.2" fill={color} />
    </Svg>
  );
}

export function IconHome({ size = 22, color = "#D4962A" }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M3 11 L12 3 L21 11 L21 21 L15 21 L15 15 L9 15 L9 21 L3 21 Z" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round" />
    </Svg>
  );
}

export function IconTrash({ size = 20, color = "#E84040" }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect x="5" y="7" width="14" height="14" rx="2" stroke={color} strokeWidth="2" fill="none" />
      <Line x1="3" y1="7" x2="21" y2="7" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Path d="M9 3 L15 3" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Line x1="9" y1="11" x2="9" y2="17" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <Line x1="15" y1="11" x2="15" y2="17" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  );
}

export function IconGavel({ size = 22, color = "#D4962A" }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect x="2" y="16" width="9" height="6" rx="2" fill={color} opacity={0.5} />
      <Path d="M7 16 L18 5" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <Rect x="14" y="2" width="8" height="5" rx="2" fill={color} transform="rotate(45 18 4.5)" />
    </Svg>
  );
}

export function IconVibration({ size = 20, color = "#D4962A" }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect x="7" y="4" width="10" height="16" rx="3" stroke={color} strokeWidth="2" fill="none" />
      <Line x1="2" y1="8" x2="5" y2="8" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Line x1="2" y1="12" x2="5" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Line x1="2" y1="16" x2="5" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Line x1="19" y1="8" x2="22" y2="8" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Line x1="19" y1="12" x2="22" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Line x1="19" y1="16" x2="22" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

export function IconSparkles({ size = 20, color = "#D4962A" }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M12 2 L13.5 7 L18 6 L15 10 L20 12 L15 14 L18 18 L13.5 17 L12 22 L10.5 17 L6 18 L9 14 L4 12 L9 10 L6 6 L10.5 7 Z" stroke={color} strokeWidth="1.5" fill="none" />
    </Svg>
  );
}

export function IconCheckCircle({ size = 44, color = "#2ECC8E" }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 44 44">
      <Circle cx="22" cy="22" r="18" stroke={color} strokeWidth="2.5" fill="none" />
      <Path d="M13 22 L19 28 L31 16" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

export function IconBookOpen({ size = 32, color = "#D4962A" }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      <Path d="M4 7 C4 6 5 5 7 5 L15 5 L15 25 L7 25 C5 25 4 24 4 23 Z" stroke={color} strokeWidth="2" fill="none" />
      <Path d="M15 5 L23 5 C25 5 26 6 26 7 L26 23 C26 24 25 25 23 25 L15 25 Z" stroke={color} strokeWidth="2" fill="none" />
      <Line x1="15" y1="5" x2="15" y2="25" stroke={color} strokeWidth="1.5" />
      <Line x1="7" y1="10" x2="12" y2="10" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <Line x1="7" y1="14" x2="12" y2="14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <Line x1="18" y1="10" x2="23" y2="10" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <Line x1="18" y1="14" x2="23" y2="14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  );
}

export function IconSun({ size = 36, color = "#4A7EE8" }: P) {
  return (
    <Svg width={size} height={size} viewBox="0 0 36 36">
      <Circle cx="18" cy="18" r="7" stroke={color} strokeWidth="2.5" fill="none" />
      <Line x1="18" y1="4" x2="18" y2="8" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <Line x1="18" y1="28" x2="18" y2="32" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <Line x1="4" y1="18" x2="8" y2="18" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <Line x1="28" y1="18" x2="32" y2="18" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <Line x1="8.2" y1="8.2" x2="11" y2="11" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <Line x1="25" y1="25" x2="27.8" y2="27.8" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <Line x1="27.8" y1="8.2" x2="25" y2="11" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <Line x1="11" y1="25" x2="8.2" y2="27.8" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </Svg>
  );
}

export function IconDifficultyDot({ size = 22, level = 1 }: { size?: number; level?: 1 | 2 | 3 }) {
  const colors = level === 1 ? "#2ECC8E" : level === 2 ? "#F5A623" : "#E84040";
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22">
      <Circle cx="11" cy="11" r="8" stroke={colors} strokeWidth="2" fill="none" />
      <Circle cx="11" cy="11" r="4" fill={colors} opacity={0.5} />
    </Svg>
  );
}
