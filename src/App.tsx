import React, { useState, useEffect } from "react";
import { defaultWorkouts } from "./data/workouts";
import AnatomicalMannequin from "./components/AnatomicalMannequin";
import WorkoutDayCard from "./components/WorkoutDayCard";
import { WorkoutDay, Exercise } from "./types";
import { isSupabaseConfigured } from "./lib/supabaseClient";
import {
  loadWorkouts,
  loadWorkoutsSync,
  loadStreak,
  loadStreakSync,
  saveWorkouts,
  saveStreak,
  getDayLastCompleted,
  setDayLastCompleted,
} from "./services/workoutStorage";
import {
  Flame,
  Timer,
  RefreshCw,
  Trophy,
  Dumbbell,
  CheckCircle2,
  CalendarDays,
  Target,
  ChevronRight,
  Sparkles,
  VolumeX,
  Volume2
} from "lucide-react";

export default function App() {
  // Load state from Supabase (if configured) or fallback to localStorage.
  // When Supabase isn't configured, load synchronously from localStorage so the
  // first render is identical to the pre-Supabase behavior (no data flash).
  // When it IS configured, start from defaults and hydrate asynchronously below.
  const [workouts, setWorkouts] = useState<WorkoutDay[]>(() =>
    isSupabaseConfigured ? defaultWorkouts : loadWorkoutsSync()
  );

  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const [streakCount, setStreakCount] = useState<number>(() =>
    isSupabaseConfigured ? 4 : loadStreakSync() // default streak 4
  );

  // Guards the persistence effect below so it never writes the pre-hydration
  // default state back over real Supabase data before the async load resolves.
  const [isHydrated, setIsHydrated] = useState<boolean>(!isSupabaseConfigured);

  const [selectedMuscleFilter, setSelectedMuscleFilter] = useState<string | null>(null);

  // Timer States
  const [timerDuration, setTimerDuration] = useState<number>(60);
  const [timerTime, setTimerTime] = useState<number>(0);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // One-time async hydration from Supabase when configured (no-op otherwise,
  // since the localStorage case already hydrated synchronously above).
  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let cancelled = false;
    (async () => {
      try {
        const [loadedWorkouts, loadedStreak] = await Promise.all([loadWorkouts(), loadStreak()]);
        if (!cancelled) {
          setWorkouts(loadedWorkouts);
          setStreakCount(loadedStreak);
        }
      } catch (e) {
        console.error("Failed to load workout data from Supabase", e);
      } finally {
        if (!cancelled) setIsHydrated(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Sync workout set logs to Supabase or localStorage (see workoutStorage.ts)
  useEffect(() => {
    if (!isHydrated) return;
    saveWorkouts(workouts).catch((e) => console.error("Failed to save workout sets", e));
  }, [workouts, isHydrated]);

  // Rest Timer ticking interval logic
  useEffect(() => {
    let interval: any = null;
    if (timerActive && timerTime > 0) {
      interval = setInterval(() => {
        setTimerTime((prev) => prev - 1);
      }, 1000);
    } else if (timerTime === 0 && timerActive) {
      setTimerActive(false);
      // Play a quick physical beep sound using web Audio Context if enabled!
      if (soundEnabled) {
        triggerBeep();
      }
    }
    return () => clearInterval(interval);
  }, [timerActive, timerTime, soundEnabled]);

  // Audio Beep synth (100% code, zero attachments)
  const triggerBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // high tone
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch (e) {
      console.warn("Audio element failed to play synthetically", e);
    }
  };

  const startTimer = (seconds: number) => {
    setTimerDuration(seconds);
    setTimerTime(seconds);
    setTimerActive(true);
  };

  const stopTimer = () => {
    setTimerActive(false);
    setTimerTime(0);
  };

  // State handlers to modify workout completions
  const handleSetToggle = (exerciseId: string, setId: string) => {
    setWorkouts((prevWorkouts) => {
      return prevWorkouts.map((day) => {
        return {
          ...day,
          exercises: day.exercises.map((ex) => {
            if (ex.id === exerciseId) {
              return {
                ...ex,
                sets: ex.sets.map((set) => {
                  if (set.id === setId) {
                    const nextCompleted = !set.completed;
                    // Trigger dynamic short rest timer automatic activation upon set completion!
                    if (nextCompleted && !timerActive) {
                      startTimer(timerDuration);
                    }
                    return { ...set, completed: nextCompleted };
                  }
                  return set;
                }),
              };
            }
            return ex;
          }),
        };
      });
    });
  };

  const handleSetUpdate = (
    exerciseId: string,
    setId: string,
    field: "weight" | "reps",
    value: number
  ) => {
    setWorkouts((prevWorkouts) => {
      return prevWorkouts.map((day) => {
        return {
          ...day,
          exercises: day.exercises.map((ex) => {
            if (ex.id === exerciseId) {
              return {
                ...ex,
                sets: ex.sets.map((set) => {
                  if (set.id === setId) {
                    return { ...set, [field]: value };
                  }
                  return set;
                }),
              };
            }
            return ex;
          }),
        };
      });
    });
  };

  // Reset entire workout states
  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset completions for today's workout?")) {
      setWorkouts((prevWorkouts) => {
        return prevWorkouts.map((day, dIdx) => {
          if (dIdx === selectedDayIndex) {
            return {
              ...day,
              exercises: day.exercises.map((ex) => ({
                ...ex,
                sets: ex.sets.map((set) => ({ ...set, completed: false })),
              })),
            };
          }
          return day;
        });
      });
    }
  };

  // Current active day items
  const activeDay = workouts[selectedDayIndex];

  // List of all active muscles in the current day's routine
  const activeDayMuscles = activeDay
    ? (Array.from(new Set(activeDay.exercises.flatMap((ex) => ex.targetMuscles))) as string[])
    : [];

  // Filter exercises based on selected muscle from anatomical map
  const exercisesToDisplay = activeDay
    ? activeDay.exercises.filter((ex) => {
        if (!selectedMuscleFilter) return true;
        return ex.targetMuscles.some(
          (m) => m.toLowerCase() === selectedMuscleFilter.toLowerCase()
        );
      })
    : [];

  // Statistics indicators
  const totalSetsCompletedThisDay = activeDay
    ? activeDay.exercises.flatMap((ex) => ex.sets).filter((s) => s.completed).length
    : 0;

  const totalSetsThisDay = activeDay
    ? activeDay.exercises.flatMap((ex) => ex.sets).length
    : 0;

  const isDayFullyCompleted = totalSetsThisDay > 0 && totalSetsCompletedThisDay === totalSetsThisDay;
  const activeDayId = activeDay?.id;

  // Track the user streak on day completion
  useEffect(() => {
    if (!isDayFullyCompleted || !activeDayId) return;
    let cancelled = false;
    (async () => {
      try {
        const todayString = new Date().toDateString();
        const lastLogged = await getDayLastCompleted(activeDayId);
        if (cancelled || lastLogged === todayString) return;

        await setDayLastCompleted(activeDayId, todayString);
        if (cancelled) return;

        setStreakCount((prev) => {
          const next = prev + 1;
          saveStreak(next).catch((e) => console.error("Failed to save streak", e));
          return next;
        });
      } catch (e) {
        console.error("Failed to update day completion / streak", e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isDayFullyCompleted, activeDayId]);

  const handleMuscleClickFromMannequin = (muscle: string) => {
    if (selectedMuscleFilter && selectedMuscleFilter.toLowerCase() === muscle.toLowerCase()) {
      setSelectedMuscleFilter(null); // Clear toggle
    } else {
      setSelectedMuscleFilter(muscle);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-16 selection:bg-[#6E1B1D]/15 selection:text-[#6E1B1D]">
      {/* Dynamic Aesthetic Header Banner */}
      <header className="border-b border-[#EBE3D3] bg-[#FAF8F5] sticky top-0 z-40 backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo Brand Header */}
          <div className="text-center sm:text-left">
            <h1 className="text-3xl md:text-4xl font-black text-[#6E1B1D] tracking-tighter leading-none font-display uppercase">
              RepByRep
            </h1>
            <p className="text-[10px] md:text-xs font-mono text-[#8C7A6B] tracking-wider uppercase font-bold mt-0.5">
              Every rep counts. Every day matters.
            </p>
          </div>

          {/* Realtime stats tracker row */}
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {/* Active Streak */}
            <div className="flex items-center gap-2 bg-[#FDF2F2] border border-[#FCD2D2] rounded-xl px-3.5 py-1.5 shadow-2xs">
              <span className="p-1.5 bg-[#DF3B3B]/10 rounded-full text-[#DF3B3B]">
                <Flame className="w-4 h-4 fill-current animate-pulse" />
              </span>
              <div>
                <span className="block text-[9px] font-mono font-bold text-[#8C7A68] uppercase leading-none">Days Active</span>
                <span className="text-sm font-black text-[#6E1B1D] font-mono leading-none">{streakCount} Streak</span>
              </div>
            </div>

            {/* Total logged sets today */}
            <div className="flex items-center gap-2 bg-[#F3EFE6] border border-[#D9CEBA] rounded-xl px-3.5 py-1.5 shadow-2xs">
              <span className="p-1.5 bg-[#6E1B1D]/10 rounded-full text-[#6E1B1D]">
                <CheckCircle2 className="w-4 h-4" />
              </span>
              <div>
                <span className="block text-[9px] font-mono font-bold text-[#8C7A68] uppercase leading-none">Sets Target</span>
                <span className="text-sm font-black text-[#3A2F28] font-mono leading-none">
                  {totalSetsCompletedThisDay} / {totalSetsThisDay} sets
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace Frame container */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column (Selector, Mannequin, Consistency Progression) - 5 Cols */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Workout Day Selector Navigation */}
            <div className="bg-[#FAF7F2] border border-[#EBE5DB] rounded-2xl p-4.5 shadow-xs">
              <span className="text-[10px] font-mono font-bold text-[#8C7A68] tracking-widest uppercase block mb-3">
                <CalendarDays className="inline w-3.5 h-3.5 mr-1" /> Training Splits
              </span>
              <div className="grid grid-cols-5 gap-1.5">
                {workouts.map((day, idx) => {
                  const isSelected = selectedDayIndex === idx;
                  const daySets = day.exercises.flatMap((ex) => ex.sets);
                  const isCompleted = daySets.length > 0 && daySets.every((s) => s.completed);

                  return (
                    <button
                      key={day.id}
                      onClick={() => {
                        setSelectedDayIndex(idx);
                        setSelectedMuscleFilter(null);
                      }}
                      className={`flex flex-col items-center justify-center py-3.5 px-1 rounded-xl border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "bg-[#6E1B1D] text-[#FAF7F2] border-[#591617] scale-[1.03] shadow-md"
                          : isCompleted
                          ? "bg-[#F3EFE6] text-[#7A6A59] border-[#DDD5C5]"
                          : "bg-white text-[#5C5246] border-[#DDD5C5]/80 hover:bg-[#F3EFE6]"
                      }`}
                    >
                      <span className="text-[9px] font-mono font-bold uppercase leading-none">Day</span>
                      <span className="text-lg font-black font-display leading-tight">{day.dayNumber}</span>
                      {isCompleted && (
                        <span className="w-1.5 h-1.5 bg-[#15803D] rounded-full mt-1"></span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Loader sub-info cards summary */}
              <div className="mt-4 pt-3.5 border-t border-[#ECE3D4] flex items-center justify-between">
                <div>
                  <span className="block text-[10px] font-mono font-bold text-[#9C1E1E] leading-none uppercase">
                    ACTIVE ROUTINE
                  </span>
                  <p className="text-sm font-extrabold text-[#3A2F28] mt-1 tracking-wide uppercase font-display">
                    {activeDay?.title}: {activeDay?.subtitle}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#8C7A6D]" />
              </div>
            </div>

            {/* Interactive Anatomical Highlight Mannequin */}
            <AnatomicalMannequin
              activeMuscles={activeDayMuscles}
              selectedFilterMuscle={selectedMuscleFilter}
              onMuscleClick={handleMuscleClickFromMannequin}
            />
          </div>

          {/* Right Column (Exercises sets checklist, Coach Panel) - 7 Cols */}
          <div className="lg:col-span-7 space-y-6">

            {/* Gym Assist Timer Section */}
            <div className="bg-[#FAF7F2] border border-[#EBE3D3] rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-full ${timerTime > 0 ? "bg-[#6E1B1D]/10 text-[#6E1B1D] animate-pulse" : "bg-[#F3EFE6] text-[#8C7A6D]"}`}>
                  <Timer className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono font-bold text-[#8A7968] uppercase">Interval rest calculator</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-xl font-mono font-black text-[#3A2F28]">
                      {timerTime > 0 ? `${Math.floor(timerTime / 60)}:${String(timerTime % 60).padStart(2, "0")}` : "0:00"}
                    </span>
                    <span className="text-[10px] text-[#8C7A68] italic">
                      {timerActive ? "(Rest Active)" : "(Rest Stopped)"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons to control sets timer */}
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <button
                  onClick={() => startTimer(45)}
                  className="px-2.5 py-1.5 bg-[#FAF8F5] border border-[#D9CDBC] text-[#3A2F28] text-xs font-semibold rounded-lg hover:bg-[#F3EFE6] transition-all cursor-pointer font-mono"
                >
                  45s
                </button>
                <button
                  onClick={() => startTimer(60)}
                  className="px-2.5 py-1.5 bg-[#FAF8F5] border border-[#D9CDBC] text-[#3A2F28] text-xs font-semibold rounded-lg hover:bg-[#F3EFE6] transition-all cursor-pointer font-mono"
                >
                  60s
                </button>
                <button
                  onClick={() => startTimer(90)}
                  className="px-2.5 py-1.5 bg-[#FAF8F5] border border-[#D9CDBC] text-[#3A2F28] text-xs font-semibold rounded-lg hover:bg-[#F3EFE6] transition-all cursor-pointer font-mono"
                >
                  90s
                </button>
                {timerTime > 0 && (
                  <button
                    onClick={stopTimer}
                    className="px-3 py-1.5 bg-[#9C1E1E] hover:bg-[#DF3B3B] text-[#FAF8F5] text-xs font-bold rounded-lg transition-all cursor-pointer"
                  >
                    STOP
                  </button>
                )}
                {/* Sound enabler toggle */}
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-2 rounded-lg bg-[#FAF8F5] hover:bg-[#F3EFE6] text-[#8A7968] border border-[#D9CDBC]"
                  title={soundEnabled ? "Mute Timer Beep" : "Unmute Timer Beep"}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4 text-[#6E1B1D]" /> : <VolumeX className="w-4 h-4 text-[#8A7968]" />}
                </button>
              </div>
            </div>

            {/* Target Exercise Schedule list card */}
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-5 h-5 text-[#6E1B1D]" />
                  <h2 className="text-xl font-extrabold text-[#3A2F28] tracking-tight uppercase">
                    Workout Target Lists
                  </h2>
                </div>
                
                {/* Reset button & filtered feedback */}
                <div className="flex items-center gap-2">
                  {selectedMuscleFilter && (
                    <span className="text-[10px] font-mono bg-[#6E1B1D] text-[#FAF7F2] py-1 px-2.5 rounded-full border border-[#6E1B1D]">
                      Filter: {selectedMuscleFilter.toUpperCase()}{" "}
                      <span
                        className="font-bold underline cursor-pointer ml-1 text-red-200"
                        onClick={() => setSelectedMuscleFilter(null)}
                      >
                        [clear]
                      </span>
                    </span>
                  )}
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 bg-[#FAF7F2] border border-[#DCCDB9] hover:bg-[#F3EFE6] text-[#8A7968] hover:text-[#6E1B1D] text-xs font-semibold py-1.5 px-3 rounded-lg transition-all cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Clear day sets
                  </button>
                </div>
              </div>

              {/* Render dynamic exercise card lists */}
              <div className="space-y-4">
                {exercisesToDisplay.length > 0 ? (
                  exercisesToDisplay.map((exercise) => (
                    <WorkoutDayCard
                      key={exercise.id}
                      exercise={exercise}
                      onSetToggle={handleSetToggle}
                      onSetUpdate={handleSetUpdate}
                    />
                  ))
                ) : (
                  <div className="bg-[#FAF7F2] border border-[#EACBB0]/50 rounded-xl p-8 text-center text-[#8C7A68]">
                    <span className="block text-2xl mb-1">🔍</span>
                    No exercises matches the filter target <strong className="text-[#6E1B1D]">\"{selectedMuscleFilter}\"</strong> on today's routine.
                    <button
                      onClick={() => setSelectedMuscleFilter(null)}
                      className="block text-[#9C1E1E] hover:text-[#DF3B3B] text-xs font-bold underline mt-2.5 mx-auto"
                    >
                      Show all active exercises for Day {activeDay?.dayNumber}
                    </button>
                  </div>
                )}
              </div>

              {/* Streak motivation celebrate banner */}
              {isDayFullyCompleted && (
                <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-5 text-center flex flex-col items-center gap-2 shadow-xs ring-4 ring-emerald-50 mt-4">
                  <div className="p-3 bg-emerald-100 rounded-full text-emerald-600 animate-bounce">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-extrabold text-emerald-800 uppercase tracking-wide">
                    Splits Completed for Day {activeDay?.dayNumber}!
                  </h3>
                  <p className="text-xs text-emerald-700 leading-relaxed max-w-md">
                    Excellent hypertrophy training. Every set is tracked and logged securely. 
                    Your training streak has been verified and upgraded. Keep moving towards elite growth!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Humble Footer */}
      <footer className="mt-16 border-t border-[#EAE3D5] pt-8 max-w-7xl mx-auto px-4 text-center">
        <p className="text-xs text-[#8A7968] font-mono uppercase tracking-wider">
          RepByRep © {new Date().getFullYear()} — Built for consistency & raw power.
        </p>
        <span className="block text-[10px] text-[#B3A899] font-mono mt-1">
          Each set you record reinforces the habit sequence.
        </span>
      </footer>
    </div>
  );
}
