"use client";
import {
  getExecutionResult,
  useCodeEditorStore,
} from "@/store/useCodeEditorStore";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { motion } from "framer-motion";
import { Loader2, Play } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const RunButton = () => {
  const { user } = useUser();
  const { runCode, language, isRunning } =
    useCodeEditorStore();

  const saveExeuction = useMutation(api.codeExecutions.saveExeuction);

  const handleRunCode = async () => {
    await runCode();
    const result = getExecutionResult();

    if (user && result) {
      await saveExeuction({
        language,
        code: result.code,
        error: result.error || undefined,
        output: result.output || undefined,
        userId: user.id,
      });

      console.log("reached here");
    }
  };
  return (
    <motion.button
      onClick={handleRunCode}
      disabled={isRunning}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative inline-flex items-center gap-2.5 px-5 py-2.5 cursor-pointer disabled:cursor-not-allowed focus:outline-none`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl opacity-100 transition-opacity group-hover:opacity-90"></div>

      <div className="relative flex items-center gap-2.5">
        {isRunning ? (
          <>
            <div className="relative">
              <Loader2 className="size-4 animate-spin text-white/70" />
              <div className="absolute inset-0 blur animate-pulse"></div>
            </div>
            <span className="text-sm font-medium text-white/90">
              Executing...
            </span>
          </>
        ) : (
          <>
            <div className="relative flex items-center justify-center size-4 ">
              <Play className="size-4 text-white/90 transition-transform group-hover:scale:110 group-hover:text-white" />
            </div>
            <span className="text-sm font-medium text-white/90 group-hover:text-white">
              Run Code
            </span>
          </>
        )}
      </div>
    </motion.button>
  );
};

export default RunButton;
