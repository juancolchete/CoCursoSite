"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { VideoPlayer } from "./video-player"
import { Download, FileText, LinkIcon, CheckCircle, Play } from "lucide-react"

interface LessonContentProps {
  lesson: {
    id: string
    title: string
    duration: string
    completed: boolean
    videoUrl?: string
    materials: Array<{
      title: string
      type: "pdf" | "link" | "document"
      url: string
    }>
  }
  onComplete: () => void
}

export function LessonContent({ lesson, onComplete }: LessonContentProps) {
  const [showVideo, setShowVideo] = useState(false)

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-4 w-4 text-red-600" />
      case "link":
        return <LinkIcon className="h-4 w-4 text-blue-600" />
      default:
        return <FileText className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Lesson Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">{lesson.title}</CardTitle>
              <p className="text-gray-600 mt-1">Duração: {lesson.duration}</p>
            </div>
            <div className="flex items-center space-x-3">
              {lesson.completed && (
                <Badge className="bg-green-100 text-green-700">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Concluída
                </Badge>
              )}
              <Button onClick={() => setShowVideo(!showVideo)} className="bg-purple-600 hover:bg-purple-700">
                <Play className="h-4 w-4 mr-2" />
                {showVideo ? "Ocultar Vídeo" : "Assistir Aula"}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Video Player */}
      {showVideo && <VideoPlayer title={lesson.title} duration={lesson.duration} videoUrl={lesson.videoUrl} />}

      {/* Materials */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Materiais de Apoio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {lesson.materials.map((material, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {getFileIcon(material.type)}
                  <div>
                    <p className="font-medium text-gray-900">{material.title}</p>
                    <p className="text-sm text-gray-600 capitalize">{material.type}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  {material.type === "link" ? "Acessar" : "Baixar"}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Complete Lesson */}
      {!lesson.completed && (
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Assista ao vídeo e revise os materiais para marcar esta aula como concluída.
              </p>
              <Button onClick={onComplete} className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                Marcar como Concluída
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
