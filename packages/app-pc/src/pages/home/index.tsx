import { TypeLikeText } from '@resume/common-components'
import _ from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import RotationCards from './RotationCards'
import styles from './index.module.scss'
import LocaleSwitch from './LocaleSwitch'

export type HomeProps = {}

const Home: React.FC<HomeProps> = (props) => {
    const [showTech, setShowTech] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null!)
    const mainRef = useRef<HTMLDivElement>(null!)
    const intl = useIntl()

    useEffect(() => {
        const containerEle = containerRef.current
        const mainEle = mainRef.current
        const ob = new IntersectionObserver(([ele]) => {
            if (ele.isIntersecting) {
                setShowTech(true)
            } else {
                setShowTech(false)
            }
        }, {
            threshold: 0.4
        })

        ob.observe(mainEle)

        const onWheel = _.debounce((e: WheelEvent) => {
            const toTop = e.deltaY < 0
            const scrollHeight = containerEle.scrollHeight
            const { height } = mainRef.current.getBoundingClientRect()
            const maxScroll = scrollHeight - height

            containerEle.scrollTo({
                top: toTop ? 0 : maxScroll,
                behavior: 'smooth'
            })
            e.preventDefault()
        }, 500)

        containerEle.addEventListener('wheel', onWheel)
        return () => {
            ob.disconnect()
            containerEle.removeEventListener('wheel', onWheel)
        }
    }, [])

    const projectData = JSON.parse(intl.formatMessage({
        defaultMessage: "['{\"title\": \"公司名\", \"content\": \"经历\"'},'{\"title\": \"公司名2\", \"content\": \"经历2\"'}]",
        description: "经历, json格式, ' 用于花括号逃逸"
    })) as { title: string, content: string }[]

    return <div className={styles.container} ref={containerRef} >
        <div className={styles.header}>
            <div className={styles.header__content}>
                <div className={styles.header__content__info}>
                    <div className={styles.title}>
                        <FormattedMessage defaultMessage="标题" description="首页标题" />
                    </div>
                    <div className={styles.sub}>
                        <FormattedMessage defaultMessage="副标题" description="首页副标题" />
                    </div>
                    <div className={styles.intro}>
                        <FormattedMessage defaultMessage="一些介绍\r\n" description="首页介绍" />
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.main} ref={mainRef}>
            <div className={styles.main__content}>
                <div className={styles.tech}>
                    <div className={styles.tech__title}>
                        <TypeLikeText show={showTech}>Title</TypeLikeText>
                    </div>
                    <div className={styles.tech__content}>
                        <TypeLikeText show={showTech}>
                            Tech Stack Tech StackTech StackTech StackTech StackTech StackTech StackTech StackTech Stack
                        </TypeLikeText>
                    </div>
                </div>
                <div className={styles.project}>
                    <RotationCards data={projectData} />
                </div>
            </div>
        </div>
        <div className={styles.footer}>
            <div className={styles.footer__content}>
                <FormattedMessage defaultMessage="本项目git库" description="项目git地址" />&nbsp;&nbsp;
                <a href='https://github.com/AAWESOMEUSERNAME/resume'>https://github.com/AAWESOMEUSERNAME/resume</a>
            </div>
        </div>
        <LocaleSwitch />
    </div>
}

export default Home