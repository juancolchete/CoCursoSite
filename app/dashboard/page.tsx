"use client"

import { useEffect, useState } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { BookOpen, Award, TrendingUp, Gem, AlertCircle, Star, Users, Calendar } from "lucide-react"
import { fetchCourses, type Course } from "@/lib/courses"
import Link from "next/link"

export default function Dashboard() {
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
      } catch (error) {
        console.error("Error loading courses:", error)
        setError("Erro ao carregar cursos")
        setCourses([])
      } finally {
        setLoading(false)
      }
    }

    loadCourses()
  }, [])

  const activeCourses = courses.filter((course) => course.status === "Em andamento")
  const completedCourses = courses.filter((course) => course.status === "Concluído")
  const totalProgress =
    courses.length > 0 ? Math.round(courses.reduce((acc, course) => acc + course.progress, 0) / courses.length) : 0
  const totalNFTs = courses.reduce((acc, course) => acc + course.completedWeeks, 0)

  if (loading) {
    return (
      <Layout>
        <div className="p-8">
          <div className="mb-8">
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-16 w-full" />
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Sua jornada de aprendizado</p>
          </div>

          <Card className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {error ? "Erro ao carregar dados" : "Nenhum curso encontrado"}
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bem-vindo! 👋</h1>
          <p className="text-gray-600">Continue sua jornada de aprendizado em tecnologia</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Cursos Ativos</p>
                  <p className="text-2xl font-bold text-gray-900">{activeCourses.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Progresso Geral</p>
                  <p className="text-2xl font-bold text-gray-900">{totalProgress}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Gem className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">NFTs Conquistados</p>
                  <p className="text-2xl font-bold text-gray-900">{totalNFTs}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Award className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Certificados</p>
                  <p className="text-2xl font-bold text-gray-900">{completedCourses.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Courses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Cursos em Andamento</h2>
            <div className="space-y-4">
              {activeCourses.length > 0 ? (
                activeCourses.slice(0, 3).map((course) => (
                  <Card key={course.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-400 mr-1 fill-current" />
                              {course.rating}
                            </div>
                            <span>•</span>
                            <div className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {course.students.toLocaleString()}
                            </div>
                            {course.totalWeeks > 0 && (
                              <>
                                <span>•</span>
                                <div className="flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {course.totalWeeks} sem
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        {course.completedWeeks > 0 && (
                          <Badge variant="outline" className="text-xs">
                            Semana {course.completedWeeks + 1}
                          </Badge>
                        )}
                      </div>
                      {course.progress > 0 && <Progress value={course.progress} className="mb-4" />}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{course.progress}% concluído</span>
                        <Link href={`/curso/${course.id}`}>
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                            Continuar
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-gray-600">Nenhum curso em andamento</p>
                    <Link href="/cursos">
                      <Button className="mt-4 bg-purple-600 hover:bg-purple-700">Explorar Cursos</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Cursos Disponíveis</h2>
            <div className="space-y-4">
              {courses.slice(0, 4).map((course, index) => (
                <Card key={course.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{course.title}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-400 mr-1 fill-current" />
                            {course.rating}
                          </div>
                          {course.totalWeeks > 0 && (
                            <>
                              <span>•</span>
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {course.totalWeeks} semanas
                              </div>
                            </>
                          )}
                          {course.tags && course.tags.length > 0 && (
                            <>
                              <span>•</span>
                              <Badge variant="outline" className="text-xs px-1 py-0">
                                {course.tags[0]}
                              </Badge>
                            </>
                          )}
                        </div>
                      </div>
                      <Link href={`/curso/${course.id}`}>
                        <Button size="sm" variant="outline">
                          Ver Curso
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
