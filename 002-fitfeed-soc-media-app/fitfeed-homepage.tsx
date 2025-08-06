'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share, Home, User, Plus } from 'lucide-react'
import Image from "next/image"
import { useState } from "react"

export default function FitFeedHomepage() {
  const [likedPosts, setLikedPosts] = useState<number[]>([])

  const toggleLike = (postId: number) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    )
  }

  const samplePosts = [
    {
      id: 1,
      user: "Sarah Chen",
      username: "@sarahfitslife",
      avatar: "/placeholder.svg?height=40&width=40&text=SC",
      image: "/placeholder.svg?height=300&width=400&text=Gym+Workout",
      caption: "Just crushed my PR on deadlifts! 💪 185lbs x 5 reps. The grind never stops! #DeadliftPR #StrengthTraining",
      likes: 127,
      comments: 23
    },
    {
      id: 2,
      user: "Mike Rodriguez",
      username: "@mikelifts",
      avatar: "/placeholder.svg?height=40&width=40&text=MR",
      image: "/placeholder.svg?height=300&width=400&text=Running+Trail",
      caption: "Morning 10K run through the mountains 🏔️ Nothing beats that fresh air and sunrise motivation! #MorningRun #TrailRunning",
      likes: 89,
      comments: 15
    },
    {
      id: 3,
      user: "Emma Thompson",
      username: "@emmayoga",
      avatar: "/placeholder.svg?height=40&width=40&text=ET",
      image: "/placeholder.svg?height=300&width=400&text=Yoga+Pose",
      caption: "Finding balance in warrior III pose 🧘‍♀️ Yoga isn't just about flexibility, it's about mental strength too! #YogaLife #Balance",
      likes: 156,
      comments: 31
    }
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center justify-between p-6 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold">
            FF
          </div>
          <span className="text-xl font-bold">FitFeed</span>
        </div>
        <div className="flex items-center space-x-6">
          <button className="text-blue-400 hover:text-blue-300 transition-colors">Home</button>
          <button className="text-gray-400 hover:text-white transition-colors">Profile</button>
          <button className="text-gray-400 hover:text-white transition-colors">Create</button>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6">
          Join the FitFam
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20"></div>
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            The Social Network for Fitness Junkies
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Connect with like-minded fitness enthusiasts, share your journey, and get motivated by the FitFam community.
          </p>
          <Button 
            size="lg" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-full transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
          >
            Join the FitFam
          </Button>
        </div>
      </section>

      {/* Sample Feed */}
      <section className="max-w-2xl mx-auto px-6 pb-24 md:pb-12">
        <h2 className="text-2xl font-bold mb-8 text-center">See What the FitFam is Up To</h2>
        <div className="space-y-6">
          {samplePosts.map((post) => (
            <Card key={post.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={post.avatar || "/placeholder.svg"} alt={post.user} />
                    <AvatarFallback className="bg-blue-500 text-white">
                      {post.user.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-white">{post.user}</p>
                    <p className="text-sm text-gray-400">{post.username}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="relative mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt="Fitness post"
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-gray-200 leading-relaxed">{post.caption}</p>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="flex items-center space-x-6 w-full">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors group"
                  >
                    <Heart 
                      className={`w-5 h-5 group-hover:scale-110 transition-transform ${
                        likedPosts.includes(post.id) ? 'fill-red-400 text-red-400' : ''
                      }`} 
                    />
                    <span className="text-sm">
                      {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                    </span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors group">
                    <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="text-sm">{post.comments}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors group ml-auto">
                    <Share className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-6 text-center mb-16 md:mb-0">
        <p className="text-lg font-medium text-blue-400 mb-2">
          "Progress over perfection"
        </p>
        <p className="text-gray-400 text-sm">
          © 2024 FitFeed. Empowering your fitness journey, one post at a time.
        </p>
      </footer>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 px-6 py-3">
        <div className="flex items-center justify-around">
          <button className="flex flex-col items-center space-y-1 text-blue-400">
            <Home className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors">
            <User className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </button>
          <button className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-xs">Create</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
