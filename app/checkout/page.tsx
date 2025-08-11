"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Check,
  Crown,
  Infinity,
  User,
  Mail,
  Lock,
  CreditCard,
  Shield,
  Zap,
  Users,
  BookOpen,
  Award,
  Bitcoin,
  Coins,
} from "lucide-react"

const plans = {
  basico: {
    name: "Básico",
    icon: BookOpen,
    color: "blue",
    description: "Ideal para iniciantes",
    features: ["Acesso a 3 cursos básicos", "Certificados de conclusão", "Suporte por email", "Acesso por 6 meses"],
    prices: {
      monthly: 29.9,
      yearly: 299.9,
      lifetime: null,
    },
  },
  pro: {
    name: "Pro",
    icon: Zap,
    color: "purple",
    description: "Para profissionais em crescimento",
    popular: true,
    features: [
      "Acesso a todos os cursos",
      "Certificados de conclusão",
      "Certificados blockchain",
      "Suporte prioritário",
      "Comunidade exclusiva",
      "Atualizações gratuitas",
    ],
    prices: {
      monthly: 79.9,
      yearly: 799.9,
      lifetime: 1999.9,
    },
  },
  premium: {
    name: "Premium",
    icon: Crown,
    color: "gold",
    description: "Experiência completa",
    features: [
      "Tudo do plano Pro",
      "Mentoria 1:1 mensal",
      "Acesso antecipado a novos cursos",
      "Eventos exclusivos",
      "Networking premium",
      "Consultoria personalizada",
      "Suporte 24/7",
    ],
    prices: {
      monthly: 149.9,
      yearly: 1499.9,
      lifetime: 3999.9,
    },
  },
}

const paymentMethods = {
  credit: {
    name: "Cartão de Crédito",
    icon: CreditCard,
    discount: 0,
    description: "Visa, Mastercard, Elo",
  },
  pix: {
    name: "PIX",
    icon: () => (
      <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
        <span className="text-white text-xs font-bold">P</span>
      </div>
    ),
    discount: 5,
    description: "Pagamento instantâneo",
  },
  bitcoin: {
    name: "Bitcoin",
    icon: Bitcoin,
    discount: 50,
    description: "BTCPay Server",
    color: "text-orange-500",
  },
  usdt: {
    name: "USDT",
    icon: Coins,
    discount: 20,
    description: "Polygon, Arbitrum, Liquid",
    color: "text-green-500",
  },
}

export default function Checkout() {
  const [selectedPlan, setSelectedPlan] = useState<keyof typeof plans>("pro")
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly" | "lifetime">("yearly")
  const [selectedPayment, setSelectedPayment] = useState<keyof typeof paymentMethods>("credit")
  const [usdtNetwork, setUsdtNetwork] = useState("polygon")
  const [showSignup, setShowSignup] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const currentPlan = plans[selectedPlan]
  const currentPayment = paymentMethods[selectedPayment]
  const basePrice = currentPlan.prices[billingCycle] || 0
  const discountAmount = (basePrice * currentPayment.discount) / 100
  const finalPrice = basePrice - discountAmount

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return {
          bg: "bg-blue-500",
          border: "border-blue-500",
          text: "text-blue-600",
          bgLight: "bg-blue-50",
        }
      case "purple":
        return {
          bg: "bg-purple-500",
          border: "border-purple-500",
          text: "text-purple-600",
          bgLight: "bg-purple-50",
        }
      case "gold":
        return {
          bg: "bg-yellow-500",
          border: "border-yellow-500",
          text: "text-yellow-600",
          bgLight: "bg-yellow-50",
        }
      default:
        return {
          bg: "bg-gray-500",
          border: "border-gray-500",
          text: "text-gray-600",
          bgLight: "bg-gray-50",
        }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const getPaymentButtonText = () => {
    switch (selectedPayment) {
      case "bitcoin":
        return "Pagar com Bitcoin"
      case "usdt":
        return `Pagar com USDT (${usdtNetwork.toUpperCase()})`
      case "pix":
        return "Pagar com PIX"
      default:
        return "Finalizar Compra"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo-cocurso.png" alt="CoCurso" width={40} height={40} className="rounded-lg" />
            <span className="text-2xl font-bold text-gray-900">CoCurso</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-gray-700 hover:text-purple-600">
                Já tenho conta
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Escolha seu plano e comece a aprender</h1>
          <p className="text-xl text-gray-600">
            Acesso completo à plataforma de cursos de tecnologia mais avançada do Brasil
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Plans Selection */}
          <div className="lg:col-span-2">
            {/* Billing Toggle */}
            <div className="flex items-center justify-center mb-8 p-1 bg-gray-100 rounded-lg w-fit mx-auto">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingCycle === "monthly" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Mensal
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors relative ${
                  billingCycle === "yearly" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Anual
                <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs">-17%</Badge>
              </button>
              <button
                onClick={() => setBillingCycle("lifetime")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingCycle === "lifetime" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Vitalício
              </button>
            </div>

            {/* Plans Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(plans).map(([key, plan]) => {
                const colors = getColorClasses(plan.color)
                const isSelected = selectedPlan === key
                const price = plan.prices[billingCycle]

                if (!price && billingCycle === "lifetime" && key === "basico") {
                  return null // Don't show basic plan for lifetime
                }

                return (
                  <Card
                    key={key}
                    className={`relative cursor-pointer transition-all duration-300 ${
                      isSelected ? `ring-2 ${colors.border} shadow-lg` : "hover:shadow-md"
                    } ${plan.popular ? "scale-105" : ""}`}
                    onClick={() => setSelectedPlan(key as keyof typeof plans)}
                  >
                    {plan.popular && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white">
                        Mais Popular
                      </Badge>
                    )}

                    <CardHeader className="text-center pb-4">
                      <div
                        className={`w-12 h-12 ${colors.bgLight} rounded-full flex items-center justify-center mx-auto mb-4`}
                      >
                        <plan.icon className={`h-6 w-6 ${colors.text}`} />
                      </div>
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      <p className="text-gray-600 text-sm">{plan.description}</p>

                      <div className="mt-4">
                        {price ? (
                          <div>
                            <span className="text-3xl font-bold text-gray-900">
                              R$ {price.toFixed(2).replace(".", ",")}
                            </span>
                            {billingCycle !== "lifetime" && (
                              <span className="text-gray-600">/{billingCycle === "monthly" ? "mês" : "ano"}</span>
                            )}
                            {billingCycle === "yearly" && (
                              <div className="text-sm text-gray-500 mt-1">
                                R$ {(price / 12).toFixed(2).replace(".", ",")}/mês
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-500">Não disponível</span>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent>
                      <ul className="space-y-3">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Resumo do Pedido</span>
                  {billingCycle === "lifetime" && (
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      <Infinity className="h-3 w-3 mr-1" />
                      Vitalício
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Plan Summary */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Plano {currentPlan.name}</span>
                    <span className="font-bold">R$ {basePrice?.toFixed(2).replace(".", ",")}</span>
                  </div>

                  {billingCycle === "yearly" && (
                    <div className="flex items-center justify-between text-sm text-green-600">
                      <span>Desconto anual</span>
                      <span>-17%</span>
                    </div>
                  )}

                  {currentPayment.discount > 0 && (
                    <div className="flex items-center justify-between text-sm text-green-600">
                      <span>Desconto {currentPayment.name}</span>
                      <span>
                        -{currentPayment.discount}% (-R$ {discountAmount.toFixed(2).replace(".", ",")})
                      </span>
                    </div>
                  )}

                  <Separator />

                  <div className="flex items-center justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-purple-600">R$ {finalPrice?.toFixed(2).replace(".", ",")}</span>
                  </div>

                  {currentPayment.discount > 0 && (
                    <div className="text-center">
                      <Badge className="bg-green-100 text-green-700">
                        Você economiza R$ {discountAmount.toFixed(2).replace(".", ",")}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Account Creation Toggle */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="create-account" className="text-sm font-medium">
                      Criar conta agora
                    </Label>
                    <Switch id="create-account" checked={showSignup} onCheckedChange={setShowSignup} />
                  </div>

                  {showSignup && (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome Completo</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="name"
                            name="name"
                            placeholder="Seu nome"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="seu@email.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">Senha</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Crie uma senha"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Payment Method */}
                <div className="space-y-4">
                  <h4 className="font-medium">Método de Pagamento</h4>

                  <div className="space-y-3">
                    {Object.entries(paymentMethods).map(([key, method]) => {
                      const isSelected = selectedPayment === key
                      const IconComponent = method.icon

                      return (
                        <div
                          key={key}
                          className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                            isSelected ? "border-purple-500 bg-purple-50" : "hover:bg-gray-50"
                          }`}
                          onClick={() => setSelectedPayment(key as keyof typeof paymentMethods)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={method.color || "text-gray-600"}>
                              <IconComponent className="h-5 w-5" />
                            </div>
                            <div>
                              <span className="text-sm font-medium">{method.name}</span>
                              <p className="text-xs text-gray-500">{method.description}</p>
                            </div>
                          </div>
                          {method.discount > 0 && (
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                method.discount >= 50
                                  ? "border-orange-500 text-orange-600"
                                  : "border-green-500 text-green-600"
                              }`}
                            >
                              -{method.discount}%
                            </Badge>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* USDT Network Selection */}
                  {selectedPayment === "usdt" && (
                    <div className="space-y-2">
                      <Label htmlFor="usdt-network">Rede USDT</Label>
                      <Select value={usdtNetwork} onValueChange={setUsdtNetwork}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="polygon">Polygon (MATIC)</SelectItem>
                          <SelectItem value="arbitrum">Arbitrum (ARB)</SelectItem>
                          <SelectItem value="liquid">Liquid Network</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                {/* Crypto Payment Info */}
                {(selectedPayment === "bitcoin" || selectedPayment === "usdt") && (
                  <div className="p-4 bg-gradient-to-r from-orange-50 to-purple-50 rounded-lg border border-orange-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-800">Pagamento Seguro</span>
                    </div>
                    <p className="text-xs text-orange-700">
                      Transações processadas via blockchain com confirmação automática
                    </p>
                  </div>
                )}

                {/* Security Badge */}
                <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <Shield className="h-4 w-4" />
                  <span>Pagamento 100% seguro e criptografado</span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3">
                    {getPaymentButtonText()}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Ao finalizar a compra, você concorda com nossos{" "}
                    <a href="#" className="text-purple-600 hover:underline">
                      Termos de Uso
                    </a>{" "}
                    e{" "}
                    <a href="#" className="text-purple-600 hover:underline">
                      Política de Privacidade
                    </a>
                  </p>
                </div>

                {/* Guarantee */}
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <Shield className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-green-800">Garantia de 30 dias</span>
                  </div>
                  <p className="text-xs text-green-700">Não ficou satisfeito? Devolvemos 100% do seu dinheiro</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Por que escolher o CoCurso?</h2>
            <p className="text-xl text-gray-600">A plataforma mais completa para sua evolução profissional</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Cursos Práticos</h3>
              <p className="text-gray-600">Aprenda com projetos reais e aplicáveis no mercado de trabalho atual</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Certificados</h3>
              <p className="text-gray-600">
                Certificados utilizando sistema interplanetário de arquivos IPFS para validação
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Comunidade Ativa</h3>
              <p className="text-gray-600">Conecte-se com outros estudantes e profissionais da área</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
