import Heading from "@/components/ui/Heading"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="text-center">
      <Heading>Producto no Encontrado</Heading>
      <Link
        href={'/admin/products'}
        className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold text-black cursor-pointer" 
      >Ir a Productos</Link>
    </div>
  )
}
