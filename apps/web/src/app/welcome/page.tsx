"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAtom } from 'jotai';
import { userNameAtom } from '@/atoms/user';
import { FilledButton } from "@/components/ui/buttons/FilledButton";

export default function Welcome() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userName] = useAtom(userNameAtom);
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    async function fetchUserData() {
      try {
        setIsLoading(true);
        // Get first name from the atom
        setFirstName(userName);
      } catch {
        setFirstName("User");
      } finally {
        setIsLoading(false);
      }
    }

    void fetchUserData();
  }, [userName]);

  const handleGetStarted = () => {
    try {
      // Remove registration completion flag
      sessionStorage.removeItem("registration_complete");
      // Navigate to home page
      router.replace("/");
    } catch (error) {
      console.error("Error during navigation:", error);
      router.replace("/sign-in");
    }
  };

  // Check registration completion
  useEffect(() => {
    const registrationComplete = sessionStorage.getItem("registration_complete");

    if (!registrationComplete) {
      router.replace("/sign-in");
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#2c5154] to-[#1d3638]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-[#2c5154] to-[#1d3638]">
      <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />

      <div className="relative z-10 mx-auto w-full max-w-[90vw] sm:max-w-2xl md:max-w-4xl px-4 sm:px-6 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8 sm:space-y-12 text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Image
              src="/mindvault-logo.png"
              alt="Logo de Mindvault"
              width={64}
              height={64}
              className="mx-auto h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 object-contain"
              priority
              loading="eager"
              sizes="(max-width: 640px) 48px, (max-width: 768px) 56px, 64px"
            />
          </motion.div>

          <div className="space-y-2 sm:space-y-3">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white/10 px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-[#e36c59]" />
              <span className="text-sm sm:text-base font-medium text-white/90">
                Bienvenido a tu viaje
              </span>
            </motion.div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Bienvenido, <span className="text-[#e36c59]">{firstName}</span>!
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-6 sm:space-y-8"
          >
            <p className="mx-auto max-w-[280px] sm:max-w-xl md:max-w-2xl text-base sm:text-lg md:text-xl font-light leading-relaxed text-white/90">
              Tu viaje hacia el entendimiento de tu verdadero ser comienza aquí.
              ¡Descubramos juntos tu potencial!
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex justify-center pt-4 sm:pt-6 md:pt-8"
            >
              <FilledButton
                variant="primary"
                size="lg"
                className="w-full max-w-[240px] sm:max-w-[260px] md:max-w-[280px] transform rounded-full bg-[#e36c59] px-8 sm:px-10 md:px-12 py-3 sm:py-3.5 md:py-4 text-base sm:text-lg md:text-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[#e36c59]/90 hover:shadow-xl"
                onClick={handleGetStarted}
              >
                Comenzar
              </FilledButton>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 h-24 sm:h-28 md:h-32 w-full bg-gradient-to-t from-black/20 to-transparent" />
      <div className="absolute -bottom-32 sm:-bottom-40 md:-bottom-48 -left-32 sm:-left-40 md:-left-48 h-64 sm:h-80 md:h-96 w-64 sm:w-80 md:w-96 rounded-full bg-[#e36c59]/20 blur-3xl" />
      <div className="absolute -bottom-32 sm:-bottom-40 md:-bottom-48 -right-32 sm:-right-40 md:-right-48 h-64 sm:h-80 md:h-96 w-64 sm:w-80 md:w-96 rounded-full bg-[#2c5154]/40 blur-3xl" />
    </div>
  );
}
