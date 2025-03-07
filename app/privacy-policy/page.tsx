import PolicyLayout from "@/components/shared/PolicyLayout";

export const metadata = {
  title: "Privacy Policy | Rajawadu",
  description:
    "Learn about how Rajawadu handles your personal information and data",
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout title="Privacy Policy" lastUpdated="March 10, 2023">
      <p className="text-lg">
        This Privacy Policy describes how Rajawadu (&quot;the Site&quot;,
        &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, and
        discloses your personal information when you visit, use our services, or
        make a purchase from Rajawadu.in (the &quot;Site&quot;) or otherwise
        communicate with us (collectively, the &quot;Services&quot;).
      </p>

      <p>
        For purposes of this Privacy Policy, &quot;you&quot; and
        &quot;your&quot; means you as the user of the Services, whether you are
        a customer, website visitor, or another individual whose information we
        have collected pursuant to this Privacy Policy.
      </p>

      <p>
        Please read this Privacy Policy carefully. By using and accessing any of
        the Services, you agree to the collection, use, and disclosure of your
        information as described in this Privacy Policy. If you do not agree to
        this Privacy Policy, please do not use or access any of the Services.
      </p>

      <h2>Information We Collect</h2>
      <p>
        We may collect personal information that you voluntarily provide to us
        when you:
      </p>
      <ul>
        <li>Create an account or place an order</li>
        <li>Sign up for our newsletter</li>
        <li>Contact our customer service</li>
        <li>Participate in promotions or surveys</li>
        <li>Leave reviews or comments</li>
      </ul>

      <p>The personal information we collect may include:</p>
      <ul>
        <li>Name, email address, phone number</li>
        <li>Billing and shipping address</li>
        <li>
          Payment details (processed securely through our payment processors)
        </li>
        <li>Purchase history</li>
        <li>Communication preferences</li>
      </ul>

      <p>
        We also automatically collect certain information when you visit our
        website, including:
      </p>
      <ul>
        <li>IP address and device information</li>
        <li>Browser type and settings</li>
        <li>Pages visited and interactions</li>
        <li>Referral source</li>
        <li>Cookies and similar technologies</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <p>We use your information for various purposes, including to:</p>
      <ul>
        <li>Process and fulfill your orders</li>
        <li>Communicate with you about your orders and account</li>
        <li>Send you marketing communications (if you&apos;ve opted in)</li>
        <li>Improve our website, products, and services</li>
        <li>Personalize your shopping experience</li>
        <li>Detect and prevent fraud</li>
        <li>Comply with legal obligations</li>
      </ul>

      <h2>Information Sharing</h2>
      <p>We may share your information with:</p>
      <ul>
        <li>
          Service providers who help us operate our business (payment
          processors, shipping companies, etc.)
        </li>
        <li>Marketing partners (with your consent)</li>
        <li>Legal authorities when required by law</li>
      </ul>

      <p>We do not sell your personal information to third parties.</p>

      <h2>Your Rights</h2>
      <p>
        Depending on your location, you may have certain rights regarding your
        personal information, including:
      </p>
      <ul>
        <li>Access to your personal information</li>
        <li>Correction of inaccurate information</li>
        <li>Deletion of your information</li>
        <li>Objection to certain processing</li>
        <li>Data portability</li>
      </ul>

      <p>
        To exercise these rights, please contact us at{" "}
        <strong>cc@rajawadu.in</strong>.
      </p>

      <h2>Cookies</h2>
      <p>
        We use cookies and similar technologies to enhance your browsing
        experience, analyze website traffic, and personalize content. You can
        manage your cookie preferences through your browser settings.
      </p>

      <h2>Security</h2>
      <p>
        We implement appropriate security measures to protect your personal
        information. However, no method of transmission over the Internet or
        electronic storage is 100% secure, so we cannot guarantee absolute
        security.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. The updated version
        will be indicated by an updated &quot;Last Updated&quot; date at the top
        of this page. We encourage you to review this Privacy Policy
        periodically to stay informed about how we collect, use, and protect
        your information.
      </p>

      <h2>Contact Us</h2>
      <p>If you have questions about this Privacy Policy, please contact us:</p>
      <p>
        Email: <a href="mailto:cc@rajawadu.in">cc@rajawadu.in</a>
        <br />
        Phone: +91 9772272659
        <br />
        Address: Ground floor, 001, Rajawadu, Sears Towers, Near, Panchvati Cir,
        Ahmedabad, Gujarat 380006
      </p>
    </PolicyLayout>
  );
}
