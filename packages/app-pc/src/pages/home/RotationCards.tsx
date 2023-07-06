import React, { useState } from 'react'
import styles from './RotationCards.module.scss'

export type RotationCardsProps = {
    data: {
        title: string,
        content: string
    }[]
}

const RotationCards: React.FC<RotationCardsProps> = (
    { data }
) => {
    const [currentIndex, setCurrent] = useState(0)

    return <div className={styles.container}>
        {data.map((d, i) => {
            const leftInx = currentIndex - 1
            const rightInx = currentIndex + 1

            let cls: string
            if (i === currentIndex) {
                cls = styles.card_cur
            } else if (i === leftInx) {
                cls = styles.card_pre
            } else if (i === rightInx) {
                cls = styles.card_next
            } else if (i < leftInx) {
                cls = styles.card_pre_hide
            } else {
                cls = styles.card_next_hide
            }

            return <div key={i} className={cls} onClick={() => {
                if (i !== currentIndex) {
                    setCurrent(cur => {
                        if (i > cur) {
                            return cur + 1
                        }
                        return cur - 1
                    })
                }
            }}>
                <div className={styles.title}>{d.title}</div>
                <div className={styles.content}>{d.content}</div>
            </div>
        })}
    </div>
}

export default RotationCards