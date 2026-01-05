import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    FiChevronDown,
    FiMenu,
    FiX,
    FiSearch,
    FiChevronUp
} from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { useSelector } from "react-redux";

const FONT_CLASSES = {
    small: "text-sm",
    normal: "text-base",
    large: "text-lg"
};

const Navbar = () => {
    const { language, setLanguage } = useLanguage();

    // const [language, setLanguage] = useState("English");
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState(null);
    const [fontSize, setFontSize] = useState("normal");

    // prefer data from API (stored in redux) and use empty array when missing
    const navData = useSelector((s) => s.navigation.data);
    const navItems = navData?.navbar || [];

    // normalize links coming from backend (some entries may be 'profile' instead of '/profile')
    const toLink = (link) => {
        if (!link) return "#";
        if (link.startsWith("/") || link.startsWith("http")) return link;
        return `/${link}`;
    };

    const toggleMobile = () => setMobileOpen((s) => !s);
    const toggleSubmenu = (i) => setOpenSubmenu((s) => (s === i ? null : i));
    // const toggleLanguage = () => setLanguage((l) => (l === "English" ? "Hindi" : "English"));

    return (
        <header className="w-full sticky top-0 z-50">
            {/* ===== BAV GOVERNMENT BANNER ===== */}
            <div className="bg-[#4a4446] text-white">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3">

                    {/* LEFT LOGOS + TITLE */}
                    <div className="flex items-center gap-3">
                        {/* <img src="/assets/navbar/ashoka.png" alt="crest" className="h-12" /> */}
                        <Link to="/">
                            <img src="/assets/navbar/tilam-sangh-logo.png" alt="tilam-sangh" className="h-12" />
                        </Link>
                    </div>

                    {/* SEARCH BAR DESKTOP ONLY */}
                    <div className="flex-1 mx-6 hidden lg:flex justify-center">
                        <div className="w-2/3 max-w-xl flex border border-yellow-400">
                            <input
                                type="text"
                                placeholder={language === "English" ? "Search..." : "खोजें..."}
                                className="flex-1 px-3 py-2 bg-transparent placeholder-white text-white outline-none"
                            />
                            <button className="px-3 py-2 bg-yellow-400 text-black">
                                <FiSearch />
                            </button>
                        </div>
                    </div>

                    {/* RIGHT SECTION: SSO + FONT + LANGUAGE + MENU */}
                    <div className="flex items-center gap-3">

                        {/* FONT SIZE CONTROL */}
                        <div className="flex items-center gap-1 border-l border-white/30 pl-3">
                            <button
                                onClick={() => setFontSize("small")}
                                className={`px-2 py-1 text-sm ${fontSize === "small" ? "font-bold underline" : ""}`}
                            >
                                A-
                            </button>
                            <button
                                onClick={() => setFontSize("normal")}
                                className={`px-2 py-1 text-sm ${fontSize === "normal" ? "font-bold underline" : ""}`}
                            >
                                A
                            </button>
                            <button
                                onClick={() => setFontSize("large")}
                                className={`px-2 py-1 text-sm ${fontSize === "large" ? "font-bold underline" : ""}`}
                            >
                                A+
                            </button>
                        </div>

                        {/* LANGUAGE TOGGLE */}
                        <div className="border-l border-white/30 pl-3">
                            <LanguageSwitcher />
                        </div>

                        {/* MOBILE MENU ICON */}
                        <button onClick={toggleMobile} className="lg:hidden p-1">
                            {mobileOpen ? <FiX size={26} /> : <FiMenu size={26} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* ===== MAIN NAV DESKTOP ===== */}
            <nav className="bg-[#f5cf57]">
                <div className="max-w-7xl mx-auto hidden lg:flex items-center px-6">
                    <ul className={`flex flex-wrap gap-x-5 w-full items-center ${FONT_CLASSES[fontSize]}`}>
                        {navItems.map((item, idx) => (
                            <li key={idx} className="relative group">
                                <Link to={toLink(item.link)} className="px-4 py-3 block hover:text-white hover:bg-[#eda004] border-r border-[#cfac42]">
                                    <div className="flex items-center text-nowrap gap-1">
                                        {item.title}
                                        {item.submenu?.length > 0 && <FiChevronDown />}
                                    </div>
                                </Link>

                                {item.submenu?.length > 0 && (
                                    <div className="absolute left-0 top-full hidden group-hover:block z-50">
                                        <div className="bg-[#eda004] w-40 shadow-lg">
                                            {item.submenu.map((sub, sidx) => (
                                                <Link
                                                    key={sidx}
                                                    to={toLink(sub.link)}
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

                {/* ===== MOBILE NAV SLIDE-IN ===== */}
                <div
                    className={`lg:hidden fixed top-0 left-0 h-full max-sm:w-full w-80 bg-[#f7cf56] transition duration-300 z-50 overflow-y-auto
                    ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
                >
                    <div className="p-4 flex items-center justify-between border-b sticky top-0 bg-[#f7cf56] z-10">
                        <h2 className="text-xl font-semibold">Menu</h2>
                        <button onClick={toggleMobile}><FiX size={24} /></button>
                    </div>

                    <div className={`p-4 ${FONT_CLASSES[fontSize]}`}>
                        {navItems.map((item, i) => {
                            const expanded = openSubmenu === i;
                            return (
                                <div key={i} className="mb-2">
                                    <div
                                        className="flex justify-between py-3"
                                        onClick={() => (item.submenu?.length > 0 ? toggleSubmenu(i) : setMobileOpen(false))}
                                    >
                                        <Link to={toLink(item.link)}>{item.title}</Link>
                                        {item.submenu?.length > 0 && (expanded ? <FiChevronUp /> : <FiChevronDown />)}
                                    </div>

                                    {expanded && (
                                        <div className="ml-3 bg-[#eda004] rounded">
                                            {item.submenu.map((sub, si) => (
                                                <Link
                                                    key={si}
                                                    to={toLink(sub.link)}
                                                    onClick={() => setMobileOpen(false)}
                                                    className="block px-4 py-3 border-b border-white/20"
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

                    <LanguageSwitcher />

                </div>

                {mobileOpen && (
                    <div className="fixed inset-0 bg-black/40 lg:hidden" onClick={() => setMobileOpen(false)} />
                )}
            </nav>
        </header>
    );
};

export default Navbar;
