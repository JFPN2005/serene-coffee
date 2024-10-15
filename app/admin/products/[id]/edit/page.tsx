import EditProductForm from "@/components/products/EditProductForm"
import ProductForm from "@/components/products/ProductForm"
import GoBackButton from "@/components/ui/GoBackButton"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import { notFound } from "next/navigation"

// Funcion para obtener un solo producto
async function getProductsById(id: number) {
  const product = await prisma.product.findUnique({
    where: {
      id
    }
  })

  // Si el producto no existe redireccionamos
  if(!product) {
    notFound()
  }

  return product
}


export default async function EditProductsPage({ params }: { params: { id: string } }) {
  // Obtenemos el producto
  const product = await getProductsById(+params.id)
  console.log(product)

  return (
    <>
      <Heading>Editar Producto: <span className="font-normal">{product.name}</span></Heading>

      <GoBackButton/>

      <EditProductForm>
        <ProductForm 
          product={product}
        />
      </EditProductForm>
    </>
  )
}
