"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Activity, Dumbbell, Utensils, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import FoodCalorieTracker from "@/components/FoodCalorieTracker"
import ExerciseCalculator from "@/components/ExerciseCalculator"
import BalancedWorkoutRoutine from "@/components/BalancedWorkoutRoutine"

const tools = [
  { name: "Food Calorie Tracker", icon: Utensils },
  { name: "Exercise Calculator", icon: Dumbbell },
  { name: "Balanced Workout", icon: Activity },
]

export default function Tools() {
  const [activeTool, setActiveTool] = useState("Food Calorie Tracker")
  const [calorieAmount, setCalorieAmount] = useState(0)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-4 sm:p-8 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="inline-flex p-1 bg-gray-200 dark:bg-gray-800 rounded-full shadow-md">
            {tools.map((tool) => (
              <button
                key={tool.name}
                onClick={() => setActiveTool(tool.name)}
                className={`flex items-center px-6 py-2 rounded-full transition-all duration-300 ${
                  activeTool === tool.name
                    ? "bg-black dark:bg-white text-white dark:text-black"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                <tool.icon className="w-5 h-5 mr-2" />
                {tool.name}
              </button>
            ))}
          </div>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTool}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-black rounded-2xl p-6 shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.1)] border border-gray-200 dark:border-gray-800"
          >
            {activeTool === "Food Calorie Tracker" && (
              <FoodCalorieTracker calorieAmount={calorieAmount} setCalorieAmount={setCalorieAmount} />
            )}
            {activeTool === "Exercise Calculator" && (
              <ExerciseCalculator calorieAmount={calorieAmount} setCalorieAmount={setCalorieAmount} />
            )}
            {activeTool === "Balanced Workout" && (
              <BalancedWorkoutRoutine calorieAmount={calorieAmount} setCalorieAmount={setCalorieAmount} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

