import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Bell,
  Shield,
  Palette,
  Wallet,
  Smartphone,
  Monitor,
  Moon,
  Sun,
  Trash2,
  Download,
  Upload,
} from "lucide-react"

export default function Config() {
  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Configurações</h1>
          <p className="text-gray-600">Gerencie suas preferências e configurações da conta</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <a
                    href="#perfil"
                    className="flex items-center px-3 py-2 text-sm font-medium text-purple-700 bg-purple-100 rounded-lg"
                  >
                    <User className="h-4 w-4 mr-3" />
                    Perfil
                  </a>
                  <a
                    href="#notificacoes"
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <Bell className="h-4 w-4 mr-3" />
                    Notificações
                  </a>
                  <a
                    href="#privacidade"
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <Shield className="h-4 w-4 mr-3" />
                    Privacidade
                  </a>
                  <a
                    href="#aparencia"
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <Palette className="h-4 w-4 mr-3" />
                    Aparência
                  </a>
                  <a
                    href="#blockchain"
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <Wallet className="h-4 w-4 mr-3" />
                    Blockchain
                  </a>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Profile Settings */}
            <Card id="perfil">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-purple-600" />
                  Informações do Perfil
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback className="text-xl bg-purple-100 text-purple-600">JS</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Alterar Foto
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remover
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input id="nome" defaultValue="João Silva" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Nome de Usuário</Label>
                    <Input id="username" defaultValue="joao.silva" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" defaultValue="joao.silva@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input id="telefone" defaultValue="+55 11 99999-9999" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Biografia</Label>
                  <textarea
                    id="bio"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={3}
                    placeholder="Conte um pouco sobre você..."
                    defaultValue="Desenvolvedor apaixonado por tecnologia blockchain e Bitcoin. Sempre em busca de novos conhecimentos."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="localizacao">Localização</Label>
                  <Select defaultValue="brasil">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brasil">Brasil</SelectItem>
                      <SelectItem value="portugal">Portugal</SelectItem>
                      <SelectItem value="eua">Estados Unidos</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="bg-purple-600 hover:bg-purple-700">Salvar Alterações</Button>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card id="notificacoes">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-purple-600" />
                  Notificações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium text-gray-900">Notificações por E-mail</p>
                      <p className="text-sm text-gray-600">Receba atualizações sobre cursos e NFTs por e-mail</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium text-gray-900">Notificações Push</p>
                      <p className="text-sm text-gray-600">Receba notificações no navegador</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium text-gray-900">Novos Cursos</p>
                      <p className="text-sm text-gray-600">Seja notificado quando novos cursos forem lançados</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium text-gray-900">NFTs Conquistados</p>
                      <p className="text-sm text-gray-600">Notificações quando conquistar novos NFTs</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium text-gray-900">Lembretes de Estudo</p>
                      <p className="text-sm text-gray-600">Lembretes para continuar seus cursos</p>
                    </div>
                    <Switch />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium text-gray-900">Newsletter</p>
                      <p className="text-sm text-gray-600">Receba nossa newsletter semanal</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Frequência de E-mails</h4>
                  <Select defaultValue="diario">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="imediato">Imediato</SelectItem>
                      <SelectItem value="diario">Resumo Diário</SelectItem>
                      <SelectItem value="semanal">Resumo Semanal</SelectItem>
                      <SelectItem value="nunca">Nunca</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card id="privacidade">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-purple-600" />
                  Privacidade e Segurança
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium text-gray-900">Perfil Público</p>
                      <p className="text-sm text-gray-600">Permitir que outros usuários vejam seu perfil</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium text-gray-900">Mostrar NFTs no Perfil</p>
                      <p className="text-sm text-gray-600">Exibir seus NFTs conquistados publicamente</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium text-gray-900">Mostrar Progresso</p>
                      <p className="text-sm text-gray-600">Permitir que outros vejam seu progresso nos cursos</p>
                    </div>
                    <Switch />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium text-gray-900">Autenticação de Dois Fatores</p>
                      <p className="text-sm text-gray-600">Adicione uma camada extra de segurança</p>
                    </div>
                    <Badge variant="outline" className="text-orange-600 border-orange-600">
                      Não Configurado
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Alterar Senha</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="senha-atual">Senha Atual</Label>
                      <Input id="senha-atual" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nova-senha">Nova Senha</Label>
                      <Input id="nova-senha" type="password" />
                    </div>
                  </div>
                  <Button variant="outline">Alterar Senha</Button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Configurar 2FA</h4>
                  <p className="text-sm text-gray-600">Use um aplicativo autenticador para maior segurança</p>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Smartphone className="h-4 w-4 mr-2" />
                    Configurar 2FA
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Appearance Settings */}
            <Card id="aparencia">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="h-5 w-5 mr-2 text-purple-600" />
                  Aparência
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Tema</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center p-4 border-2 border-purple-500 rounded-lg bg-purple-50">
                      <Sun className="h-8 w-8 text-purple-600 mb-2" />
                      <span className="text-sm font-medium">Claro</span>
                    </div>
                    <div className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer">
                      <Moon className="h-8 w-8 text-gray-600 mb-2" />
                      <span className="text-sm font-medium">Escuro</span>
                    </div>
                    <div className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer">
                      <Monitor className="h-8 w-8 text-gray-600 mb-2" />
                      <span className="text-sm font-medium">Sistema</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Idioma</h4>
                  <Select defaultValue="pt-br">
                    <SelectTrigger className="w-full md:w-64">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-br">Português (Brasil)</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Fuso Horário</h4>
                  <Select defaultValue="america-sao-paulo">
                    <SelectTrigger className="w-full md:w-64">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="america-sao-paulo">América/São Paulo (GMT-3)</SelectItem>
                      <SelectItem value="america-new-york">América/Nova York (GMT-5)</SelectItem>
                      <SelectItem value="europe-london">Europa/Londres (GMT+0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium text-gray-900">Animações</p>
                    <p className="text-sm text-gray-600">Habilitar animações e transições</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Blockchain Settings */}
            <Card id="blockchain">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wallet className="h-5 w-5 mr-2 text-purple-600" />
                  Configurações Blockchain
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Carteira Conectada</h4>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <Wallet className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">MetaMask</p>
                        <p className="text-sm text-gray-600">0x1234...5678</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Conectada</Badge>
                  </div>
                  <Button variant="outline">Desconectar Carteira</Button>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Rede Blockchain</h4>
                  <Select defaultValue="polygon">
                    <SelectTrigger className="w-full md:w-64">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ethereum">Ethereum Mainnet</SelectItem>
                      <SelectItem value="polygon">Polygon</SelectItem>
                      <SelectItem value="bsc">Binance Smart Chain</SelectItem>
                      <SelectItem value="arbitrum">Arbitrum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium text-gray-900">Auto-Mint NFTs</p>
                    <p className="text-sm text-gray-600">Criar NFTs automaticamente ao concluir semanas</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Exportar Dados</h4>
                  <p className="text-sm text-gray-600">Baixe todos os seus dados da plataforma</p>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar Dados
                  </Button>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 text-red-600">Zona de Perigo</h4>
                  <p className="text-sm text-gray-600">Ações irreversíveis para sua conta</p>
                  <div className="space-y-3">
                    <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Excluir Conta
                    </Button>
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
