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
      "Yes! Upon successful completion of the course, you will receive a verified certificate.",
  },
  {
    question: "Can I update my image or link after purchasing pixels?",
    answer:
      "Yes! Upon successful completion of the course, you will receive a verified certificate.",
  },
  {
    question: "What happens if I don’t renew my pixels?",
    answer:
      "Yes! Upon successful completion of the course, you will receive a verified certificate.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes! Upon successful completion of the course, you will receive a verified certificate.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl w-full mx-auto relative px-4 lg:my-[10rem] md:my-[8rem] sm:my-[4rem] my-[2rem]">
      {/* FAQ Title */}
      <h1
        className="text-[24px] sm:text-[36px] uppercase text-center"
        style={{
          backgroundImage:
            "linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontFamily: "Montserrat",
          fontWeight: "800",
        }}
      >
        Frequently Asked Questions
      </h1>

      {/* FAQ List */}
      <div className="mt-8 space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-transparent bg-[rgba(40,28,24,0.16)] relative overflow-hidden p-[1rem] sm:p-[2rem]"
            style={{
              borderImage: "linear-gradient(to right, #7A5018, #FEEA9A) 1",
            }}
          >
            <div
              className="absolute bottom-[-10px] right-[0px] w-[150px] h-[150px] rounded-full bg-[#B48B34] blur-[150px] opacity-50 -z-10"
              style={{
                boxShadow: "0 0 200px 100px rgba(180, 139, 52, 0.6)",
              }}
            ></div>
            {/* Question Section */}
            <button
              className="w-full flex justify-between items-center text-white text-left"
              onClick={() => toggleFaq(index)}
            >
              <span className="font-semibold font-[Montserrat] text-[16px] sm:text-[24px] uppercase">
                {faq.question}
              </span>
              {openIndex === index ? (
                <HiMinusSmall className="text-yellow-500 text-[2rem]" />
              ) : (
                <AiOutlinePlus className="text-yellow-500 text-[2rem]" />
              )}
            </button>

            {/* Answer Section (Dropdown) with Animation */}
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.5, 0, 0.5, 1], // Custom easing for smoother effect
                  }}
                  style={{ overflow: "hidden" }} // Ensure no overflow during animation
                  className="font-[Montserrat] text-[14px] sm:text-[16px] font-[400] text-white uppercase pt-[1rem]"
                >
                  {faq.answer}
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
