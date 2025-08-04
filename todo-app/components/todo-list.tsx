"use client";

import type React from "react";
import { useState } from "react";
import { Trash2, Edit3, Check, X, Plus } from "lucide-react";

interface Task {
  id: number;
  text: string;
  isEditing: boolean;
}

export default function ToDoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [editValue, setEditValue] = useState("");

  const addTask = () => {
    if (inputValue.trim() !== "") {
      const newTask: Task = {
        id: Date.now(),
        text: inputValue.trim(),
        isEditing: false,
      };
      setTasks([...tasks, newTask]);
      setInputValue("");
    }
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEdit = (id: number, currentText: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, isEditing: true }
          : { ...task, isEditing: false }
      )
    );
    setEditValue(currentText);
  };

  const saveEdit = (id: number) => {
    if (editValue.trim() !== "") {
      setTasks(
        tasks.map((task) =>
          task.id === id
            ? { ...task, text: editValue.trim(), isEditing: false }
            : task
        )
      );
      setEditValue("");
    }
  };

  const cancelEdit = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isEditing: false } : task
      )
    );
    setEditValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter") {
      action();
    }
  };

  const handleEditKeyPress = (e: React.KeyboardEvent, id: number) => {
    if (e.key === "Enter") {
      saveEdit(id);
    } else if (e.key === "Escape") {
      cancelEdit(id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            Smart To-Do App
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          {/* Add Task Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, addTask)}
                placeholder="Enter a new task..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <button
                onClick={addTask}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 font-medium"
              >
                <Plus className="w-5 h-5" />
                Add Task
              </button>
            </div>
          </div>

          {/* Tasks List */}
          <div className="space-y-3">
            {tasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-2">No tasks yet</div>
                <div className="text-gray-500 text-sm">
                  Add your first task above to get started!
                </div>
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200"
                >
                  {task.isEditing ? (
                    <>
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyPress={(e) => handleEditKeyPress(e, task.id)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        autoFocus
                      />
                      <button
                        onClick={() => saveEdit(task.id)}
                        className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors duration-200"
                        title="Save changes"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => cancelEdit(task.id)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        title="Cancel editing"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="flex-1 text-gray-800 break-words">
                        {task.text}
                      </span>
                      <button
                        onClick={() => startEdit(task.id, task.text)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                        title="Edit task"
                      >
                        <Edit3 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                        title="Delete task"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Task Counter */}
          {tasks.length > 0 && (
            <div className="mt-6 text-center text-gray-600">
              {tasks.length} {tasks.length === 1 ? "task" : "tasks"} total
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <p className="text-center text-sm">Powered by AI | 2025</p>
        </div>
      </footer>
    </div>
  );
}
