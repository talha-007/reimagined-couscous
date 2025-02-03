import CustomButton from "./button";

const ContactUs = () => {
  return (
    <div className="relative max-w-screen overflow-hidden">
      <div className="max-w-7xl w-full px-4 mx-auto relative py-12">
        {/* Contact Title & Description */}
        <div className="text-center max-w-5xl mx-auto">
          <h1
            className="text-[24px] sm:text-[36px] uppercase"
            style={{
              backgroundImage:
                "linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "Montserrat",
              fontWeight: "800",
            }}
          >
            Any Questions Rising? We are All Here.
          </h1>
          <p className="text-white font-[Montserrat] mt-2 lg:text-[24px] sm:text-[20px] text-[16px]">
            Regardless if you possess an inquiry, require aid, or wish to
            initiate a fresh endeavor, our crew is available to assist.
          </p>
        </div>

        {/* Contact Form */}
        <form className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6  shadow-lg">
          {/* First Name */}
          <div className="flex flex-col">
            <label className="text-white font-medium mb-1 font-[Inter] text-[14px] uppercase">
              First Name
            </label>
            <input
              type="text"
              className="px-[1rem] py-[1rem] border border-[#766E53] font-[Inter] text-[14px] text-white placeholder:text-[#353535] focus:ring-2 focus:ring-[#7d6a2b] outline-none uppercase"
              placeholder="Enter your first name"
              required
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label className="text-white font-medium mb-1 font-[Inter] text-[14px] uppercase">
              Last Name
            </label>
            <input
              type="text"
              className="px-[1rem] py-[1rem] border border-[#766E53] font-[Inter] text-[14px] text-white placeholder:text-[#353535] focus:ring-2 focus:ring-[#7d6a2b] outline-none uppercase"
              placeholder="Enter your last name"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col ">
            <label className="text-white font-medium mb-1 font-[Inter] text-[14px] uppercase">
              Email
            </label>
            <input
              type="email"
              className="px-[1rem] py-[1rem] border border-[#766E53] font-[Inter] text-[14px] text-white placeholder:text-[#353535] focus:ring-2 focus:ring-[#7d6a2b] outline-none uppercase"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Website */}
          <div className="flex flex-col ">
            <label className="text-white font-medium mb-1 font-[Inter] text-[14px] uppercase">
              Website / Social links
            </label>
            <input
              type="url"
              className="px-[1rem] py-[1rem] border border-[#766E53] font-[Inter] text-[14px] text-white placeholder:text-[#353535] focus:ring-2 focus:ring-[#7d6a2b] outline-none uppercase"
              placeholder="Enter your website (optional)"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col sm:col-span-2">
            <label className="text-white font-medium mb-1 font-[Inter] text-[14px] uppercase">
              Message
            </label>
            <textarea
              rows="4"
              className="px-[1rem] py-[1rem] border border-[#766E53] font-[Inter] text-[14px] text-white placeholder:text-[#353535] focus:ring-2 focus:ring-[#7d6a2b] outline-none uppercase"
              placeholder="Enter your message"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="sm:col-span-2">
            <CustomButton name="Submit Now" py="py-3" hidden="block" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
