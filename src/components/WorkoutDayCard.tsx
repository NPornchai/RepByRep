import React, { useState } from "react";
import { Exercise, WorkoutSet } from "../types";
import { Check, ClipboardList, Info, HelpCircle, Flame, Dumbbell } from "lucide-react";
import ExerciseIllustration from "./ExerciseIllustration";

interface WorkoutDayCardProps {
  key?: string;
  exercise: Exercise;
  onSetToggle: (exerciseId: string, setId: string) => void;
  onSetUpdate: (exerciseId: string, setId: string, field: "weight" | "reps", value: number) => void;
}

export default function WorkoutDayCard({
  exercise,
  onSetToggle,
  onSetUpdate
}: WorkoutDayCardProps) {
  const [showInstructions, setShowInstructions] = useState(false);

  const completedSetsCount = exercise.sets.filter((s) => s.completed).length;
  const isCompleted = completedSetsCount === exercise.sets.length;

  return (
    <div
      className={`border rounded-xl transition-all duration-300 p-5 ${
        isCompleted
          ? "bg-[#F3EFE6] border-[#D9CEBA]"
          : "bg-[#FAF8F5] border-[#EAE3D5] hover:border-[#D1C6B4]"
      }`}
    >
      <div className="flex flex-col sm:flex-row gap-5 items-start">
        {/* Dynamic Vector Exercise Diagram */}
        <ExerciseIllustration exerciseId={exercise.id} exerciseName={exercise.name} />

        {/* Content Details */}
        <div className="flex-1 w-full">
          {/* Exercise Header */}
          <div className="flex justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-extrabold text-[#3A2F28] tracking-wide uppercase font-display">
                  {exercise.name}
                </h3>
                {isCompleted && (
                  <span className="flex items-center gap-0.5 text-[10px] font-bold text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 rounded-full border border-[#BBF7D0]">
                    <Check className="w-3 h-3 stroke-[3]" /> ALL SETS COMPLETE
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                <span className="flex items-center gap-1 text-[10px] bg-[#EFEAE1] text-[#7A6A59] px-2 py-0.5 rounded border border-[#DFD9CE] font-mono">
                  <Dumbbell className="w-3 h-3" /> {exercise.equipment}
                </span>
                {exercise.targetMuscles.map((muscle) => (
                  <span
                    key={muscle}
                    className="text-[10px] bg-[#FDF2F2] text-[#9C1E1E] px-2 py-0.5 rounded border border-[#FCD2D2] font-semibold"
                  >
                    {muscle.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>

            {/* Dynamic Set Tracker */}
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-[#8A7968]">
                {completedSetsCount} / {exercise.sets.length} Sets
              </span>
              <div className="w-20 bg-[#E2DCE0] h-1.5 rounded-full overflow-hidden mt-1 relative ml-auto">
                <div
                  className="bg-[#6E1B1D] h-full transition-all duration-300"
                  style={{ width: `${(completedSetsCount / exercise.sets.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <p className="text-xs text-[#6F6052] mt-3 leading-relaxed">
            {exercise.description}
          </p>
        </div>
      </div>

      {/* Row sets list / table */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[280px]">
          <thead>
            <tr className="border-b border-[#EAE3D5] text-[10px] font-mono font-bold text-[#8A7968] tracking-wider uppercase">
              <th className="py-2 px-1 w-12">Set</th>
              <th className="py-2 px-1 w-24">Weight (lbs)</th>
              <th className="py-2 px-1 w-20">Reps</th>
              <th className="py-2 px-1 text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {exercise.sets.map((set, idx) => (
              <tr
                key={set.id}
                className={`border-b last:border-b-0 border-[#F3EFE6] transition-all ${
                  set.completed ? "bg-[#6E1B1D]/5 opacity-90" : ""
                }`}
              >
                <td className="py-3 px-1 font-mono text-xs font-bold text-[#5C5246]">
                  #{set.setIndex}
                </td>
                <td className="py-2 px-1">
                  <div className="flex items-center gap-1.5">
                    <input
                      aria-label={`Weight for ${exercise.name} set ${set.setIndex}`}
                      type="number"
                      min="0"
                      value={set.weight || ""}
                      onChange={(e) =>
                        onSetUpdate(
                          exercise.id,
                          set.id,
                          "weight",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      placeholder="0"
                      className="w-14 text-center text-xs font-mono bg-[#EFEAE1] border border-[#DDD4C5] rounded py-1 px-1.5 focus:outline-hidden focus:border-[#6E1B1D] font-bold text-[#3A2F28]"
                    />
                    <span className="text-[10px] font-mono text-[#8A7968]">lbs</span>
                  </div>
                </td>
                <td className="py-2 px-1">
                  <input
                    aria-label={`Reps for ${exercise.name} set ${set.setIndex}`}
                    type="number"
                    min="0"
                    value={set.reps}
                    onChange={(e) =>
                      onSetUpdate(
                        exercise.id,
                        set.id,
                        "reps",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-12 text-center text-xs font-mono bg-[#EFEAE1] border border-[#DDD4C5] rounded py-1 px-1.5 focus:outline-hidden focus:border-[#6E1B1D] font-bold text-[#3A2F28]"
                  />
                </td>
                <td className="py-2 px-1 text-right">
                  <button
                    onClick={() => onSetToggle(exercise.id, set.id)}
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-lg border transition-all cursor-pointer ${
                      set.completed
                        ? "bg-[#6E1B1D] text-[#FAF7F2] border-[#6E1B1D] hover:bg-[#9C1E1E]"
                        : "bg-[#FAF8F5] text-transparent hover:text-[#8A7968] border-[#D1C6B4] hover:bg-[#F3EFE6]"
                    }`}
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Guide Info expander */}
      <div className="mt-4 pt-3.5 border-t border-[#F1EADE] flex justify-between items-center flex-wrap gap-2">
        <button
          onClick={() => setShowInstructions(!showInstructions)}
          className="flex items-center gap-1.5 text-xs text-[#8A7968] font-bold tracking-tight hover:text-[#6E1B1D] cursor-pointer"
        >
          <Info className="w-3.5 h-3.5" /> {showInstructions ? "Hide details" : "Step instructions"}
        </button>
        <span className="text-[10px] font-mono text-[#8A7968] italic">
          Target standard: {exercise.defaultSets}x{exercise.defaultReps}
        </span>
      </div>

      {showInstructions && (
        <div className="mt-3.5 bg-[#F5F1E7]/80 rounded-lg p-3.5 border border-[#DDD5C5]">
          <h4 className="text-[10px] font-mono font-bold tracking-wider text-[#6E1B1D] mb-2 uppercase">
            Execution Guide
          </h4>
          <ol className="list-decimal list-inside space-y-1.5 text-xs text-[#5C5246] pl-0.5">
            {exercise.instructions.map((inst, i) => (
              <li key={i} className="leading-relaxed">
                {inst}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
