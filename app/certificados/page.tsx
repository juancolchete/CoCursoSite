import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Award, Download, Share, Calendar, CheckCircle } from "lucide-react"

const certificates = [
  {
    id: 1,
    title: "Certificado de Conclusão - Linux para Todos",
    course: "Linux para Todos",
    completedDate: "2024-02-28",
    issueDate: "2024-03-01",
    status: "Emitido",
    ipfsCid: "bafybeifx7yeb55armcsxwwitkymga5xf53dxiarykms3ygqic223w5sk3m",
    skills: ["Terminal Linux", "Administração de Sistema", "Shell Scripting", "Redes Linux"],
  },
  {
    id: 2,
    title: "Certificado de Conclusão - Bitcoin e Autocustódia",
    course: "Bitcoin e Autocustódia",
    completedDate: "2024-03-15",
    issueDate: "2024-03-16",
    status: "Emitido",
    ipfsCid: "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
    skills: ["Bitcoin Fundamentals", "Carteiras Hardware", "Autocustódia", "Segurança Cripto"],
  },
  {
    id: 3,
    title: "Certificado de Conclusão - Desenvolvimento Blockchain",
    course: "Desenvolvimento Blockchain",
    completedDate: null,
    issueDate: null,
    status: "Em Progresso",
    ipfsCid: null,
    skills: ["Smart Contracts", "Solidity", "Web3", "DApps"],
  },
]

export default function Certificados() {
  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Meus Certificados</h1>
          <p className="text-gray-600">Certificados utilizando sistema interplanetário de arquivos IPFS</p>
        </div>

        <div className="space-y-6">
          {certificates.map((cert) => (
            <Card key={cert.id} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`p-3 rounded-lg ${
                        cert.status === "Emitido" ? "bg-gradient-to-br from-purple-500 to-purple-700" : "bg-gray-300"
                      }`}
                    >
                      <Award className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2">{cert.title}</CardTitle>
                      <p className="text-gray-600 mb-3">{cert.course}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        {cert.completedDate && (
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Concluído em {new Date(cert.completedDate).toLocaleDateString("pt-BR")}
                          </div>
                        )}
                        {cert.status === "Emitido" && (
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Certificado emitido
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <Badge variant={cert.status === "Emitido" ? "default" : "secondary"}>{cert.status}</Badge>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Habilidades Certificadas</h4>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {cert.ipfsCid && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">IPFS CIDR</h4>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Content ID:</p>
                        <p className="font-mono text-sm text-gray-900">
                          {cert.ipfsCid.substring(0, 12)}...{cert.ipfsCid.substring(cert.ipfsCid.length - 8)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {cert.status === "Emitido" && (
                  <div className="flex items-center space-x-3 mt-6 pt-4 border-t">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Download className="h-4 w-4 mr-2" />
                      Baixar Certificado
                    </Button>
                    <Button variant="outline">
                      <Share className="h-4 w-4 mr-2" />
                      Compartilhar
                    </Button>
                    <Button variant="outline">Ver IPFS</Button>
                  </div>
                )}

                {cert.status === "Em Progresso" && (
                  <div className="mt-6 pt-4 border-t">
                    <p className="text-sm text-gray-600 mb-3">Complete o curso para receber seu certificado IPFS</p>
                    <Button className="bg-purple-600 hover:bg-purple-700">Continuar Curso</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
}
