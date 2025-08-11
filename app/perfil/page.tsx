import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Calendar, Award, BookOpen, Edit, Trophy } from "lucide-react"

const userStats = {
  name: "João Silva",
  email: "joao.silva@email.com",
  joinDate: "2024-01-10",
  totalCourses: 3,
  completedCourses: 1,
  activeCourses: 2,
  totalModules: 12, // Alterado de totalNFTs para totalModules
  certificates: 1,
  overallProgress: 67,
}

const achievements = [
  { title: "Primeiro Curso", description: "Completou seu primeiro curso", icon: Trophy, color: "text-yellow-600" },
  { title: "Colecionador", description: "Concluiu 10+ módulos", icon: BookOpen, color: "text-purple-600" }, // Alterado de "Conquistou" para "Concluiu"
  { title: "Dedicado", description: "7 dias consecutivos estudando", icon: Award, color: "text-green-600" },
]

export default function Perfil() {
  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Meu Perfil</h1>
          <p className="text-gray-600">Gerencie suas informações e acompanhe seu progresso</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" />
                  <AvatarFallback className="text-2xl bg-purple-100 text-purple-600">
                    {userStats.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{userStats.name}</CardTitle>
                <p className="text-gray-600 flex items-center justify-center mt-2">
                  <Mail className="h-4 w-4 mr-2" />
                  {userStats.email}
                </p>
                <p className="text-sm text-gray-500 flex items-center justify-center mt-1">
                  <Calendar className="h-4 w-4 mr-2" />
                  Membro desde {new Date(userStats.joinDate).toLocaleDateString("pt-BR")}
                </p>
              </CardHeader>
              <CardContent>
                <Button className="w-full mb-4 bg-transparent" variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Perfil
                </Button>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Progresso Geral</span>
                    <span className="text-sm font-medium">{userStats.overallProgress}%</span>
                  </div>
                  <Progress value={userStats.overallProgress} />
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-yellow-600" />
                  Conquistas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <achievement.icon className={`h-6 w-6 ${achievement.color}`} />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{achievement.title}</p>
                        <p className="text-xs text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats and Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <BookOpen className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{userStats.totalCourses}</p>
                  <p className="text-sm text-gray-600">Cursos</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{userStats.completedCourses}</p>
                  <p className="text-sm text-gray-600">Concluídos</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{userStats.totalModules}</p>
                  <p className="text-sm text-gray-600">Módulos</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{userStats.certificates}</p>
                  <p className="text-sm text-gray-600">Certificados</p>
                </CardContent>
              </Card>
            </div>

            {/* Course Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-purple-600" />
                  Progresso dos Cursos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">Bitcoin e Autocustódia</span>
                      <Badge variant="secondary">60%</Badge>
                    </div>
                    <Progress value={60} />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">Linux para Todos</span>
                      <Badge className="bg-green-100 text-green-700">Concluído</Badge>
                    </div>
                    <Progress value={100} />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">Desenvolvimento Blockchain</span>
                      <Badge variant="outline">Não iniciado</Badge>
                    </div>
                    <Progress value={0} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}
