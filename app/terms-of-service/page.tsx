import PolicyLayout from "@/components/shared/PolicyLayout";
import {
  FileText,
  ShoppingBag,
  CreditCard,
  Truck,
  Copyright,
  User,
  Scale,
  MessageSquare,
} from "lucide-react";

export const metadata = {
  title: "Terms of Service | Rajawadu",
  description:
    "Terms and conditions for using Rajawadu's website and purchasing our products",
};

export default function TermsOfServicePage() {
  return (
    <PolicyLayout title="Terms of Service" lastUpdated="February 20, 2023">
      <div className="space-y-8">
        <section className="border-b border-sweet-brown/10 pb-6">
          <p className="text-base sm:text-lg font-medium text-sweet-brown">
            Welcome to Rajawadu. These Terms of Service (&quot;Terms&quot;)
            govern your use of our website, services, and products. By accessing
            our website or making a purchase, you agree to these Terms and our
            Privacy Policy.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-sweet-orange/10 rounded-full flex items-center justify-center text-sweet-orange">
              <FileText size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl">Acceptance of Terms</h2>
          </div>

          <div className="pl-0 sm:pl-14">
            <p>
              By accessing or using our website, you acknowledge that you have
              read, understood, and agree to be bound by these Terms. If you do
              not agree to these Terms, please do not use our website or
              services.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl ml-0 sm:ml-14">
            Changes to Terms
          </h2>

          <div className="pl-0 sm:pl-14">
            <p>
              We reserve the right to modify these Terms at any time. Changes
              will be effective immediately upon posting on our website. Your
              continued use of our website after changes are posted constitutes
              your acceptance of the modified Terms.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-sweet-orange/10 rounded-full flex items-center justify-center text-sweet-orange">
              <User size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl">Account Registration</h2>
          </div>

          <div className="pl-0 sm:pl-14">
            <p>
              To place orders or access certain features, you may need to create
              an account. You are responsible for:
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside marker:text-sweet-orange">
              <li>Providing accurate account information</li>
              <li>
                Maintaining the confidentiality of your account credentials
              </li>
              <li>All activities that occur under your account</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-sweet-orange/10 rounded-full flex items-center justify-center text-sweet-orange">
              <ShoppingBag size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl">Products and Ordering</h2>
          </div>

          <div className="pl-0 sm:pl-14">
            <p>
              Product information, including descriptions, images, and prices,
              is subject to change without notice. We reserve the right to:
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside marker:text-sweet-orange">
              <li>Limit quantities of products ordered</li>
              <li>Refuse or cancel orders at our discretion</li>
              <li>Discontinue products or modify their specifications</li>
            </ul>

            <p className="mt-4">
              When you place an order, you are making an offer to purchase the
              products. We may accept or decline your order at our discretion.
              An order is considered accepted only when we confirm it and
              process payment.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-sweet-orange/10 rounded-full flex items-center justify-center text-sweet-orange">
              <CreditCard size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl">Pricing and Payment</h2>
          </div>

          <div className="pl-0 sm:pl-14">
            <p>
              All prices are in Indian Rupees (INR) and include applicable
              taxes. Shipping costs are additional and will be displayed during
              checkout. We accept various payment methods as indicated on our
              website.
            </p>

            <p className="mt-4">
              We strive to ensure all pricing is accurate, but errors may occur.
              If we discover a pricing error, we reserve the right to:
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside marker:text-sweet-orange">
              <li>Cancel your order before shipping</li>
              <li>Contact you to request confirmation at the correct price</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-sweet-orange/10 rounded-full flex items-center justify-center text-sweet-orange">
              <Truck size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl">Shipping and Delivery</h2>
          </div>

          <div className="pl-0 sm:pl-14">
            <p>
              We ship to addresses within India. Delivery times are estimates
              and not guaranteed. We are not responsible for delays caused by:
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside marker:text-sweet-orange">
              <li>Shipping carrier delays</li>
              <li>Weather conditions or natural disasters</li>
              <li>Incorrect or incomplete shipping information</li>
              <li>Other circumstances beyond our control</li>
            </ul>

            <p className="mt-4">
              Risk of loss and title for items purchased pass to you upon
              delivery of the items to the shipping carrier.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-sweet-orange/10 rounded-full flex items-center justify-center text-sweet-orange">
              <Copyright size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl">Intellectual Property</h2>
          </div>

          <div className="pl-0 sm:pl-14">
            <p>
              All content on our website, including text, graphics, logos,
              images, and software, is our property or the property of our
              licensors and is protected by Indian and international copyright,
              trademark, and other intellectual property laws.
            </p>

            <p className="mt-4">
              You may not reproduce, distribute, modify, display, or use our
              content without our prior written permission.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-sweet-orange/10 rounded-full flex items-center justify-center text-sweet-orange">
              <MessageSquare size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl">User Content</h2>
          </div>

          <div className="pl-0 sm:pl-14">
            <p>
              By submitting reviews, comments, or other content to our website,
              you grant us a non-exclusive, royalty-free, perpetual, irrevocable
              right to use, reproduce, modify, and display such content in
              connection with our business.
            </p>

            <p className="mt-4">
              You are solely responsible for any content you submit. Content
              must not be:
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside marker:text-sweet-orange">
              <li>Unlawful, harmful, threatening, or defamatory</li>
              <li>Infringing on intellectual property rights</li>
              <li>Containing viruses or malicious code</li>
              <li>Violating any person&apos;s privacy</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-sweet-orange/10 rounded-full flex items-center justify-center text-sweet-orange">
              <Scale size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl">Limitation of Liability</h2>
          </div>

          <div className="pl-0 sm:pl-14">
            <p>
              To the maximum extent permitted by law, we shall not be liable for
              any indirect, incidental, special, consequential, or punitive
              damages arising from your use of our website or products.
            </p>

            <p className="mt-4">
              Our total liability to you for any claim arising from these Terms
              shall not exceed the amount you paid for your last purchase from
              us.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl ml-0 sm:ml-14">Indemnification</h2>

          <div className="pl-0 sm:pl-14">
            <p>
              You agree to indemnify and hold us harmless from any claims,
              damages, liabilities, costs, or expenses arising from your
              violation of these Terms or your use of our website or products.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl ml-0 sm:ml-14">Governing Law</h2>

          <div className="pl-0 sm:pl-14">
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of India, without regard to its conflict of law
              provisions. Any disputes arising under these Terms shall be
              subject to the exclusive jurisdiction of the courts in Ahmedabad,
              Gujarat, India.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl ml-0 sm:ml-14">Severability</h2>

          <div className="pl-0 sm:pl-14">
            <p>
              If any provision of these Terms is found to be invalid or
              unenforceable, the remaining provisions will remain in full force
              and effect.
            </p>
          </div>
        </section>

        <section className="space-y-4 mt-8">
          <h2 className="text-xl sm:text-2xl text-center border-b border-sweet-brown/10 pb-4 mb-4">
            Contact Us
          </h2>

          <div className="bg-sweet-orange/5 p-4 sm:p-6 rounded-xl">
            <p className="font-medium text-sweet-brown">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="mt-4 space-y-2">
              <p>
                <span className="font-medium">Email:</span>{" "}
                <a
                  href="mailto:sales@rajawadu.com"
                  className="text-sweet-orange hover:underline"
                >
                  sales@rajawadu.com
                </a>
              </p>
              <p>
                <span className="font-medium">Phone:</span> +91 7600130164 / +91
                7069296036
              </p>
              <p>
                <span className="font-medium">Address:</span> 11, Vimalnath
                flats, Opp Rajkot Nagarik Bank, Navrangpura, Ahmedabad, Gujarat,
                India - 380009
              </p>
            </div>
          </div>
        </section>
      </div>
    </PolicyLayout>
  );
}
