import React from "react";

interface AnatomicalMannequinProps {
  activeMuscles: string[]; // e.g. ["Chest", "Triceps"]
  onMuscleClick?: (muscle: string) => void;
  selectedFilterMuscle?: string | null;
}

export default function AnatomicalMannequin({
  activeMuscles = [],
  onMuscleClick,
  selectedFilterMuscle
}: AnatomicalMannequinProps) {
  // Normalize strings for uniform checks
  const isActive = (muscleName: string) => {
    return activeMuscles.some(
      (m) => m.toLowerCase().includes(muscleName.toLowerCase())
    ) || (selectedFilterMuscle && selectedFilterMuscle.toLowerCase() === muscleName.toLowerCase());
  };

  const getFillColor = (muscleName: string) => {
    if (selectedFilterMuscle && selectedFilterMuscle.toLowerCase() === muscleName.toLowerCase()) {
      return "url(#active-muscle-gradient-pulse)";
    }
    return isActive(muscleName) ? "url(#active-muscle-gradient)" : "rgba(226, 221, 212, 0.45)";
  };

  const handlesClick = (muscleName: string) => {
    if (onMuscleClick) {
      onMuscleClick(muscleName);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 items-center justify-center p-6 bg-[#FAF7F2] border border-[#EBE5DB] rounded-xl shadow-xs">
      <svg className="hidden">
        <defs>
          <linearGradient id="active-muscle-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DF3B3B" />
            <stop offset="100%" stopColor="#9C1E1E" />
          </linearGradient>
          <linearGradient id="active-muscle-gradient-pulse" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F87171" />
            <stop offset="50%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#7F1D1D" />
          </linearGradient>
          <filter id="shadow">
            <feDropShadow dx="1" dy="2" stdDeviation="1" floodColor="#8B7B6B" floodOpacity="0.2"/>
          </filter>
        </defs>
      </svg>

      {/* Front View */}
      <div className="flex flex-col items-center">
        <span className="text-xs font-mono tracking-wider text-[#8A7968] mb-2 uppercase">Anterior (Front)</span>
        <div className="relative w-44 h-72">
          <svg
            viewBox="0 0 120 200"
            className="w-full h-full select-none cursor-pointer"
            id="mannequin-front"
          >
            {/* Outline Background Mannequin / Shadows */}
            <path
              d="M 60,15 C 50,15 48,25 48,30 C 48,34 52,40 56,42 L 54,48 L 40,54 C 36,56 30,62 30,75 C 30,85 34,100 34,105 C 34,110 32,112 30,115 L 26,122 C 24,126 22,130 22,135 C 22,138 28,140 30,135 L 34,122 L 36,110 L 38,105 C 38,107 38,130 36,145 C 34,155 31,165 31,170 C 31,175 35,178 38,172 L 42,160 L 46,145 C 47,150 49,170 49,180 C 49,188 51,195 53,195 C 55,195 56,188 56,180 L 56,145 L 64,145 L 64,180 C 64,188 65,195 67,195 C 69,195 71,188 71,180 C 71,170 73,150 74,145 L 78,160 L 82,172 C 85,178 89,175 89,170 C 89,165 86,155 84,145 C 82,130 82,107 82,105 L 84,110 L 86,122 L 90,135 C 92,140 98,138 98,135 C 98,130 96,126 94,122 L 90,115 C 88,112 86,110 86,105 C 86,100 90,85 90,75 C 90,62 84,56 80,54 L 66,48 L 64,42 C 68,40 72,34 72,30 C 72,25 70,15 60,15 Z"
              fill="#EFEAE1"
              stroke="#B3A899"
              strokeWidth="1.2"
              filter="url(#shadow)"
            />

            {/* Head & Neck */}
            <circle cx="60" cy="24" r="7" fill="#E8E2D5" stroke="#9E9281" strokeWidth="0.8" />
            <path d="M 57,31 Q 60,36 63,31 Z" fill="#E8E2D5" stroke="#9E9281" strokeWidth="0.8" />

            {/* Deltoids / Shoulders Front */}
            <path
              d="M 40,54 C 36,56 31,64 34,70 C 37,74 44,68 44,64 Z"
              fill={getFillColor("Shoulders")}
              stroke="#8B2626"
              strokeWidth={isActive("Shoulders") ? "1.2" : "0.5"}
              className="transition-all duration-300 hover:opacity-80"
              onClick={() => handlesClick("Shoulders")}
            />
            <path
              d="M 80,54 C 84,56 89,64 86,70 C 83,74 76,68 76,64 Z"
              fill={getFillColor("Shoulders")}
              stroke="#8B2626"
              strokeWidth={isActive("Shoulders") ? "1.2" : "0.5"}
              className="transition-all duration-300 hover:opacity-80"
              onClick={() => handlesClick("Shoulders")}
            />

            {/* Chest */}
            <path
              d="M 46,55 Q 53,57 60,57 Q 60,78 44,78 Q 44,65 46,55 Z"
              fill={getFillColor("Chest")}
              stroke="#8B2626"
              strokeWidth={isActive("Chest") ? "1.2" : "0.5"}
              className="transition-all duration-300 hover:opacity-80"
              onClick={() => handlesClick("Chest")}
            />
            <path
              d="M 74,55 Q 67,57 60,57 Q 60,78 76,78 Q 76,65 74,55 Z"
              fill={getFillColor("Chest")}
              stroke="#8B2626"
              strokeWidth={isActive("Chest") ? "1.2" : "0.5"}
              className="transition-all duration-300 hover:opacity-80"
              onClick={() => handlesClick("Chest")}
            />

            {/* Biceps Front */}
            <path
              d="M 33,71 Q 31,79 36,83 Q 39,81 37,72 Z"
              fill={getFillColor("Biceps")}
              stroke="#8B2626"
              strokeWidth={isActive("Biceps") ? "1.2" : "0.5"}
              className="transition-all duration-300 hover:opacity-80"
              onClick={() => handlesClick("Biceps")}
            />
            <path
              d="M 87,71 Q 89,79 84,83 Q 81,81 83,72 Z"
              fill={getFillColor("Biceps")}
              stroke="#8B2626"
              strokeWidth={isActive("Biceps") ? "1.2" : "0.5"}
              className="transition-all duration-300 hover:opacity-80"
              onClick={() => handlesClick("Biceps")}
            />

            {/* Abs / Core */}
            <path
              d="M 49,81 Q 60,82 71,81 L 68,110 Q 60,111 52,110 Z"
              fill={getFillColor("Core")}
              stroke="#8B2626"
              strokeWidth={isActive("Core") ? "1.2" : "0.5"}
              className="transition-all duration-300 hover:opacity-80"
              onClick={() => handlesClick("Core")}
            />

            {/* Quadriceps */}
            <path
              d="M 42,116 Q 49,118 56,116 L 53,153 Q 45,150 39,145 Z"
              fill={getFillColor("Quads")}
              stroke="#8B2626"
              strokeWidth={isActive("Quads") ? "1.2" : "0.5"}
              className="transition-all duration-300 hover:opacity-80"
              onClick={() => handlesClick("Quads")}
            />
            <path
              d="M 78,116 Q 71,118 64,116 L 67,153 Q 75,150 81,145 Z"
              fill={getFillColor("Quads")}
              stroke="#8B2626"
              strokeWidth={isActive("Quads") ? "1.2" : "0.5"}
              className="transition-all duration-300 hover:opacity-80"
              onClick={() => handlesClick("Quads")}
            />

            {/* Forearms */}
            <path
              d="M 37,84 Q 35,93 40,105 L 43,103 Q 41,92 39,84 Z"
              fill={getFillColor("Forearms")}
              stroke="#8B2626"
              strokeWidth={isActive("Forearms") ? "1.2" : "0.5"}
              className="transition-all duration-300 hover:opacity-80"
              onClick={() => handlesClick("Forearms")}
            />
            <path
              d="M 83,84 Q 85,93 80,105 L 77,103 Q 79,92 81,84 Z"
              fill={getFillColor("Forearms")}
              stroke="#8B2626"
              strokeWidth={isActive("Forearms") ? "1.2" : "0.5"}
              className="transition-all duration-300 hover:opacity-80"
              onClick={() => handlesClick("Forearms")}
            />

            {/* Adductors Inner muscle */}
            <path
              d="M 57,117 L 57,143 Q 59,143 60,143 L 63,143 L 63,117 Z"
              fill={getFillColor("Adductors")}
              stroke="#8B2626"
              strokeWidth={isActive("Adductors") ? "1.2" : "0.5"}
              className="transition-all duration-300 hover:opacity-80"
              onClick={() => handlesClick("Adductors")}
            />

            {/* Joints & Lines detailing */}
            <path d="M 45,55 L 75,55 M 60,57 L 60,110 M 34,105 L 38,105" stroke="#9E9281" strokeWidth="0.5" strokeDasharray="1,1" />
          </svg>
        </div>
      </div>

      {/* Back View */}
      <div className="flex flex-col items-center">
        <span className="text-xs font-mono tracking-wider text-[#8A7968] mb-2 uppercase">Posterior (Back)</span>
        <div className="relative w-44 h-72">
          <svg
            viewBox="0 0 120 200"
            className="w-full h-full select-none cursor-pointer"
            id="mannequin-back"
          >
            {/* Outline Background Mannequin / Shadows */}
            <path
              d="M 60,15 C 50,15 48,25 48,30 C 48,34 52,40 56,42 L 54,48 L 40,54 C 36,56 30,62 30,75 C 30,85 34,100 34,105 C 34,110 32,112 30,115 L 26,122 C 24,126 22,130 22,135 C 22,138 28,140 30,135 L 34,122 L 36,110 L 38,105 C 38,107 38,130 36,145 C 34,155 31,165 31,170 C 31,175 35,178 38,172 L 42,160 L 46,145 C 47,150 49,170 49,180 C 49,188 51,195 53,195 C 55,195 56,188 56,180 L 56,145 L 64,145 L 64,180 C 64,188 65,195 67,195 C 69,195 71,188 71,180 C 71,170 73,150 74,145 L 78,160 L 82,172 C 85,178 89,175 89,170 C 89,165 86,155 84,145 C 82,130 82,107 82,105 L 84,110 L 86,122 L 90,135 C 92,140 98,138 98,135 C 98,130 96,126 94,122 L 90,115 C 88,112 86,110 86,105 C 86,100 90,85 90,75 C 90,62 84,56 80,54 L 66,48 L 64,42 C 68,40 72,34 72,30 C 72,25 70,15 60,15 Z"
              fill="#EFEAE1"
              stroke="#B3A899"
              strokeWidth="1.2"
              filter="url(#shadow)"
            />

            {/* Head & Neck */}
            <circle cx="60" cy="24" r="7" fill="#E8E2D5" stroke="#9E9281" strokeWidth="0.8" />
            <path d="M 57,31 Q 60,35 63,31 Z" fill="#E8E2D5" stroke="#9E9281" strokeWidth="0.8" />

            {/* Back shoulders (Rear Delts) */}
            <path
              d="M 40,54 C 36,56 31,63 33,69 C 36,71 42,65 42,60 Z"
              fill={getFillColor("Rear Delts")}
              stroke="#8B2626"
              strokeWidth={isActive("Rear Delts") || isActive("Shoulders") ? "1.2" : "0.5"}
              className="transition-all duration-300 hover:opacity-80"
              onClick={() => handlesClick("Shoulders")}
            />
            <path
              d="M 80,54 C 84,56 89,63 87,69 C 84,71 78,65 78,60 Z"
              fill={getFillColor("Rear Delts")}
              stroke="#8B2626"
              strokeWidth={isActive("Rear Delts") || isActive("Shoulders") ? "1.2" : "0.5"}
              className="transition-all duration-300 hover:opacity-80"
              onClick={() => handlesClick("Shoulders")}
            />

            {/* Triceps (Back of arm) */}
            <path
              d="M 33,70 Q 30,80 34,85 Q 37,84 37,73 Z"
              fill={getFillColor("Triceps")}
              stroke="#8B2626"
              strokeWidth={isActive("Triceps") ? "1.2" : "0.5"}
              className="transition-all duration-300 hover:opacity-80"
              onClick={() => handlesClick("Triceps")}
            />
            <path
              d="M 87,70 Q 90,80 86,85 Q 83,84 83,73 Z"
              fill={getFillColor("Triceps")}
              stroke="#8B2626"
              strokeWidth={isActive("Triceps") ? "1.2" : "0.5"}
              className="transition-all duration-300 hover:opacity-80"
              onClick={() => handlesClick("Triceps")}
            />

            {/* Upper Back / Traps */}
            <path
              d="M 48,51 Q 60,45 72,51 L 68,66 C 63,68 57,68 52,66 Z"
              fill={getFillColor("Upper Back")}
              stroke="#8B2626"
              strokeWidth={isActive("Upper Back") || isActive("Back") ? "1.2" : "0.5"}
              className="transition-all duration-300 hover:opacity-80"
              onClick={() => handlesClick("Back")}
            />

            {/* Lats (Left & Right back) */}
            <path
              d="M 43,65 Q 50,66 52,67 L 49,93 Q 44,91 43,78 Z"
              fill={getFillColor("Lats")}
              stroke="#8B2626"
              strokeWidth={isActive("Lats") || isActive("Back") ? "1.2" : "0.5"}
              className="transition-all duration-300 hover:opacity-80"
              onClick={() => handlesClick("Back")}
            />
            <path
              d="M 77,65 Q 70,66 68,67 L 71,93 Q 76,91 77,78 Z"
              fill={getFillColor("Lats")}
              stroke="#8B2626"
              strokeWidth={isActive("Lats") || isActive("Back") ? "1.2" : "0.5"}
              className="transition-all duration-300 hover:opacity-80"
              onClick={() => handlesClick("Back")}
            />

            {/* Mid / Lower Back */}
            <path
              d="M 52,68 Q 60,69 68,68 L 65,108 Q 60,110 55,108 Z"
              fill={getFillColor("Mid-Back")}
              stroke="#8B2626"
              strokeWidth={isActive("Mid-Back") || isActive("Back") ? "1.2" : "0.5"}
              className="transition-all duration-300 hover:opacity-80"
              onClick={() => handlesClick("Back")}
            />

            {/* Glutes */}
            <path
              d="M 45,109 Q 60,108 75,109 Q 78,124 72,125 Q 60,123 48,125 Q 42,124 45,109 Z"
              fill={getFillColor("Glutes")}
              stroke="#8B2626"
              strokeWidth={isActive("Glutes") ? "1.2" : "0.5"}
              className="transition-all duration-300 hover:opacity-80"
              onClick={() => handlesClick("Glutes")}
            />

            {/* Hamstrings */}
            <path
              d="M 41,126 Q 49,127 52,126 L 46,162 Q 38,157 37,143 Z"
              fill={getFillColor("Hamstrings")}
              stroke="#8B2626"
              strokeWidth={isActive("Hamstrings") ? "1.2" : "0.5"}
              className="transition-all duration-300 hover:opacity-80"
              onClick={() => handlesClick("Hamstrings")}
            />
            <path
              d="M 79,126 Q 71,127 68,126 L 74,162 Q 82,157 83,143 Z"
              fill={getFillColor("Hamstrings")}
              stroke="#8B2626"
              strokeWidth={isActive("Hamstrings") ? "1.2" : "0.5"}
              className="transition-all duration-300 hover:opacity-80"
              onClick={() => handlesClick("Hamstrings")}
            />

            {/* Spinal Column centerline */}
            <path d="M 60,42 L 60,108" stroke="#9E9281" strokeWidth="0.8" strokeDasharray="2,2" />
          </svg>
        </div>
      </div>

      {/* Info Legend Card on Side */}
      <div className="flex flex-col max-w-sm ml-0 md:ml-4 self-stretch justify-center">
        <h4 className="text-sm font-semibold text-[#6E1B1D] tracking-wide mb-2 uppercase">
          Dynamic Muscle Mapping
        </h4>
        <p className="text-xs text-[#5C5246] leading-relaxed mb-3">
          Red zones represent the core primary targeted muscular groups for the currently selected routine. 
          You can also <strong className="text-[#6E1B1D]">click on any muscle region</strong> to filter exercises by that specific muscle.
        </p>
        <div className="flex flex-wrap gap-1.5 mt-1.5">
          {["Chest", "Back", "Shoulders", "Biceps", "Triceps", "Quads", "Hamstrings"].map((muscle) => {
            const isTargeted = isActive(muscle);
            return (
              <span
                key={muscle}
                onClick={() => handlesClick(muscle)}
                className={`text-[10px] px-2 py-0.5 rounded-full font-medium transition-all cursor-pointer border ${
                  isTargeted
                    ? "bg-[#6E1B1D] text-[#FAF7F2] border-[#6E1B1D]"
                    : "bg-[#F3EFE7] text-[#7A6A59] border-[#E2DCD2] hover:border-[#B3A899]"
                }`}
              >
                {muscle}
              </span>
            );
          })}
        </div>
        {selectedFilterMuscle && (
          <button
            onClick={() => handlesClick(selectedFilterMuscle)}
            className="text-left text-xs text-[#9C1E1E] font-medium mt-3 underline decoration-dotted underline-offset-4 cursor-pointer hover:text-[#DF3B3B]"
          >
            Clear specific muscle focus filter
          </button>
        )}
      </div>
    </div>
  );
}
