"use client";

import { AchievementCard } from "@/components/ui/cards/AchievementCard";
import { LoadingSpinner } from "@/components/ui/feedback/LoadingSpinner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Achievement {
  title: string;
  description: string;
  date?: string;
  obtained: boolean;
}

// Mock achievement data
const mockAchievements: Achievement[] = [
  {
    title: "Political Novice",
    description: "Complete your first ideology test",
    date: "2024-01-15",
    obtained: true
  },
  {
    title: "Deep Thinker",
    description: "Answer all questions thoughtfully in under 10 minutes",
    date: "2024-01-20",
    obtained: true
  },
  {
    title: "Consistent Voice",
    description: "Complete 3 ideology tests with similar results",
    obtained: false
  },
  {
    title: "Political Scholar",
    description: "Read 10 detailed analyses of your results",
    obtained: false
  },
  {
    title: "Community Voice",
    description: "Share your results with the community",
    obtained: false
  }
];

// Mock level data
const mockLevel = {
  current: 25,
  max: 100,
  title: "Political Explorer"
};

export default function AchievementsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [level, setLevel] = useState({ current: 0, max: 100, title: "" });
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    const loadMockData = () => {
      try {
        setLevel(mockLevel);
        setAchievements(mockAchievements);
      } catch (error) {
        console.error("Error loading mock achievements:", error);
      } finally {
        setLoading(false);
      }
    };

    // Simulate loading delay
    loadMockData();
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.back();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-neutral-bg">
      <div className="relative mb-8 overflow-hidden rounded-b-[4rem] border-b border-brand-tertiary/20 bg-brand-tertiary p-10 pb-12 pt-16 shadow-lg">
        <div className="relative z-10 mx-auto max-w-md text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-100">
            Achievements
          </h1>
          <p className="mx-auto mb-9 max-w-sm text-lg font-medium text-slate-200">
            Celebrate your progress and discover what&apos;s next on your
            journey
          </p>

          <div className="mx-auto max-w-sm space-y-4 rounded-3xl border border-brand-tertiary/10 bg-brand-secondary p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.2)] backdrop-blur-sm">
            <div className="flex justify-between text-sm font-semibold text-slate-100">
              <span className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-accent-red" />
                {level.title}
              </span>
              <span>
                {level.current}/{level.max} points
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-neutral-bg/90 backdrop-blur-sm">
              <div
                className="h-full rounded-full bg-accent-red transition-all duration-500"
                style={{
                  width: `${(level.current / level.max) * 100}%`,
                }}
              />
            </div>
            <p className="text-sm font-medium text-slate-200">
              Reach the next level to unlock new badges and exclusive content!
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-md space-y-4 px-6">
        {achievements.map((achievement) => (
          <div
            key={`${achievement.title}-${achievement.obtained}`}
            className={`transition-all duration-300 ${
              !achievement.obtained && "opacity-60"
            }`}
          >
            <AchievementCard
              title={achievement.title}
              description={achievement.description}
              date={achievement.obtained ? achievement.date : "Locked"}
            />
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-neutral-bg/60 pb-20 backdrop-blur-sm">
          <div className="mx-4 max-w-sm rounded-3xl border border-brand-tertiary/10 bg-brand-secondary p-8 text-center shadow-[0_14px_28px_rgba(0,0,0,0.25),_0_10px_10px_rgba(0,0,0,0.22)] backdrop-blur-sm">
            <h2 className="mb-3 text-2xl font-bold text-white">Coming Soon</h2>
            <p className="text-sm text-slate-200">
              The achievements feature is currently under development. Check
              back soon to celebrate your progress!
            </p>
            <button
              type="button"
              className="mt-4 rounded-lg bg-accent-red px-4 py-2 text-white hover:bg-accent-red/90"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
