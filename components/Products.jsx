'use client'
import { useState } from "react"
import Portal from "./Portal"
import { useProducts } from "@/context/ProductContext"

export default function Products(props) {
    const { planner, stickers } = props

    const [portalImage, setPortalimage] = useState(null)

    const { handleIncrementProduct, cart } = useProducts()
    console.log(cart)

    if (!stickers.length || !planner) { return null }


    return (
        <>
            {portalImage && (
                <Portal handleClosePortal={() => { setPortalimage(null) }}>
                    <div className="portal-content">
                        <img className="img-display" src={`med_res/${portalImage}.png`} alt={`${portalImage}-high-res`} />
                    </div>
                </Portal>
            )}
            <div className="section-container">
                <div className="section-header">
                    <h2>Shop Our Selection</h2>
                    <p>From organization to accessorization</p>
                </div>

                <div className="planner-container">
                    <div>
                        <button onClick={() => {
                            setPortalimage('planner')
                        }} className="img-button">
                            <img src="low_res/planner.jpeg" alt="high-res-planner" />

                        </button>
                    </div>
                    <div className="planner-info">
                        <p className="text-large planner-header">
                            Minimalist Planner
                        </p>
                        <h3><span>$</span>14.99</h3>
                        <p>Bring clarity and structure to your workspace with our <strong>Minimalist Grey Desktop Wallpaper Planner</strong>! This high-resolution PNG is designed for seamless integration with your desktop, offering a subtle and distraction-free way to stay organized throughout the week. Ideal for anyone who prefers function without visual noise.</p>
                        <ul>
                            <li><strong>Clean Modern Layout:</strong> Features a balanced grid with space for a weekly calendar, to-do list, notes, and goals — all arranged to leave room for desktop icons.

                            </li>
                            <li>
                                <strong>Optimized for Screens:</strong> Delivered in multiple high-res formats to fit standard, HD, and ultrawide monitors with crisp clarity.
                            </li>
                        </ul>
                        <div className="purchase-btns">
                            <button onClick={() => {
                                const plannerPriceId = planner.default_price
                                handleIncrementProduct(plannerPriceId, 1, planner)
                            }}>Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="section-container">
                <div className="section-header">
                    <h2>Or Collect Your Favorite Retro Tech</h2>
                    <p>Choose from our carefully crafted pixel-style tech icons, designed for a clean, nostalgic look.</p>
                </div>
                <div className="sticker-container">
                    {stickers.map((sticker, stickerIndex) => {
                        const stickerName = sticker.name
                        const stickerImgUrl = sticker.name.replaceAll('.png', '').replaceAll(' ', '_')
                        return (
                            <div key={stickerIndex} className="sticker-card">
                                <button onClick={() => {
                                    setPortalimage(stickerImgUrl)
                                }} className="img-button">
                                    <img src={`low_res/${stickerImgUrl}.jpeg`} alt={`${stickerImgUrl}-low-res`} />
                                </button>
                                <div className="sticker-info">
                                    <p className="text-medium">{stickerName}</p>
                                    <p>{sticker.description}</p>
                                    <h4><span>$</span>{sticker.prices[0].unit_amount / 100}</h4>
                                    <button onClick={() => {
                                        const stickerPriceId = sticker.default_price
                                        handleIncrementProduct(stickerPriceId, 1, sticker)
                                    }}>Add to cart</button>

                                </div>

                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}