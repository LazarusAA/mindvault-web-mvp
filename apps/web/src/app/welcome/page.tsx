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

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-12 text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Image
              src="/mindvault-logo.png"
              alt="Vault Logo"
              width={64}
              height={64}
              className="mx-auto h-16 w-16 object-contain"
              priority
              loading="eager"
              sizes="64px"
            />
          </motion.div>

          <div className="space-y-2">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-2 backdrop-blur-sm"
            >
              <Sparkles className="h-5 w-5 text-[#e36c59]" />
              <span className="font-medium text-white/90">
                Welcome to your journey
              </span>
            </motion.div>

            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Welcome, <span className="text-[#e36c59]">{firstName}</span>!
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-8"
          >
            <p className="mx-auto max-w-2xl text-xl font-light leading-relaxed text-white/90 sm:text-2xl">
              Your journey toward understanding your true self begins here.
              Let&apos;s unlock your potential together!
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex justify-center pt-8"
            >
              <FilledButton
                variant="primary"
                size="lg"
                className="w-full max-w-[280px] transform rounded-full bg-[#e36c59] px-12 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[#e36c59]/90 hover:shadow-xl"
                onClick={handleGetStarted}
              >
                Get Started
              </FilledButton>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-black/20 to-transparent" />
      <div className="absolute -bottom-48 -left-48 h-96 w-96 rounded-full bg-[#e36c59]/20 blur-3xl" />
      <div className="absolute -bottom-48 -right-48 h-96 w-96 rounded-full bg-[#2c5154]/40 blur-3xl" />
    </div>
  );
}
