import { Layout } from "@/components/layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Gem, Award, Calendar } from "lucide-react"

const nfts = [
  {
    id: 1,
    title: "Bitcoin Semana 1",
    course: "Bitcoin e Autocustódia",
    type: "weekly",
    date: "2024-01-15",
    rarity: "Comum",
    gradient: "from-blue-500 to-blue-700",
  },
  {
    id: 2,
    title: "Bitcoin Semana 2",
    course: "Bitcoin e Autocustódia",
    type: "weekly",
    date: "2024-01-22",
    rarity: "Comum",
    gradient: "from-purple-500 to-purple-700",
  },
  {
    id: 3,
    title: "Bitcoin Semana 3",
    course: "Bitcoin e Autocustódia",
    type: "weekly",
    date: "2024-01-29",
    rarity: "Comum",
    gradient: "from-green-500 to-green-700",
  },
  {
    id: 4,
    title: "Linux Semana 1",
    course: "Linux para Todos",
    type: "weekly",
    date: "2024-02-05",
    rarity: "Comum",
    gradient: "from-indigo-500 to-indigo-700",
  },
  {
    id: 5,
    title: "Certificado Linux",
    course: "Linux para Todos",
    type: "certificate",
    date: "2024-02-28",
    rarity: "Épico",
    gradient: "from-yellow-500 to-orange-600",
  },
]

export default function NFTs() {
  const weeklyNFTs = nfts.filter((nft) => nft.type === "weekly")
  const certificates = nfts.filter((nft) => nft.type === "certificate")

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Meu Cofre de NFTs</h1>
          <p className="text-gray-600">Sua coleção de conquistas em blockchain</p>
        </div>

        {/* Certificates Section */}
        {certificates.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Award className="h-6 w-6 mr-2 text-yellow-600" />
              Certificados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((nft) => (
                <Card
                  key={nft.id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className={`h-48 bg-gradient-to-br ${nft.gradient} relative flex items-center justify-center`}>
                    <div className="text-center text-white">
                      <Award className="h-16 w-16 mx-auto mb-4" />
                      <div className="text-lg font-bold">CERTIFICADO</div>
                      <div className="text-sm opacity-90">{nft.course}</div>
                    </div>
                    <Badge className="absolute top-4 right-4 bg-white/20 text-white border-white/30">
                      {nft.rarity}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2">{nft.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{nft.course}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(nft.date).toLocaleDateString("pt-BR")}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Weekly NFTs Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Gem className="h-6 w-6 mr-2 text-purple-600" />
            NFTs Semanais
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {weeklyNFTs.map((nft) => (
              <Card
                key={nft.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`h-40 bg-gradient-to-br ${nft.gradient} relative flex items-center justify-center`}>
                  <div className="text-center text-white">
                    <Gem className="h-12 w-12 mx-auto mb-2" />
                    <div className="text-sm font-bold">SEMANA {nft.id}</div>
                    <div className="text-xs opacity-90">CONCLUÍDA</div>
                  </div>
                  <Badge className="absolute top-3 right-3 bg-white/20 text-white border-white/30 text-xs">
                    {nft.rarity}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">{nft.title}</h3>
                  <p className="text-xs text-gray-600 mb-2">{nft.course}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(nft.date).toLocaleDateString("pt-BR")}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
