import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    FiChevronDown,
    FiMenu,
    FiX,
    FiSearch,
    FiChevronUp
} from "react-icons/fi";
import navbarData from "../data/navbarData.json";

const FONT_CLASSES = {
    small: "text-sm",
    normal: "text-base",
    large: "text-lg"
};

const Navbar = () => {
    const [language, setLanguage] = useState("English"); // or use global LanguageContext
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState(null);
    const [fontSize, setFontSize] = useState("normal"); // small | normal | large
    const navItems = navbarData[language] || [];

    const toggleMobile = () => setMobileOpen((s) => !s);
    const toggleSubmenu = (i) => setOpenSubmenu((s) => (s === i ? null : i));
    const toggleLanguage = () => setLanguage((l) => (l === "English" ? "Hindi" : "English"));

    const setSmall = () => setFontSize("small");
    const setNormal = () => setFontSize("normal");
    const setLarge = () => setFontSize("large");

    return (
        <header className="w-full sticky top-0 z-50">
            {/* ===== TOP BANNER (bav banner) ===== */}
            <div className="bg-[#4a4446] text-white">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3">
                    {/* left: logos + title */}
                    <div className="flex items-center gap-3">
                        {/* replace with your real images or svg */}
                        <img src="/logo_gov.png" alt="crest" className="h-12 w-auto" />
                        <img src="/dept_logo.png" alt="dept" className="h-12 w-auto" />
                        <div className="hidden sm:block">
                            <h1 className="text-xl font-semibold">राज-सहकार राजस्थान सरकार</h1>
                        </div>
                    </div>

                    {/* center: search (visible md+) */}
                    <div className="flex-1 mx-6 hidden lg:flex items-center justify-center">
                        <div className="w-2/3 max-w-xl flex border border-yellow-400">
                            <input
                                type="text"
                                placeholder={language === "English" ? "Search..." : "खोजें..."}
                                className="flex-1 px-3 py-2 bg-transparent placeholder-white text-white outline-none"
                                aria-label="site-search"
                            />
                            <button className="px-3 py-2 bg-yellow-400 text-black" aria-label="search-button">
                                <FiSearch />
                            </button>
                        </div>
                    </div>

                    {/* right: SSO / language / font size */}
                    <div className="flex items-center gap-3">
                        <button className="hidden lg:inline px-3 py-1 text-sm hover:underline">
                            {language === "English" ? "sso login" : "एसएसओ लॉगिन"}
                        </button>

                        {/* font size controls */}
                        <div className="flex items-center gap-1 border-l border-white/20 pl-3">
                            <button
                                onClick={setSmall}
                                className={`px-2 py-1 text-sm ${fontSize === "small" ? "font-bold underline" : ""}`}
                                aria-label="font-small"
                                title="A-"
                            >
                                A-
                            </button>
                            <button
                                onClick={setNormal}
                                className={`px-2 py-1 text-sm ${fontSize === "normal" ? "font-bold underline" : ""}`}
                                aria-label="font-normal"
                                title="A"
                            >
                                A
                            </button>
                            <button
                                onClick={setLarge}
                                className={`px-2 py-1 text-sm ${fontSize === "large" ? "font-bold underline" : ""}`}
                                aria-label="font-large"
                                title="A+"
                            >
                                A+
                            </button>
                        </div>

                        {/* language toggle */}
                        <div className="border-l border-white/20 pl-3">
                            <button
                                onClick={toggleLanguage}
                                className="px-3 py-1 bg-yellow-500 text-black font-semibold rounded"
                                aria-label="toggle-language"
                            >
                                {language === "English" ? "हिन्दी" : "EN"}
                            </button>
                        </div>

                        {/* mobile menu button */}
                        <button
                            className="ml-2 lg:hidden p-1"
                            onClick={toggleMobile}
                            aria-label="mobile-menu-toggle"
                        >
                            {mobileOpen ? <FiX size={26} /> : <FiMenu size={26} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* ===== MAIN NAV (yellow) - desktop */}
            <nav className={`bg-[#f5cf57] border-t border-b`}>
                <div className="max-w-7xl mx-auto">
                    <div className="hidden lg:flex items-center px-4 md:px-8">
                        <ul className={`flex gap-6 w-full items-center ${FONT_CLASSES[fontSize]}`}>
                            {navItems.map((item, idx) => (
                                <li key={idx} className="relative group">
                                    <Link
                                        to={item.link || "#"}
                                        className="px-4 py-3 block hover:text-black"
                                        aria-haspopup={!!item.submenu}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span>{item.title}</span>
                                            {item.submenu && <FiChevronDown />}
                                        </div>
                                    </Link>

                                    {item.submenu && (
                                        <div className="absolute left-0 top-full mt-0 hidden group-hover:block z-40">
                                            <div className="bg-[#eda004] w-64 shadow-lg">
                                                {item.submenu.map((sub, sidx) => (
                                                    <Link
                                                        key={sidx}
                                                        to={sub.link || "#"}
                                                        className="block px-4 py-3 border-b border-white/20 hover:bg-[#d98e00]"
                                                    >
                                                        {sub.title}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ===== MOBILE MENU (slide-in) ===== */}
                    <div
                        className={`lg:hidden fixed top-0 left-0 h-full w-80 transform transition-transform duration-300 z-50 ${mobileOpen ? "translate-x-0" : "-translate-x-full"
                            }`}
                        style={{ background: "#f7cf56" }}
                    >
                        <div className="p-4 flex items-center justify-between border-b">
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl font-semibold">Menu</h2>
                            </div>
                            <button onClick={toggleMobile} aria-label="close-mobile">
                                <FiX size={24} />
                            </button>
                        </div>

                        <div className={`p-4 ${FONT_CLASSES[fontSize]}`}>
                            {navItems.map((item, i) => {
                                const hasSub = !!item.submenu;
                                const expanded = openSubmenu === i;

                                return (
                                    <div key={i} className="mb-2">
                                        <div
                                            className="flex items-center justify-between py-3 px-2 bg-transparent"
                                            onClick={() => (hasSub ? toggleSubmenu(i) : setMobileOpen(false))}
                                        >
                                            <Link to={item.link || "#"} className="block">
                                                {item.title}
                                            </Link>

                                            {hasSub ? (
                                                <button aria-expanded={expanded} className="ml-2">
                                                    {expanded ? <FiChevronUp /> : <FiChevronDown />}
                                                </button>
                                            ) : null}
                                        </div>

                                        {hasSub && expanded && (
                                            <div className="ml-4 bg-[#eda004] rounded">
                                                {item.submenu.map((sub, si) => (
                                                    <Link
                                                        key={si}
                                                        to={sub.link || "#"}
                                                        className="block px-4 py-3 border-b border-white/20"
                                                        onClick={() => setMobileOpen(false)}
                                                    >
                                                        {sub.title}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* bottom controls inside mobile panel: language + font size */}
                        <div className="absolute bottom-6 left-0 w-full px-4">
                            <div className="flex items-center justify-between">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setFontSize("small")}
                                        className={`px-3 py-1 ${fontSize === "small" ? "font-bold underline" : ""}`}
                                        aria-label="mobile-font-small"
                                    >
                                        A-
                                    </button>
                                    <button
                                        onClick={() => setFontSize("normal")}
                                        className={`px-3 py-1 ${fontSize === "normal" ? "font-bold underline" : ""}`}
                                        aria-label="mobile-font-normal"
                                    >
                                        A
                                    </button>
                                    <button
                                        onClick={() => setFontSize("large")}
                                        className={`px-3 py-1 ${fontSize === "large" ? "font-bold underline" : ""}`}
                                        aria-label="mobile-font-large"
                                    >
                                        A+
                                    </button>
                                </div>

                                <button
                                    onClick={toggleLanguage}
                                    className="px-3 py-1 bg-yellow-500 text-black rounded font-semibold"
                                >
                                    {language === "English" ? "हिन्दी" : "EN"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* overlay when mobile open */}
                    {mobileOpen && (
                        <div
                            className="fixed inset-0 bg-black/40 lg:hidden"
                            onClick={() => setMobileOpen(false)}
                        />
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;




// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";
// import navbarData from "../data/navbarData.json";

// const Navbar = () => {
//     const [language, setLanguage] = useState("English");
//     const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//     const [openSubmenu, setOpenSubmenu] = useState(null);

//     const toggleLanguage = () => {
//         setLanguage(language === "English" ? "Hindi" : "English");
//     };

//     const toggleMobileMenu = () => {
//         setMobileMenuOpen(!mobileMenuOpen);
//     };

//     const toggleMobileSubmenu = (index) => {
//         setOpenSubmenu(openSubmenu === index ? null : index);
//     };

//     return (
//         <div className="w-full bg-[#f2c64c] shadow-md">
//             {/* Top Navbar */}
//             <div className="flex justify-between items-center px-6 lg:px-10 py-3">
//                 <Link to="/" className="text-xl font-bold">
//                     LOGO
//                 </Link>

//                 {/* Desktop Menu */}
//                 <div className="hidden lg:flex gap-6 font-medium">
//                     {navbarData[language]?.map((item, index) => (
//                         <div key={index} className="relative group">
//                             <Link
//                                 to={item.link}
//                                 className="flex items-center gap-1 hover:text-black"
//                             >
//                                 {item.title}
//                                 {item.submenu && <FiChevronDown />}
//                             </Link>

//                             {item.submenu && (
//                                 <div className="absolute left-0 mt-2 bg-[#eda004] w-64 shadow-lg rounded-sm hidden group-hover:block z-50">
//                                     {item.submenu.map((sub, idx) => (
//                                         <Link
//                                             key={idx}
//                                             to={sub.link}
//                                             className="block px-4 py-2 hover:bg-[#d98e00] border-b border-white/20"
//                                         >
//                                             {sub.title}
//                                         </Link>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     ))}
//                 </div>

//                 {/* Right Buttons */}
//                 <div className="flex items-center gap-4">
//                     <button
//                         onClick={toggleLanguage}
//                         className="px-3 py-1 bg-black text-white text-sm rounded"
//                     >
//                         {language === "English" ? "हिन्दी" : "ENGLISH"}
//                     </button>

//                     {/* Mobile menu icon */}
//                     <button className="lg:hidden" onClick={toggleMobileMenu}>
//                         {mobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
//                     </button>
//                 </div>
//             </div>

//             {/* Mobile Menu */}
//             {mobileMenuOpen && (
//                 <div className="lg:hidden bg-[#ffdd70] px-5 pb-6">
//                     {navbarData[language]?.map((item, index) => (
//                         <div key={index} className="border-b border-white/40 py-3">
//                             <div
//                                 className="flex justify-between items-center"
//                                 onClick={() => item.submenu && toggleMobileSubmenu(index)}
//                             >
//                                 <Link to={item.link} className="text-lg">
//                                     {item.title}
//                                 </Link>
//                                 {item.submenu && <FiChevronDown />}
//                             </div>

//                             {/* Mobile Submenu */}
//                             {item.submenu && openSubmenu === index && (
//                                 <div className="bg-[#eda004] mt-2 rounded">
//                                     {item.submenu.map((sub, idx) => (
//                                         <Link
//                                             key={idx}
//                                             to={sub.link}
//                                             className="block px-4 py-2 text-sm border-b border-white/20"
//                                         >
//                                             {sub.title}
//                                         </Link>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Navbar;




// import React, { useState } from "react";
// import { useLanguage } from "../context/LanguageContext";
// import navbarData from "../data/navbarData.json";
// import { FaSearch } from "react-icons/fa";

// const Navbar = () => {
//     const { language, setLanguage } = useLanguage();
//     const data = navbarData[language];

//     return (
//         <>
//             {/* Top Header Section */}
//             <div className="bg-[#4d4a4a] text-white flex items-center justify-between px-6 py-3">
//                 <div className="flex items-center gap-4">
//                     <img src="/logo1.png" alt="logo" className="w-12" />
//                     <img src="/logo2.png" alt="logo2" className="w-12" />
//                     <h1 className="text-2xl font-bold">{data.title}</h1>
//                 </div>

//                 <div className="flex items-center gap-6">
//                     {/* Search box */}
//                     <div className="flex items-center border border-gray-300 rounded">
//                         <input
//                             type="text"
//                             placeholder={language === "English" ? "Search..." : "खोजें..."}
//                             className="bg-transparent px-3 py-2 text-white outline-none"
//                         />
//                         <button className="px-3">
//                             <FaSearch className="text-white" />
//                         </button>
//                     </div>

//                     {/* Language Switcher */}
//                     <div className="flex items-center gap-2 border-l border-gray-500 pl-3">
//                         <button
//                             onClick={() => setLanguage("English")}
//                             className={`text-sm px-1 ${language === "English" ? "font-bold underline" : ""}`}
//                         >
//                             EN
//                         </button>
//                         <span>|</span>
//                         <button
//                             onClick={() => setLanguage("Hindi")}
//                             className={`text-sm px-1 ${language === "Hindi" ? "font-bold underline" : ""}`}
//                         >
//                             HI
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Main Menu */}
//             <div className="bg-[#f5d25a] text-black w-full px-6">
//                 <ul className="flex items-center gap-10 py-4 font-medium">
//                     {data.menu.map((item, index) => (
//                         <li key={index} className="cursor-pointer hover:text-gray-800 relative">
//                             {item.label}
//                             {item.subMenu && (
//                                 <ul className="absolute left-0 top-full bg-white shadow-lg z-50 mt-2 rounded hidden group-hover:block">
//                                     {item.subMenu.map((sub, i) => (
//                                         <li key={i} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">{sub}</li>
//                                     ))}
//                                 </ul>
//                             )}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </>
//     );
// };

// export default Navbar;




// import React, { useState } from "react";
// import { FiSearch, FiChevronDown } from "react-icons/fi";
// import navbarData from "../data/navbarData.json";
// import LanguageSwitcher from "./LanguageSwitcher";

// const Navbar = () => {
//     const [lang, setLang] = useState("English");
//     const data = navbarData[lang].menu;

//     return (
//         <div className="w-full shadow-md">
//             {/* Top dark bar */}
//             <div className="bg-[#4a4446] text-white flex justify-between items-center px-6 py-3">
//                 <div className="flex items-center gap-4">
//                     <img src="/logo.png" alt="logo" className="h-14" />
//                     <h2 className="text-2xl font-bold">राज-सहकार राजस्थान सरकार</h2>
//                 </div>

//                 <div className="flex items-center gap-4">
//                     <div className="flex items-center border border-yellow-400">
//                         <input
//                             type="text"
//                             placeholder="Search"
//                             className="bg-transparent px-3 py-1 outline-none text-white"
//                         />
//                         <FiSearch size={22} className="mx-2" />
//                     </div>

//                     <button className="text-sm border px-3 py-1 rounded">SSO लॉगिन करें</button>

//                     <select
//                         className="bg-transparent border px-2 py-1"
//                         onChange={(e) => setLang(e.target.value)}
//                     >
//                         <option value="English">EN</option>
//                         <option value="Hindi">अ</option>
//                     </select>

//                     <LanguageSwitcher/>
//                 </div>
//             </div>

//             {/* Bottom yellow menu */}
//             <nav className="bg-[#f9cf57] text-black px-6">
//                 <ul className="flex gap-6 items-center font-medium overflow-x-auto py-3">
//                     {data.map((item, idx) => (
//                         <li key={idx} className="relative group cursor-pointer">
//                             <a href={item.link} className="flex items-center gap-1">
//                                 {item.label}
//                                 {item.children && <FiChevronDown size={16} />}
//                             </a>

//                             {/* dropdown menu */}
//                             {item.children && (
//                                 <ul className="absolute hidden group-hover:block bg-white shadow-lg w-48 py-2 rounded-md z-50">
//                                     {item.children.map((child, i) => (
//                                         <li key={i} className="px-4 py-2 hover:bg-gray-200">
//                                             <a href={child.link}>{child.label}</a>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             )}
//                         </li>
//                     ))}
//                 </ul>
//             </nav>
//         </div>
//     );
// };

// export default Navbar;
