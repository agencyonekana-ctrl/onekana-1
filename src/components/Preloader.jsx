import { useEffect, useState } from 'react'

const Preloader = () => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        let current = 0
        const interval = setInterval(() => {
            current = Math.min(100, current + Math.floor(Math.random() * 15) + 5)
            setProgress(current)
            if (current === 100) clearInterval(interval)
        }, 120)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="premium-preloader">
            <div className="premium-preloader-inner">
                <div className="preloader-brand">
                    <picture>
                        <source srcSet="/logo.png" media="(prefers-color-scheme: dark)" />
                        <img src="/logo-1.png" alt="Onekana" className="preloader-logo" />
                    </picture>
                </div>
                <div className="preloader-progress-container">
                    <div className="progress-bar-wrap">
                        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="progress-text">{progress}%</div>
                </div>
            </div>
            <div className="preloader-bg" />
        </div>
    )
}

export default Preloader
