"use client";
import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Nav() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(true);

  const cellSize = 40;
  const strokeWidth = 1;
  const opacity = 0.2;

  const strokeColor = isDarkMode ? "#7f69ce" : "#2d1f6d";
  const backgroundColor = isDarkMode ? "bg-gray-900" : "bg-gray-100";
  const textColor = isDarkMode ? "text-white" : "text-gray-900";

  return (
    <>
      <div
        className={`fixed inset-0 -z-10 ${backgroundColor} transition-colors duration-300`}
      >
        <svg className="w-full h-full animate-grid">
          <defs>
            <pattern
              id="grid"
              width={cellSize}
              height={cellSize}
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(0)"
            >
              <path
                d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`}
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#grid)"
            style={{ opacity }}
          />
        </svg>
        <style>
          {`
            @keyframes gridMove {
              0% {
                transform: translate(0, 0);
              }
              100% {
                transform: translate(${cellSize}px, ${cellSize}px);
              }
            }
            .animate-grid {
              animation: gridMove 3s linear infinite;
            }
          `}
        </style>
      </div>

      <main
        className={`p-10 flex justify-between items-center max-h-12 ${textColor}`}
      >
        <button
          onClick={() => {
            router.push("/");
          }}
        >
          <Image
            src="https://images-platform.99static.com//p-CMfyAPkvxzW-CokpAWLd9-pxc=/250x228:850x829/fit-in/500x500/99designs-contests-attachments/155/155177/attachment_155177064"
            height="40"
            width="40"
            alt=""
          />
        </button>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-full bg-opacity-20 backdrop-blur-sm 
                   hover:bg-opacity-30 transition-all duration-300 ease-in-out
                   bg-gray-600 text-gray-200"
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <Sun className="w-6 h-6" />
          ) : (
            <Moon className="w-6 h-6" />
          )}
        </button>
      </main>
    </>
  );
}
