import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { HiMinusSmall } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is Million Dollar Influencers?",
    answer:
      "Million Dollar Influencers is a pixel-based platform where influencers, brands, and individuals can claim digital space to amplify their reach.",
  },
  {
    question: "How does the platform work?",
    answer:
      "Users buy pixels for $1 per pixel and create their profile, upload their display image, logo, or promo reel. These pixels link to their social media, website, or other content, allowing them to gain exposure.",
  },
  {
    question: "How much does it cost to buy pixels?",
    answer:
      "Each pixel costs a one-time fee of $1, with a minimum purchase of 10x10 pixels.The more pixels you purchase, the larger your display space on the grid.",
  },
  {
    question: "Can I update my image or link after purchasing pixels?",
    answer:
      "Yes! You can update your images or links periodically to keep your content fresh and relevant. However, changes may be subject to approval to maintain platform quality.",
  },
  {
    question: "Is there a renewal fee for my pixels?",
    answer:
      "No, once you purchase pixels, they are yours for a lifetime—there are no renewal fees.",
  },
  {
    question: "Who can buy pixels?",
    answer:
      "Anyone—whether you're an influencer, business, content creator, or entrepreneur—can purchase pixels to promote their brand or message.",
  },
  {
    question: "How does Million Dollar Influencers help me grow?",
    answer:
      "By securing space on the platform, you gain visibility among a global audience. The more engaging your content, the more traffic and interactions you can drive to your linked pages.",
  },
  {
    question: "Are there any size limits for images?",
    answer:
      "Yes, images must fit within the purchased pixel area. We recommend high-quality, clear visuals that are eye-catching within the grid layout.",
  },
  {
    question: "Can I sell my pixel space to someone else?",
    answer:
      "Yes! Million Dollar Influencers features a marketplace where users can sell or auction their pixels. This allows you to transfer ownership and monetize your space based on demand.",
  },
  {
    question: "How do I get started?",
    answer:
      "Simply choose your desired number of pixels, upload your image, link your content, and secure your spot in influencer history!",
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
