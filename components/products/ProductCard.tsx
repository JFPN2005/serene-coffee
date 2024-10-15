import type { Product } from "@prisma/client"
import Image from "next/image"
import AddProductButton from "./AddProductButton"
import { formatCurrency, getImagePath } from "@/src/utils"

type ProductCardProps = {
  product: Product
}
// Mostramos cada producto
export default function ProductCard({product}: ProductCardProps) {

  const imagePath = getImagePath(product.image)

  return (
    <>
      <div className="border bg-white rounded-2xl">

        <Image 
          width={400}
          height={500}
          src={imagePath}
          alt={product.name}
        />

        <div className="p-5">
          <h3 className="text-2xl font-bold">{product.name}</h3>
          <p className="text-4xl font-black mt-5 text-amber-500">{formatCurrency(product.price)}</p>
          <AddProductButton product={product} />
        </div>
      </div>
    </>
  )
}