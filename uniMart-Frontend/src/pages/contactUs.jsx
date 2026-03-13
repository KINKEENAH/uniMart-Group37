export default function ContactUs() {
  return (
    <section className="pt-24">
      <div>
        {" "}
        {/*main container div */}
        <div className="">
          <h1 className="text-4xl font-semibold leading-[-0.9]">Contact Us </h1>
          <h6>
            We're here to help! Reach out to us with any questions or concerns.
          </h6>
        </div>
        <div className="bg-[#D9D9D9] min-h-full mt-5 p-5  ">
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
                className="border border-gray-300 rounded-md p-2 w-full bg-[#B9B9B9]"
              ></input>
            </div>
            <div>
              <label>LAST NAME*</label>
              <input
                type="text"
                placeholder="Enter last name"
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full bg-[#B9B9B9]"
              ></input>
            </div>
          </div>
          {/*Email label */}
          <div className="pt-5">
            <label>EMAIL ADDRESS *</label>
            <input
              type="email"
              placeholder="your.email@university.edu"
              className="border border-gray-300 rounded-md p-2 w-full bg-[#B9B9B9]"
            ></input>
          </div>
          <div className="pt-5">
            <label>STUDENT ID (OPTIONAL)</label>
            <input
              type="number"
              placeholder="Enter your student id"
              className="border border-gray-300 rounded-md p-2 w-full bg-[#B9B9B9]"
            ></input>
          </div>
          <div className="pt-5">
            <label>SUBJECT *</label>
            <input
              type="text"
              name="Subject"
              className="border border-gray-300 rounded-md p-2 w-full bg-[#B9B9B9]"
            ></input>
          </div >
          <div className="pt-5">
            <label>ORDER NUMBER (IF APPLICABLE)</label>
            <input
              type="number"
              placeholder="e.g, #012345"
              className="border border-gray-300 rounded-md p-2 w-full bg-[#B9B9B9]"
            ></input>
          </div>
          <div className="pt-5">
            <label>Message *</label>
            <input
              type="text"
              placeholder="Please describe your issue or question in detail"
              className="border   p-20 w-full "
            ></input>
          </div>
          <p>
            I agree to receive follow-up emails regarding my inquiry and
            understand that my information will be handled according to the
            privacy policy.
          </p>
          <div className="flex justify-center border bg-black">
            <button className="text-white">SEND MESSAGE</button>
          </div>
        </div>
        
      </div>
      <div>
        <div>

        </div>
      </div>

    </section>
  );
}
