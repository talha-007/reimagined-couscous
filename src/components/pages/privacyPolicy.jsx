import Layout from "../layout/layout";
import { motion } from "framer-motion"; // Import framer-motion

const PrivacyPolicy = () => {
  return (
    <div>
      <Layout>
        <div className="absolute bottom-[75%] left-[-30%] translate-x-1/2 w-[450px] h-[450px] rounded-full bg-[#B48B34] blur-[250px] opacity-50 -z-10" style={{ boxShadow: "0 0 200px 100px rgba(180, 139, 52, 0.6)" }}></div>
        <div className="absolute bottom-[30%] left-[-250px] translate-x-1/2 w-[450px] h-[450px] rounded-full bg-[#B48B34] blur-[350px] opacity-50 -z-10" style={{ boxShadow: "0 0 200px 100px rgba(180, 139, 52, 0.6)" }}></div>
        <div className="absolute bottom-[50%] right-0 translate-x-1/2 w-[450px] h-[450px] rounded-full bg-[#B48B34] blur-[250px] opacity-50 -z-10" style={{ boxShadow: "0 0 200px 100px rgba(180, 139, 52, 0.6)" }}></div>
        <div className="absolute bottom-[550px] right-0 translate-x-1/2 w-[450px] h-[450px] rounded-full bg-[#B48B34] blur-[250px] opacity-50 -z-10" style={{ boxShadow: "0 0 200px 100px rgba(180, 139, 52, 0.6)" }}></div>


        <div className="max-w-7xl w-full mx-auto pt-[7rem] px-4">
        <motion.h1
                className="text-[36px] lg:text-[3rem] leading-[1.2] lg:leading-[70px] uppercase"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #B48B34 0%, #E8C776 50%, #A67921 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontFamily: "Montserrat",
                  fontWeight: "800",
                }}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Privacy Policy – Million Dollar Influencer
              </motion.h1>
          
          <p className="text-sm text-gray-400 mb-2">Effective Date: January 1, 2025</p>
          <p className="text-sm text-gray-400 mb-6">Last Updated: January 1, 2025</p>
          <p className="mb-4 text-sm text-gray-400">At Million Dollar Influencer, your privacy is important to us. This Privacy Policy explains how we collect, use, share, and protect your personal information when you use our platform (<a href="https://milliondollarinfluencer.com" className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">https://milliondollarinfluencer.com</a>). We are committed to handling your data responsibly and in compliance with privacy regulations.</p>

          <ol className="list-decimal ml-6 space-y-4 text-sm text-gray-400 pb-8">
            <li>
              <strong>Purpose and Categories of Data</strong><br/>
              We collect and process personal data for the following purposes:
              <ol className="list-decimal ml-6 mt-2 space-y-2">
                <li>
                  <strong>To provide and support services or products on the Million Dollar Influencer platform</strong><br/>
                  We may collect:
                  <ul className="list-disc ml-6 mt-2">
                    <li>First and last name</li>
                    <li>Display name or username</li>
                    <li>Email address</li>
                    <li>IP address</li>
                    <li>Geolocation data</li>
                  </ul>
                  <span className="block mt-2">These details help us process purchases (e.g. credits, pixel space), personalize your experience, and communicate platform updates.</span>
                </li>
              </ol>
            </li>
            <li>
              <strong>Sharing with Third Parties</strong><br/>
              We only share your data with trusted third parties when necessary for service delivery, including:<br/>
              <span className="block mt-2">Purpose of Data Transfer: Payment processing, data hosting, and customer support</span>
              <span className="block">We ensure all partners meet strict data protection and confidentiality requirements.</span>
            </li>
            <li>
              <strong>Disclosure Practices</strong><br/>
              We may disclose your information:
              <ul className="list-disc ml-6 mt-2">
                <li>If required by law or court order</li>
                <li>To law enforcement authorities</li>
                <li>If Million Dollar Influencer undergoes a merger, acquisition, or sale</li>
                <li>To protect the platform or our users from fraud or harm</li>
              </ul>
            </li>
            <li>
              <strong>Do Not Track Signals &amp; Global Privacy Control</strong><br/>
              We honor Do Not Track (DNT) browser settings. If you enable DNT, we will respect that preference and will not track your browsing behavior across the platform.
            </li>
            <li>
              <strong>Cookies</strong><br/>
              Million Dollar Influencer may use cookies to enhance user experience and functionality.
            </li>
            <li>
              <strong>Data Security</strong><br/>
              We use industry-standard security measures to safeguard your personal information. Access is limited to authorized personnel only, and systems are regularly monitored and updated.
            </li>
            <li>
              <strong>Third-Party Websites</strong><br/>
              This policy does not apply to third-party websites linked from our platform. We encourage users to review the privacy statements of any external sites they visit.
            </li>
            <li>
              <strong>Amendments</strong><br/>
              We reserve the right to modify this privacy policy. Please check regularly for updates. Material changes will be communicated directly when possible.
            </li>
            <li>
              <strong>Children</strong><br/>
              Million Dollar Influencer is not intended for children under the age of consent in their jurisdiction. We do not knowingly collect personal data from children. Parents or guardians who believe we may have collected such data should contact us immediately.
            </li>
            <li>
              <strong>Contact Information</strong><br/>
              <span className="block">Million Dollar Influencer</span>
              <span className="block">🌐 <a href="https://milliondollarinfluencer.com" className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">https://milliondollarinfluencer.com</a></span>
              <span className="block">📧 <a href="mailto:support@milliondollarinfluencer.com" className="text-blue-400 underline">support@milliondollarinfluencer.com</a></span>
            </li>
          </ol>
        </div>
      </Layout>
    </div>
  );
};

export default PrivacyPolicy; 