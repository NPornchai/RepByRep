import { WorkoutDay, Exercise } from "../types";

// Helper to generate default sets
const createDefaultSets = (count: number, repsStr: string): any[] => {
  const sets = [];
  // Parse standard reps, e.g., "10-12" defaults to 12
  const reps = parseInt(repsStr.split("-")[1]) || 12;
  for (let i = 0; i < count; i++) {
    sets.push({
      id: `set-${Math.random().toString(36).substr(2, 9)}`,
      setIndex: i + 1,
      reps: reps,
      weight: 0,
      completed: false,
    });
  }
  return sets;
};

export const defaultWorkouts: WorkoutDay[] = [
  {
    id: "day-1",
    dayNumber: 1,
    title: "DAY 1",
    subtitle: "CHEST & TRICEPS",
    exercises: [
      {
        id: "d1-ex1",
        name: "BENCH PRESS",
        targetMuscles: ["Chest", "Triceps", "Front Delts"],
        sets: createDefaultSets(3, "10-12"),
        defaultSets: 3,
        defaultReps: "10-12",
        description: "The ultimate compound movement for upper body pressing power and chest development.",
        instructions: [
          "Lie flat on your back on a flat bench.",
          "Grip the barbell with hands slightly wider than shoulder-width.",
          "Unrack the bar and lower it controlled to your mid-chest line.",
          "Drive the bar straight up with power, locking out your elbows."
        ],
        equipment: "Barbell & Flat Bench"
      },
      {
        id: "d1-ex2",
        name: "INCLINE BENCH PRESS",
        targetMuscles: ["Upper Chest", "Front Delts", "Triceps"],
        sets: createDefaultSets(3, "10-12"),
        defaultSets: 3,
        defaultReps: "10-12",
        description: "Focuses on the upper portion of the pectoralis major and front shoulders.",
        instructions: [
          "Sit on an incline bench angled at roughly 30 to 45 degrees.",
          "Unrack the barbell or hold two dumbbells at your chest height.",
          "Press the weight upward until arms are fully extended.",
          "Lower with control back toward the upper chest."
        ],
        equipment: "Incline Bench & Barbell/Dumbbells"
      },
      {
        id: "d1-ex3",
        name: "CHEST FLY",
        targetMuscles: ["Chest"],
        sets: createDefaultSets(3, "10-12"),
        defaultSets: 3,
        defaultReps: "10-12",
        description: "Isolates the chest muscles, emphasizing deep stretch and contraction.",
        instructions: [
          "Use a fly machine or lie on a flat bench with dumbbells.",
          "Keep a slight bend in your elbows and open arms wide to feel the chest stretch.",
          "Squeeze your chest muscles to bring your hands back together in an arcing motion."
        ],
        equipment: "Pec Dec Machine or dumbbells"
      },
      {
        id: "d1-ex4",
        name: "TRICEP PUSHDOWN",
        targetMuscles: ["Triceps"],
        sets: createDefaultSets(3, "10-12"),
        defaultSets: 3,
        defaultReps: "10-12",
        description: "An isolation exercise that builds the lateral and medial heads of the triceps.",
        instructions: [
          "Stand facing a cable pulley machine with a rope or bar attachment.",
          "Keep your elbows tucked into your sides and squeeze the triceps to press downwards.",
          "Flare your hands out at the bottom for maximum tricep contraction.",
          "Slowly release back to the start position while keeping elbows locked in place."
        ],
        equipment: "Cable Machine (Rope or Bar)"
      },
      {
        id: "d1-ex5",
        name: "OVERHEAD EXTENSION",
        targetMuscles: ["Triceps"],
        sets: createDefaultSets(3, "10-12"),
        defaultSets: 3,
        defaultReps: "10-12",
        description: "Targets the long head of the triceps by keeping your arms in an overhead position.",
        instructions: [
          "Sit or stand, holding a heavy dumbbell overhead with both hands.",
          "Lower the dumbbell slowly behind your head by bending your elbows.",
          "Keep your upper arms stationary next to your ears.",
          "Extend your elbows to press the dumbbell back to the ceiling."
        ],
        equipment: "Dumbbell"
      },
      {
        id: "d1-ex6",
        name: "SKULL CRUSHERS",
        targetMuscles: ["Triceps"],
        sets: createDefaultSets(3, "10-12"),
        defaultSets: 3,
        defaultReps: "10-12",
        description: "A highly effective flat bench movement for building dense, powerful triceps.",
        instructions: [
          "Lie flat on a bench holding an EZ-bar or dumbbells directly above your chest.",
          "Hinge only at the elbows to lower the weight down towards your forehead.",
          "Push the weight back up using only tricep force to lock out."
        ],
        equipment: "EZ-Bar or Dumbbells"
      }
    ]
  },
  {
    id: "day-2",
    dayNumber: 2,
    title: "DAY 2",
    subtitle: "BACK & BICEPS",
    exercises: [
      {
        id: "d2-ex1",
        name: "LAT PULLDOWN",
        targetMuscles: ["Back", "Lats", "Biceps"],
        sets: createDefaultSets(3, "10-12"),
        defaultSets: 3,
        defaultReps: "10-12",
        description: "Excellent vertical pulling movement to build a wide V-taper frame.",
        instructions: [
          "Sit at a lat pulldown station and adjust the thigh pad.",
          "Grip the bar wider than shoulder-width with a secure grip.",
          "Pull the bar down toward your upper chest, pulling your shoulders back and down.",
          "Squeeze your lat muscles and raise the bar slowly back to full extension."
        ],
        equipment: "Lat Pulldown Machine"
      },
      {
        id: "d2-ex2",
        name: "CABLE ROW",
        targetMuscles: ["Back", "Mid-Back", "Biceps"],
        sets: createDefaultSets(3, "10-12"),
        defaultSets: 3,
        defaultReps: "10-12",
        description: "Targets thickness in the middle back, rhomboids, and lower traps.",
        instructions: [
          "Sit on the cable row bench with feet on the platform and knees bent slightly.",
          "Grip the handle attachment and sit upright with a straight spine.",
          "Pull the handle toward your lower stomach, pulling elbows past your sides.",
          "Exhale and squeeze the back muscles, then extend arms back forward."
        ],
        equipment: "Seated Cable Row Machine"
      },
      {
        id: "d2-ex3",
        name: "INCLINE HIGH ROW",
        targetMuscles: ["Back", "Upper Back", "Rear Delts"],
        sets: createDefaultSets(3, "10-12"),
        defaultSets: 3,
        defaultReps: "10-12",
        description: "An angled rowing motion that recruits the upper back, rear delts, and traps.",
        instructions: [
          "Lie chest-down on an incline bench holding dumbbells in each hand.",
          "Let your arms hang straight down towards the floor.",
          "Row the weights up towards your chest, keeping elbows wide.",
          "Lower weights with control to full arm stretch."
        ],
        equipment: "Incline Bench & Dumbbells"
      },
      {
        id: "d2-ex4",
        name: "BARBELL CURL",
        targetMuscles: ["Biceps"],
        sets: createDefaultSets(3, "10-12"),
        defaultSets: 3,
        defaultReps: "10-12",
        description: "The classic mass builder for bicep peaks.",
        instructions: [
          "Stand tall holding a barbell with underhand shoulder-width grip.",
          "Keep elbows pinned to your waist.",
          "Flex your biceps to curl the weight up towards your chest.",
          "Lower back down slowly, keeping constant tension on biceps."
        ],
        equipment: "Barbell"
      },
      {
        id: "d2-ex5",
        name: "INCLINE HAMMER CURL",
        targetMuscles: ["Biceps", "Brachialis"],
        sets: createDefaultSets(3, "10-12"),
        defaultSets: 3,
        defaultReps: "10-12",
        description: "Uses a neutral grip to target the brachialis and brachioradialis, adding thickness to the arm.",
        instructions: [
          "Sit on an incline bench holding dumbbells with your palms facing each other (neutral grip).",
          "Without moving your upper arms, curl the weights up.",
          "Lower key weights back to full extension, maintaining neutral wrist alignment."
        ],
        equipment: "Incline Bench & Dumbbells"
      },
      {
        id: "d2-ex6",
        name: "PREACHER CURL",
        targetMuscles: ["Biceps"],
        sets: createDefaultSets(3, "10-12"),
        defaultSets: 3,
        defaultReps: "10-12",
        description: "Locks the arms on a pad to prevent momentum and isolate the lower bicep region.",
        instructions: [
          "Sit at a preacher bench and rest the back of your upper arms on the angled pad.",
          "Grip a barbell or EZ-bar with palms up.",
          "Curl the bar up towards your chin while keeping arms firmly on the pad.",
          "Lower the bar slowly to full arm extension before starting next rep."
        ],
        equipment: "Preacher Bench & EZ-Bar"
      }
    ]
  },
  {
    id: "day-3",
    dayNumber: 3,
    title: "DAY 3",
    subtitle: "LEGS",
    exercises: [
      {
        id: "d3-ex1",
        name: "HACK SQUAT",
        targetMuscles: ["Quads", "Glutes", "Hamstrings"],
        sets: createDefaultSets(3, "10-12"),
        defaultSets: 3,
        defaultReps: "10-12",
        description: "Builds absolute leg mass and power with a stabilized back support.",
        instructions: [
          "Place your back flat against the pad of the hack squat machine, shoulders under pads.",
          "Position your feet shoulder-width apart on the template platform.",
          "Disengage safety locks and lower yourself by bending knees to 90 degrees.",
          "Drive firmly through your heels to return to standing."
        ],
        equipment: "Hack Squat Machine"
      },
      {
        id: "d3-ex2",
        name: "LEG EXTENSION",
        targetMuscles: ["Quads"],
        sets: createDefaultSets(3, "10-12"),
        defaultSets: 3,
        defaultReps: "10-12",
        description: "Pure isolation movement targeting the quadriceps (rectus femoris, vastus lateralis, and medialis).",
        instructions: [
          "Adjust seat back so your knees line up with the machine's pivot point.",
          "Hook ankles under the padded bar.",
          "Hold the side handles for stability and extend your knees until straight.",
          "Hold the contraction shortly, then lower under steady control."
        ],
        equipment: "Leg Extension Machine"
      },
      {
        id: "d3-ex3",
        name: "ADDUCTOR MACHINE",
        targetMuscles: ["Adductors"],
        sets: createDefaultSets(3, "10-12"),
        defaultSets: 3,
        defaultReps: "10-12",
        description: "Targets the inner thigh muscles responsible for hip stability and balance.",
        instructions: [
          "Sit comfortably in the adductor machine with feet on the footplates.",
          "Squeeze your thighs inward against the resistance pads.",
          "Pause when pads meet, then controlled-release back to outer position."
        ],
        equipment: "Adductor Machine"
      },
      {
        id: "d3-ex4",
        name: "LYING LEG CURL",
        targetMuscles: ["Hamstrings"],
        sets: createDefaultSets(3, "10-12"),
        defaultSets: 3,
        defaultReps: "10-12",
        description: "Isolates the posterior leg, emphasizing hamstring sweep.",
        instructions: [
          "Lie face down on the leg curl machine, locking legs under pad at ankle width.",
          "Keep your hips pressed firmly into the bench pad.",
          "Curl your heels upward towards your glutes.",
          "Extend your knees back down slowly to complete the repetition."
        ],
        equipment: "Lying Leg Curl Machine"
      },
      {
        id: "d3-ex5",
        name: "SEATED LEG CURL",
        targetMuscles: ["Hamstrings"],
        sets: createDefaultSets(3, "10-12"),
        defaultSets: 3,
        defaultReps: "10-12",
        description: "Great hamstring isolator by seating the pelvis at an angle that keeps hamstrings under extreme tension.",
        instructions: [
          "Sit in the machine and secure the lap restraint pad snugly above thighs.",
          "Place heels over the lower roller pad.",
          "Drive heels down and back under the chair seat.",
          "Ascend slowly back to the starting point."
        ],
        equipment: "Seated Leg Curl Machine"
      },
      {
        id: "d3-ex6",
        name: "LEG PRESS",
        targetMuscles: ["Quads", "Glutes", "Hamstrings"],
        sets: createDefaultSets(3, "10-12"),
        defaultSets: 3,
        defaultReps: "10-12",
        description: "Targets overall lower body compound mass while reducing stress on the lumbar spine.",
        instructions: [
          "Sit on the machine, placing feet in center of wide platform at shoulder width.",
          "Release safety side levers.",
          "Lower platform control to create a 90-degree knee angle.",
          "Press platform back up, making sure not to hyperextend or completely lock knees."
        ],
        equipment: "Leg Press Machine"
      }
    ]
  },
  {
    id: "day-4",
    dayNumber: 4,
    title: "DAY 4",
    subtitle: "SHOULDERS",
    exercises: [
      {
        id: "d4-ex1",
        name: "REVERSE FLY",
        targetMuscles: ["Rear Delts", "Upper Back"],
        sets: createDefaultSets(3, "10-12"),
        defaultSets: 3,
        defaultReps: "10-12",
        description: "Builds shoulder balance and posture by isolating the rear deltoids.",
        instructions: [
          "Sit on the pec dec machine facing the pad, or grab dumbbells standing bent over.",
          "Abduct your arms out to the sides in a wide flying motion.",
          "Squeeze the back of your shoulders at peak extension."
        ],
        equipment: "Reverse Fly Machine or Dumbbells"
      },
      {
        id: "d4-ex2",
        name: "FRONT RAISE",
        targetMuscles: ["Front Delts"],
        sets: createDefaultSets(3, "10-12"),
        defaultSets: 3,
        defaultReps: "10-12",
        description: "Addresses the anterior head of the shoulder for complete shoulder 3D thickness.",
        instructions: [
          "Stand holding a pair of dumbbells in front of your thighs.",
          "Raise one dumbbell straight out in front of you until slightly above eye level.",
          "Lower with control and raise the opposite arm."
        ],
        equipment: "Dumbbells"
      },
      {
        id: "d4-ex3",
        name: "LATERAL RAISE",
        targetMuscles: ["Lateral Delts"],
        sets: createDefaultSets(3, "10-12"),
        defaultSets: 3,
        defaultReps: "10-12",
        description: "Forces growth in the lateral deltoids for maximum upper body width and caps.",
        instructions: [
          "Stand tall with dumbbells at your sides, core tight and chest high.",
          "Lead with your elbows to raise arms out sideways to 90 degrees.",
          "Keep pinkies raised slightly higher than thumbs in the top position.",
          "Lower slowly, avoiding using body sway momentum."
        ],
        equipment: "Dumbbells"
      },
      {
        id: "d4-ex4",
        name: "SHOULDER PRESS",
        targetMuscles: ["Delts", "Triceps"],
        sets: createDefaultSets(3, "10-12"),
        defaultSets: 3,
        defaultReps: "10-12",
        description: "The premier vertical overhead pressing master routine.",
        instructions: [
          "Sit or stand holding dumbbells or barbell at collarbone level.",
          "Press direct ceiling-ward until elbows are aligned fully above head.",
          "Bring downs under slow gravity resistance back to resting shoulders."
        ],
        equipment: "Dumbbells or Barbell"
      }
    ]
  },
  {
    id: "day-5",
    dayNumber: 5,
    title: "DAY 5",
    subtitle: "ARMS",
    exercises: [
      {
        id: "d5-ex1",
        name: "TRICEP PUSHDOWN",
        targetMuscles: ["Triceps"],
        sets: createDefaultSets(3, "10-12"),
        defaultSets: 3,
        defaultReps: "10-12",
        description: "Isolates the triceps lateral and medial heads.",
        instructions: [
          "Stand holding rope or bar, press down while keeping elbows pinned.",
          "Hold the contraction, then release backwards slowly."
        ],
        equipment: "Cable Machine"
      },
      {
        id: "d5-ex2",
        name: "OVERHEAD EXTENSION",
        targetMuscles: ["Triceps"],
        sets: createDefaultSets(3, "10-12"),
        defaultSets: 3,
        defaultReps: "10-12",
        description: "Targets the long triceps head for thick back-arm thickness.",
        instructions: [
          "Raise dumbbell or rope overhead and bend elbows behind ears.",
          "Squeeze the triceps to press upwards straight vertical."
        ],
        equipment: "Dumbbell or Cable"
      },
      {
        id: "d5-ex3",
        name: "STRAIGHT BAR PUSHDOWN",
        targetMuscles: ["Triceps", "Lats"],
        sets: createDefaultSets(3, "10-12"),
        defaultSets: 3,
        defaultReps: "10-12",
        description: "Employs an overhead straight bar cable to drive explosive triceps strength.",
        instructions: [
          "Grip horizontal light lat-pulldown bar.",
          "Press down while flexing triceps fully near thighs."
        ],
        equipment: "Cable & Straight Pulley"
      },
      {
        id: "d5-ex4",
        name: "BARBELL CURL",
        targetMuscles: ["Biceps"],
        sets: createDefaultSets(3, "10-12"),
        defaultSets: 3,
        defaultReps: "10-12",
        description: "Creates solid biceps mass across short and long heads.",
        instructions: [
          "Keep elbows pinned to your waist.",
          "Flex your biceps to curl the barbell up towards your chest.",
          "Lower back down slowly with control."
        ],
        equipment: "Barbell"
      },
      {
        id: "d5-ex5",
        name: "HAMMER CURL",
        targetMuscles: ["Biceps", "Brachialis"],
        sets: createDefaultSets(3, "10-12"),
        defaultSets: 3,
        defaultReps: "10-12",
        description: "Constructs dense forearm and outer upper arm bicep bridges.",
        instructions: [
          "Grip dumbbell pair with neutral palms facing one another.",
          "Curl towards shoulders without rotating palms."
        ],
        equipment: "Dumbbells"
      },
      {
        id: "d5-ex6",
        name: "DUMBBELL PREACHER CURL",
        targetMuscles: ["Biceps"],
        sets: createDefaultSets(3, "10-12"),
        defaultSets: 3,
        defaultReps: "10-12",
        description: "Delivers maximum isolation for peak biceps rounding shape.",
        instructions: [
          "Rest elbow on preacher bench pad holding single dumbbell.",
          "Curl up slowly and lower back fully extended."
        ],
        equipment: "Preacher Bench & Dumbbell"
      }
    ]
  }
];
