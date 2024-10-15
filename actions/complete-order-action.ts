"use server"

import { prisma } from "@/src/lib/prisma"
import { OrderIdSchema } from "@/src/schema"
import { revalidatePath } from "next/cache"

export async function completeOrder(formData: FormData) {
  // Extraemos el id de la orden
  const data = {
    orderId : formData.get("order_id")
  }

  // Tipamos y el id de la orden
  const result = OrderIdSchema.safeParse(data)

  // Si el id de la orden es valido
  if(result.success) {
    try {
      await prisma.order.update({
        where: {
          id: result.data.orderId
        },
        data: {
          status: true,
          orderReadyAt: new Date(Date.now())
        }
      })

      revalidatePath('/admin/orders')
    } catch (error) {
      console.log(error)
    }
  }
  
}