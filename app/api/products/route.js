import Stripe from "stripe"
import '../../../envConfig.js'

const API_KEY = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY
const stripe = new Stripe(API_KEY, {
    apiVersion: '2023-10-16'
})

export async function GET() {
    try {
        //fetch active products from stripe
        const products = await stripe.products.list({ active: true})

        //fetch all prices
        const prices = await stripe.prices.list({ active: true })

        //combine products with their prices
        const combinedData = products.data.map((product) => { 
            const productPrices = prices.data.filter((price) => {
                return price.product === product.id
            })

            return {
                ...product,
                prices: productPrices.map((price) => {
                    return {
                        id: price.id,
                        unit_amount: price.unit_amount,
                        currency: price.currency,
                        recurring: price.recurring
                    }
                })
            }
        })

        //send combined data as json
        return Response.json(combinedData)
        
    } catch (err) {
        console.error('Error fetching data from stripe: ', err.message)
        return Response.json({error: 'Failed to fetch data from stripe' })
    }
}

