import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { IntlProvider } from 'react-intl';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import en from './common/asset/lang/en.json';
import zh from './common/asset/lang/zh.json';
import './index.css';
import Home from './pages/home';
import reportWebVitals from './reportWebVitals';
import { Locale, LocaleContext } from './common/context';

const loadLocaleData = (locale: Locale) => {
  switch (locale) {
    case 'en':
      return en
    default:
      return zh
  }
}

const router = createBrowserRouter([
  {
    path: 'home',
    element: <Home />
  },
  {
    path: '/*',
    element: <Home />
  },
])

const IntlWrapper = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Locale>('zh')

  return <LocaleContext.Provider value={{
    locale: lang,
    toZh: () => setLang('zh'),
    toEn: () => setLang('en')
  }}>
    <IntlProvider locale={lang} messages={loadLocaleData(lang)}>
      {children}
    </IntlProvider>
  </LocaleContext.Provider>
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <IntlWrapper>
      <RouterProvider router={router} />
    </IntlWrapper>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();