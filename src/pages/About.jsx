import { assets } from "../assets/assets";
import Title from "../components/Title";
import NewsletterBox from "../components/NewsletterBox";

function About() {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"About"} text2={"Us"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          alt=""
          className="w-full md:max-w-[450px]"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis
            fugit mollitia sunt rerum aperiam sequi esse! Architecto eius
            assumenda quisquam.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
            blanditiis fuga deleniti corrupti eligendi corporis quaerat. Aperiam
            temporibus sit perferendis!
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum,
            rem!
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"Why"} text2={"Choose us"} />
      </div>

      <div className=" flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b> Quality Assurance</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam,
            odio sunt? Ducimus, sit qui. Tempore.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b> Quality Assurance</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam,
            odio sunt? Ducimus, sit qui. Tempore.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b> Quality Assurance</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam,
            odio sunt? Ducimus, sit qui. Tempore.
          </p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
}

export default About;
