import React, { useEffect } from 'react'
import styles from './index.module.scss'
import { SpringValue, animated, useTrail } from '@react-spring/web'

export type EmergeTextProps = {
    containerCls?: string
    direction?: Direction,
    trail: {
        opacity: SpringValue<number>,
        transform: SpringValue<number>,
    }[],
    children: string
}

export const EmergeText = React.forwardRef<HTMLDivElement, EmergeTextProps>(({
    containerCls = '', direction = 'vertical', trail, children
}, ref) => {
    const textArr = Array.from(children)

    return <div className={`${styles.container} ${containerCls}`} ref={ref}>
        {trail.map((t, i) => {
            let mapFn: (v: number) => string
            switch (direction) {
                case 'vertical': mapFn = (v) => `translateY(${v}em)`; break;
                default: mapFn = (v) => `translateX(${v}em)`
            }

            return <animated.div key={i} style={{
                opacity: t.opacity.to(v => v),
                transform: t.transform.to(mapFn)
            }}>{textArr[i]}</animated.div>
        })}
    </div>
})


export type TypeLikeTextProps = {
    containerCls?: string
    show?: boolean,
    children: string
}
export const TypeLikeText = React.forwardRef<HTMLDivElement, TypeLikeTextProps>(({
    show, containerCls = '', children
}, ref) => {
    const textArr = Array.from(children)
    const [trail, api] = useTrail<{
        show: number,
    }>(children.length, () => ({
        show: 0,
        config: {
            duration: 50
        }
    }), [])

    useEffect(() => {
        api.start({
            show: show ? 1 : 0
        })
    }, [show, api])

    return <div className={`${styles.container} ${containerCls}`} ref={ref}>
        {trail.map((t, i) => {
            return <animated.div key={i} style={{
                opacity: t.show.to(v => v === 1 ? 1 : 0)
            }}>{textArr[i]}</animated.div>
        })}
    </div>
})