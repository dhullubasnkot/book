import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" py-10 px-6 text-gray-700 mt-5">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-6 gap-2">
        <div>
          <h3 className="font-semibold mb-3">QUICK LINKS</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#">Book Request</Link>
            </li>
            <li>
              <Link href="/components/pages/AllTypesOfBook/BestSeller">
                Best Sellers
              </Link>
            </li>
            <li>
              <Link href="/components/pages/AllTypesOfBook/NewArrivals">
                New Arrivals
              </Link>
            </li>
            <li>
              <Link href="#">Blogs</Link>
            </li>
            <li>
              <Link href="/components/pages/AllTypesOfBook/UsedBooks">
                Used Books
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">ABOUT</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#">About Us</Link>
            </li>
            <li>
              <Link href="#">Careers</Link>
            </li>
            <li>
              <Link href="#">Contact Us</Link>
            </li>
            <li>
              <Link href="#">Wholesale</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">GENRES</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#">Fiction</Link>
            </li>
            <li>
              <Link href="#">Self Help</Link>
            </li>
            <li>
              <Link href="#">Business</Link>
            </li>
            <li>
              <Link href="#">Children</Link>
            </li>
            <li>
              <Link href="#">Nepali</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">OTHERS</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#">Cafe</Link>
            </li>
            <li>
              <Link href="#">FAQ's</Link>
            </li>
            <li>
              <Link href="#">Shipping Rates</Link>
            </li>
          </ul>
        </div>
        <div className="w-[500px] mx-auto p-5  shadow-md text-center mb-6">
          <p className="text-lg font-semibold text-red-600">
            Signup and Unlock 10% OFF
          </p>
          <p className="text-gray-600">On your first purchase!</p>
          <input
            type="email"
            placeholder="Enter your email"
            className="mt-3 p-2 border rounded w-2/3 md:w-1/3"
          />
          <button className="ml-2 px-4 py-2 bg-blue-600 text-white rounded">
            SIGNUP
          </button>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-6 text-sm">
        <p>
          &copy; 2025 TryUS &nbsp; | &nbsp; <Link href="#">Terms Of Use</Link>{" "}
          &nbsp; | &nbsp; <Link href="#">Privacy Policy</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
