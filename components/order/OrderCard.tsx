import { completeOrder } from "@/actions/complete-order-action";
import type { OrderWithProducts } from "@/src/types";
import { formatCurrency } from "@/src/utils";
import { useState } from "react";

type OrderCardProps = {
  order: OrderWithProducts;
};

export default function OrderCard({ order }: OrderCardProps) {
  // Estado para manejar el color del botón
  const [buttonClass, setButtonClass] = useState("bg-indigo-600 hover:bg-indigo-800");

  // Cambia el color del botón cuando se hace clic
  const handleClick = () => {
    setButtonClass("bg-green-600 hover:bg-green-800");
  };

  return (
    <section
      aria-labelledby="summary-heading"
      className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:mt-0 lg:p-8 space-y-4"
    >
      <p className="text-2xl font-medium text-gray-900">Cliente: {order.name}</p>
      <p className="text-lg font-medium text-gray-900">Productos Ordenados:</p>
      <dl className="mt-6 space-y-4">
        {order.orderProducts.map((product) => (
          <div key={product.id} className="flex items-center gap-2 border-t border-gray-200 pt-4">
            <dt className="flex items-center text-sm text-gray-600">
              <span className="font-black">({product.quantity}){" "}</span>
            </dt>
            <dd className="text-sm font-medium text-gray-900">{product.product.name}</dd>
          </div>
        ))}
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt className="text-base font-medium text-gray-900">Total a Pagar:</dt>
          <dd className="text-base font-medium text-gray-900">{formatCurrency(order.total)}</dd>
        </div>
      </dl>

      {/* Mantener el action del formulario y manejar el clic para cambiar el color */}
      <form action={completeOrder}>
        <input type="hidden" name="order_id" value={order.id} />
        <input
          type="submit"
          className={`${buttonClass} text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer`}
          value="Marcar Orden Completada"
          onClick={handleClick} // Cambia de color cuando haces clic
        />
      </form>
    </section>
  );
}
