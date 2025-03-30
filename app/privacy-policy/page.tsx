import PolicyLayout from "@/components/shared/PolicyLayout";
import { Shield, Eye, Share2, UserCheck, Cookie, Lock } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Rajawadu",
  description:
    "Learn about how Rajawadu handles your personal information and data",
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout title="Privacy Policy" lastUpdated="March 10, 2023">
      <div className="space-y-8">
        <section className="border-b border-sweet-brown/10 pb-6">
          <p className="text-base sm:text-lg font-medium text-sweet-brown">
            This Privacy Policy describes how Rajawadu (&quot;the Site&quot;,
            &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses,
            and discloses your personal information when you visit, use our
            services, or make a purchase from rajawadu.com (the
            &quot;Site&quot;) or otherwise communicate with us (collectively,
            the &quot;Services&quot;).
          </p>

          <p className="mt-4">
            For purposes of this Privacy Policy, &quot;you&quot; and
            &quot;your&quot; means you as the user of the Services, whether you
            are a customer, website visitor, or another individual whose
            information we have collected pursuant to this Privacy Policy.
          </p>

          <p className="mt-4 italic">
            Please read this Privacy Policy carefully. By using and accessing
            any of the Services, you agree to the collection, use, and
            disclosure of your information as described in this Privacy Policy.
            If you do not agree to this Privacy Policy, please do not use or
            access any of the Services.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-sweet-orange/10 rounded-full flex items-center justify-center text-sweet-orange">
              <Eye size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl">Information We Collect</h2>
          </div>

          <div className="pl-0 sm:pl-14">
            <p>
              We may collect personal information that you voluntarily provide
              to us when you:
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside marker:text-sweet-orange">
              <li>Create an account or place an order</li>
              <li>Sign up for our newsletter</li>
              <li>Contact our customer service</li>
              <li>Participate in promotions or surveys</li>
              <li>Leave reviews or comments</li>
            </ul>

            <p className="mt-4">
              The personal information we collect may include:
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside marker:text-sweet-orange">
              <li>Name, email address, phone number</li>
              <li>Billing and shipping address</li>
              <li>
                Payment details (processed securely through our payment
                processors)
              </li>
              <li>Purchase history</li>
              <li>Communication preferences</li>
            </ul>

            <p className="mt-4">
              We also automatically collect certain information when you visit
              our website, including:
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside marker:text-sweet-orange">
              <li>IP address and device information</li>
              <li>Browser type and settings</li>
              <li>Pages visited and interactions</li>
              <li>Referral source</li>
              <li>Cookies and similar technologies</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-sweet-orange/10 rounded-full flex items-center justify-center text-sweet-orange">
              <UserCheck size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl">How We Use Your Information</h2>
          </div>

          <div className="pl-0 sm:pl-14">
            <p>We use your information for various purposes, including to:</p>
            <ul className="mt-2 space-y-1 list-disc list-inside marker:text-sweet-orange">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your orders and account</li>
              <li>
                Send you marketing communications (if you&apos;ve opted in)
              </li>
              <li>Improve our website, products, and services</li>
              <li>Personalize your shopping experience</li>
              <li>Detect and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-sweet-orange/10 rounded-full flex items-center justify-center text-sweet-orange">
              <Share2 size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl">Information Sharing</h2>
          </div>

          <div className="pl-0 sm:pl-14">
            <p>We may share your information with:</p>
            <ul className="mt-2 space-y-1 list-disc list-inside marker:text-sweet-orange">
              <li>
                Service providers who help us operate our business (payment
                processors, shipping companies, etc.)
              </li>
              <li>Marketing partners (with your consent)</li>
              <li>Legal authorities when required by law</li>
            </ul>

            <p className="mt-4 font-medium text-sweet-brown">
              We do not sell your personal information to third parties.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-sweet-orange/10 rounded-full flex items-center justify-center text-sweet-orange">
              <Shield size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl">Your Rights</h2>
          </div>

          <div className="pl-0 sm:pl-14">
            <p>
              Depending on your location, you may have certain rights regarding
              your personal information, including:
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside marker:text-sweet-orange">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of your information</li>
              <li>Objection to certain processing</li>
              <li>Data portability</li>
            </ul>

            <p className="mt-4">
              To exercise these rights, please contact us at{" "}
              <a href="mailto:sales@rajawadu.com" className="font-medium">
                sales@rajawadu.com
              </a>
              .
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-sweet-orange/10 rounded-full flex items-center justify-center text-sweet-orange">
              <Cookie size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl">Cookies</h2>
          </div>

          <div className="pl-0 sm:pl-14">
            <p>
              We use cookies and similar technologies to enhance your browsing
              experience, analyze website traffic, and personalize content. You
              can manage your cookie preferences through your browser settings.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-sweet-orange/10 rounded-full flex items-center justify-center text-sweet-orange">
              <Lock size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl">Security</h2>
          </div>

          <div className="pl-0 sm:pl-14">
            <p>
              We implement appropriate security measures to protect your
              personal information. However, no method of transmission over the
              Internet or electronic storage is 100% secure, so we cannot
              guarantee absolute security.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl">Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The updated
            version will be indicated by an updated &quot;Last Updated&quot;
            date at the top of this page. We encourage you to review this
            Privacy Policy periodically to stay informed about how we collect,
            use, and protect your information.
          </p>
        </section>

        <section className="space-y-4 mt-8">
          <h2 className="text-xl sm:text-2xl text-center border-b border-sweet-brown/10 pb-4 mb-4">
            Contact Us
          </h2>

          <div className="bg-sweet-orange/5 p-4 sm:p-6 rounded-xl">
            <p className="font-medium text-sweet-brown">
              If you have questions about this Privacy Policy, please contact
              us:
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
