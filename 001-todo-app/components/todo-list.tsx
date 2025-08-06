"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Trash2, Edit3, Check, X, Plus, LogIn, LogOut } from "lucide-react";
import { auth, provider, db } from "@/lib/firebase";
import { signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  updateDoc, 
  doc, 
  onSnapshot, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from "firebase/firestore";

interface Task {
  id: string;
  text: string;
  isEditing: boolean;
  createdAt: any;
  userId: string;
}

export default function ToDoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [editValue, setEditValue] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Handle authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Listen to tasks for the current user
  useEffect(() => {
    if (!user) {
      setTasks([]);
      return;
    }

    const tasksQuery = query(
      collection(db, "tasks"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(tasksQuery, (snapshot) => {
      const tasksData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        isEditing: false
      })) as Task[];
      setTasks(tasksData);
    });

    return () => unsubscribe();
  }, [user]);

  const signIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const addTask = async () => {
    if (inputValue.trim() !== "" && user) {
      try {
        await addDoc(collection(db, "tasks"), {
          text: inputValue.trim(),
          userId: user.uid,
          createdAt: serverTimestamp(),
        });
        setInputValue("");
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const startEdit = (id: string, currentText: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, isEditing: true }
          : { ...task, isEditing: false }
      )
    );
    setEditValue(currentText);
  };

  const saveEdit = async (id: string) => {
    if (editValue.trim() !== "") {
      try {
        await updateDoc(doc(db, "tasks", id), {
          text: editValue.trim(),
        });
        setTasks(
          tasks.map((task) =>
            task.id === id
              ? { ...task, text: editValue.trim(), isEditing: false }
              : task
          )
        );
        setEditValue("");
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  const cancelEdit = (id: string) => {
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

  const handleEditKeyPress = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter") {
      saveEdit(id);
    } else if (e.key === "Escape") {
      cancelEdit(id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">
              Smart To-Do App
            </h1>
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <img 
                      src={user.photoURL || undefined} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm text-gray-600 hidden sm:block">
                      {user.displayName}
                    </span>
                  </div>
                  <button
                    onClick={signOutUser}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 flex items-center gap-2 text-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={signIn}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center gap-2 text-sm"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        {!user ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-gray-600 text-lg mb-4">
              Please sign in to manage your tasks
            </div>
            <button
              onClick={signIn}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center gap-2 mx-auto"
            >
              <LogIn className="w-5 h-5" />
              Sign In with Google
            </button>
          </div>
        ) : (
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
        )}
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
