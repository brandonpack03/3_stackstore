import ImageBanner from '@/components/ImageBanner'
import Products from '@/components/Products';

export async function getProducts() {
  try {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'; // fallback for dev
    const fullURL = baseURL.startsWith('http') ? baseURL : `https://${baseURL}`;
    const response = await fetch(`${fullURL}/api/products`);

    if (!response.ok) {
      const errText = await response.text();
      console.error('Error fetching products:', errText);
      throw new Error('Failed to fetch products: ' + response.statusText);
    }

    const products = await response.json();
    return products;
  } catch (err) {
    console.error('Fetch failed during build:', err);
    return []; // or return mocked products
  }
}


export default async function Home(props) {
  
  const products = await getProducts()
  
  let planner = null
  let stickers = []



  for (let product of products) {
    if (product.name === 'Minimalist Planner') {
      planner = product
      continue
    } 
    stickers.push(product)
  }
  
  return (
    <>
      <ImageBanner />
      <section>
        <Products planner={planner} stickers={stickers}/>
      </section>

    </>
  );
}
