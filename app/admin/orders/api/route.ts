import { prisma } from "@/src/lib/prisma";
export const dynamic = 'force-dynamic'

export async function GET() {
  // Buscamos todas las ordenes pendientes
  const orders = await prisma.order.findMany({
    where: {
      status: false
    },
    // Incluimos las ordenes con sus productos
    include: {
      orderProducts: {
        include: {
          product: true
        }
      }
    }
  })
  return Response.json(orders)
}