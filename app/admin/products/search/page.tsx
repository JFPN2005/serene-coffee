import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function searchProducts(searchTerm: string) {
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: 'insensitive'
      }
    },
    include: {
      category: true
    }
  })
  return products
}


export default async function searchPage({ searchParams }: { searchParams: { search: string } }) {

  const products = await searchProducts(searchParams.search)

  return (
    <>
      <Heading>Resultado de la búsqueda: {searchParams.search}</Heading>

      <div className="flex flex-col lg:flex-row lg:justify-end gap-5">
        <ProductSearchForm />
      </div>

      {products.length ? (
      <ProductTable products={products} />
      ) : <p className="text-center text-lg">No se encontraron resultados</p>}
    </>
  )
}