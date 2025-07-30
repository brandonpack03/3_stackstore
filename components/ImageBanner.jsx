'use client'

import { useState, useRef, useEffect } from "react"


export default function ImageBanner() {
    const [isLoaded, setIsloaded] = useState(false)
    const imgRef = useRef()

    useEffect(() => {
        if (imgRef.current.complete) {
            setIsloaded(true)
        }
    }, [])



    return(
        <div className="banner-images">
            <img className="low-res-img" src="low_res/store_banner.jpeg" alt="banner-low-res" />
            <img ref={imgRef}className="high-res-img" src="med_res/store_banner.png" alt="banner-high-res" style={{opacity: isLoaded ? 1 : 0}} onLoad={() => {
                // when the high resolution image is fully loaded, this callback function will be executed, the image will be initally invisible until called, making it visible.
                setIsloaded(true)
            }}/>
            <div className="cta-btns-container">
                <div>
                    <div>
                        <h3>Welcome to</h3>
                        <h1>The Stackstore</h1>
                    </div>
                    <div>
                        <button>Shop Stickers</button>
                        <button>Shop Planners</button>
                    </div>
                </div>
            </div>
        </div>
    )
}