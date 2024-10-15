// Importaciones
import { create } from "zustand"
import type { OrderItem } from "./types"
import type { Product } from "@prisma/client"

// Interfaz
interface Store {
  order: OrderItem[],
  addToOrder: (product : Product) => void,
  increaseQuantity: (id: Product["id"]) => void,
  decreaseQuantity: (id: Product["id"]) => void,
  removeItem: (id: Product["id"]) => void,
  clearOrder: () => void
}

// Creamos los diferentes States que utilizaremos
export const useStore = create<Store>((set, get) => ({
  order: [],
  // Función para anadir un item al carrito
  addToOrder: (product) => {
    const {...data} = product  
    let order : OrderItem[] = []
    
    // Verificamos si el item ya existe en el carrito
    if(get().order.find( item => item.id === product.id)) {
      order = get().order.map(item => item.id === product.id ? 
        {...item, quantity: item.quantity + 1, subtotal: item.price * (item.quantity + 1)} 
        : item)
    } else {
      order = [...get().order, {...data, quantity: 1, subtotal: 1 * product.price}]
    }

    // Actualizamos el carrito
    set(() => ({order}))
  },

  // Función para aumentar la cantidad de un item en el carrito
  increaseQuantity: (id) => {
    set((state) => ({
      order: state.order.map(item => item.id === id ? 
        {...item, quantity: item.quantity + 1, subtotal: item.price * (item.quantity + 1)} 
        : item)
    }))
  },

  // Función para disminuir la cantidad de un item en el carrito
  decreaseQuantity: (id) => {
    set((state) => ({
      order: state.order.map(item => item.id === id ? 
        {...item, quantity: item.quantity - 1, subtotal: item.price * (item.quantity - 1)} 
        : item)
    }))
  },

  // Eliminar un elemento del carrito
  removeItem: (id) => {
    set((state) => ({order: state.order.filter(item => item.id !== id)}))
  },

  // Función para limpiar el carrito
  clearOrder: () => {
    set(() => ({order: []}))
  }
}))