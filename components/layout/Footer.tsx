import Link from "next/link";
// import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-sweet-brown to-sweet-orange pt-12 sm:pt-16 pb-6 sm:pb-8 mt-8 sm:mt-12 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-dots-pattern opacity-10 bg-[length:20px_20px]"></div>

      {/* Decorative circles */}
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-sweet-blue/10 blur-xl"></div>
      <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-sweet-orange/20 blur-xl"></div>

      <div className="container relative z-10 px-4 sm:px-6">
        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 text-white">
          {/* COLUMN 1: ABOUT & CONNECT */}
          <div className="space-y-5 sm:space-y-6">
            <div>
              <h3 className="font-serif text-lg sm:text-xl mb-3 sm:mb-4 font-semibold">
                About Our Store
              </h3>
              <p className="text-white/90 text-sm leading-relaxed text-justify">
                At Rajawadu, we promise mukhwas made from quality ingredients,
                impeccable hygiene, and innovative recipes. Every bite brings
                joy and elevates your everyday moments into delightful
                experiences!
              </p>
            </div>

            {/* <div>
              <h3 className="font-serif text-lg sm:text-xl mb-2 sm:mb-3 font-semibold">
                Connect With Us
              </h3>
              <div className="flex gap-3 sm:gap-4">
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 p-2 sm:p-2.5 rounded-full transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebook size={16} className="sm:text-lg" />
                </Link>
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 p-2 sm:p-2.5 rounded-full transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram size={16} className="sm:text-lg" />
                </Link>
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 p-2 sm:p-2.5 rounded-full transition-colors"
                  aria-label="Twitter"
                >
                  <FaTwitter size={16} className="sm:text-lg" />
                </Link>
                <Link
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 p-2 sm:p-2.5 rounded-full transition-colors"
                  aria-label="YouTube"
                >
                  <FaYoutube size={16} className="sm:text-lg" />
                </Link>
              </div>
            </div> */}
          </div>

          {/* COLUMN 3: POLICIES */}
          <div>
            <h3 className="font-serif text-lg sm:text-xl mb-3 sm:mb-4 font-semibold">
              Policies
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-sm">
              <li>
                <Link
                  href="/contact"
                  className="text-white/90 hover:text-white hover:translate-x-1 transition-all inline-flex items-center"
                >
                  <span className="mr-1.5 text-xs">›</span> Contact Information
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-white/90 hover:text-white hover:translate-x-1 transition-all inline-flex items-center"
                >
                  <span className="mr-1.5 text-xs">›</span> Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-policy"
                  className="text-white/90 hover:text-white hover:translate-x-1 transition-all inline-flex items-center"
                >
                  <span className="mr-1.5 text-xs">›</span> Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-white/90 hover:text-white hover:translate-x-1 transition-all inline-flex items-center"
                >
                  <span className="mr-1.5 text-xs">›</span> Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping-policy"
                  className="text-white/90 hover:text-white hover:translate-x-1 transition-all inline-flex items-center"
                >
                  <span className="mr-1.5 text-xs">›</span> Shipping Policy
                </Link>
              </li>
            </ul>
          </div>
          {/* COLUMN 2: QUICK LINKS */}
          <div>
            <h3 className="font-serif text-lg sm:text-xl mb-3 sm:mb-4 font-semibold">
              Quick Links
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-sm">
              <li>
                <Link
                  href="/products"
                  className="text-white/90 hover:text-white hover:translate-x-1 transition-all inline-flex items-center"
                >
                  <span className="mr-1.5 text-xs">›</span> All Mukhwas
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: NEWSLETTER & CONTACT */}
          <div className="space-y-5 sm:space-y-6">
            <div>
              <h3 className="font-serif text-lg sm:text-xl mb-3 sm:mb-4 font-semibold">
                Newsletter
              </h3>
              <p className="text-white/90 text-sm mb-3">
                Join our mailing list for the latest products, offers, and
                updates!
              </p>
              <form className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 bg-white text-sweet-brown hover:bg-white/90 transition-colors rounded-md px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium"
                >
                  Subscribe
                </button>
              </form>
            </div>

            <div>
              <h3 className="font-serif text-lg sm:text-xl mb-2 sm:mb-3 font-semibold">
                Contact Info
              </h3>
              <div className="space-y-1.5 sm:space-y-2 text-sm text-white/90">
                <p className="flex flex-col sm:flex-row sm:items-start">
                  <span className="font-medium text-white sm:min-w-[80px] inline-block mb-0.5 sm:mb-0">
                    Phone:
                  </span>
                  <a href="tel:+917600130164" className="hover:text-white">
                    +91 7600130164 <br /> +91 7069296036
                  </a>
                </p>
                <p className="flex flex-col sm:flex-row sm:items-start">
                  <span className="font-medium text-white sm:min-w-[80px] inline-block mb-0.5 sm:mb-0">
                    Email:
                  </span>
                  <a
                    href="mailto:sales@rajawadu.com"
                    className="hover:text-white"
                  >
                    sales@rajawadu.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t border-white/10 flex flex-col md:flex-row justify-center md:justify-between items-center text-xs sm:text-sm text-white/70 text-center md:text-left">
          <p>© {new Date().getFullYear()} Rajawadu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
