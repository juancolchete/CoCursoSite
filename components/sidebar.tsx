"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, BookOpen, BadgeIcon as Certificate, Settings, Gem } from "lucide-react"

const navigation = [
  { name: "Início", href: "/dashboard", icon: Home },
  { name: "Meus Cursos", href: "/cursos", icon: BookOpen },
  { name: "Meus NFTs", href: "/nfts", icon: Gem },
  { name: "Certificados", href: "/certificados", icon: Certificate },
  { name: "Configurações", href: "/config", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col bg-white border-r border-gray-200">
      <div className="flex items-center px-6 py-4 border-b border-gray-200">
        <Image src="/logo-cocurso.png" alt="CoCurso" width={32} height={32} className="rounded-lg" />
        <span className="ml-2 text-xl font-bold text-gray-900">CoCurso</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                isActive ? "bg-purple-100 text-purple-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
