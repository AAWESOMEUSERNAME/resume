import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'

export type ProgressiveProps = {
    emergeFrom?: 'left' | 'right'
    containerCls?: string
    children: React.ReactElement
}

const ProgressiveContainer: React.FC<ProgressiveProps> = ({
    emergeFrom = 'left', containerCls, children
}) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isShow, setIsShow] = useState(false)
    useEffect(() => {
        if (containerRef.current) {
            const showOb = new IntersectionObserver(([ele]) => {
                if (ele.isIntersecting) {
                    setIsShow(true)
                }
            }, {
                threshold: 0.3
            })
            const hideOb = new IntersectionObserver(([ele]) => {
                if (!ele.isIntersecting) {
                    setIsShow(false)
                }
            }, {
                threshold: 0
            })
            hideOb.observe(containerRef.current)
            showOb.observe(containerRef.current)

            return () => {
                hideOb.disconnect()
                showOb.disconnect()
            }
        }
    }, [])

    return <div className={
        styles.common + ' ' +
        (containerCls ? containerCls : '') + ' ' +
        (isShow ? styles.show : styles['hide__' + emergeFrom])
    } ref={containerRef}>
        {children}
    </div>
}

export default ProgressiveContainer