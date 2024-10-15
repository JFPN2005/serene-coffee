// Importaciones
import { Product, type Order, type OrderProducts } from "@prisma/client";

// Type para la orden de los productos
export type OrderItem = Pick<Product, "id" | "name" | "price"> & { 
  quantity: number, 
  subtotal: number 
};

export type OrderWithProducts = Order & {
  orderProducts: (OrderProducts & {
    product: Product
  })[]
}