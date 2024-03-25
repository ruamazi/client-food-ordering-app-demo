import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-orange-500 py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <span className="text-2xl text-white font-light tracking-wider">
          MernEats.com
        </span>
        <span className="text-white font-bold tracking-tight flex gap-4">
          <Link className="hover:text-orange-200" to={"#"}>
            Privacy Policy
          </Link>
          <Link className="hover:text-orange-200" to={"#"}>
            Terms of Service
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Footer;
