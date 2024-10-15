import ProductCard from "@/components/products/ProductCard"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"

// Buscamos todos los productos de la categoria
async function getProducts(category: string) {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category
      }
    }
  })
  return products
}

// Mostramos todos los productos de la categoria seleccionada
export default async function OrderPage({params} : {params: {category: string}}) {
  const products = await getProducts(params.category)
  return (
   <>
   <Heading>Elige y Personaliza tu pedido a continuación:</Heading>
    <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 gap-4 items-start">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
   </>
  )
}
