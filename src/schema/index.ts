import { z } from "zod";

export const orderSchema = z.object({
  name: z.string()
          .min(1, "Debe agregar un nombre"),
  total: z.number()
          .min(1, "Debe agregar un precio"),
  order: z.array(z.object({
    id: z.number(),
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
    subtotal: z.number()
  }))
})

// Validamos el id de la orden
export const OrderIdSchema = z.object({
  orderId: z.string()
            .transform((value) => parseInt(value))
            .refine(value => value > 0, {message: "Hubo un error"})
})

// Validamos el buscador de productos
export const SearchSchema = z.object({
  search: z.string()
          .trim()
          .min(1, {message: "La busqueda esta vacia"} )
})

// Validamos el formulario de creacion de productos
export const ProductSchema = z.object({
  name: z.string()
      .trim()
      .min(1, { message: 'El Nombre del Producto no puede ir vacio'}),
  price: z.string()
      .trim()
      .transform((value) => parseFloat(value)) 
      .refine((value) => value > 0, { message: 'Precio no válido' })
      .or(z.number().min(1, {message: 'La Categoría es Obligatoria' })),
  categoryId: z.string()
      .trim()
      .transform((value) => parseInt(value)) 
      .refine((value) => value > 0, { message: 'La Categoría es Obligatoria' })
      .or(z.number().min(1, {message: 'La Categoría es Obligatoria' })),
  image: z.string().min(1, { message: 'La Imagen es Obligatoria' })
})