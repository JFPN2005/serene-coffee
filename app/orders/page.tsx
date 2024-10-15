"use client";
import useSWR from "swr";
import Logo from "@/components/ui/Logo";
import type { OrderWithProducts } from "@/src/types";
import LatestOrderItem from "@/components/order/LatestOrderItem";

export default function OrdersPage() {
  // Url de la API
  const url = '/orders/api'
  // Recogemos cada orden pendiente
  const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
  const { data, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false
  })

  if (isLoading) return (
    <p>Cargando...</p>
  )

  if (data) return (
    <>
      <h1 className="text-center mt-20 text-6xl font-black">Ordenes Listas</h1>

      <Logo />

      {data.length ? (
        <div className="grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-10">
          {data.map((order) => (
            <LatestOrderItem 
              key={order.id}
              order={order}
            />
          ))}
        </div>
      ) : <p className='text-center my-10'>No hay ordenes pendientes</p>}

    </>
  )
}