import React from 'react';
const Header = () => {
    return (React.createElement(React.Fragment, null,
        React.createElement("header", { className: "relative w-full h-screen bg-cover bg-center", style: { backgroundImage: "url('https://images.unsplash.com/photo-1503332132010-d1b77a049ddd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" } },
            React.createElement("div", { className: "absolute inset-0 bg-black opacity-50" }),
            React.createElement("div", { className: "relative z-10 flex items-center justify-center w-full h-full text-center text-white px-4 sm:px-6 lg:px-8" },
                React.createElement("div", null,
                    React.createElement("h1", { className: "text-4xl sm:text-5xl md:text-6xl font-bold mb-4" }, "Escape the Mystery"),
                    React.createElement("p", { className: "text-lg sm:text-xl md:text-2xl mb-6 max-w-2xl mx-auto" }, "Can you solve all four riddles before the clock runs out? You must answer correctly to unlock the final lock. Time is ticking!"),
                    React.createElement("a", { href: "#book-now", className: "bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-3 rounded-md inline-block transition duration-300" }, "CTA Button"))))));
};
export default Header;
