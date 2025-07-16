"use client"

import { useEffect, useState } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Clock, Users, Star, AlertCircle, Calendar } from "lucide-react"
import Link from "next/link"
import { fetchCourses, type Course } from "@/lib/courses"

export default function Cursos() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadCourses() {
      try {
        setLoading(true)
        setError(null)
        const coursesData = await fetchCourses()
        setCourses(coursesData)
        console.log("Loaded courses:", coursesData)
      } catch (err) {
        setError("Erro ao carregar cursos")
        console.error("Error loading courses:", err)
        setCourses([])
      } finally {
        setLoading(false)
      }
    }

    loadCourses()
  }, [])

  if (loading) {
    return (
      <Layout>
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Meus Cursos</h1>
            <p className="text-gray-600">Gerencie seu progresso e continue aprendendo</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-video" />
                <CardHeader>
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Layout>
    )
  }

  if (error || courses.length === 0) {
    return (
      <Layout>
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Meus Cursos</h1>
            <p className="text-gray-600">Gerencie seu progresso e continue aprendendo</p>
          </div>

          <Card className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {error ? "Erro ao carregar cursos" : "Nenhum curso encontrado"}
            </h2>
            <p className="text-gray-600 mb-4">
              {error
                ? "Não foi possível carregar os cursos do GitHub. Verifique sua conexão."
                : "Não há cursos disponíveis no momento."}
            </p>
            <Button onClick={() => window.location.reload()}>Tentar Novamente</Button>
          </Card>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Meus Cursos</h1>
          <p className="text-gray-600">Gerencie seu progresso e continue aprendendo</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                <div className="text-4xl font-bold text-purple-600">{course.title.charAt(0)}</div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {course.category && <Badge variant="secondary">{course.category}</Badge>}
                    {course.totalWeeks > 0 && (
                      <Badge variant="outline" className="text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        {course.totalWeeks} semanas
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
                    {course.rating}
                  </div>
                </div>

                <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                {course.description && <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>}

                {/* Tags do JSON */}
                {course.tags && course.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {course.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs px-2 py-0.5">
                        {tag}
                      </Badge>
                    ))}
                    {course.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs px-2 py-0.5">
                        +{course.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {course.students.toLocaleString()} alunos
                  </div>
                  {course.duration && (
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                  )}
                </div>

                {course.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Progresso</span>
                      <span className="text-sm text-gray-600">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} />
                  </div>
                )}

                <Link href={`/curso/${course.id}`}>
                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    variant={course.status === "Concluído" ? "outline" : "default"}
                  >
                    {course.status === "Concluído" ? "Revisar" : course.progress > 0 ? "Continuar" : "Começar"}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
}
