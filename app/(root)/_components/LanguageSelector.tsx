"use client";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import React, { useEffect, useRef, useState } from "react";
import { useClickOutside } from "../_utils/useClickOutside";
import { FREE_PLAN_LANGUAGES, LANGUAGE_CONFIG } from "../_constants";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDownIcon, LockIcon, Palette, Sparkle } from "lucide-react";
import Image from "next/image";
import useMounted from "@/hooks/useMounted";

interface Props {
  hasAccess: boolean;
}



const LanguageSelector: React.FC<Props> = ({ hasAccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage } = useCodeEditorStore();

  const currentlanguageObj = LANGUAGE_CONFIG[language];

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const mounted = useMounted();

  if (!mounted) return null;

  const handleLanguageSelect = (langId: string) => {
    if (!hasAccess && !FREE_PLAN_LANGUAGES.includes(langId)) return;
    setLanguage(langId);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`group relative flex items-center gap-3 px-4 py-2.5 bg-[#1e1e2e]/80  rounded-lg transition-all duration-200 border  border-gray-800/50 hover:border-gray-700   
         ${!hasAccess && language !== "javascript" && language !== "typescript" ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="size-6 rounded-md bg-gray-800/50 p-0.5 group-hover:scale-110 transition-transform">
          <Image
            src={currentlanguageObj.logoPath}
            width={24}
            height={24}
            alt="Language"
            className="z-10 relative object-contain w-full h-full"
          />
        </div>

        <span className="text-gray-200 min-w-[80px] text-left group-hover:text-white transition-colors">
          {currentlanguageObj?.label}
        </span>

        <ChevronDownIcon
          className={`size-4 text-gray-400 transition-all duration-300 group-hover:text-gray-300 
          ${isOpen ? "rotate-180" : ""}
          `}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-64  bg-[#1e1e2e]/95 backdrop-blur-xl rounded-xl border border-[#313244] shadow-2xl py-2 z-50 "
          >
            <div className="px-3 pb-2 mb-2 border-b border-gray-800/50">
              <p className="text-xs font-medium text-gray-400 ">
                Select Language
              </p>
            </div>
            <div className=" overflow-y-auto overflow-x-hidden">
              {Object.values(LANGUAGE_CONFIG).map((lang, index) => {
                const isLocked =
                  !hasAccess && !FREE_PLAN_LANGUAGES.includes(lang.id);
                return (
                  <motion.div
                    key={lang.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative group px-2`}
                  >
                    <button
                      className={`relative w-full flex items-center gap-3 px-3 py-1.5 rounded-lg transition-all duration-200
                        ${language === lang.id ? "bg-blue-500/10 text-blue-400 " : "text-gray-300"} 
                        `}
                      onClick={() => handleLanguageSelect(lang.id)}
                      disabled={isLocked}
                    >
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg 
                      opacity-0 group-hover:opacity-100 transition-opacity"
                      />

                      <div
                        className={`realtive size-8 rounded-lg p-1.5 goup-hover:scale-110 transition-transform 
                        ${language === lang.id ? "bg-blue-500/10" : "bg-gray-800/50"}
                        `}
                      >
                        <Image
                          width={24}
                          height={24}
                          src={lang.logoPath}
                          alt={`${lang.label} logo`}
                          className="w-full h-full object-contain realtive z-10"
                        />
                      </div>
                      <span className="flex-1 text-left group-hover:text-white transition-colors capitalize">
                        {lang.id}
                      </span>

                      {language === lang.id && (
                        <motion.div
                          className="absolute inset-0 border02 border0blue-500/30 rounded-lg"
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        ></motion.div>
                      )}

                      {isLocked ? (
                        <LockIcon className="size-4 text-gray-500" />
                      ) : (
                        language === lang.id && (
                          <Sparkle className="size-4 text-blue-400 animate-pulse" />
                        )
                      )}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
