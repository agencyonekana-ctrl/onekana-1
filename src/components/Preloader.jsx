import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'

const Preloader = forwardRef(({ isLoading }, ref) => {
    const [isVisible, setIsVisible] = useState(true)
    const [isFadingOut, setIsFadingOut] = useState(false)
    const [progress, setProgress] = useState(0)

    useImperativeHandle(ref, () => ({
        show: () => {
            setIsVisible(true)
            setIsFadingOut(false)
            setProgress(0)
        },
        hide: () => {
            setIsFadingOut(true)
            setTimeout(() => {
                setIsVisible(false)
                setIsFadingOut(false)
            }, 1200)
        }
    }))

    // Simulate progress
    useEffect(() => {
        if (!isVisible || isFadingOut) return;
        
        let current = 0;
        const interval = setInterval(() => {
            current += Math.floor(Math.random() * 15) + 5;
            if (current >= 100) {
                current = 100;
                clearInterval(interval);
                
                // If it's the initial load (no props controlling it), hide it automatically
                if (isLoading === undefined) {
                    setTimeout(() => {
                        setIsFadingOut(true);
                        setTimeout(() => setIsVisible(false), 1200);
                    }, 400);
                }
            }
            setProgress(current);
        }, 120);
        
        return () => clearInterval(interval);
    }, [isVisible, isFadingOut, isLoading]);

    useEffect(() => {
        if (isLoading !== undefined) {
            if (isLoading) {
                setIsVisible(true)
                setIsFadingOut(false)
                setProgress(0)
            } else {
                setProgress(100)
                setTimeout(() => {
                    setIsFadingOut(true)
                    setTimeout(() => setIsVisible(false), 1200)
                }, 300)
            }
        }
    }, [isLoading])

    if (!isVisible) return null

    return (
        <div className={`premium-preloader ${isFadingOut ? 'slide-up' : ''}`}>
            <div className="premium-preloader-inner">
                <div className="preloader-brand">
                    <picture>
                        <source srcSet="/logo.png" media="(prefers-color-scheme: dark)" />
                        <img src="/logo-1.png" alt="Onekana" className="preloader-logo" />
                    </picture>
                </div>
                <div className="preloader-progress-container">
                    <div className="progress-bar-wrap">
                        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className="progress-text">{progress}%</div>
                </div>
            </div>
            <div className="preloader-bg"></div>
        </div>
    )
})

Preloader.displayName = 'Preloader'

export default Preloader