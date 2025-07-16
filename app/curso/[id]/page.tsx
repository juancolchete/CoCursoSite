"use client"

import { useState, useEffect } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { LessonContent } from "@/components/lesson-content"
import { ChevronDown, ChevronRight, CheckCircle, Clock, Play, BookOpen, FileText } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { fetchCourseById, type Course } from "@/lib/courses"

export default function CursoDetalhes({ params }: { params: { id: string } }) {
  const [courseData, setCourseData] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null)
  const [openWeeks, setOpenWeeks] = useState<number[]>([])

  useEffect(() => {
    async function loadCourse() {
      try {
        setLoading(true)
        const course = await fetchCourseById(params.id)
        if (course) {
          setCourseData(course)
          // Auto-open current week and first week
          const currentWeek = course.weeks.find((week) => week.current)
          const openWeekIds = currentWeek ? [currentWeek.id, 1] : [1]
          setOpenWeeks([...new Set(openWeekIds)])
        } else {
          setError("Curso não encontrado")
        }
      } catch (err) {
        setError("Erro ao carregar curso")
        console.error("Error loading course:", err)
      } finally {
        setLoading(false)
      }
    }

    loadCourse()
  }, [params.id])

  const toggleWeek = (weekId: number) => {
    setOpenWeeks((prev) => (prev.includes(weekId) ? prev.filter((id) => id !== weekId) : [...prev, weekId]))
  }

  const handleLessonClick = (lessonId: string) => {
    setSelectedLesson(selectedLesson === lessonId ? null : lessonId)
  }

  const handleLessonComplete = (lessonId: string) => {
    console.log(`Lesson ${lessonId} completed`)
  }

  const handleWeekComplete = (weekId: number) => {
    console.log(`Week ${weekId} completed`)
    // Aqui você implementaria a lógica para marcar a semana como concluída
  }

  if (loading) {
    return (
      <Layout>
        <div className="p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <Skeleton className="h-8 w-96 mb-2" />
                <Skeleton className="h-4 w-64" />
              </div>
              <Skeleton className="h-6 w-24" />
            </div>
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-4 w-32 mb-4" />
                <Skeleton className="h-3 w-full" />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-64" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[...Array(3)].map((_, j) => (
                        <Skeleton key={j} className="h-16 w-full" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-32 w-full" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  if (error || !courseData) {
    return (
      <Layout>
        <div className="p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{error || "Curso não encontrado"}</h1>
            <p className="text-gray-600 mb-4">O curso solicitado não existe ou foi removido.</p>
            <Button onClick={() => window.history.back()}>Voltar</Button>
          </div>
        </div>
      </Layout>
    )
  }

  const selectedLessonData = courseData.weeks
    .flatMap((week) => week.lessons)
    .find((lesson) => lesson.id === selectedLesson)

  return (
    <Layout>
      <div className="p-8">
        {/* Course Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{courseData.title}</h1>
              <p className="text-gray-600">{courseData.description}</p>
            </div>
            <Badge className="bg-purple-100 text-purple-700">
              {courseData.completedWeeks}/{courseData.totalWeeks} semanas
            </Badge>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-700">Progresso Geral</span>
                <span className="text-sm text-gray-600">{courseData.progress}%</span>
              </div>
              <Progress value={courseData.progress} className="h-3" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Content */}
          <div className="lg:col-span-2">
            {selectedLessonData ? (
              <div>
                <Button variant="outline" onClick={() => setSelectedLesson(null)} className="mb-6">
                  ← Voltar ao Conteúdo
                </Button>
                <LessonContent
                  lesson={selectedLessonData}
                  onComplete={() => handleLessonComplete(selectedLessonData.id)}
                />
              </div>
            ) : (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Conteúdo do Curso</h2>

                {courseData.weeks.map((week) => {
                  const isWeekOpen = openWeeks.includes(week.id)
                  const completedLessons = week.lessons.filter((lesson) => lesson.completed).length
                  const totalLessons = week.lessons.length
                  const weekProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

                  return (
                    <Card
                      key={week.id}
                      className={`transition-all duration-200 ${
                        week.completed
                          ? "bg-green-50 border-green-200"
                          : week.current
                            ? "bg-purple-50 border-purple-300 ring-2 ring-purple-200"
                            : "bg-white border-gray-200"
                      }`}
                    >
                      <Collapsible open={isWeekOpen} onOpenChange={() => toggleWeek(week.id)}>
                        <CollapsibleTrigger asChild>
                          <CardHeader className="cursor-pointer hover:bg-gray-50/50 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                {week.completed ? (
                                  <div className="flex-shrink-0">
                                    <CheckCircle className="h-7 w-7 text-green-500" />
                                  </div>
                                ) : week.current ? (
                                  <div className="flex-shrink-0">
                                    <div className="h-7 w-7 rounded-full border-2 border-purple-500 bg-white flex items-center justify-center">
                                      <div className="h-3 w-3 rounded-full bg-purple-500" />
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex-shrink-0">
                                    <div className="h-7 w-7 rounded-full border-2 border-gray-300 bg-white" />
                                  </div>
                                )}

                                <div className="flex-1">
                                  <div className="flex items-center space-x-3">
                                    <CardTitle className="text-lg font-semibold text-gray-900">{week.title}</CardTitle>
                                    {week.current && (
                                      <Badge className="bg-purple-100 text-purple-700 border-purple-300 text-xs px-2 py-1">
                                        Atual
                                      </Badge>
                                    )}
                                  </div>

                                  {/* Week Progress */}
                                  <div className="mt-2 flex items-center space-x-3">
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                                        <span>
                                          {completedLessons}/{totalLessons} aulas concluídas
                                        </span>
                                        <span>{Math.round(weekProgress)}%</span>
                                      </div>
                                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                                        <div
                                          className={`h-1.5 rounded-full transition-all duration-300 ${
                                            week.completed ? "bg-green-500" : "bg-purple-500"
                                          }`}
                                          style={{ width: `${weekProgress}%` }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className="text-xs">
                                  {totalLessons} aulas
                                </Badge>
                                {isWeekOpen ? (
                                  <ChevronDown className="h-5 w-5 text-gray-400" />
                                ) : (
                                  <ChevronRight className="h-5 w-5 text-gray-400" />
                                )}
                              </div>
                            </div>
                          </CardHeader>
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                          <CardContent className="pt-0 pb-6">
                            {/* Lessons/Submódulos */}
                            <div className="space-y-3 mb-6">
                              {week.lessons.map((lesson, lessonIndex) => (
                                <div
                                  key={lesson.id}
                                  className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
                                    lesson.completed
                                      ? "bg-green-50 border-green-200 hover:bg-green-100"
                                      : "bg-white border-gray-200 hover:bg-gray-50"
                                  }`}
                                >
                                  <div className="flex items-center space-x-4">
                                    {lesson.completed ? (
                                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                    ) : (
                                      <div className="h-5 w-5 rounded-full border-2 border-purple-500 flex items-center justify-center flex-shrink-0">
                                        <Play className="h-3 w-3 text-purple-500 ml-0.5" />
                                      </div>
                                    )}

                                    <div className="flex-1">
                                      <h4 className="font-medium text-gray-900 mb-1">{lesson.title}</h4>
                                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                                        <div className="flex items-center">
                                          <Clock className="h-4 w-4 mr-1" />
                                          {lesson.duration}
                                        </div>
                                        <div className="flex items-center">
                                          <FileText className="h-4 w-4 mr-1" />
                                          {lesson.materials.length} materiais
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center space-x-2">
                                    <Button
                                      size="sm"
                                      variant={lesson.completed ? "outline" : "default"}
                                      className={`${
                                        lesson.completed
                                          ? "border-green-300 text-green-700 hover:bg-green-50"
                                          : "bg-purple-600 hover:bg-purple-700 text-white"
                                      }`}
                                      onClick={() => handleLessonClick(lesson.id)}
                                    >
                                      {lesson.completed ? "Revisar" : "Assistir"}
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Week Completion Button */}
                            {week.current && !week.completed && (
                              <div className="pt-4 border-t border-gray-200">
                                <Button
                                  className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-base font-semibold"
                                  onClick={() => handleWeekComplete(week.id)}
                                >
                                  Concluir {week.title.split(":")[0]}
                                </Button>
                              </div>
                            )}
                          </CardContent>
                        </CollapsibleContent>
                      </Collapsible>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-purple-600" />
                  Resumo do Curso
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">{courseData.progress}%</div>
                  <p className="text-sm text-gray-600">Concluído</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Semanas:</span>
                    <span className="font-medium">
                      {courseData.completedWeeks}/{courseData.totalWeeks}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Aulas:</span>
                    <span className="font-medium">
                      {courseData.weeks.reduce((acc, week) => acc + week.lessons.filter((l) => l.completed).length, 0)}/
                      {courseData.weeks.reduce((acc, week) => acc + week.lessons.length, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tempo total:</span>
                    <span className="font-medium">
                      {courseData.weeks.reduce(
                        (acc, week) =>
                          acc +
                          week.lessons.reduce((lessonAcc, lesson) => {
                            const minutes = Number.parseInt(lesson.duration.split(" ")[0]) || 0
                            return lessonAcc + minutes
                          }, 0),
                        0,
                      )}{" "}
                      min
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium text-gray-900 mb-3">Progresso por Semana</h4>
                  <div className="space-y-3">
                    {courseData.weeks.map((week) => {
                      const completedLessons = week.lessons.filter((l) => l.completed).length
                      const totalLessons = week.lessons.length
                      const weekProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

                      return (
                        <div key={week.id} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600">Semana {week.id}</span>
                            <span className="font-medium">{Math.round(weekProgress)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full ${
                                week.completed ? "bg-green-500" : week.current ? "bg-purple-500" : "bg-gray-400"
                              }`}
                              style={{ width: `${weekProgress}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <Button className="w-full bg-purple-600 hover:bg-purple-700">Continuar Estudando</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}
