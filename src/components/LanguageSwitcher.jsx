import { useLanguage } from "../context/LanguageContext";

const LanguageSwitcher = () => {
    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => setLanguage((l) => (l === "English" ? "Hindi" : "English"));


    return (
        // <div className="flex gap-2">
        //     <button
        //         className={`${language === "English" ? "font-bold" : ""}`}
        //         onClick={() => setLanguage("English")}
        //     >
        //         EN
        //     </button>
        //     <button
        //         className={`${language === "Hindi" ? "font-bold" : ""}`}
        //         onClick={() => setLanguage("Hindi")}
        //     >
        //         HI
        //     </button>
        // </div>
        <button
            onClick={toggleLanguage}
            //  text-black font-semibold rounded
            className="px-3 py-1 cursor-pointer hover:scale-105 transition-all duration-300"
        >
            {/* {language === "English" ? "हिन्दी" : "EN"} */}
            {/* // Use image flags instead of text */}
            {language === "English" ? (
                <img
                    src="/assets/navbar/language.png"
                    alt="Hindi"
                    className="w-6 h-6 object-cover"
                />
            ) : (
                <img
                    src="/assets/navbar/language.png"
                    alt="English"
                    className="w-6 h-6 object-cover"
                />
            )}

        </button>
    );
};

export default LanguageSwitcher;
