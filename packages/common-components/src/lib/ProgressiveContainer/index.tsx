import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import { SpringValue, animated } from '@react-spring/web'

export type ProgressiveContainerProps = {
    springValue: {
        transform: SpringValue<number>
        opacity: SpringValue<number>;
    }
    direction?: Direction
    containerCls?: string
    children?: React.ReactNode
}

const getTransform = (sv: SpringValue<number>, direction: Direction) => {
    if (direction === 'horizental') {
        return sv.to(v => `translateX(${v}em)`)
    }
    return sv.to(v => `translateY(${v}em)`)
}
const ProgressiveContainer = React.forwardRef<HTMLDivElement, ProgressiveContainerProps>(({
    springValue, direction = 'horizental', containerCls = '', children
}, ref) => {

    return <animated.div className={`${styles.container} ${containerCls}`} ref={ref}
        style={{
            opacity: springValue.opacity.to(v => v),
            transform: getTransform(springValue.transform, direction)
        }}>
        {children}
    </animated.div>
})

export default ProgressiveContainer