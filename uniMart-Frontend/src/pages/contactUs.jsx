import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  CircleQuestionMark,
} from "lucide-react";
import { useState } from "react";

export default function ContactUs() {
  const [showPopup, setShowPopup] = useState(false);
  const handlesend = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <section className="pt-20 p-5">
      {/*main container div */}
      <div className="flex flex-row gap-5">
        <div>
          <div className="">
            <h1 className="text-4xl font-semibold leading-[-0.9] mb-2">
              Contact Us{" "}
            </h1>
            <h6>
              We're here to help! Reach out to us with any questions or
              concerns.
            </h6>
          </div>
          {/* */}
          <div className="bg-[#D9D9D9]  mt-5 p-4 ">
            <div className="p-4">
              <h1 className="font-normal text-2xl">SEND US A MESSAGE</h1>
            </div>
            {/*Name label */}
            <div className="flex flex-row gap-x-3">
              <div>
                <label>FIRST NAME *</label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-300  p-2 w-full bg-[#B9B9B9]"
                ></input>
              </div>
              <div>
                <label>LAST NAME*</label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-300  p-2 w-full bg-[#B9B9B9]"
                ></input>
              </div>
            </div>
            {/*Email label */}
            <div className="pt-5">
              <label>EMAIL ADDRESS *</label>
              <input
                type="email"
                placeholder="your.email@university.edu"
                className="border border-gray-300  p-2 w-full bg-[#B9B9B9]"
              ></input>
            </div>
            <div className="pt-5">
              <label>STUDENT ID (OPTIONAL)</label>
              <input
                type="number"
                placeholder="Enter your student id"
                className="border border-gray-300 p-2 w-full bg-[#B9B9B9]"
              ></input>
            </div>
            <div className="pt-5">
              <label>SUBJECT *</label>
              <input
                type="text"
                name="Subject"
                className="border border-gray-300 rounded-md p-2 w-full bg-[#B9B9B9]"
              ></input>
            </div>
            <div className="pt-5">
              <label>ORDER NUMBER (IF APPLICABLE)</label>
              <input
                type="number"
                placeholder="e.g, #012345"
                className="border border-gray-300  p-2 w-full bg-[#B9B9B9]"
              ></input>
            </div>
            <div className="pt-5">
              <label>MESSAGE *</label>
              <textarea
                type="text"
                placeholder="Please describe your issue or question in detail"
                className="border p-3 w-full h-50 resize-none"
              />
            </div>
            <p className=" text-center p-7">
              I agree to receive follow-up emails regarding my inquiry and
              understand that my information will be handled according to the
              privacy policy.
            </p>
            <div className="flex justify-center border bg-black mb-4">
              <button
                onClick={handlesend}
                className="text-white p-3.5 cursor-pointer hover:hover:text-gray-500 "
              >
                SEND MESSAGE
              </button>
              {showPopup && (
                <div className="fixed top-16 text-white px-6 py-3 rounded-md shadow-lg">
                  ✅ Message sent successfully!
                </div>
              )}
            </div>
          </div>
        </div>
        {/*second div */}
        <div className=" ">
          {/*Contact Information */}
          <div className="bg-[#D9D9D9] mt-31 md:mt-25 p-5">
            <div>
              <h1 className="font-inter text-2xl tracking-wide text-[#0A0A0A]">
                CAMPUS OFFICE
              </h1>
            </div>
            <div className="flex flex-row pt-5 gap-3">
              <div className="bg-[#515151] p-3 w-13 h-12">
                <MapPin color="white" />
              </div>
              <div>
                <div className="pb-1.5">
                  <h1 className="text-lg text-[#0A0A0A] font-inter tracking-wide">
                    Location
                  </h1>
                </div>
                <h3 className="text-[#364153] tracking-wide">
                  Student Union Building
                </h3>
                <h3 className="text-[#364153] tracking-wide">
                  Room 205, 2nd Floor
                </h3>
                <h3 className="text-[#364153] tracking-wide">
                  University Campus
                </h3>
              </div>
            </div>
            {/*phone */}
            <div className="flex flex-row pt-5 gap-3">
              <div className="bg-[#515151] p-3 w-13 h-12">
                <Phone color="white" />
              </div>
              <div>
                <div className="pb-1.5">
                  <h1 className="text-lg text-[#0A0A0A] font-inter tracking-wide">
                    Phone
                  </h1>
                </div>
                <h3 className="text-[#364153] tracking-wide">(555) 123-4567</h3>
                <h5 className="text-[#364153] tracking-wide">
                  Mon-Fri, 9 AM - 5 PM
                </h5>
              </div>
            </div>
            {/*email */}
            <div className="flex flex-row pt-5 gap-3">
              <div className="bg-[#515151] p-3 w-13 h-12">
                <Mail color="white" />
              </div>
              <div>
                <div className="pb-1.5">
                  <h1 className="text-lg text-[#0A0A0A] font-inter tracking-wide">
                    Email
                  </h1>
                </div>
                <h3 className="text-[#364153] tracking-wide">
                  unimartsupport@gmail.com
                </h3>
                <h5 className="text-[#364153] tracking-wide">
                  24 - 48 hour response time
                </h5>
              </div>
            </div>
            {/*office hours */}
            <div className="flex flex-row pt-5 gap-3">
              <div className="bg-[#515151] p-3 w-13 h-12">
                <Clock color="white" />
              </div>
              <div>
                <div className="pb-1.5">
                  <h1 className="text-lg text-[#0A0A0A] font-inter tracking-wide">
                    Office Hours
                  </h1>
                </div>
                <h3 className="text-[#364153] tracking-wide">
                  Monday - Friday: 9 AM - 5 PM
                </h3>
                <h3 className="text-[#364153] tracking-wide">
                  Saturday: 10 AM - 2PM
                </h3>
                <h3 className="text-[#364153] tracking-wide">Sunday: Closed</h3>
              </div>
            </div>
          </div>

          {/*third div */}

          <div className="mt-5 bg-[#D9D9D9]  p-5">
            <h1 className="font-inter font-medium text-lg text-[#0A0A0A]">
              QUICK SUPPORT
            </h1>
            <div className="flex flex-col pt-4">
              <div className="flex items-center justify-center gap-1 bg-black text-white   p-3  ">
                <MessageCircle size={19} className="text-white " />
                <button> Live Chat Support</button>
              </div>
              <div className="bg-[white] border-2 mt-2 items-center flex flex-row gap-1 justify-center p-2.5">
                <CircleQuestionMark size={20} />
                <button
                  onClick={() =>
                    document
                      .getElementById("faq")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-black cursor-pointer hover:text-blue-800 "
                >
                  View FAQ
                </button>
              </div>
            </div>
          </div>
          <div className="border-[#99A1AF] bg-[#F9FAFB] border-2 p-3 mt-5">
            <div>
              <h1 className="text-[#0A0A0A] font-inter font-bold text-xl pb-2 tracking-normal">
                📢Notice
              </h1>
            </div>
            <h3 className="text-[#364153]">
              During exam periods and holidays, response times may be <br />
              longer. For urgent order issues, please contact the seller
              directly through the chat feature.
            </h3>
          </div>
        </div>
      </div>

      {/*FAQ */}
      <div id="faq" className="">
        <div className="mt-7 pb-6">
          <h1 className="text-[#0A0A0A] font-medium text-xl font-inter">
            FREQUENTLY ASKED QUESTIONS
          </h1>
        </div>
        <div className="flex flex-row gap-4">
          {/*first three */}
          <div className="">
            {/*1*/}
            <div className="border-2 p-4 mb-5">
              <h1 className="font-inter text-[#0A0A0A] font-medium text-lg pb-2.5">
                How do i report a problem with my order?
              </h1>
              <h3 className="font-inter text-[#364153] text-md">
                Go to your order history, select the order, and click "Report
                Issue". You can also contact the seller directly through the
                chat feature or reach out to our support team using the form
                above.
              </h3>
            </div>
            {/*2 */}
            <div className="border-2 p-4 mb-5">
              <h1 className="font-inter text-[#0A0A0A] font-medium text-lg pb-2.5">
                How can I verify a seller?
              </h1>
              <h3 className="font-inter text-[#364153] text-md">
                Look for the verified shield icon next to the seller's name.
                Check their rating, number of sales, and student verification
                status. Always meet in public campus locations for safety.
              </h3>
            </div>
            {/*3 */}
            <div className="border-2 p-4 mb-5">
              <h1 className="font-inter text-[#0A0A0A] font-medium text-lg pb-2.5">
                How do refunds work?
              </h1>
              <h3 className="font-inter text-[#364153] text-md">
                Refund policies are set by individual sellers. Contact the
                seller first to resolve any issues. If unresolved, our support
                team can mediate disputes between students.
              </h3>
            </div>
          </div>
          {/*second three */}
          <div>
            {/*1 */}
            <div className="border-2 p-4 mb-5">
              <h1 className="font-inter text-[#0A0A0A] font-medium text-lg pb-2.5">
                What payment methods are accepted?
              </h1>
              <h3 className="font-inter text-[#364153] text-md">
                We accept Cash on Delivery and Mobile Money payments (MTN,
                Vodafone, AirtelTigo, and Telecel). Payment is typically
                completed when you meet the seller at the designated campus
                location.
              </h3>
            </div>
            {/*2 */}
            <div className="border-2 p-4 mb-5 pb-10">
              <h1 className="font-inter text-[#0A0A0A] font-medium text-lg pb-2.5">
                What are the safe meet-up locations?
              </h1>
              <h3 className="font-inter text-[#364153] text-md">
                We recommend meeting at well-lit, public campus locations such
                as the Student Union, Library Entrance, Main Gate, or Cafeteria
                during daytime hours.
              </h3>
            </div>
            {/*3 */}
            <div className="border-2 p-4 mb-5">
              <h1 className="font-inter text-[#0A0A0A] font-medium text-lg pb-2.5">
                Can I change my meet-up location?
              </h1>
              <h3 className="font-inter text-[#364153] text-md">
                Yes! Contact the seller through the chat to arrange a different
                campus meet-up location that works for both parties. Always
                confirm the new location before heading out.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
