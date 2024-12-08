import React from 'react';
const Head = () => {
    return (React.createElement("header", { className: "bg-stone-900 p-4" },
        React.createElement("div", { className: "max-w-7xl mx-auto flex justify-between items-center" },
            React.createElement("h1", { className: "text-white text-2xl" }, "Escape Room"),
            React.createElement("nav", null,
                React.createElement("ul", { className: "flex space-x-6" },
                    React.createElement("li", null,
                        React.createElement("a", { href: "#home", className: "text-white hover:text-gray-400" }, "Home")),
                    React.createElement("li", null,
                        React.createElement("a", { href: "#about", className: "text-white hover:text-gray-400" }, "About")),
                    React.createElement("li", null,
                        React.createElement("a", { href: "#contact", className: "text-white hover:text-gray-400" }, "Contact")))))));
};
export default Head;
