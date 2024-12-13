import React, { useState } from "react";
import { Nav, Footer} from '../containers';


interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is Locked Out",
    answer:
      "Locked Out is a virtual escape room where your goal is not to escape from a room, but to unlock a lock. You will have 30 minutes to solve a series of puzzles, find clues, and decipher a 4-digit code, letter sequence, or word. If you unlock the code in time, you win!",
  },
  {
    question: "How do I start a game?",
    answer:
      "Just sign in, select the escape room you want to play, solve the riddles, and enter your answers into the input fields. Once you've solved them all, click the unlock button.",
  },
  {
    question: "Can I create my own escape room?",
    answer:
      "Yes! Just sign in, go to your profile, and click the create a new room button. Then fill out the form. ",
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