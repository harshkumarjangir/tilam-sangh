import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { LanguageProvider, useLanguage } from './context/LanguageContext.jsx'
import { Provider, useDispatch } from 'react-redux';
import store from './redux/store.js'
import { fetchNavigationData } from './redux/slices/navigationSlice'

// Small component that dispatches navigation fetch when language changes
const NavInitializer = () => {
  const dispatch = useDispatch();
  const { language } = useLanguage();

  useEffect(() => {
    dispatch(fetchNavigationData(language));
  }, [dispatch, language]);

  return null;
}

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <Provider store={store}>
      <LanguageProvider>
        <NavInitializer />
        <App />
      </LanguageProvider>
    </Provider>
  </BrowserRouter>
  ,
)
