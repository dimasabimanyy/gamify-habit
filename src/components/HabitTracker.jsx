'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, Medal, Moon, Sun, Plus } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const HabitTracker = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [habits, setHabits] = useState([
    { id: 1, name: 'Exercise', streak: 5, completed: 15, total: 20 },
    { id: 2, name: 'Read', streak: 3, completed: 18, total: 20 },
    { id: 3, name: 'Meditate', streak: 7, completed: 19, total: 20 }
  ]);

  // Sample data for the progress chart
  const progressData = [
    { day: 'Mon', Exercise: 1, Read: 1, Meditate: 1 },
    { day: 'Tue', Exercise: 1, Read: 1, Meditate: 1 },
    { day: 'Wed', Exercise: 0, Read: 1, Meditate: 1 },
    { day: 'Thu', Exercise: 1, Read: 0, Meditate: 1 },
    { day: 'Fri', Exercise: 1, Read: 1, Meditate: 1 },
    { day: 'Sat', Exercise: 1, Read: 1, Meditate: 0 },
    { day: 'Sun', Exercise: 0, Read: 1, Meditate: 1 }
  ];

  // Handle initial mount to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const calculateCompletion = (completed, total) => {
    return ((completed / total) * 100).toFixed(1);
  };

  // Prevent hydration errors by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return (
    <div className={`min-h-screen p-4 ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Habit Tracker</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={toggleDarkMode}>
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Habit
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {habits.map(habit => (
            <Card key={habit.id}>
              <CardHeader>
                <CardTitle className="text-lg">{habit.name}</CardTitle>
                <CardDescription>
                  Current streak: {habit.streak} days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                    <span>{calculateCompletion(habit.completed, habit.total)}% Complete</span>
                  </div>
                  {habit.streak >= 5 && (
                    <Medal className="h-5 w-5 text-yellow-500" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Progress Chart */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Weekly Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="Exercise" stroke="#8884d8" />
                  <Line type="monotone" dataKey="Read" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="Meditate" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Calendar View */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Today's Habits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {habits.map(habit => (
                <div key={habit.id} className="flex items-center justify-between">
                  <span>{habit.name}</span>
                  <Button variant="outline" size="sm">
                    Complete
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HabitTracker;