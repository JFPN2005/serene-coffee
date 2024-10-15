import { redirect } from "next/navigation";
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import ProductSearchForm from "@/components/products/ProductSearchForm";

// Funcion para saber cuantos productos tiene la BD
async function productCount() {
  return await prisma.product.count()
}

// Funcion para obtener todos los productos
async function getProducts(page: number, pageSize: number) {
  // Saltamos 10 registros por pagina
  const skip = (page - 1) * pageSize
  const products = await prisma.product.findMany({
    take: pageSize,
    skip: skip,
    include: {
      category: true
    }
  })
  return products
}

export type ProductsWithCategories = Awaited<ReturnType<typeof getProducts>>

export default async function ProductsPage({ searchParams }: { searchParams: { page: string } }) {

  // Obtener la pagina actual
  const page = +searchParams.page || 1
  // Definimos la cadina de registros por pagina
  const pageSize = 10

  // Si la pagina es menor a 0 redireccionamos
  if (page < 0) redirect('/admin/products')

  // Buscamos todos los productos
  const productsData = getProducts(page, pageSize)
  // Obtener el total de productos
  const totalProductsData = productCount()
  // Iniciamos la consulta al mismo momento
  const [products, totalProducts] = await Promise.all([productsData, totalProductsData])
  // Verificamos la cantidad de paginas
  const totalPages = Math.ceil(totalProducts / pageSize)

  // Si la pagina es mayor al numero de paginas
  if (page > totalPages) redirect('/admin/products')

  return (
    <>
      <Heading>Administrar Productos</Heading>

      <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
        <Link
          href={'/admin/products/new'}
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
        >Crear Producto</Link>

        <ProductSearchForm />
      </div>

      <ProductTable
        products={products}
      />

      <ProductsPagination
        page={page}
        totalPages={totalPages}
      />
    </>
  )
}
