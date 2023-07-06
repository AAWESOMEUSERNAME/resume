import React from 'react'
import styles from './LocaleSwitch.module.scss'
import { useLocale } from '../../common/context'

const LocaleSwitch: React.FC = () => {
    const { locale, toZh, toEn } = useLocale()

    const switchLocale = () => {
        if (locale === 'zh') {
            toEn()
        } else {
            toZh()
        }
    }

    return <div className={styles.container} onClick={switchLocale}>
        <span className={locale === 'zh' ? styles.current : undefined}>Zh</span>
        &nbsp;/&nbsp;
        <span className={locale === 'en' ? styles.current : undefined}>En</span>
    </div>
}

export default LocaleSwitch