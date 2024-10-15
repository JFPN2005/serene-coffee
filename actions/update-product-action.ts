"use server"

import { prisma } from "@/src/lib/prisma"
import { ProductSchema } from "@/src/schema"
import { revalidatePath } from "next/cache"

export async function updateProduct(data: unknown, id: number) {
  const result = ProductSchema.safeParse(data)

  // Verificamos si la validacion falla
  if (!result.success) {
    return {
      errors: result.error.issues
    }
  }

  // Si la validacion es correcta creamos el producto
  await prisma.product.update({
      where: {
        id
      },
      data: result.data
  })

  // Recargamos la pagina
  revalidatePath('/admin/products')
}