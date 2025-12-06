import { useLanguage } from "../context/LanguageContext";

const LanguageSwitcher = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex gap-2">
            <button
                className={`${language === "English" ? "font-bold" : ""}`}
                onClick={() => setLanguage("English")}
            >
                EN
            </button>
            <button
                className={`${language === "Hindi" ? "font-bold" : ""}`}
                onClick={() => setLanguage("Hindi")}
            >
                HI
            </button>
        </div>
    );
};

export default LanguageSwitcher;
