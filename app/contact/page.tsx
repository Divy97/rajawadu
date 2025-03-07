import PolicyLayout from "@/components/shared/PolicyLayout";
import Link from "next/link";

export const metadata = {
  title: "Contact Us | Rajawadu",
  description:
    "Get in touch with Rajawadu for customer support, feedback, or business inquiries",
};

export default function ContactPage() {
  return (
    <PolicyLayout title="Contact Information">
      <p className="text-lg mb-8">
        Thank you for your interest in Rajawadu. We&apos;re here to help with
        any questions, concerns, or feedback you may have about our products or
        services. Please find our contact information below.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-[#f5f5eb] p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-[#6b5130] mb-4">
            Customer Support
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="font-medium min-w-[80px] inline-block">
                Email:
              </span>
              <a
                href="mailto:cc@rajawadu.in"
                className="text-sweet-brown hover:underline"
              >
                cc@rajawadu.in
              </a>
            </li>
            <li className="flex items-start">
              <span className="font-medium min-w-[80px] inline-block">
                Phone:
              </span>
              <a
                href="tel:+919772272659"
                className="text-sweet-brown hover:underline"
              >
                +91 9772272659
              </a>
            </li>
            <li className="flex items-start">
              <span className="font-medium min-w-[80px] inline-block">
                WhatsApp:
              </span>
              <a
                href="https://wa.me/919420244111"
                className="text-sweet-brown hover:underline"
              >
                +91 9420244111
              </a>
            </li>
            <li className="flex items-start">
              <span className="font-medium min-w-[80px] inline-block">
                Hours:
              </span>
              <span>
                Monday to Saturday: 10:00 AM - 7:00 PM IST
                <br />
                Sunday: Closed
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-[#f5f5eb] p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-[#6b5130] mb-4">
            Business Address
          </h2>
          <address className="not-italic">
            <p className="mb-2">
              <strong>Rajawadu (ALTERKITCH INDIA PRIVATE LIMITED)</strong>
            </p>
            <p className="mb-6">
              Ground floor, 001, Rajawadu, Sears Towers,
              <br />
              Near Panchvati Circle, opp. Justdial office,
              <br />
              near central bank, Panchavati Society,
              <br />
              Gulbai Tekra, Ahmedabad,
              <br />
              Gujarat 380006, India
            </p>
            <p>
              <strong>GST:</strong> [Your GST Number]
            </p>
          </address>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-[#6b5130] mb-4">
        Connect With Us
      </h2>
      <div className="mb-12">
        <p className="mb-4">
          Follow us on social media to stay updated with our latest products,
          promotions, and mukhwas recipes:
        </p>
        <div className="flex gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-sweet-orange hover:bg-sweet-brown text-white p-3 rounded-full transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-sweet-orange hover:bg-sweet-brown text-white p-3 rounded-full transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-sweet-orange hover:bg-sweet-brown text-white p-3 rounded-full transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-sweet-orange hover:bg-sweet-brown text-white p-3 rounded-full transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
          </a>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-[#6b5130] mb-4">Feedback</h2>
      <p className="mb-4">
        We value your feedback as it helps us improve our products and services.
        Please share your thoughts, suggestions, or concerns with us via email
        at{" "}
        <a
          href="mailto:feedback@rajawadu.in"
          className="text-sweet-brown hover:underline"
        >
          feedback@rajawadu.in
        </a>
        .
      </p>

      <h2 className="text-2xl font-semibold text-[#6b5130] mb-4">
        Business Inquiries
      </h2>
      <p className="mb-6">
        For wholesale orders, partnerships, or other business-related inquiries,
        please contact us at{" "}
        <a
          href="mailto:business@rajawadu.in"
          className="text-sweet-brown hover:underline"
        >
          business@rajawadu.in
        </a>
        .
      </p>

      <div className="bg-[#f5f5eb] p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-[#6b5130] mb-4">
          Related Information
        </h2>
        <ul className="space-y-2">
          <li>
            <Link
              href="/shipping-policy"
              className="text-sweet-brown hover:underline"
            >
              Shipping Policy
            </Link>
          </li>
          <li>
            <Link
              href="/refund-policy"
              className="text-sweet-brown hover:underline"
            >
              Refund Policy
            </Link>
          </li>
          <li>
            <Link
              href="/privacy-policy"
              className="text-sweet-brown hover:underline"
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              href="/terms-of-service"
              className="text-sweet-brown hover:underline"
            >
              Terms of Service
            </Link>
          </li>
        </ul>
      </div>
    </PolicyLayout>
  );
}
