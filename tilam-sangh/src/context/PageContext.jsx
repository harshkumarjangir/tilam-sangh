import { createContext, useContext, useEffect, useState } from "react";
import { useLanguage } from "./LanguageContext";

const PageContext = createContext();

export const PageProvider = ({ slug = "" , children }) => {
  const { language } = useLanguage();
  const [pageData, setPageData] = useState(null);
  const [seo, setSeo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/pages/${slug}`);
        const json = await res.json();

        if (json.success) {
          setPageData(json.data);
          setSeo(json.seo);
        }
      } catch (err) {
        console.error("Page load failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug, language]);

  return (
    <PageContext.Provider value={{ pageData, seo, loading }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePage = () => useContext(PageContext);
