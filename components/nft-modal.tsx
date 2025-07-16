"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Gem, Sparkles } from "lucide-react"

interface NFTModalProps {
  isOpen: boolean
  onClose: () => void
  weekNumber: number
  courseName: string
}

export function NFTModal({ isOpen, onClose, weekNumber, courseName }: NFTModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-purple-600">🎉 Parabéns!</DialogTitle>
        </DialogHeader>

        <div className="text-center py-6">
          <div className="relative mx-auto w-32 h-32 mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl transform rotate-3"></div>
            <div className="relative bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl p-6 text-white">
              <Gem className="h-12 w-12 mx-auto mb-2" />
              <div className="text-xs font-bold">SEMANA {weekNumber}</div>
              <div className="text-xs">CONCLUÍDA</div>
            </div>
            <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-400" />
            <Sparkles className="absolute -bottom-2 -left-2 h-4 w-4 text-yellow-400" />
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2">NFT Conquistado!</h3>
          <p className="text-gray-600 mb-6">
            Você concluiu a Semana {weekNumber} do curso <br />
            <strong>{courseName}</strong>
          </p>

          <div className="space-y-3">
            <Button className="w-full bg-purple-600 hover:bg-purple-700">Ver no Meu Cofre</Button>
            <Button variant="outline" className="w-full bg-transparent" onClick={onClose}>
              Continuar Estudando
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
