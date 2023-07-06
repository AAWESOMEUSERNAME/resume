import React from "react"

export type Locale = 'zh' | 'en'

export const LocaleContext = React.createContext({
    locale: 'zh' as Locale,
    toEn: () => { },
    toZh: () => { },
  })

export const useLocale = () => React.useContext(LocaleContext)