"use server"

import { prisma } from "@/src/lib/prisma"
import { orderSchema } from "@/src/schema"

export async function createOrder(data: unknown) {
  const result = orderSchema.safeParse(data)

  // Si la validacion falla retornamos los errores
  if(!result.success) {
    return {
      errors: result.error.issues
    }
  }

  try {
    // Creamos la orden en la base de datos
    await prisma.order.create({
      data: {
        name: result.data.name,
        total: result.data.total,
        orderProducts: {
          create: result.data.order.map((product) => ({
            productId: product.id,
            quantity: product.quantity
          }))
        }
      }
    })
  } catch (error) {
    console.log(error)
  }
}