import React from "react";
import { FaArrowUp } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import footerData from "../data/footerData.json";

const Footer = () => {
    const { language } = useLanguage();
    const data = footerData[language];

    return (
        <>
            <footer className="bg-[#333] text-white w-full px-8 py-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                    {/* Nodal Officer */}
                    <div>
                        <h2 className="text-xl font-semibold">{data.NodalOfficer.title}</h2>
                        <div className="h-[1px] bg-white my-3"></div>
                        <p className="leading-6">
                            {data.NodalOfficer.name}<br />
                            {data.NodalOfficer.contact}<br />
                    
                        </p>
                        <div className="mt-4">
                            {data.NodalOfficer.address.map((line, i) => (
                                <p key={i} className="leading-6">{line}</p>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h2 className="text-xl font-semibold">{data.QuickLinks.title}</h2>
                        <div className="h-[1px] bg-white my-3"></div>
                        <ul>
                            {data.QuickLinks.links.map((item, i) => (
                                <li key={i} className="mb-2 hover:text-gray-300">
                                    <a href={item.url} target="_blank">{item.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Important Links */}
                    <div>
                        <h2 className="text-xl font-semibold">{data.ImportantLinks.title}</h2>
                        <div className="h-[1px] bg-white my-3"></div>
                        <ul>
                            {data.ImportantLinks.links.map((item, i) => (
                                <li key={i} className="mb-2 hover:text-gray-300">
                                    <a href={item.url}>{item.label}</a>
                                </li>
                            ))}
                        </ul>

                        <button className="bg-blue-600 px-4 py-2 rounded mt-4">
                            {data.ImportantLinks.visitors}: 14584409
                        </button>
                    </div>

                    {/* Contact */}
                    <div>
                        <h2 className="text-xl font-semibold">{data.Contact.title}</h2>
                        <div className="h-[1px] bg-white my-3"></div>

                        <p className="mb-3">{data.Contact.phone}</p>
                        <p className="text-wrap">{data.Contact.email}</p>
                    </div>
                </div>
            </footer>

            {/* Bottom Strip */}
            <div className="bg-[#c7330a] text-center text-white py-4 relative">
                {data.copyright}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="absolute right-6 -top-6 bg-white text-[#c7330a] border-2 w-12 h-12 rounded-full flex items-center justify-center"
                >
                    <FaArrowUp />
                </button>
            </div>
        </>
    );
};

export default Footer;
