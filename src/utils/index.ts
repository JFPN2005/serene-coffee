// Formateamos moneda
export function formatCurrency (amount: number)  {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

// Vericamos si la imagen es de cloudinary o no
export function getImagePath(imagePath: string) {
  const cloudinaryUrl = 'https://res.cloudinary.com'
  if(imagePath.startsWith(cloudinaryUrl)){
    return imagePath
  } else {
    return `/products/${imagePath}.jpg`
  }
}