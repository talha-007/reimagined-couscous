import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { HiMinusSmall } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is Million Dollar Influencers?",
    answer:
      "Million Dollar Influencers is a platform where you can purchase and claim pixels to promote your brand, link to your social profiles, and join a global network of influencers—all for just $1 per pixel per year.",
  },
  {
    question: "How does the platform work?",
    answer:
      "You can enroll in a course by signing up, selecting your desired course, and making a payment.",
  },
  {
    question: "How much does it cost to buy pixels?",
    answer:
      "The cost is $1 per pixel per year. You can buy as many pixels as you need to showcase your brand.",
  },
  {
    question: "Can I update my image or link after purchasing pixels?",
    answer:
      "Yes, you can update your image or link at any time through your account dashboard.",
  },
  {
    question: "What happens if I don’t renew my pixels?",
    answer:
      "If you don't renew, your pixels will be made available for others to purchase after a grace period.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "No, but you can start with a minimal purchase and expand later as needed.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl w-full mx-auto relative px-4 lg:my-[10rem] md:my-[8rem] sm:my-[4rem] my-[2rem]">
      <motion.h1
        className="text-[24px] sm:text-[36px] uppercase text-center"
        style={{
          backgroundImage:
            "linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontFamily: "Montserrat",
          fontWeight: "800",
        }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.2 }}
      >
        Frequently Asked Questions
      </motion.h1>

      <div className="mt-8 space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-transparent bg-[rgba(40,28,24,0.16)] relative overflow-hidden p-[1rem] sm:p-[2rem]"
            style={{
              borderImage: "linear-gradient(to right, #7a5018cc, #FEEA9Acc) 1",
            }}
          >
            <div
              className="absolute bottom-[-10px] right-[0px] w-[150px] h-[150px] rounded-full bg-[#B48B34] blur-[150px] opacity-50 -z-10"
              style={{
                boxShadow: "0 0 200px 100px rgba(180, 139, 52, 0.6)",
              }}
            ></div>

            <button
              className="w-full flex justify-between items-center text-white text-left"
              onClick={() => toggleFaq(index)}
            >
              <span className="font-semibold font-[Montserrat] text-[16px] sm:text-[24px] uppercase">
                {faq.question}
              </span>
              {openIndex === index ? (
                <HiMinusSmall className="text-yellow-500 text-[2rem] cursor-pointer" />
              ) : (
                <AiOutlinePlus className="text-yellow-500 text-[2rem] cursor-pointer" />
              )}
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  className="overflow-hidden"
                  initial={{ opacity: 0, maxHeight: 0 }}
                  animate={{ opacity: 1, maxHeight: 500 }} // Set a maxHeight to a value greater than your expected content
                  exit={{ opacity: 0, maxHeight: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <p className="font-[Montserrat] text-[14px] sm:text-[16px] font-[400] text-white uppercase pt-[1rem]">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
