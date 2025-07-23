import Layout from "../layout/layout";
import { motion } from "framer-motion"; // Import framer-motion

const TermsAndConditions = () => {
  return (
    <div>
      <Layout>
        <div className="absolute bottom-[75%] left-[-30%] translate-x-1/2 w-[450px] h-[450px] rounded-full bg-[#B48B34] blur-[250px] opacity-50 -z-10" style={{ boxShadow: "0 0 200px 100px rgba(180, 139, 52, 0.6)" }}></div>
        <div className="absolute bottom-[30%] left-[-250px] translate-x-1/2 w-[450px] h-[450px] rounded-full bg-[#B48B34] blur-[350px] opacity-50 -z-10" style={{ boxShadow: "0 0 200px 100px rgba(180, 139, 52, 0.6)" }}></div>
        <div className="absolute bottom-[50%] right-0 translate-x-1/2 w-[450px] h-[450px] rounded-full bg-[#B48B34] blur-[250px] opacity-50 -z-10" style={{ boxShadow: "0 0 200px 100px rgba(180, 139, 52, 0.6)" }}></div>
        <div className="absolute bottom-[550px] right-0 translate-x-1/2 w-[450px] h-[450px] rounded-full bg-[#B48B34] blur-[250px] opacity-50 -z-10" style={{ boxShadow: "0 0 200px 100px rgba(180, 139, 52, 0.6)" }}></div>



        <div className="max-w-7xl w-full mx-auto px-4 pt-[7rem]">
        <motion.h1
                className="text-[36px]  lg:text-[3rem] leading-[1.2] lg:leading-[70px] uppercase"
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
               MillionDollarInfluencer <br/>Terms and Conditions
              </motion.h1>
         
          <p className="text-sm text-gray-400 mb-2">Effective Date: January 1, 2025</p>
          <p className="text-sm text-gray-400 mb-6">Last Updated: January 1, 2025</p>
          <p className="mb-4 text-sm text-gray-400">These Terms and Conditions govern the access and use of MillionDollarInfluencer and its associated subdomains, features, and services. By using our platform, you agree to the following terms:</p>

          <ol className="list-decimal ml-6 space-y-4 text-sm text-gray-400 pb-8">
            <li>
              <strong>Introduction</strong><br/>
              Welcome to MillionDollarInfluencer! By accessing or using our platform, you agree to comply with these Terms and our Privacy Policy. If you do not agree with any part of these Terms, you may not use our services. We reserve the right to update these Terms at any time.
            </li>
            <li>
              <strong>Agreement to Terms</strong><br/>
              Your continued use of MillionDollarInfluencer indicates your acceptance of these Terms and any future modifications. This agreement is legally binding and governs your use of our services.
            </li>
            <li>
              <strong>Electronic Communications</strong><br/>
              By using MillionDollarInfluencer or communicating with us electronically, you consent to receive messages from us in digital form. These communications meet any legal requirement for written communication.
            </li>
            <li>
              <strong>Intellectual Property Rights</strong><br/>
              All materials, trademarks, logos, code, and content on MillionDollarInfluencer are owned by us or our licensors and are protected by intellectual property laws. You may not reproduce, republish, or reuse any content without prior permission.
            </li>
            <li>
              <strong>Third-Party Content</strong><br/>
              MillionDollarInfluencer may host content or links from third parties. We are not responsible for the accuracy or legality of third-party materials and disclaim any liability for such content.
            </li>
            <li>
              <strong>Acceptable Use</strong><br/>
              You agree to use our services lawfully and respectfully. Activities such as harassment, spamming, posting offensive content, or attempting to disrupt service functionality are strictly prohibited.
            </li>
            <li>
              <strong>Account Registration</strong><br/>
              To access certain features, users must create an account and provide accurate information. You are responsible for keeping your login credentials secure and for all actions taken under your account.
            </li>
            <li>
              <strong>User-Generated Content</strong><br/>
              You are solely responsible for content you upload or display. By submitting content, you grant us a royalty-free, perpetual license to use, modify, and display it. Content must comply with all laws and not infringe on third-party rights.
            </li>
            <li>
              <strong>Idea Submissions</strong><br/>
              Suggestions or ideas submitted to MillionDollarInfluencer are considered non-confidential. We may use, modify, or distribute them freely without compensation or acknowledgment.
            </li>
            <li>
              <strong>Termination of Access</strong><br/>
              We may suspend or terminate your access at any time if you violate these Terms. Upon termination, you lose the right to use our platform and services.
            </li>
            <li>
              <strong>Warranties and Liability</strong><br/>
              MillionDollarInfluencer is provided “as is” without warranties of any kind. We make no guarantees of availability, accuracy, or security. To the maximum extent allowed by law, we are not liable for any damages resulting from your use of our services.
            </li>
            <li>
              <strong>Privacy</strong><br/>
              Your use of our services is subject to our Privacy Policy, which describes how we collect and use your data. By using the platform, you consent to our data practices.
            </li>
            <li>
              <strong>Legal Compliance</strong><br/>
              You must comply with all applicable laws and regulations when using MillionDollarInfluencer. Access from jurisdictions where our platform is illegal is not permitted.
            </li>
            <li>
              <strong>Transfer of Rights</strong><br/>
              You may not transfer your rights under these Terms without our written approval. We reserve the right to assign or transfer our rights and obligations at any time.
            </li>
            <li>
              <strong>Breach of Terms</strong><br/>
              Violating these Terms may result in account suspension, content removal, legal action, or IP banning. We reserve the right to take any action deemed appropriate.
            </li>
            <li>
              <strong>Force Majeure</strong><br/>
              We are not responsible for delays or failures due to events outside our control, including natural disasters, war, or technical interruptions beyond our control.
            </li>
            <li>
              <strong>Indemnity</strong><br/>
              You agree to indemnify and hold MillionDollarInfluencer and its partners harmless from any claims or losses arising from your misuse of the platform or breach of these Terms.
            </li>
            <li>
              <strong>Waiver</strong><br/>
              Failure to enforce any part of these Terms shall not be considered a waiver of our rights to enforce them in the future.
            </li>
            <li>
              <strong>Language</strong><br/>
              In the event of conflict between translated versions of these Terms, the English version shall prevail.
            </li>
            <li>
              <strong>Entire Agreement</strong><br/>
              These Terms and our Privacy Policy represent the full agreement between you and MillionDollarInfluencer, superseding any prior understandings.
            </li>
            <li>
              <strong>Updates to Terms</strong><br/>
              We may revise these Terms at any time. Any updates will be reflected by a change in the "Last Updated" date. Continued use of the platform indicates acceptance of the revised Terms.
            </li>
            <li>
              <strong>Governing Law and Jurisdiction</strong><br/>
              These Terms shall be governed by the laws of the jurisdiction in which MillionDollarInfluencer operates. Any disputes shall be subject to the exclusive jurisdiction of that region’s courts.
            </li>
            <li>
              <strong>Contact Us</strong><br/>
              For questions regarding these Terms and Conditions, please contact us at:<br/>
              <a href="mailto:support@milliondollarinfluencer.com" className="text-blue-400 underline">support@milliondollarinfluencer.com</a>
            </li>
            <li>
              <strong>Pixel Ownership</strong>
              <ol className="list-decimal ml-6 mt-2 space-y-2">
                <li><strong>Ownership Rights</strong><br/>When you purchase a pixel on MillionDollarInfluencer, it becomes your digital asset for the lifetime of the platform. You have the right to display images or content on that pixel in accordance with our content policies.</li>
                <li><strong>Transfer Limitations</strong><br/>Pixels are not transferable outside of officially supported features such as built-in resale tools or marketplace modules.</li>
                <li><strong>Content Compliance</strong><br/>Pixel content must adhere to our community standards. We reserve the right to moderate or remove pixel content that is illegal, offensive, or violates our policies.</li>
                <li><strong>Platform Modifications</strong><br/>We may make changes to the platform structure or layout that could affect pixel visibility. In such cases, we will make reasonable efforts to inform affected users.</li>
              </ol>
            </li>
            <li>
              <strong>Marketplace Rules</strong>
              <ol className="list-decimal ml-6 mt-2 space-y-2">
                <li><strong>Eligibility and Use</strong><br/>Our marketplace is open to verified users for the sale or exchange of digital assets and pixel space. Listings must be accurate and comply with all legal requirements.</li>
                <li><strong>Listing and Conduct Standards</strong><br/>You must not engage in deceptive practices. Listings for counterfeit or prohibited products will be removed, and your account may be suspended.</li>
                <li><strong>Transaction Fees</strong><br/>MillionDollarInfluencer may charge a percentage-based fee or fixed rate on each successful transaction. All fees will be visible prior to confirmation.</li>
                <li><strong>Dispute Handling</strong><br/>Buyers and sellers must report disputes within 7 days. MillionDollarInfluencer may mediate but cannot guarantee a resolution in every case.</li>
                <li><strong>Withdrawals</strong><br/>Proceeds from marketplace transactions may be withdrawn based on compliance with verification processes, withdrawal limits, and platform policies.</li>
              </ol>
            </li>
            <li>
              <strong>NFT Integration</strong>
              <ol className="list-decimal ml-6 mt-2 space-y-2">
                <li><strong>Tokenized Pixel Ownership</strong><br/>Some pixels may be represented as NFTs on supported blockchains. These NFTs reflect ownership rights as described in their metadata.</li>
                <li><strong>Wallets and Transactions</strong><br/>To interact with NFTs, users must connect a digital wallet. You are responsible for securing your wallet and handling transaction fees (e.g., gas fees).</li>
                <li><strong>Authenticity and Verification</strong><br/>Ownership of NFTs will be determined by blockchain records. MillionDollarInfluencer will consider the wallet holding the token as the legitimate owner.</li>
                <li><strong>Content Boundaries</strong><br/>NFT-linked content must not violate our policies. Content may be hidden or delisted if found to be harmful, fraudulent, or infringing, even if it remains on-chain.</li>
              </ol>
            </li>
            <li>
              <strong>Ad Placements</strong>
              <ol className="list-decimal ml-6 mt-2 space-y-2">
                <li><strong>Sponsored Content Space</strong><br/>Users may buy designated pixels for advertising purposes. All advertising must be truthful, non-deceptive, and comply with advertising laws.</li>
                <li><strong>Review Process</strong><br/>Ads may be reviewed before publishing. MillionDollarInfluencer reserves the right to reject, modify, or remove any advertisement at any time.</li>
                <li><strong>Prohibited Advertisements</strong><br/>We do not allow ads for illegal products, adult content, misleading schemes, or offensive material.</li>
                <li><strong>Display Conditions</strong><br/>Ads may appear with varying levels of prominence based on pricing tiers. Visibility duration and placement may be determined during purchase.</li>
                <li><strong>Liability Disclaimer</strong><br/>MillionDollarInfluencer is not liable for any claims made in advertisements. Advertisers assume full responsibility for ad content and linked sites.</li>
              </ol>
            </li>
            <li>
              <strong>Credit System Policies</strong>
              <ol className="list-decimal ml-6 mt-2 space-y-2">
                <li><strong>Credit Definition</strong><br/>Credits are the internal currency of MillionDollarInfluencer, with 1 credit equaling $1 USD. Credits are required for purchasing pixels, bidding, and using marketplace features.</li>
                <li><strong>Purchasing and Use</strong><br/>Credits can be purchased using supported payment methods. All purchases are final unless otherwise stated.</li>
                <li><strong>Restrictions</strong><br/>Credits cannot be exchanged for real currency or transferred outside the platform unless explicitly allowed. External sales or transfers are prohibited.</li>
                <li><strong>Earnings and Withdrawals</strong><br/>Credits earned through sales or promotions are subject to platform review, verification, and potential withdrawal delays or fees. Withdrawals require KYC and must meet minimum thresholds.</li>
              </ol>
            </li>
          </ol>
        </div>
      </Layout>
    </div>
  );
};

export default TermsAndConditions; 