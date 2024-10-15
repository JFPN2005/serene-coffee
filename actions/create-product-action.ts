"use server"

import { prisma } from "@/src/lib/prisma"
import { ProductSchema } from "@/src/schema"

export async function createProduct(data: unknown) {
  const result = ProductSchema.safeParse(data)

  // Verificamos si la validacion falla
  if (!result.success) {
    return {
      errors: result.error.issues
    }
  }

  // Si la validacion es correcta creamos el producto
  await prisma.product.create({
      data: result.data
  })
}