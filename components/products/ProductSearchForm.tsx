"use client"
import { SearchSchema } from "@/src/schema"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

export default function ProductSearchForm() {
  const router = useRouter()

  // Funcion para buscar productos
  const handleSearchForm = (formData: FormData) => {
    const data = {
      search: formData.get('search')
    }

    const result = SearchSchema.safeParse(data)
    
    // Si la validacion falla notificamos al usuario
    if(!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message)
      })
      return
    }

    // Si la validacion es correcta redireccionamos a la busqueda
    router.push(`/admin/products/search?search=${result.data.search}`)
    
  }

  return (
    <form 
      action={handleSearchForm} className="flex items-center"
    >
      <input
        type="text"
        placeholder="Buscar producto..."
        className="bg-gray-200 p-2 placeholder-gray-500 w-full"
        name="search"
      />

      <input 
        type="submit"
        value={"Buscar"}
        className="bg-indigo-600 p-2 uppercase text-white cursor-pointer"
      />
    </form>
  )
}
