// Importaciones
import { categories } from "./data/categories";
import { products } from "./data/products";
import { PrismaClient } from "@prisma/client";

// Función para insertar datos en la base de datos
const prisma = new PrismaClient();
async function main() {
  try {
    // Insertamos los datos datos en la base de datos
    await prisma.category.createMany({ data: categories });
    await prisma.product.createMany({ data: products });
  } catch (error) {
    console.log(error);
  }
}

main()
  // Si todo sale bien, esperamos que prisma se desconecte
  .then(async () => {
    await prisma.$disconnect();
  })
  // Si hay un error, lo imprimimos y desconectamos
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });