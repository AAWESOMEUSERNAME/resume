import { SpringValue, useChain, useScroll, useSpring, useSpringRef, useTrail } from '@react-spring/web'
import { hooks } from '@resume/common-utils'
import React, { forwardRef, useEffect, useState, useRef, useMemo } from 'react'
import ProgressiveContainer, { ProgressiveContainerProps } from '../ProgressiveContainer'
import { EmergeText, EmergeTextProps } from '../ProgressiveText'
import config from '../common/constants/spring-config'
import styles from './index.module.scss'
const { useIntersectionObserver } = hooks

const from = {
    transform: -1,
    opacity: 0,
}

const to = {
    transform: 0,
    opacity: 1
}

export type ProgressiveCardProps = {
    title: string
    content: string
    titleSpring: EmergeTextProps['trail']
    contentSpring: ProgressiveContainerProps['springValue']
    containerCls?: string
    textAlign?: 'left' | 'right'
}

export const ProgressiveCard = forwardRef<HTMLDivElement, ProgressiveCardProps>(({
    title, content, titleSpring, contentSpring, containerCls = '', textAlign = 'left'
}, ref) => {
    return <div className={`${styles.container} ${containerCls}`} ref={ref}>
        <EmergeText trail={titleSpring} containerCls={styles[`title_${textAlign}`]}>{title}</EmergeText>
        <ProgressiveContainer springValue={contentSpring} containerCls={styles[`content_${textAlign}`]}>
            {content}
        </ProgressiveContainer>
    </div>
})

export type IntersectiveProgressiveCardProps = Omit<ProgressiveCardProps, 'contentSpring' | 'titleSpring'>

export const IntersectiveProgressiveCard: React.FC<IntersectiveProgressiveCardProps> = (props) => {
    const [show, setShow] = useState<boolean>()

    const contentRef = useSpringRef()
    const [contentSpring] = useSpring<{
        transform: number,
        opacity: number
    }>(() => ({
        ref: contentRef,
        from,
        to: show ? to : from,
        config: config.wobbly(true)
    }), [show])

    const titleRef = useSpringRef()
    const [titleSpring] = useTrail<{
        transform: number,
        opacity: number
    }>(props.title.length, () => ({
        ref: titleRef,
        from,
        to: show ? to : from,
        config: config.wobbly(true)
    }), [show])

    useChain([titleRef, contentRef], [0, 0.3], 1000)

    const containerRef = useIntersectionObserver({
        onShow: () => setShow(true),
        onHide: () => setShow(false)
    })

    return <ProgressiveCard {...props} ref={containerRef} titleSpring={titleSpring} contentSpring={contentSpring} />
}

export type StepwiseProgressiveCardProps = {
    showTitle: boolean,
    showContent: boolean
} & Omit<ProgressiveCardProps, 'contentSpring' | 'titleSpring'>

export const StepwiseProgressiveCard: React.FC<StepwiseProgressiveCardProps> = (
    { showTitle, showContent, ...rest }
) => {
    const [contentSpring] = useSpring<{
        transform: number,
        opacity: number
    }>(() => ({
        from,
        to: showContent ? to : from,
        config: config.wobbly(true)
    }), [showContent])

    const [titleSpring] = useTrail<{
        transform: number,
        opacity: number
    }>(rest.title.length, () => ({
        from,
        to: showTitle ? to : from,
        config: config.wobbly(true)
    }), [showTitle])

    return <ProgressiveCard {...rest} contentSpring={contentSpring} titleSpring={titleSpring} />
}