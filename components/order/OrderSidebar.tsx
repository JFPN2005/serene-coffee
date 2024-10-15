import { prisma } from '@/src/lib/prisma';
import CategoryIcon from '../ui/CategoryIcon';
import Logo from '../ui/Logo';

// Función para obtener las categorias de la base de datos
async function getCategories() {
  return await prisma.category.findMany();
}

export default async function OrderSidebar() {
  // Obtenemos las categorias
  const categories = await getCategories()

  return (
    <aside className="md:w-72 bg-white shadow-xl">
      <Logo />
      <nav className='mt-10'>
        {categories.map((category) => (
          <CategoryIcon key={category.id} category={category} />
        ))}
      </nav>
    </aside>
  )
}