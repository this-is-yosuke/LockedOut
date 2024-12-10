import React, { useState } from "react";
import { Nav, Footer} from '../containers';


interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How does it work?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  },
  {
    question: "How do I create my own escape room?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  },
  {
    question: "Can other people play my escape room?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  },
  // Add more FAQ items here
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
    <Nav />
    <div className="min-h-screen py-10 px-6 sm:px-10 md:px-16">
      <div className="max-w-4xl mx-auto bg-stone-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-stone-100 mb-8">
          Frequently Asked Questions
        </h1>

        {faqData.map((item, index) => (
          <div key={index} className="mb-6">
            <button
              onClick={() => toggleAnswer(index)}
              className="w-full text-left text-lg font-semibold text-stone-200 hover:text-stone-600 focus:outline-none"
            >
              <div className="flex justify-between items-center">
                <span>{item.question}</span>
                <span className="text-2xl">{openIndex === index ? '-' : '+'}</span>
              </div>
            </button>
            {openIndex === index && (
              <div className="mt-4 text-stone-200 text-base">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default FAQ;