'use client'

import { createContext, useContext, useState } from "react"

const ProductContext = createContext()

export default function ProductsProvider(props) {
    const {children} = props

    const [cart, setCart] = useState([])

    function handleIncrementProduct(price_id, num, data, noIncrement = false) {
        const newCart = {
            ...cart
        }
        if (price_id in cart) {
            //product already in cart, so take preview value and increment/decrement
            // newCart[price_id] = newCart[price_id] + num
            newCart[price_id] = {
                ...data,
                quantity: noIncrement ? num : newCart[price_id]?.quantity + num
            }
            
        } else {
            //product not in cart, so add it
            newCart[price_id] = {
                ...data,
                quantity: num
            }
        }

            
        if (parseInt(newCart[price_id].quantity) <= 0) {
            //if newcart[price_id] = 0 then we delete it
            delete newCart[price_id]
        }

        //overwrite the cart state with newCart object
        setCart(newCart)

    }

    const value = { 
        cart,
        handleIncrementProduct,
    }
    

    
    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProducts = () => useContext(ProductContext)