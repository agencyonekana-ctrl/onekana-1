import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'

const Preloader = forwardRef(({ isLoading }, ref) => {
    const [isVisible, setIsVisible] = useState(true)
    const [isFadingOut, setIsFadingOut] = useState(false)

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
        show: () => {
            setIsVisible(true)
            setIsFadingOut(false)
        },
        hide: () => {
            setIsFadingOut(true)
            setTimeout(() => {
                setIsVisible(false)
                setIsFadingOut(false)
            }, 500)
        }
    }))

    // Initial load
    useEffect(() => {
        if (isLoading === undefined) {
            const timer = setTimeout(() => {
                setIsFadingOut(true)
                setTimeout(() => {
                    setIsVisible(false)
                }, 500)
            }, 2500)
            return () => clearTimeout(timer)
        }
    }, [])

    // Handle isLoading prop changes
    useEffect(() => {
        if (isLoading !== undefined) {
            if (isLoading) {
                setIsVisible(true)
                setIsFadingOut(false)
            } else {
                setIsFadingOut(true)
                setTimeout(() => {
                    setIsVisible(false)
                }, 500)
            }
        }
    }, [isLoading])

    if (!isVisible) {
        return null
    }

    return (
        <div className={`preloader-overlay ${isFadingOut ? 'fade-out' : ''}`}>
            <div className="preloader-content">
                <div className="camera-spinner-container">
                    <div className="camera-spinner">
                        {/* SVG Camera - fixe */}
                        <svg className="camera-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="4" y="18" width="36" height="28" rx="4" stroke="currentColor" strokeWidth="2" />
                            <path d="M40 26L58 18V46L40 38V26Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                            <circle cx="18" cy="32" r="6" stroke="currentColor" strokeWidth="1.5" />
                            <circle cx="18" cy="32" r="2" fill="currentColor" />
                        </svg>

                        {/* Cercle tournant autour de la caméra */}
                        <div className="orbiting-circle">
                            <div className="orbit-ring"></div>
                            <div className="orbit-dot"></div>
                        </div>
                    </div>
                </div>
                <div className="preloader-text">
                    <span className="agency-name">Onekana</span>
                    <span className="agency-slogan">Agency</span>
                </div>
            </div>
        </div>
    )
})

Preloader.displayName = 'Preloader'

export default Preloader