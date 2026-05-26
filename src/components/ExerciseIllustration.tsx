import React, { useState } from "react";
import { ZoomIn, X, Activity, Sparkles, Microscope } from "lucide-react";

interface ExerciseIllustrationProps {
  exerciseId: string;
  exerciseName: string;
}

export default function ExerciseIllustration({ exerciseId, exerciseName }: ExerciseIllustrationProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [striationDepth, setStriationDepth] = useState(1.5);
  const [isFlexing, setIsFlexing] = useState(true);

  // Ultra-realistic anatomical pencil sketch artwork style, mirroring the attached user photo.
  // We use detailed body silhouettes, fine pencil-shading lines, multi-pack abs, defined muscles,
  // thick gym training shorts with waistbands, realistic hands, and shaded weights.

  const renderArt = () => {
    switch (exerciseId) {
      // ==========================================
      // --- DAY 1: CHEST & TRICEPS ---
      // ==========================================
      case "d1-ex1": // BENCH PRESS (Exact Match to User Reference)
        return (
          <svg viewBox="0 0 160 120" className="w-full h-full">
            {/* Soft parchment vintage background */}
            <rect x="0" y="0" width="160" height="120" fill="#FAF8F5" />
            
            {/* Upright Racks behind the bench (Slight metallic grey tubes in 3D perspective) */}
            {/* Left upright pillar */}
            <rect x="63" y="15" width="5" height="52" fill="#ADAFB0" stroke="#2B231C" strokeWidth="0.7" />
            <path d="M 68,15 L 70,17 L 70,67 L 68,67 Z" fill="#7D8082" stroke="#2B231C" strokeWidth="0.7" />
            
            {/* Right upright pillar */}
            <rect x="127" y="18" width="5" height="92" fill="#ADAFB0" stroke="#2B231C" strokeWidth="0.7" />
            <path d="M 132,18 L 134,20 L 134,110 L 132,110 Z" fill="#7D8082" stroke="#2B231C" strokeWidth="0.7" />
            {/* Base block of right upright */}
            <rect x="114" y="106" width="28" height="5" fill="#2E2822" rx="1" stroke="#110E0C" strokeWidth="0.7" />
            
            {/* Tall Peg hooks/safety catches on right pillar */}
            <path d="M 124,56 L 128,56 L 128,62 L 124,62 Z" fill="#5A5C5B" stroke="#2B231C" strokeWidth="0.6" />
            <path d="M 124,78 L 128,78 L 128,84 L 124,84 Z" fill="#5A5C5B" stroke="#2B231C" strokeWidth="0.6" />

            {/* Crossbeam connecting the uprights */}
            <path d="M 65,65 Q 96,75 127,85" stroke="#7D8082" strokeWidth="2" strokeDasharray="1,2" fill="none" />

            {/* Bench padding cushion in 3D */}
            <path d="M 28,95 L 114,54 L 116,59 L 30,100 Z" fill="#2E2824" stroke="#110E0C" strokeWidth="0.8" />
            
            {/* Bench mechanical steel legs with support pillars */}
            <line x1="102" y1="59" x2="102" y2="88" stroke="#ADAFB0" strokeWidth="4" />
            <rect x="85" y="80" width="34" height="4" fill="#7D8082" stroke="#2B231C" strokeWidth="0.7" />
            <line x1="30" y1="100" x2="30" y2="118" stroke="#7D8082" strokeWidth="3" />

            {/* Human body laying flat on bench */}
            {/* Shaded contouring of hair on the legs */}
            <path d="M 22,83 C 17,81 11,84 9,94 C 7,102 9,109 8,113" fill="none" stroke="#2B231C" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 37,87 M 33,91 C 35,100 33,107 34,113" fill="none" stroke="#2B231C" strokeWidth="2.5" strokeLinecap="round" />
            {/* Fine hair lines */}
            <path d="M 11,93 L 13,91 M 10,98 L 12,96 M 10,103 L 12,101" stroke="#5E5345" strokeWidth="0.5" />
            <path d="M 34,99 L 36,97 M 33,104 L 35,102" stroke="#5E5345" strokeWidth="0.5" />

            {/* Charcoal Gym Shorts with custom wrinkles */}
            <path d="M 22,83 C 27,73 47,71 49,81 C 47,92 31,95 23,95 Z" fill="#201C18" stroke="#110E0C" strokeWidth="0.9" />
            <path d="M 32,79 C 36,75 42,79 42,83" fill="none" stroke="#3D352B" strokeWidth="0.9" />
            <path d="M 27,83 Q 37,81 39,89" fill="none" stroke="#3D352B" strokeWidth="0.9" />
            
            {/* Detailed YOUCAN Belt Waistband (Custom curved label wrapping cleanly) */}
            <path d="M 45,74 C 49,67 61,60 67,63 C 69,65 61,74 49,81 Z" fill="#181512" stroke="#110E0C" strokeWidth="0.9" />
            {/* Custom stylized letters on waistband */}
            <text x="49.5" y="71" fill="#FFF" fontSize="4.6" fontFamily="sans-serif" fontWeight="950" transform="rotate(-15, 51, 71)" letterSpacing="0.3">YOUCAN</text>

            {/* Core Torso (Skeletal / Abdominals ribcage framework) */}
            <path d="M 58,68 C 64,58 90,44 94,47 C 99,50 92,60 82,67 Z" fill="#FDFBF7" stroke="#2B231C" strokeWidth="0.9" />
            
            {/* Core Abs (Perfect defined multi-packs) */}
            <path d="M 62,63 C 69,58 76,54 83,51" fill="none" stroke="#B3A899" strokeWidth="0.8" />
            <path d="M 64,58 Q 71,54 77,51" fill="none" stroke="#2B231C" strokeWidth="0.6" opacity="0.65" />
            <path d="M 69,62 Q 76,58 81,55" fill="none" stroke="#2B231C" strokeWidth="0.6" opacity="0.65" />
            <path d="M 59,54 Q 67,51 72,48" fill="none" stroke="#2B231C" strokeWidth="0.6" opacity="0.65" />

            {/* Mannequin white head looking skyward */}
            <ellipse cx="100" cy="40" rx="9" ry="6.5" fill="#FDFBF7" stroke="#2B231C" strokeWidth="0.9" transform="rotate(-23, 100, 40)" />

            {/* Skeletal arm layout underneath the muscles */}
            {/* Left Arm guide */}
            <path d="M 52,68 C 45,64 45,52 49,42" fill="none" stroke="#2B231C" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 49,42 L 53,30" fill="none" stroke="#2B231C" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="53" cy="27" r="2.5" fill="#FFF" stroke="#2B231C" strokeWidth="0.7" />
            {/* Right Arm guide */}
            <path d="M 83,50 C 93,46 98,38 98,38" fill="none" stroke="#2B231C" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 98,38 L 97,26" fill="none" stroke="#2B231C" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="97" cy="23" r="2.5" fill="#FFF" stroke="#2B231C" strokeWidth="0.7" />

            {/* Active Muscle Fiber Highlight Zones (Deep intense crimson) */}
            {/* Muscles highlighted in the user reference image: Pectoralis, Anterior Deltoids, Biceps Brachii, Triceps */}
            
            {/* 1. Left Pectoralis chest plate */}
            <path d="M 74,50 C 71,54 63,55 63,51 C 63,47 69,44 73,45 Z" fill="#DF3B3B" stroke="#B21E1E" strokeWidth="0.8" />
            <path d="M 72,47 Q 67,49 65,51" stroke="#FFF" strokeWidth="0.5" opacity="0.6" />
            <path d="M 71,49 Q 67,51 64,52" stroke="#800D0D" strokeWidth="0.5" opacity="0.75" />

            {/* 2. Right Pectoralis chest plate */}
            <path d="M 75,46 C 80,42 87,48 87,52 C 84,55 77,54 74,50 Z" fill="#DF3B3B" stroke="#B21E1E" strokeWidth="0.8" />
            <path d="M 77,48 Q 82,46 84,49" stroke="#FFF" strokeWidth="0.5" opacity="0.6" />
            <path d="M 78,50 Q 82,48 85,52" stroke="#800D0D" strokeWidth="0.5" opacity="0.75" />

            {/* 3. Left Front Deltoid shoulder head */}
            <path d="M 57,49 C 54,48 50,52 51,56 C 54,57 57,54 58,51 Z" fill="#DF3B3B" stroke="#B21E1E" strokeWidth="0.8" />
            <path d="M 55,51 Q 53,53 52,55" stroke="#FFF" strokeWidth="0.5" opacity="0.6" />

            {/* 4. Right Front Deltoid shoulder head */}
            <path d="M 85,41 C 88,39 93,40 93,44 C 90,47 86,46 84,43 Z" fill="#DF3B3B" stroke="#B21E1E" strokeWidth="0.8" />
            <path d="M 87,42 Q 89,41 91,43" stroke="#FFF" strokeWidth="0.5" opacity="0.6" />

            {/* 5. Left Arm - Flexed Bicep bundle */}
            <path d="M 44,46 C 44,42 48,43 50,46 C 48,49 45,49 43,47 Z" fill="#DF3B3B" stroke="#B21E1E" strokeWidth="0.8" />
            <path d="M 46,44 Q 48,45 49,47" stroke="#FFF" strokeWidth="0.4" opacity="0.6" />

            {/* 6. Left Arm - Lower Tricep/Brachialis bundle */}
            <path d="M 43,51 C 42,48 47,49 48,52 C 46,55 43,54 42,51 Z" fill="#DF3B3B" stroke="#B21E1E" strokeWidth="0.8" />
            <path d="M 44,50 Q 46,51 47,53" stroke="#800D0D" strokeWidth="0.4" opacity="0.75" />

            {/* 7. Right Arm - Flexed Bicep bundle */}
            <path d="M 88,37 C 90,33 96,35 95,39 C 92,42 89,41 87,38 Z" fill="#DF3B3B" stroke="#B21E1E" strokeWidth="0.8" />
            <path d="M 90,36 Q 92,35 94,37" stroke="#FFF" strokeWidth="0.4" opacity="0.6" />

            {/* 8. Right Arm - Lower Tricep/Brachialis bundle */}
            <path d="M 88,44 C 91,41 96,43 95,47 C 91,48 88,47 87,45 Z" fill="#DF3B3B" stroke="#B21E1E" strokeWidth="0.8" />
            <path d="M 90,44 Q 93,44 94,46" stroke="#800D0D" strokeWidth="0.4" opacity="0.75" />

            {/* Heavy-Duty Olympic Barbell with double heavy plates */}
            <line x1="20" y1="20" x2="140" y2="30" stroke="#4A3F35" strokeWidth="2.2" />
            
            {/* Layered thick black bumpers (Left end) */}
            <ellipse cx="30" cy="21" rx="2" ry="4" stroke="#1F1A16" fill="#4B4741" />
            <ellipse cx="28" cy="21" rx="10" ry="14" fill="#201C18" stroke="#110E0C" strokeWidth="1" />
            <path d="M 18,17 A 10 14 0 0 1 28,7" fill="none" stroke="#FFF" strokeWidth="0.6" opacity="0.4" />
            <ellipse cx="23" cy="21" rx="10" ry="14" fill="#3D352E" stroke="#110E0C" strokeWidth="1" />
            <ellipse cx="23" cy="21" rx="4" ry="6" fill="#110E0C" />

            {/* Layered thick black bumpers (Right end) */}
            <ellipse cx="120" cy="29" rx="2" ry="4" stroke="#1F1A16" fill="#4B4741" />
            <ellipse cx="124" cy="29" rx="10" ry="14" fill="#201C18" stroke="#110E0C" strokeWidth="1" />
            <path d="M 114,25 A 10 14 0 0 1 124,15" fill="none" stroke="#FFF" strokeWidth="0.6" opacity="0.4" />
            <ellipse cx="129" cy="29" rx="10" ry="14" fill="#3D352E" stroke="#110E0C" strokeWidth="1" />
            <ellipse cx="129" cy="29" rx="4" ry="6" fill="#110E0C" />
          </svg>
        );

      case "d1-ex2": // INCLINE BENCH PRESS
        return (
          <svg viewBox="0 0 160 120" className="w-full h-full">
            <rect x="0" y="0" width="160" height="120" fill="#F8F4EB" />
            {/* Incline frame with adjustments */}
            <line x1="30" y1="104" x2="115" y2="44" stroke="#5E5345" strokeWidth="6.5" strokeLinecap="round" />
            <line x1="40" y1="104" x2="110" y2="104" stroke="#5E5345" strokeWidth="2" />
            <line x1="88" y1="104" x2="88" y2="64" stroke="#3D352E" strokeWidth="1.8" />
            
            {/* Backrest pillow cushion */}
            <path d="M 36,102 L 111,46 L 114,50 L 39,106 Z" fill="#3D352E" />

            {/* Mannequin sitting leaning back */}
            <ellipse cx="106" cy="36" rx="7.5" ry="5.5" fill="#FFF" stroke="#2B231C" strokeWidth="1" />
            
            {/* Body Spine / Spine Angle */}
            <path d="M 54,92 C 60,86 84,65 96,52" fill="none" stroke="#2B231C" strokeWidth="5.5" strokeLinecap="round" />
            <path d="M 52,92 L 68,104 L 78,92" fill="none" stroke="#2B231C" strokeWidth="3" />

            {/* Charcoal gym shorts with white waistband */}
            <path d="M 50,92 L 56,101 L 71,90 Z" fill="#201C18" stroke="#110E0C" />
            <path d="M 58,85 L 62,81" stroke="#E6DED0" strokeWidth="2" />

            {/* Active Upper Chest in Crimson Highlight with striations */}
            <path d="M 82,62 Q 90,53 96,48" stroke="#DF3B3B" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M 84,60 Q 90,52 94,49" stroke="#FFF" strokeWidth="0.6" opacity="0.6" fill="none" />
            {/* Inner abs lines */}
            <path d="M 68,76 Q 74,70 79,64" fill="none" stroke="#8C8070" strokeWidth="0.8" />
            <path d="M 72,79 Q 78,73 83,67" fill="none" stroke="#8C8070" strokeWidth="0.8" />

            {/* Flexed arms and hands holding weights */}
            <path d="M 72,70 L 71,48 L 78,41" fill="none" stroke="#2B231C" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 88,60 L 92,39 L 100,32" fill="none" stroke="#2B231C" strokeWidth="2.2" strokeLinecap="round" />
            
            {/* Hexagonal dumbbells loaded */}
            <g fill="#36302B" stroke="#110E0C">
              <rect x="74" y="36" width="8" height="10" transform="rotate(15, 74, 36)" rx="1" />
              <rect x="96" y="27" width="8" height="10" transform="rotate(15, 96, 27)" rx="1" />
              <line x1="72" y1="41" x2="80" y2="39" stroke="#4A3F35" strokeWidth="1.8" />
              <line x1="94" y1="32" x2="102" y2="30" stroke="#4A3F35" strokeWidth="1.8" />
            </g>
          </svg>
        );

      case "d1-ex3": // CHEST FLY (Pec Deck Machine with detailed structures)
        return (
          <svg viewBox="0 0 160 120" className="w-full h-full">
            <rect x="0" y="0" width="160" height="120" fill="#F8F4EB" />
            
            {/* Fly weights stacked cabinet */}
            <rect x="70" y="14" width="20" height="16" fill="#3D352E" stroke="#110E0C" />
            <rect x="72" y="16" width="16" height="4" fill="#5E5345" />
            <rect x="72" y="22" width="16" height="4" fill="#5E5345" />
            <line x1="80" y1="30" x2="80" y2="80" stroke="#110E0C" strokeWidth="1.5" />

            {/* Back cushion seat pad */}
            <rect x="68" y="55" width="24" height="34" fill="#36302B" stroke="#110E0C" rx="2" />
            <line x1="80" y1="89" x2="80" y2="108" stroke="#5E5345" strokeWidth="3.2" />

            {/* Front of standing/sitting body facing user */}
            <circle cx="80" cy="46" r="6.5" fill="#FFF" stroke="#2B231C" strokeWidth="1" />
            {/* Shoulder caps */}
            <circle cx="68" cy="56" r="3.2" fill="#EFEBE4" stroke="#2B231C" />
            <circle cx="92" cy="56" r="3.2" fill="#EFEBE4" stroke="#2B231C" />

            {/* Core chest and abs */}
            <path d="M 68,58 L 92,58 L 88,85 L 72,85 Z" fill="#FBF7EF" stroke="#2B231C" strokeWidth="1.2" />
            {/* Defined Abs in detail */}
            <line x1="77" y1="67" x2="83" y2="67" stroke="#8C8070" strokeWidth="0.8" />
            <line x1="77" y1="72" x2="83" y2="72" stroke="#8C8070" strokeWidth="0.8" />
            <line x1="76" y1="77" x2="84" y2="77" stroke="#8C8070" strokeWidth="0.8" />
            <line x1="80" y1="63" x2="80" y2="82" stroke="#8C8070" strokeWidth="0.6" />

            {/* Active Pectorals in Crimson Highlight */}
            <path d="M 69,59 Q 80,67 91,59 C 88,54 72,54 69,59 Z" fill="#DF3B3B" stroke="#B21E1E" strokeWidth="0.8" />
            <path d="M 72,58 Q 80,63 88,58" stroke="#FFF" strokeWidth="0.6" opacity="0.6" fill="none" />

            {/* Fly Handles swung open */}
            <path d="M 68,54 Q 44,52 46,38" fill="none" stroke="#2B231C" strokeWidth="2" strokeLinecap="round" />
            <path d="M 92,54 Q 116,52 114,38" fill="none" stroke="#2B231C" strokeWidth="2" strokeLinecap="round" />

            {/* Hands wrapping handles */}
            <circle cx="46" cy="38" r="3" fill="#201C18" />
            <circle cx="114" cy="38" r="3" fill="#201C18" />
            
            {/* Machine bars extending */}
            <line x1="46" y1="38" x2="42" y2="18" stroke="#5E5345" strokeWidth="1.8" />
            <line x1="114" y1="38" x2="118" y2="18" stroke="#5E5345" strokeWidth="1.8" />
          </svg>
        );

      case "d1-ex4": // TRICEP PUSHDOWN
      case "d5-ex1":
        return (
          <svg viewBox="0 0 160 120" className="w-full h-full">
            <rect x="0" y="0" width="160" height="120" fill="#F8F4EB" />
            {/* Cable Machine framing towers */}
            <line x1="130" y1="12" x2="130" y2="112" stroke="#5E5345" strokeWidth="3" />
            <circle cx="130" cy="22" r="5" fill="#FAF6EE" stroke="#2B231C" />
            
            {/* Weight stack visual */}
            <rect x="124" y="65" width="12" height="42" fill="#36302B" stroke="#110E0C" />
            <line x1="130" y1="22" x2="98" y2="48" stroke="#110E0C" strokeWidth="1" strokeDasharray="3,1" />

            {/* High fidelity athlete outline */}
            <circle cx="75" cy="32" r="5.5" fill="#FFF" stroke="#2B231C" strokeWidth="1.1" />
            {/* Solid core bending forward slightly */}
            <path d="M 75,37 Q 72,55 70,72" fill="none" stroke="#2B231C" strokeWidth="5.5" strokeLinecap="round" />
            
            {/* Spine contouring shading lines */}
            <path d="M 78,42 C 77,50 75,58 74,66" fill="none" stroke="#8C8070" strokeWidth="0.8" />

            {/* Gym black training shorts */}
            <path d="M 70,72 L 60,88 L 76,88 Z" fill="#201C18" stroke="#110E0C" strokeWidth="1" />
            <path d="M 70,72 L 72,112" stroke="#2B231C" strokeWidth="4" strokeLinecap="round" />

            {/* Active Triceps (back of arm) Highlighted in Crimson with fibers */}
            <path d="M 75,40 L 76,57 L 98,59" fill="none" stroke="#2B231C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            
            {/* Highlight bubble */}
            <path d="M 74,43 Q 77,49 75,54" fill="none" stroke="#DF3B3B" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 73,46 L 75,51" stroke="#FFF" strokeWidth="0.6" opacity="0.6" />

            {/* Gym rope attachment gripped */}
            <line x1="98" y1="59" x2="96" y2="68" stroke="#3D352E" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="96" cy="68" r="2.2" fill="#110E0C" />
          </svg>
        );

      case "d1-ex5": // OVERHEAD TRICEP EXTENSION (Front View as in Sheet)
      case "d5-ex2":
        return (
          <svg viewBox="0 0 160 120" className="w-full h-full">
            <rect x="0" y="0" width="160" height="120" fill="#F8F4EB" />
            
            {/* Standing frontal broad body */}
            <path d="M 80,48 L 80,82" stroke="#2B231C" strokeWidth="5.5" strokeLinecap="round" />
            <path d="M 80,82 L 74,114 M 80,82 L 86,114" stroke="#2B231C" strokeWidth="3.8" strokeLinecap="round" />
            <circle cx="80" cy="40" r="5.5" fill="#FFF" stroke="#2B231C" strokeWidth="1" />
            
            {/* Detailed abdominals 6-Pack */}
            <line x1="77" y1="58" x2="83" y2="58" stroke="#8C8070" strokeWidth="0.8" />
            <line x1="77" y1="63" x2="83" y2="63" stroke="#8C8070" strokeWidth="0.8" />
            <line x1="76" y1="68" x2="84" y2="68" stroke="#8C8070" strokeWidth="0.8" />
            <line x1="80" y1="54" x2="80" y2="74" stroke="#8C8070" strokeWidth="0.6" />

            {/* Gym Black Shorts with gray belt */}
            <path d="M 80,80 L 70,89 L 90,89 Z" fill="#201C18" stroke="#110E0C" />
            <rect x="74" y="80" width="12" height="2.5" fill="#E6DED0" stroke="#110E0C" strokeWidth="0.5" />

            {/* Arms overhead flexed behind, forming triangle holding heavy dumbbell */}
            {/* Left Arm raised */}
            <path d="M 73,46 L 68,26 L 80,18" fill="none" stroke="#2B231C" strokeWidth="2.2" strokeLinecap="round" />
            {/* Right Arm raised */}
            <path d="M 87,46 L 92,26 L 80,18" fill="none" stroke="#2B231C" strokeWidth="2.2" strokeLinecap="round" />

            {/* Active Triceps on the sides colored in Crimson red */}
            <path d="M 72,40 L 69,28" stroke="#DF3B3B" strokeWidth="4.2" strokeLinecap="round" />
            <path d="M 88,40 L 91,28" stroke="#DF3B3B" strokeWidth="4.2" strokeLinecap="round" />
            <line x1="71" y1="36" x2="70" y2="30" stroke="#FFF" strokeWidth="0.6" opacity="0.6" />
            <line x1="89" y1="36" x2="90" y2="30" stroke="#FFF" strokeWidth="0.6" opacity="0.6" />

            {/* Gripping heavy dumbbell over head center */}
            <line x1="72" y1="18" x2="88" y2="18" stroke="#36302B" strokeWidth="2.5" />
            <rect x="68" y="13" width="7" height="10" fill="#36302B" stroke="#110E0C" rx="1.2" />
            <rect x="85" y="13" width="7" height="10" fill="#36302B" stroke="#110E0C" rx="1.2" />
          </svg>
        );

      case "d1-ex6": // SKULL CRUSHERS
        return (
          <svg viewBox="0 0 160 120" className="w-full h-full">
            <rect x="0" y="0" width="160" height="120" fill="#F8F4EB" />
            {/* Bench flat angle in perspective */}
            <rect x="25" y="78" width="110" height="7" fill="#3D352E" stroke="#110E0C" rx="1" />
            <line x1="45" y1="85" x2="45" y2="108" stroke="#5E5345" strokeWidth="2.5" />
            <line x1="115" y1="85" x2="115" y2="108" stroke="#5E5345" strokeWidth="2.5" />

            {/* Body laying flat on back */}
            <rect x="42" y="66" width="67" height="12" fill="#FBF7EF" stroke="#2B231C" strokeWidth="1.2" rx="3" />
            {/* Defined Abs shading contours seen flat */}
            <line x1="58" y1="70" x2="68" y2="70" stroke="#8C8070" strokeWidth="0.8" />
            <line x1="58" y1="74" x2="68" y2="74" stroke="#8C8070" strokeWidth="0.8" />

            <circle cx="116" cy="65" r="5" fill="#FFF" stroke="#2B231C" strokeWidth="1" />

            {/* Charcoal Shorts */}
            <rect x="42" y="66" width="18" height="12" fill="#201C18" />

            {/* Arms raised with flexed forearms holding weight plate above forehead */}
            <path d="M 68,67 L 75,44 L 94,52" fill="none" stroke="#2B231C" strokeWidth="2.5" strokeLinecap="round" />

            {/* Active Triceps Highlight - Crimson */}
            <path d="M 69,58 L 74,46" stroke="#DF3B3B" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="71" y1="54" x2="73" y2="48" stroke="#FFF" strokeWidth="0.6" opacity="0.6" />

            {/* Loaded structural EZ-barbell layout */}
            <line x1="90" y1="46" x2="98" y2="58" stroke="#4A3F35" strokeWidth="2" />
            <circle cx="90" cy="46" r="6" fill="#36302B" stroke="#110E0C" />
            <circle cx="98" cy="58" r="6" fill="#36302B" stroke="#110E0C" />
          </svg>
        );

      // ==========================================
      // --- DAY 2: BACK & BICEPS ---
      // ==========================================
      case "d2-ex1": // LAT PULLDOWN
        return (
          <svg viewBox="0 0 160 120" className="w-full h-full">
            <rect x="0" y="0" width="160" height="120" fill="#F8F4EB" />
            {/* Top pulleys & high structural rails */}
            <rect x="35" y="15" width="90" height="4" fill="#3D352E" />
            <circle cx="45" cy="17" r="4" fill="#FAF6EE" stroke="#2B231C" />
            <circle cx="115" cy="17" r="4" fill="#FAF6EE" stroke="#2B231C" />

            {/* High-fidelity wide seat base */}
            <rect x="65" y="72" width="30" height="18" fill="#36302B" stroke="#110E0C" rx="1" />
            <line x1="80" y1="90" x2="80" y2="110" stroke="#5E5345" strokeWidth="3" />

            {/* Athlete sitting pulling bar down (Wide Back silhouette) */}
            <path d="M 80,72 Q 77,50 80,44" fill="none" stroke="#2B231C" strokeWidth="6" strokeLinecap="round" />
            <circle cx="82" cy="33" r="5" fill="#FFF" stroke="#2B231C" strokeWidth="1" />
            
            {/* Defined lat/back sketch outlines */}
            <path d="M 75,54 C 77,48 83,48 85,54" fill="none" stroke="#2B231C" strokeWidth="1" />
            
            {/* Gym Shorts */}
            <path d="M 80,72 L 92,80 L 92,68 Z" fill="#201C18" />

            {/* Active Lats (Wide V-Taper back) in Crimson Highlights */}
            <path d="M 74,54 C 77,49 83,49 86,54 C 83,57 77,57 74,54 Z" fill="#DF3B3B" stroke="#B21E1E" strokeWidth="0.8" />
            <path d="M 77,53 L 83,53" stroke="#FFF" strokeWidth="0.6" opacity="0.6" />

            {/* Pulling arms gripping the wide overhead bar */}
            <path d="M 80,44 L 94,34 L 91,24" fill="none" stroke="#2B231C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 80,44 L 66,34 L 69,24" fill="none" stroke="#2B231C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />

            <line x1="48" y1="24" x2="112" y2="24" stroke="#4A3F35" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="80" y1="17" x2="80" y2="24" stroke="#2B231C" strokeWidth="0.8" strokeDasharray="2,2" />
          </svg>
        );

      case "d2-ex2": // CABLE ROW
        return (
          <svg viewBox="0 0 160 120" className="w-full h-full">
            <rect x="0" y="0" width="160" height="120" fill="#F8F4EB" />
            {/* Pulley system and guides */}
            <circle cx="25" cy="85" r="4" fill="#FAF6EE" stroke="#2B231C" />
            <line x1="25" y1="85" x2="25" y2="108" stroke="#5E5345" strokeWidth="2" />

            {/* Seat platform bench */}
            <rect x="45" y="80" width="70" height="7" fill="#3D352E" stroke="#110E0C" rx="1.5" />
            <line x1="55" y1="87" x2="55" y2="108" stroke="#5E5345" strokeWidth="2.2" />
            <line x1="105" y1="87" x2="105" y2="108" stroke="#5E5345" strokeWidth="2.2" />

            {/* Athlete sitting up straight, pulling handle */}
            <path d="M 85,80 L 93,52" stroke="#2B231C" strokeWidth="5.5" strokeLinecap="round" />
            <circle cx="95" cy="43" r="5" fill="#FFF" stroke="#2B231C" strokeWidth="1" />
            
            {/* Core Oblique and Lat shading lines */}
            <path d="M 88,58 Q 91,66 90,74" fill="none" stroke="#8C8070" strokeWidth="0.8" opacity="0.8" />

            {/* Gym Shorts */}
            <path d="M 85,80 L 74,84 L 78,92 Z" fill="#201C18" />

            {/* Mid-Back Lats highlighted in Crimson */}
            <path d="M 86,59 Q 90,59 88,67 C 84,65 84,61 86,59 Z" fill="#DF3B3B" stroke="#B21E1E" strokeWidth="0.8" />
            <circle cx="87" cy="63" r="1.8" fill="#FFF" opacity="0.6" />

            {/* Pulled Cable and row handle */}
            <line x1="25" y1="85" x2="79" y2="64" stroke="#110E0C" strokeWidth="1.1" />
            <path d="M 91,53 L 102,61 L 79,64" fill="none" stroke="#2B231C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );

      case "d2-ex3": // INCLINE HIGH ROW
        return (
          <svg viewBox="0 0 160 120" className="w-full h-full">
            <rect x="0" y="0" width="160" height="120" fill="#F8F4EB" />
            {/* Incline frame and support guides */}
            <line x1="35" y1="95" x2="115" y2="45" stroke="#3D352E" strokeWidth="6.5" strokeLinecap="round" />
            <line x1="50" y1="95" x2="50" y2="114" stroke="#5E5345" strokeWidth="2.2" />
            <line x1="95" y1="62" x2="95" y2="114" stroke="#5E5345" strokeWidth="2.2" />

            {/* Torso face-down layout */}
            <path d="M 50,85 Q 70,70 90,57" fill="none" stroke="#2B231C" strokeWidth="5" strokeLinecap="round" />
            <circle cx="96" cy="48" r="5" fill="#FFF" stroke="#2B231C" strokeWidth="1" />
            
            {/* Oblique / Lower lats sketch contours */}
            <path d="M 64,80 C 70,74 76,68 82,62" fill="none" stroke="#8C8070" strokeWidth="0.8" />

            {/* Charcoal Gym Shorts */}
            <path d="M 50,85 L 58,92 L 67,80 Z" fill="#201C18" />

            {/* Back Rhomboids and Posterior Deltoid in glowing crimson */}
            <path d="M 76,64 Q 82,60 88,57" fill="none" stroke="#DF3B3B" strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="82" cy="61" r="1.8" fill="#FFF" opacity="0.6" />

            {/* Elbow row upward flex track */}
            <path d="M 82,61 L 86,45 L 80,38" fill="none" stroke="#2B231C" strokeWidth="2.2" strokeLinecap="round" />

            {/* High Heavy Dumbbells pulled up */}
            <line x1="74" y1="36" x2="86" y2="40" stroke="#4A3F35" strokeWidth="1.8" />
            <circle cx="74" cy="36" r="4.5" fill="#36302B" stroke="#110E0C" />
            <circle cx="86" cy="40" r="4.5" fill="#36302B" stroke="#110E0C" />
          </svg>
        );

      case "d2-ex4": // BARBELL CURL
      case "d5-ex4":
        return (
          <svg viewBox="0 0 160 120" className="w-full h-full">
            <rect x="0" y="0" width="160" height="120" fill="#F8F4EB" />
            
            {/* General standing posture silhouette */}
            <circle cx="80" cy="24" r="5.5" fill="#FFF" stroke="#2B231C" strokeWidth="1.2" />
            <path d="M 80,35 L 80,75" stroke="#2B231C" strokeWidth="5.5" strokeLinecap="round" />
            
            {/* Oblique core lines */}
            <path d="M 76,46 Q 80,50 84,46" fill="none" stroke="#8C8070" strokeWidth="0.8" />

            {/* Detailed charcoal Shorts */}
            <path d="M 80,75 L 70,88 L 90,88 Z" fill="#201C18" stroke="#110E0C" strokeWidth="1.1" />
            <path d="M 80,75 L 75,110 M 80,75 L 85,110" stroke="#2B231C" strokeWidth="4" strokeLinecap="round" />
            
            {/* Shaded structural lines on the calf */}
            <path d="M 74,100 L 76,102 M 86,100 L 84,102" stroke="#5E5345" strokeWidth="0.6" />

            {/* Active Biceps Peak Highlight - Vivid Crimson with muscle fibers */}
            <path d="M 83,43 Q 86,49 84,55" fill="none" stroke="#DF3B3B" strokeWidth="5.5" strokeLinecap="round" />
            <path d="M 82,45 L 83,49" stroke="#FFF" strokeWidth="0.8" opacity="0.6" />

            {/* Flexed Arm curled up 90 deg holding curl barbell */}
            <path d="M 80,38 Q 88,48 94,44 L 88,32" fill="none" stroke="#2B231C" strokeWidth="2.5" strokeLinecap="round" />

            {/* Heavy Bumper Plate Loaded Curl Barbell */}
            <line x1="65" y1="28" x2="115" y2="28" stroke="#4A3F35" strokeWidth="2.2" />
            <ellipse cx="65" cy="28" rx="6" ry="10" fill="#36302B" stroke="#110E0C" strokeWidth="1" />
            <ellipse cx="65" cy="28" rx="3" ry="5" fill="#201C18" />
            <ellipse cx="115" cy="28" rx="6" ry="10" fill="#36302B" stroke="#110E0C" strokeWidth="1" />
            <ellipse cx="115" cy="28" rx="3" ry="5" fill="#201C18" />
          </svg>
        );

      case "d2-ex5": // INCLINE HAMMER CURL
      case "d5-ex5":
        return (
          <svg viewBox="0 0 160 120" className="w-full h-full">
            <rect x="0" y="0" width="160" height="120" fill="#F8F4EB" />
            {/* Incline frame and adjustment plates */}
            <line x1="40" y1="95" x2="105" y2="40" stroke="#3D352E" strokeWidth="7" strokeLinecap="round" />
            <line x1="50" y1="95" x2="50" y2="114" stroke="#5E5345" strokeWidth="2" />
            <line x1="85" y1="65" x2="85" y2="114" stroke="#5E5345" strokeWidth="2" />

            {/* Athlete sitting in high incline */}
            <path d="M 52,85 Q 70,70 88,52" fill="none" stroke="#2B231C" strokeWidth="5.5" strokeLinecap="round" />
            <circle cx="93" cy="44" r="5.2" fill="#FFF" stroke="#2B231C" strokeWidth="1.2" />
            
            {/* Obliques */}
            <path d="M 68,76 Q 74,74 80,70" fill="none" stroke="#8C8070" strokeWidth="0.8" />

            {/* Charcoal Gym Shorts */}
            <path d="M 52,85 Q 60,95 72,82 Z" fill="#201C18" stroke="#110E0C" />

            {/* Active outer biceps / Brachialis in Crimson */}
            <path d="M 81,59 Q 85,55 83,49" fill="none" stroke="#DF3B3B" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="82" y1="56" x2="83" y2="52" stroke="#FFF" strokeWidth="0.6" opacity="0.6" />

            {/* Arm bending vertical curling hammer dumbbells */}
            <path d="M 83,52 L 85,38 L 74,32" fill="none" stroke="#2B231C" strokeWidth="2.5" strokeLinecap="round" />

            {/* Highly defined hex dumbbells side views */}
            <line x1="74" y1="24" x2="74" y2="40" stroke="#4A3F35" strokeWidth="1.8" />
            <circle cx="74" cy="24" r="4.5" fill="#36302B" stroke="#110E0C" />
            <circle cx="74" cy="40" r="4.5" fill="#36302B" stroke="#110E0C" />
          </svg>
        );

      case "d2-ex6": // PREACHER CURL
      case "d5-ex6":
        return (
          <svg viewBox="0 0 160 120" className="w-full h-full">
            <rect x="0" y="0" width="160" height="120" fill="#F8F4EB" />
            {/* Preacher Pad structure and bench */}
            <line x1="55" y1="65" x2="85" y2="48" stroke="#3D352E" strokeWidth="8.5" strokeLinecap="round" />
            <rect x="78" y="48" width="4" height="62" fill="#5E5345" />

            {/* Sitting athlete profile */}
            <path d="M 98,80 Q 95,60 84,52" fill="none" stroke="#2B231C" strokeWidth="5.5" strokeLinecap="round" />
            <circle cx="82" cy="41" r="5" fill="#FFF" stroke="#2B231C" strokeWidth="1.2" />
            
            {/* oblique ribs lines */}
            <path d="M 88,62 Q 91,68 89,74" fill="none" stroke="#8C8070" strokeWidth="0.8" />

            {/* Gym Charcoal Shorts */}
            <path d="M 98,80 L 110,88 L 110,74 Z" fill="#201C18" stroke="#110E0C" />

            {/* Intense Peak isolate Biceps in Crimson Highlight */}
            <path d="M 77,53 Q 73,50 69,54" fill="none" stroke="#DF3B3B" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="75" y1="52" x2="71" y2="53" stroke="#FFF" strokeWidth="0.6" opacity="0.6" />

            {/* Preacher arm curl flex layout */}
            <line x1="82" y1="50" x2="70" y2="57" stroke="#2B231C" strokeWidth="2.8" strokeLinecap="round" />
            <line x1="70" y1="57" x2="60" y2="42" stroke="#2B231C" strokeWidth="2.5" strokeLinecap="round" />

            {/* EZ-curl loaded structural plates */}
            <line x1="48" y1="42" x2="72" y2="42" stroke="#4A3F35" strokeWidth="2.2" />
            <circle cx="48" cy="42" r="6" fill="#36302B" stroke="#110E0C" />
            <circle cx="72" cy="42" r="6" fill="#36302B" stroke="#110E0C" />
          </svg>
        );

      // ==========================================
      // --- DAY 3: LEGS ---
      // ==========================================
      case "d3-ex1": // HACK SQUAT
        return (
          <svg viewBox="0 0 160 120" className="w-full h-full">
            <rect x="0" y="0" width="160" height="120" fill="#F8F4EB" />
            {/* Hack slide guides and chassis */}
            <line x1="38" y1="35" x2="115" y2="105" stroke="#5E5345" strokeWidth="3" />
            <line x1="45" y1="105" x2="122" y2="105" stroke="#3D352E" strokeWidth="4.5" />

            {/* Heavy carriage plate slider */}
            <line x1="58" y1="52" x2="95" y2="86" stroke="#36302B" strokeWidth="8" strokeLinecap="round" />

            {/* Knee joint angle in deep hack flexion support */}
            <path d="M 64,57 Q 80,72 88,80" fill="none" stroke="#2B231C" strokeWidth="5.5" strokeLinecap="round" />
            <path d="M 88,80 L 105,74 L 105,102" fill="none" stroke="#2B231C" strokeWidth="4.5" strokeLinejoin="round" />

            {/* Active Quadriceps highlighted in glowing Crimson with muscle contours */}
            <path d="M 88,80 L 102,75" stroke="#DF3B3B" strokeWidth="6.5" strokeLinecap="round" />
            <line x1="90" y1="79" x2="100" y2="76" stroke="#FFF" strokeWidth="0.8" opacity="0.6" />

            <circle cx="62" cy="51" r="5" fill="#FFF" stroke="#2B231C" strokeWidth="1" />
          </svg>
        );

      case "d3-ex2": // LEG EXTENSION
        return (
          <svg viewBox="0 0 160 120" className="w-full h-full">
            <rect x="0" y="0" width="160" height="120" fill="#F8F4EB" />
            {/* Extension base and gears */}
            <rect x="70" y="70" width="30" height="20" fill="#3D352E" stroke="#110E0C" rx="1" />
            <line x1="86" y1="90" x2="86" y2="108" stroke="#5E5345" strokeWidth="2.5" />

            {/* Seated torso straight profile */}
            <path d="M 72,78 L 74,48" stroke="#2B231C" strokeWidth="5.5" strokeLinecap="round" />
            <circle cx="75" cy="38" r="5.2" fill="#FFF" stroke="#2B231C" strokeWidth="1.1" />
            
            {/* Ribcage shading */}
            <path d="M 72,56 C 75,59 75,64 74,70" fill="none" stroke="#8C8070" strokeWidth="0.8" />

            {/* Charcoal Gym Shorts */}
            <rect x="66" y="72" width="14" height="11" fill="#201C18" stroke="#110E0C" />

            {/* Thigh extending straight and horizontally */}
            <line x1="72" y1="78" x2="102" y2="78" stroke="#2B231C" strokeWidth="5.2" strokeLinecap="round" />
            <circle cx="102" cy="78" r="4.5" fill="#36302B" stroke="#110E0C" />

            {/* Active Quadriceps isolated in detailed Crimson Red */}
            <path d="M 76,74 Q 88,73 98,74" fill="none" stroke="#DF3B3B" strokeWidth="6.5" strokeLinecap="round" />
            <line x1="80" y1="74" x2="94" y2="74" stroke="#FFF" strokeWidth="0.6" opacity="0.6" />
          </svg>
        );

      case "d3-ex3": // ADDUCTOR MACHINE
        return (
          <svg viewBox="0 0 160 120" className="w-full h-full">
            <rect x="0" y="0" width="160" height="120" fill="#F8F4EB" />
            {/* Machine base pad */}
            <rect x="60" y="55" width="40" height="30" fill="#3D352E" stroke="#110E0C" rx="3" />
            <line x1="80" y1="85" x2="80" y2="108" stroke="#5E5345" strokeWidth="3" />

            {/* Front facing thigh profile */}
            <line x1="80" y1="55" x2="80" y2="34" stroke="#2B231C" strokeWidth="5.5" strokeLinecap="round" />
            <circle cx="80" cy="25" r="5.2" fill="#FFF" stroke="#2B231C" strokeWidth="1.2" />

            {/* Squeezing adductor padding lever */}
            <path d="M 64,75 Q 80,82 96,75" fill="none" stroke="#2B231C" strokeWidth="5.5" strokeLinecap="round" />
            
            {/* Active Inner Adductor target in Crimson */}
            <path d="M 70,77 Q 80,81 90,77" fill="none" stroke="#DF3B3B" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="74" y1="78" x2="86" y2="78" stroke="#FFF" strokeWidth="0.6" opacity="0.6" />
          </svg>
        );

      case "d3-ex4": // LYING LEG CURL
        return (
          <svg viewBox="0 0 160 120" className="w-full h-full">
            <rect x="0" y="0" width="160" height="120" fill="#F8F4EB" />
            {/* Angled low bench prone */}
            <line x1="30" y1="80" x2="75" y2="72" stroke="#3D352E" strokeWidth="6" strokeLinecap="round" />
            <line x1="75" y1="72" x2="115" y2="84" stroke="#3D352E" strokeWidth="6" strokeLinecap="round" />

            {/* Athlete prone on stomach */}
            <path d="M 38,72 Q 70,66 102,78" fill="none" stroke="#2B231C" strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="34" cy="66" r="5.5" fill="#FFF" stroke="#2B231C" strokeWidth="1" />
            {/* obliques */}
            <path d="M 54,69 Q 62,68 70,72" fill="none" stroke="#8C8070" strokeWidth="0.8" />

            {/* Gym Charcoal Shorts */}
            <path d="M 68,72 L 78,71 L 76,82 Z" fill="#201C18" />

            {/* Calf curl up vertical against heavy lever padding */}
            <path d="M 102,78 L 118,58" stroke="#2B231C" strokeWidth="3" strokeLinecap="round" />
            <circle cx="118" cy="58" r="4.5" fill="#36302B" stroke="#110E0C" />

            {/* Hamstrings (back of legs) isolated in Crimson */}
            <path d="M 78,72 Q 90,73 100,77" fill="none" stroke="#DF3B3B" strokeWidth="5.5" strokeLinecap="round" />
            <line x1="82" y1="72" x2="94" y2="74" stroke="#FFF" strokeWidth="0.6" opacity="0.6" />
          </svg>
        );

      case "d3-ex5": // SEATED LEG CURL
        return (
          <svg viewBox="0 0 160 120" className="w-full h-full">
            <rect x="0" y="0" width="160" height="120" fill="#F8F4EB" />
            {/* leg machines seat frame */}
            <rect x="65" y="70" width="30" height="20" fill="#3D352E" stroke="#110E0C" rx="1.5" />
            <line x1="80" y1="90" x2="80" y2="108" stroke="#5E5345" strokeWidth="2.5" />

            {/* Seated athlete spine profile */}
            <line x1="72" y1="70" x2="75" y2="44" stroke="#2B231C" strokeWidth="5.2" strokeLinecap="round" />
            <circle cx="76" cy="35" r="5" fill="#FFF" stroke="#2B231C" strokeWidth="1" />
            
            {/* obliques */}
            <path d="M 72,52 Q 76,55 74,62" fill="none" stroke="#8C8070" strokeWidth="0.8" />

            {/* Gym Shorts */}
            <rect x="65" y="70" width="15" height="10" fill="#201C18" />

            {/* leg/knee hinge bench extension */}
            <line x1="72" y1="76" x2="98" y2="76" stroke="#2B231C" strokeWidth="4.5" strokeLinecap="round" />
            
            {/* Active Hamstrings highlighted in deep Crimson Red */}
            <path d="M 74,80 Q 86,81 96,80" fill="none" stroke="#DF3B3B" strokeWidth="5.5" strokeLinecap="round" />
            <line x1="78" y1="80" x2="92" y2="80" stroke="#FFF" strokeWidth="0.6" opacity="0.6" />

            {/* Squeezing knee calf back underneath pad */}
            <line x1="98" y1="76" x2="93" y2="98" stroke="#110E0C" strokeWidth="3" strokeLinecap="round" />
            <circle cx="93" cy="98" r="4.5" fill="#36302B" stroke="#110E0C" />
          </svg>
        );

      case "d3-ex6": // LEG PRESS
        return (
          <svg viewBox="0 0 160 120" className="w-full h-full">
            <rect x="0" y="0" width="160" height="120" fill="#F8F4EB" />
            {/* Heavy linear rails of leg press sled */}
            <line x1="45" y1="40" x2="115" y2="110" stroke="#5E5345" strokeWidth="3" />
            
            {/* Seat cushions backrest */}
            <line x1="110" y1="85" x2="128" y2="110" stroke="#3D352E" strokeWidth="5.5" strokeLinecap="round" />
            <line x1="92" y1="110" x2="135" y2="110" stroke="#3D352E" strokeWidth="3" />

            {/* Knees deeply bent profile close to body chest */}
            <path d="M 112,98 L 86,85 L 61,54" fill="none" stroke="#2B231C" strokeWidth="4.2" strokeLinejoin="round" strokeLinecap="round" />
            {/* Gym Shorts */}
            <path d="M 112,98 L 96,91 L 102,84 Z" fill="#201C18" />

            {/* Active Quads thigh isolated in Crimson */}
            <path d="M 86,85 L 72,70" stroke="#DF3B3B" strokeWidth="6" strokeLinecap="round" />
            <line x1="84" y1="81" x2="74" y2="72" stroke="#FFF" strokeWidth="0.8" opacity="0.6" />

            <circle cx="130" cy="100" r="5" fill="#FFF" stroke="#2B231C" strokeWidth="1" />
          </svg>
        );

      // ==========================================
      // --- DAY 4: SHOULDERS ---
      // ==========================================
      case "d4-ex1": // REVERSE FLY (Pec deck style reversed)
        return (
          <svg viewBox="0 0 160 120" className="w-full h-full">
            <rect x="0" y="0" width="160" height="120" fill="#F8F4EB" />
            {/* Machine back facing pads structure */}
            <rect x="74" y="55" width="12" height="35" fill="#3D352E" stroke="#110E0C" rx="1" />
            <line x1="80" y1="90" x2="80" y2="110" stroke="#5E5345" strokeWidth="2.5" />

            {/* Sitting chest supported row */}
            <path d="M 90,82 L 80,55" stroke="#2B231C" strokeWidth="5.5" strokeLinecap="round" />
            <circle cx="78" cy="46" r="5" fill="#FFF" stroke="#2B231C" strokeWidth="1" />
            
            {/* Obliques */}
            <path d="M 84,65 Q 89,74 88,80" fill="none" stroke="#8C8070" strokeWidth="0.8" />

            {/* Gym Black Shorts */}
            <path d="M 90,82 L 98,90 L 98,80 Z" fill="#201C18" />

            {/* Active Rear Deltoid isolation in glowing Crimson */}
            <circle cx="81" cy="54" r="3.5" fill="#DF3B3B" stroke="#B21E1E" strokeWidth="0.8" />
            <path d="M 81,51 Q 84,54 81,57" stroke="#FFF" strokeWidth="0.8" opacity="0.6" fill="none" />

            {/* Flying arms swung outward holding horizontal guides */}
            <path d="M 80,55 Q 98,52 110,64" fill="none" stroke="#2B231C" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="110" cy="64" r="3" fill="#36302B" stroke="#110E0C" />
          </svg>
        );

      case "d4-ex2": // FRONT RAISE
        return (
          <svg viewBox="0 0 160 120" className="w-full h-full">
            <rect x="0" y="0" width="160" height="120" fill="#F8F4EB" />
            {/* Standing profile raising weights straight out */}
            <path d="M 70,40 L 70,80" stroke="#2B231C" strokeWidth="5.5" strokeLinecap="round" />
            <line x1="70" y1="80" x2="68" y2="112" stroke="#2B231C" strokeWidth="4.5" />
            <circle cx="70" cy="29" r="5.5" fill="#FFF" stroke="#2B231C" strokeWidth="1.2" />
            
            {/* Obliques */}
            <path d="M 68,52 Q 72,55 71,62" fill="none" stroke="#8C8070" strokeWidth="0.8" />

            {/* Gym Charcoal Shorts */}
            <rect x="62" y="74" width="14" height="12" fill="#201C18" stroke="#110E0C" rx="1" />

            {/* Active front shoulders cap highlighted in Crimson */}
            <circle cx="73" cy="38" r="3" fill="#DF3B3B" stroke="#B21E1E" strokeWidth="0.8" />
            <path d="M 72,36 Q 77,39 72,42" fill="none" stroke="#DF3B3B" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="71" y1="36" x2="72" y2="40" stroke="#FFF" strokeWidth="0.6" opacity="0.6" />

            {/* Raising arms forward holding horizontal weights */}
            <line x1="70" y1="40" x2="102" y2="40" stroke="#2B231C" strokeWidth="2.8" strokeLinecap="round" />

            {/* dumbbells horizontal side profiles */}
            <line x1="102" y1="32" x2="102" y2="48" stroke="#4A3F35" strokeWidth="2" />
            <circle cx="102" cy="32" r="4.2" fill="#36302B" stroke="#110E0C" />
            <circle cx="102" cy="48" r="4.2" fill="#36302B" stroke="#110E0C" />
          </svg>
        );

      case "d4-ex3": // LATERAL RAISE (T-Pose with Dumbbells)
        return (
          <svg viewBox="0 0 160 120" className="w-full h-full">
            <rect x="0" y="0" width="160" height="120" fill="#F8F4EB" />
            
            {/* Front standing athlete profile */}
            <path d="M 80,38 L 80,80" stroke="#2B231C" strokeWidth="5.5" strokeLinecap="round" />
            <path d="M 80,80 L 75,112 M 80,80 L 85,112" stroke="#2B231C" strokeWidth="4" />
            <circle cx="80" cy="27" r="5.5" fill="#FFF" stroke="#2B231C" strokeWidth="1" />
            
            {/* Six pack details */}
            <line x1="77" y1="48" x2="83" y2="48" stroke="#8C8070" strokeWidth="0.8" />
            <line x1="77" y1="53" x2="83" y2="53" stroke="#8C8070" strokeWidth="0.8" />
            <line x1="76" y1="58" x2="84" y2="58" stroke="#8C8070" strokeWidth="0.8" />

            {/* Gym Black Shorts with gray waistband */}
            <path d="M 80,80 L 70,88 L 90,88 Z" fill="#201C18" stroke="#110E0C" />
            <rect x="74" y="80" width="12" height="2.5" fill="#E6DED0" stroke="#110E0C" strokeWidth="0.5" />

            {/* Side Deltoids highlighted in vivid muscle crimson red */}
            <circle cx="73.5" cy="37" r="3.2" fill="#DF3B3B" stroke="#B21E1E" strokeWidth="0.8" />
            <circle cx="86.5" cy="37" r="3.2" fill="#DF3B3B" stroke="#B21E1E" strokeWidth="0.8" />
            <line x1="72" y1="35" x2="73" y2="38" stroke="#FFF" strokeWidth="0.6" opacity="0.6" />
            <line x1="88" y1="35" x2="87" y2="38" stroke="#FFF" strokeWidth="0.6" opacity="0.6" />

            {/* Arms raised outwards sideways (T-pose) */}
            <line x1="80" y1="38" x2="114" y2="38" stroke="#2B231C" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="80" y1="38" x2="46" y2="38" stroke="#2B231C" strokeWidth="2.5" strokeLinecap="round" />

            {/* Weighted dumbells raised to shoulders height on sides */}
            <g stroke="#3D352E" strokeWidth="1.8">
              <line x1="46" y1="30" x2="46" y2="46" />
              <circle cx="46" cy="30" r="4.2" fill="#36302B" stroke="#110E0C" />
              <circle cx="46" cy="46" r="4.2" fill="#36302B" stroke="#110E0C" />

              <line x1="114" y1="30" x2="114" y2="46" />
              <circle cx="114" cy="30" r="4.2" fill="#36302B" stroke="#110E0C" />
              <circle cx="114" cy="46" r="4.2" fill="#36302B" stroke="#110E0C" />
            </g>
          </svg>
        );

      case "d4-ex4": // SHOULDER PRESS
        return (
          <svg viewBox="0 0 160 120" className="w-full h-full">
            <rect x="0" y="0" width="160" height="120" fill="#F8F4EB" />
            {/* Seated upright chair back support */}
            <rect x="70" y="65" width="20" height="42" fill="#3D352E" stroke="#110E0C" rx="1.5" />
            <line x1="80" y1="107" x2="80" y2="113" stroke="#5E5345" strokeWidth="2.5" />

            {/* Seated athlete vertically straight */}
            <path d="M 80,75 L 80,44" stroke="#2B231C" strokeWidth="5" strokeLinecap="round" />
            <circle cx="80" cy="33" r="5" fill="#FFF" stroke="#2B231C" strokeWidth="1" />
            
            {/* Abs core */}
            <line x1="77" y1="52" x2="83" y2="52" stroke="#8C8070" strokeWidth="0.8" />
            <line x1="77" y1="57" x2="83" y2="57" stroke="#8C8070" strokeWidth="0.8" />

            {/* Shoulder caps highlighted in vivid Crimson */}
            <path d="M 74,40 C 74,44 86,44 86,40" fill="none" stroke="#DF3B3B" strokeWidth="5" strokeLinecap="round" />
            <circle cx="75" cy="41" r="1.5" fill="#FFF" opacity="0.6" />
            <circle cx="85" cy="41" r="1.5" fill="#FFF" opacity="0.6" />

            {/* Presses heavy dumbbells high overhead */}
            <path d="M 77,44 L 66,24 L 66,16" fill="none" stroke="#2B231C" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 83,44 L 94,24 L 94,16" fill="none" stroke="#2B231C" strokeWidth="2.5" strokeLinecap="round" />

            {/* dumbbells overhead layout details */}
            <g stroke="#3D352E" strokeWidth="1.8">
              <line x1="60" y1="14" x2="72" y2="14" />
              <circle cx="60" cy="14" r="4" fill="#36302B" stroke="#110E0C" />
              <circle cx="72" cy="14" r="4" fill="#36302B" stroke="#110E0C" />

              <line x1="88" y1="14" x2="100" y2="14" />
              <circle cx="88" cy="14" r="4" fill="#36302B" stroke="#110E0C" />
              <circle cx="100" cy="14" r="4" fill="#36302B" stroke="#110E0C" />
            </g>
          </svg>
        );

      // ==========================================
      // --- DAY 5: ARMS (Triceps, Biceps Curl mapped above) ---
      // ==========================================
      case "d5-ex3": // STRAIGHT BAR PUSHDOWN
        return (
          <svg viewBox="0 0 160 120" className="w-full h-full">
            <rect x="0" y="0" width="160" height="120" fill="#F8F4EB" />
            {/* Pulley system machine cable straight bars */}
            <line x1="120" y1="15" x2="120" y2="110" stroke="#5E5345" strokeWidth="2.5" />
            <circle cx="120" cy="22" r="5" fill="#FAF6EE" stroke="#2B231C" />

            {/* Standing athlete slightly bent */}
            <path d="M 74,42 L 70,78" stroke="#2B231C" strokeWidth="5.5" strokeLinecap="round" />
            <path d="M 70,78 L 74,111" stroke="#2B231C" strokeWidth="4.5" />
            <circle cx="75" cy="30" r="5" fill="#FFF" stroke="#2B231C" strokeWidth="1" />
            
            {/* Rib shading */}
            <path d="M 74,48 Q 78,51 77,58" fill="none" stroke="#8C8070" strokeWidth="0.8" />

            {/* Gym Shorts */}
            <path d="M 70,78 L 62,94 L 76,94 Z" fill="#201C18" stroke="#110E0C" />

            {/* Active Triceps highlighted glowing crimson */}
            <ellipse cx="69.5" cy="51" rx="2.5" ry="5.5" fill="#DF3B3B" stroke="#B21E1E" strokeWidth="0.8" />
            <line x1="69" y1="46" x2="71" y2="56" stroke="#FFF" strokeWidth="0.6" opacity="0.6" />

            {/* Cable pulled down to straight bar attachment */}
            <line x1="120" y1="22" x2="90" y2="57" stroke="#110E0C" strokeWidth="1" strokeDasharray="3,1" />
            <line x1="85" y1="57" x2="95" y2="57" stroke="#3D352E" strokeWidth="3" strokeLinecap="round" />

            {/* bended arms profile grip */}
            <path d="M 74,40 L 86,52 L 90,57" fill="none" stroke="#2B231C" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );

      default: // FALLBACK TEMPLATE
        return (
          <svg viewBox="0 0 160 120" className="w-full h-full">
            <rect x="0" y="0" width="160" height="120" fill="#F8F4EB" />
            <circle cx="80" cy="50" r="14" fill="#6E1B1D" opacity="0.1" />
            <circle cx="80" cy="50" r="2" fill="#6E1B1D" />
            <line x1="40" y1="50" x2="120" y2="50" stroke="#4A3F35" strokeWidth="1.5" />
            <line x1="40" y1="42" x2="40" y2="58" stroke="#4A3F35" strokeWidth="2.5" />
            <line x1="120" y1="42" x2="120" y2="58" stroke="#4A3F35" strokeWidth="2.5" />
          </svg>
        );
    }
  };

  const getAnatomicalSpecs = (id: string, name: string) => {
    switch (id) {
      case "d1-ex1":
        return {
          primary: "Pectoralis Major (Pectoral chest muscles)",
          secondary: "Triceps Brachii, Anterior Deltoids (Front Shoulder)",
          activation: "Excellent recruitment of the sternocostal head of chest muscle fibers. Highly defined muscle tissue expands outward during the pressing motion.",
          scannedAnatomy: "The red zones highlight active mechanical pressing pathways. Shading lines showcase forearm stabilization and abdominal compression."
        };
      case "d1-ex2":
        return {
          primary: "Clavicular Head of Pectoralis Major (Upper Chest)",
          secondary: "Anterior Deltoids, Triceps Brachii",
          activation: "Angles of 30-45 degrees focus tension directly on upper muscle fibers. Defining striations peak as you approach lockout.",
          scannedAnatomy: "Crimson highlight represents clavicular pectoralis activation. Concentric load reaches maximum contraction at the shoulder girdle."
        };
      case "d1-ex3":
        return {
          primary: "Pectoralis Major (Inner & Outer Chest)",
          secondary: "Anterior Deltoids",
          activation: "Horizontal abduction isolates chest without triceps assist. Deep stretch aligns muscle fibers for extreme hypertrophy.",
          scannedAnatomy: "Targeted outer-to-inner pectoral sweep. Fine skeletal cross-hatching showcases Core abdominal stability."
        };
      case "d1-ex4":
      case "d5-ex1":
        return {
          primary: "Triceps Brachii (Lateral & Medial Heads)",
          secondary: "Anconeus, Forearms (Stabilization)",
          activation: "Elbow extension isolates the posterior arm muscles. Concentric squeeze forces maximum vascularity and definition.",
          scannedAnatomy: "The rear arm highlight isolates active tricep fiber channels during the downward extension phase."
        };
      case "d1-ex5":
      case "d5-ex2":
        return {
          primary: "Triceps Brachii (Long Head)",
          secondary: "Lateral Head, Forearm flexors",
          activation: "Keeping the arms overhead puts the long head under supreme tension. Defines absolute back-arm thickness and shape.",
          scannedAnatomy: "Overhead triangular alignment targets long head muscle tissue. Graphite shading demonstrates shoulder stability."
        };
      case "d1-ex6":
        return {
          primary: "Triceps Brachii (Overall Block Thickness)",
          secondary: "Anterior Deltoids, Forearms",
          activation: "A fundamental heavy hypertrophy builder. Keeps the lateral and medial heads locked under maximum isolation.",
          scannedAnatomy: "Horizontal profile demonstrates intense triceps engagement next to forehead. Deep shading shows chest and back alignment."
        };
      case "d2-ex1":
        return {
          primary: "Latissimus Dorsi (Lats - Wide Upper Back)",
          secondary: "Rhomboids, Teres Major, Biceps Brachii",
          activation: "Vertical pull expands lats outward creating a distinct V-shape shadow. High volume of fibers are recruited on the lower curve.",
          scannedAnatomy: "Crimson wings illustrate broad latissimus expansion. Shaded lines represent lower lumbar and core posture stabilization."
        };
      case "d2-ex2":
        return {
          primary: "Rhomboids, Middle Trapezius (Back Thickness)",
          secondary: "Latissimus Dorsi, Biceps Brachii, Forearms",
          activation: "Horizontal pulling builds absolute density. Peak retraction squeezes the inner spine muscle clusters.",
          scannedAnatomy: "Central back highlight targets deep rhomboids and lower trapezius line works. Shading shows seated spine alignment."
        };
      case "d2-ex3":
        return {
          primary: "Upper Latissimus Dorsi, Posterior Deltoid (Rear Shoulder)",
          secondary: "Rhomboids, Biceps Brachii",
          activation: "Leaning chest-down removes momentum. Forces posterior delts and mid-traps to retract with pristine insulation.",
          scannedAnatomy: "Angle emphasizes upper traps and rear shoulder cap. Striation lining highlights outer shoulder contours."
        };
      case "d2-ex4":
      case "d5-ex4":
        return {
          primary: "Biceps Brachii (Short Head and Long Head)",
          secondary: "Brachialis, Brachioradialis (Forearm)",
          activation: "The absolute standard for bicep peaks. Pinning elbows maximizes isolation across the entire anterior arm.",
          scannedAnatomy: "Crimson peak highlights biceps concentration. Vertical gray line shading illustrates rigid forearm and forearm flexor engagement."
        };
      case "d2-ex5":
      case "d5-ex5":
        return {
          primary: "Brachialis, Brachioradialis (Outer Biceps/Forearm)",
          secondary: "Biceps Brachii (Long Head)",
          activation: "Neutral grip transfers tension to outer arm blocks. Creates a wide, powerful arm look from the front view.",
          scannedAnatomy: "Outer arm highlight isolates the deep brachialis. Parallel line work demonstrates finger and forearm grip firmness."
        };
      case "d2-ex6":
      case "d5-ex6":
        return {
          primary: "Lower Biceps Brachii (Short Head / Insertion)",
          secondary: "Brachialis, Forearm Flexors",
          activation: "Resting on the angled pad completely isolates the biceps, eliminating cheating or body sway.",
          scannedAnatomy: "Hyper-focused biceps peak. Grounded arm-pad shading illustrates solid structural isolation and leverage."
        };
      case "d3-ex1":
        return {
          primary: "Quadriceps Femoris (Rectus Femoris, Vastus Lateralis)",
          secondary: "Gluteus Maximus, Hamstrings, Adductors",
          activation: "Static back support isolates the quad sweep. Outstanding activation of outer quad tissue under deep knee bends.",
          scannedAnatomy: "Broad leg highlight illustrates the intense quad sweep recruitment. Shading lines map high-precision footplate stability."
        };
      case "d3-ex2":
        return {
          primary: "Quadriceps (Vastus Medialis - Teardrop Muscle)",
          secondary: "Rectus Femoris",
          activation: "The ultimate insulation tool for leg definition. Highlighted white striation lines peak during absolute straight extension.",
          scannedAnatomy: "Isolates front thigh muscles. Dense skeletal cross-hatching highlights vastus medialis expansion."
        };
      case "d3-ex3":
        return {
          primary: "Gracilis, Adductor Longus (Inner Thigh)",
          secondary: "Pectineus, Pelvic floor (Core stabilization)",
          activation: "Squeezing inward isolates inner muscle columns. Critical for squat stabilization and deep aesthetic cuts.",
          scannedAnatomy: "Active inner groin highlight. Detailed gray lines represent seated pelvic alignment and outer leg rest posture."
        };
      case "d3-ex4":
        return {
          primary: "Biceps Femoris, Semitendinosus (Hamstrings)",
          secondary: "Gastrocnemius (Calves)",
          activation: "Prone leg curl isolates the back leg fibers. Demands controlled eccentric release to maximize tissue tension.",
          scannedAnatomy: "Active back thigh muscle highlighting. Shading lines depict calf stabilization against the padded lever."
        };
      case "d3-ex5":
        return {
          primary: "Biceps Femoris (Hamstring Outer & Inner Muscle)",
          secondary: "Gastrocnemius (Calf)",
          activation: "Seated posture targets the hamstrings at a pre-stretched hip angle, yielding extreme hypertrophic force.",
          scannedAnatomy: "Detailed back thigh lining. Double cross-hatching illustrates hamstring sweep muscle insertion points."
        };
      case "d3-ex6":
        return {
          primary: "Quadriceps Femoris, Gluteus Maximus",
          secondary: "Hamstrings, Soleus (Calf)",
          activation: "Excellent closed-chain hypertrophy builder. Stabilized spine lets you push superior load with pure leg drive.",
          scannedAnatomy: "Deep hip and knee flexion. Shading showcases backpad rest stability and high-tension quadriceps expansion."
        };
      case "d4-ex1":
        return {
          primary: "Posterior Deltoids (Rear Shoulders)",
          secondary: "Infraspinatus, Middle Trapezius",
          activation: "Horizontal abduction moves force to the posterior shoulder cap, correcting desk posture and adding 3D thickness.",
          scannedAnatomy: "Active rear delt circle highlighting. Shaded parallel lines show scapular stabilizer engagement."
        };
      case "d4-ex2":
        return {
          primary: "Anterior Deltoid (Front Shoulder Cap)",
          secondary: "Clavicular Pectoralis (Upper Chest), Serratus Anterior",
          activation: "Isolates the front shoulder head. Raising slightly above eye level captures key concentric fibers.",
          scannedAnatomy: "Active front shoulder highlight. Linear shading shows rigid spine posture and dumbbell grip stabilization."
        };
      case "d4-ex3":
        return {
          primary: "Lateral Deltoid (Side Shoulder Caps)",
          secondary: "Anterior Deltoid, Upper Trapezius",
          activation: "The most important exercise for wide shoulders. Squeezing outwards expands the upper frame silhouette.",
          scannedAnatomy: "Vivid side shoulder highlight. Shaded lines represent strict T-pose alignment and wrist control."
        };
      case "d4-ex4":
        return {
          primary: "Anterior and Lateral Deltoids (Shoulders)",
          secondary: "Triceps Brachii, Upper Chest, Trapezius",
          activation: "Primary compound exercise for supreme overhead pressing strength and shoulder mass.",
          scannedAnatomy: "Overhead vertical press highlighting. Shaded parallel line work demonstrates abdominal core rigidity."
        };
      case "d5-ex3":
        return {
          primary: "Triceps Brachii (Medial & Lateral Heads)",
          secondary: "Latissimus Dorsi (Stabilization), Forearms",
          activation: "Straight bar provides solid leverage to squeeze triceps at bottom. Ideal for raw elbow lockout power.",
          scannedAnatomy: "Active tricep fiber channel highlights. Cross-hatched forearm shading maps wrist locking rigid form."
        };
      default:
        return {
          primary: exerciseName,
          secondary: "Stabilizing muscle groups",
          activation: "A foundational exercise that isolates prime movement fibers. Drive control and mechanical tempo.",
          scannedAnatomy: "High-contrast highlighting outlines contracting anatomical sectors. Gray pencil lines indicate stabilizer tension."
        };
    }
  };

  const specs = getAnatomicalSpecs(exerciseId, exerciseName);

  return (
    <>
      {/* 1. Exercise Diagram Thumbnail Card */}
      <div 
        id={`exercise-illus-${exerciseId}`}
        onClick={() => setIsZoomed(true)}
        className="w-24 h-24 sm:w-28 sm:h-28 bg-[#F8F4EB] border border-[#DDD4C5] rounded-xl flex items-center justify-center p-1.5 shadow-2xs shrink-0 relative overflow-hidden group cursor-pointer hover:border-[#6E1B1D] transition-all hover:shadow-xs active:scale-95"
      >
        {/* Style Overrides for Active Highlighting and Dynamic Muscle Striations */}
        <style dangerouslySetInnerHTML={{ __html: `
          #exercise-illus-${exerciseId} svg path[stroke="#FFF"],
          #exercise-illus-${exerciseId} svg line[stroke="#FFF"] {
            stroke-width: 0.6px !important;
            opacity: 0.65 !important;
          }
          #exercise-illus-${exerciseId} svg path[stroke="#800D0D"],
          #exercise-illus-${exerciseId} svg line[stroke="#800D0D"] {
            stroke-width: 0.5px !important;
            opacity: 0.75 !important;
          }
          /* Hover micro-animation for flexing */
          #exercise-illus-${exerciseId}:hover svg path[fill="#DF3B3B"],
          #exercise-illus-${exerciseId}:hover svg path[stroke="#DF3B3B"] {
            animation: thumbnail-vibe 1.2s infinite ease-in-out;
          }
          @keyframes thumbnail-vibe {
            0%, 100% { opacity: 0.85; }
            50% { opacity: 1; filter: drop-shadow(0 0 2px #DF3B3B); }
          }
        `}} />

        {/* Visual canvas labels */}
        <div className="absolute top-1 left-2 text-[7px] font-mono font-bold text-[#8C7D70]/85 select-none uppercase tracking-wider z-10 transition-colors group-hover:text-[#6E1B1D]">
          ANATOMY
        </div>

        {/* Hover overlay hint */}
        <div className="absolute inset-0 bg-[#6E1B1D]/5 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-center p-1 z-10">
          <ZoomIn className="w-4 h-4 text-[#6E1B1D] drop-shadow-2xs animate-bounce" />
          <span className="text-[7px] font-mono font-bold text-[#6E1B1D] uppercase tracking-tighter mt-1">ZOOM HD</span>
        </div>

        {/* Dynamic sketch rendering art */}
        <div className="w-full h-full flex items-center justify-center">
          {renderArt()}
        </div>
      </div>

      {/* 2. Full-Screen Interactive Magnifying Lightbox Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 bg-neutral-900/75 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-fade-in"
          onClick={() => setIsZoomed(false)}
        >
          {/* Style injection for High Definition rendering inside the modal canvas */}
          <style dangerouslySetInnerHTML={{ __html: `
            /* HD Anatomy overrides */
            .anatomy-canvas-zoomed svg path[stroke="#FFF"],
            .anatomy-canvas-zoomed svg line[stroke="#FFF"] {
              stroke-width: ${0.65 * striationDepth}px !important;
              opacity: ${0.5 + (striationDepth - 1.0) * 0.23} !important;
              transition: stroke-width 0.2s ease, opacity 0.2s ease;
            }
            .anatomy-canvas-zoomed svg path[stroke="#800D0D"],
            .anatomy-canvas-zoomed svg line[stroke="#800D0D"] {
              stroke-width: ${0.55 * striationDepth}px !important;
              opacity: ${0.6 + (striationDepth - 1.0) * 0.20} !important;
              transition: stroke-width 0.2s ease, opacity 0.2s ease;
            }
            .anatomy-canvas-zoomed svg path[fill="#DF3B3B"],
            .anatomy-canvas-zoomed svg path[stroke="#DF3B3B"],
            .anatomy-canvas-zoomed svg ellipse[fill="#DF3B3B"] {
              animation: ${isFlexing ? "anatomy-flex-pulsate 1.5s infinite ease-in-out" : "none"};
              transition: filter 0.3s ease;
            }
            @keyframes anatomy-flex-pulsate {
              0%, 100% {
                opacity: 0.85;
                filter: saturate(1.1) drop-shadow(0 0 1px rgba(223, 59, 59, 0.4));
              }
              50% {
                opacity: 1.0;
                filter: saturate(1.4) drop-shadow(0 0 6px rgba(223, 59, 59, 0.95));
              }
            }
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            .animate-fade-in {
              animation: fadeIn 0.2s ease-out forwards;
            }
          `}} />

          {/* Modal Card content Container */}
          <div 
            className="bg-[#FAF7F2] border-2 border-[#DDD4C5] rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden text-left relative flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#EFEAE1]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Column: Visual Canvas Rendering Box */}
            <div className="flex-1 p-6 flex flex-col items-center justify-center bg-[#FDFBF9] relative min-h-[280px]">
              {/* Scientific scan lines design */}
              <div className="absolute top-2 left-3 text-[8px] font-mono font-bold text-[#8C7D70] tracking-wider uppercase select-none opacity-85">
                ANATOMICAL RETINA DISSECTOR
              </div>
              <div className="absolute top-2 right-3 text-[8px] font-mono text-[#B3A899] select-none uppercase">
                GRID RESOLUTION: 4K
              </div>

              {/* Large HD Rendered SVG */}
              <div className="w-64 h-64 sm:w-72 sm:h-72 p-4 bg-[#F8F4EB] border border-[#EAE2D3] rounded-xl flex items-center justify-center shadow-inner relative anatomy-canvas-zoomed overflow-hidden">
                <div className="absolute inset-0 pointer-events-none border border-red-500/10 bg-[linear-gradient(rgba(110,27,29,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(110,27,29,0.02)_1px,transparent_1px)] bg-[size:16px_16px]"></div>
                {renderArt()}
              </div>

              {/* Dynamic status line helper */}
              <div className="mt-4 flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#8C7D70] uppercase tracking-tight">
                <Microscope className="w-3.5 h-3.5 text-[#6E1B1D]" /> Click components to focus
              </div>
            </div>

            {/* Right Column: Interactive specs and tuning sliders */}
            <div className="w-full md:w-80 p-6 flex flex-col justify-between bg-[#FAF7F2] gap-5">
              {/* Modal header details */}
              <div>
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="text-[10px] font-mono font-black text-[#6E1B1D] tracking-widest uppercase">
                      Hypertrophy Chart Focus
                    </span>
                    <h2 className="text-xl font-black text-[#3A2F28] uppercase font-display mt-0.5 tracking-tight leading-tighter">
                      {exerciseName}
                    </h2>
                  </div>
                  <button 
                    onClick={() => setIsZoomed(false)}
                    className="p-1 rounded-full border border-[#DDD4C5] hover:border-[#6E1B1D] hover:bg-[#F3EFE6] text-[#8C7D70] hover:text-[#6E1B1D] transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Primary targeted muscles */}
                <div className="mt-5 space-y-3.5">
                  <div>
                    <span className="block text-[9px] font-mono font-bold text-[#8C7A68] uppercase">
                      Primary Target (Crimson)
                    </span>
                    <div className="flex items-center gap-1.5 mt-1 font-sans">
                      <span className="w-2 h-2 rounded-full bg-[#DF3B3B] animate-ping"></span>
                      <span className="text-xs font-bold text-[#9C1E1E]">
                        {specs.primary.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="block text-[9px] font-mono font-bold text-[#8C7A68] uppercase">
                      Synergists & Stabilizers
                    </span>
                    <p className="text-xs font-semibold text-[#5C5246] mt-1 pr-1 leading-snug">
                      {specs.secondary}
                    </p>
                  </div>
                </div>
              </div>

              {/* STRIATION SCAN CONTROLS (Responsive to user requests) */}
              <div className="border-t border-[#EFEAE1]/90 pt-4.5 space-y-4">
                {/* 1. Striation Density Slider */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-mono font-bold text-[#8C7A68] uppercase flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#6E1B1D]" /> Muscle Definition Depth
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#6E1B1D]">
                      {striationDepth.toFixed(1)}x
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="1.0" 
                    max="3.0" 
                    step="0.1"
                    value={striationDepth}
                    onChange={(e) => setStriationDepth(parseFloat(e.target.value))}
                    className="w-full accent-[#6E1B1D] h-1.5 bg-[#EFEAE1] rounded-lg cursor-pointer transition-all border border-[#DDD5C5]"
                  />
                  <div className="flex justify-between text-[8px] font-mono text-[#8C7A68] mt-1 uppercase">
                    <span>Soft Outline</span>
                    <span>Striated Muscle Fibers</span>
                  </div>
                </div>

                {/* 2. Flexing Pulsator Toggle Button */}
                <button 
                  onClick={() => setIsFlexing(!isFlexing)}
                  className={`w-full py-2 px-3 rounded-lg border flex items-center justify-between transition-all cursor-pointer ${
                    isFlexing 
                      ? "bg-[#6E1B1D]/5 text-[#6E1B1D] border-[#6E1B1D]/45 font-bold" 
                      : "bg-[#F3EFE6] text-[#8C7A68] border-[#DDD5C5] hover:text-[#3A2F28] hover:border-[#8C7A68]"
                  }`}
                >
                  <span className="text-xs flex items-center gap-1.5 uppercase font-mono tracking-tight text-left">
                    <Activity className={`w-3.5 h-3.5 ${isFlexing ? "animate-spin" : ""}`} /> 
                    {isFlexing ? "Flexing Wave Active" : "Static Sketch State"}
                  </span>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${isFlexing ? "bg-[#DF3B3B] text-white" : "bg-[#DDD5C5]"}`}>
                    {isFlexing ? "ON" : "OFF"}
                  </span>
                </button>
              </div>

              {/* BIOMECHANICAL INSIGHT CARD */}
              <div className="bg-[#FAF1E3] rounded-xl p-3 border border-[#E9DFCB]">
                <h4 className="text-[9px] font-mono font-bold text-[#6E1B1D] uppercase tracking-wider mb-1">
                  Biomechanical Focus
                </h4>
                <p className="text-[10.5px] text-[#5C5246] leading-relaxed italic">
                  "{specs.activation}"
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

