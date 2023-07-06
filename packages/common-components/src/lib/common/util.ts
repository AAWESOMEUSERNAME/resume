import { useEffect, useRef } from "react"


export const useIntersectionObserver =<T extends HTMLElement = HTMLDivElement> ({
    onShow, onHide, threshold: { show = 0.3, hide = 0 } = {}
}: {
    onShow?: (entry: IntersectionObserverEntry) => void
    onHide?: (entry: IntersectionObserverEntry) => void
    threshold?: {
        show?: number,
        hide?: number
    }
}): React.RefObject<T> => {
    const ref = useRef<T>(null)

    useEffect(() => {
        if (ref.current) {
            const showOb = onShow && new IntersectionObserver(([ele]) => {
                if (ele.isIntersecting) {
                    onShow(ele)
                }
            }, {
                threshold: show
            })
            const hideOb = onHide && new IntersectionObserver(([ele]) => {
                if (!ele.isIntersecting) {
                    onHide(ele)
                }
            }, {
                threshold: hide
            })
            showOb && showOb.observe(ref.current)
            hideOb && hideOb.observe(ref.current)

            return () => {
                showOb && showOb.disconnect()
                hideOb && hideOb.disconnect()
            }
        }
    }, [])

    return ref
}