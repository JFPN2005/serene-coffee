"use client"

import { useStore } from "@/src/store"
import ProductDetails from "../products/ProductDetails"
import { useMemo } from "react"
import { formatCurrency } from "@/src/utils"
import { createOrder } from "@/actions/create-order-action"
import { orderSchema } from "@/src/schema"
import { toast } from "react-toastify"

export default function OrderSummary() {
  // Obtenemos la orden
  const order = useStore((state) => state.order)
  // Eliminar la orden
  const clearOrder = useStore((state) => state.clearOrder)
  // Obtenemos el total
  const total = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order] )

  // Funcion para crear la orden
  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get('name'),
      total,
      order
    }

    const result = orderSchema.safeParse(data)
    console.log(result)
    if(!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message)
      })
      return
    }

    // Creamos la orden en el servidor
    const response = await createOrder(data)
    if(response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue.message)
      })
    }

    // Notificamos al usuario
    toast.success('Su orden se ha enviado con exito')
    // Limpiamos la orden
    clearOrder()
    
  }

  return (
    <aside className=" lg:overflow-y-scroll md:w-64 lg:w-96 p-5 bg-white shadow-xl">
      <h1 className="text-4xl font-black text-center">Mi Pedido</h1>
      {order.length === 0 ? <p className="text-center my-10">El pedido esta vacio</p> : (
        <div className="mt-5">
          {order.map(item => (
            <ProductDetails
              key={item.id}
              item={item}
            />
          ))}

          <p className="text-2xl mt-20 text-center">
            Total a pagar: {' '}
            <span className="font-bold">{formatCurrency(total)}</span>
          </p>

          <form
            className="w-full mt-10 space-y-5"
            action={handleCreateOrder}
          >

            <input
              type="text"
              placeholder="Ingresa tu nombre"
              className="bg-white border border-gray-300 p-2 w-full"
              name="name"
            />

            <input
              type="submit"
              className="py-2 rounded uppercase text-white bg-black w-full text-center font-bold cursor-pointer"
              value="Confirmar pedido"
            />

          </form>

        </div>
      )}
    </aside>
  )
}
