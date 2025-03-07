import PolicyLayout from "@/components/shared/PolicyLayout";

export const metadata = {
  title: "Terms of Service | Rajawadu",
  description:
    "Terms and conditions for using Rajawadu's website and purchasing our products",
};

export default function TermsOfServicePage() {
  return (
    <PolicyLayout title="Terms of Service" lastUpdated="February 20, 2023">
      <p className="text-lg">
        Welcome to Rajawadu. These Terms of Service (&quot;Terms&quot;) govern
        your use of our website, services, and products. By accessing our
        website or making a purchase, you agree to these Terms and our Privacy
        Policy.
      </p>

      <h2>Acceptance of Terms</h2>
      <p>
        By accessing or using our website, you acknowledge that you have read,
        understood, and agree to be bound by these Terms. If you do not agree to
        these Terms, please do not use our website or services.
      </p>

      <h2>Changes to Terms</h2>
      <p>
        We reserve the right to modify these Terms at any time. Changes will be
        effective immediately upon posting on our website. Your continued use of
        our website after changes are posted constitutes your acceptance of the
        modified Terms.
      </p>

      <h2>Account Registration</h2>
      <p>
        To place orders or access certain features, you may need to create an
        account. You are responsible for:
      </p>
      <ul>
        <li>Providing accurate account information</li>
        <li>Maintaining the confidentiality of your account credentials</li>
        <li>All activities that occur under your account</li>
      </ul>

      <h2>Products and Ordering</h2>
      <p>
        Product information, including descriptions, images, and prices, is
        subject to change without notice. We reserve the right to:
      </p>
      <ul>
        <li>Limit quantities of products ordered</li>
        <li>Refuse or cancel orders at our discretion</li>
        <li>Discontinue products or modify their specifications</li>
      </ul>

      <p>
        When you place an order, you are making an offer to purchase the
        products. We may accept or decline your order at our discretion. An
        order is considered accepted only when we confirm it and process
        payment.
      </p>

      <h2>Pricing and Payment</h2>
      <p>
        All prices are in Indian Rupees (INR) and include applicable taxes.
        Shipping costs are additional and will be displayed during checkout. We
        accept various payment methods as indicated on our website.
      </p>

      <p>
        We strive to ensure all pricing is accurate, but errors may occur. If we
        discover a pricing error, we reserve the right to:
      </p>
      <ul>
        <li>Cancel your order before shipping</li>
        <li>Contact you to request confirmation at the correct price</li>
      </ul>

      <h2>Shipping and Delivery</h2>
      <p>
        We ship to addresses within India. Delivery times are estimates and not
        guaranteed. We are not responsible for delays caused by:
      </p>
      <ul>
        <li>Shipping carrier delays</li>
        <li>Weather conditions or natural disasters</li>
        <li>Incorrect or incomplete shipping information</li>
        <li>Other circumstances beyond our control</li>
      </ul>

      <p>
        Risk of loss and title for items purchased pass to you upon delivery of
        the items to the shipping carrier.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        All content on our website, including text, graphics, logos, images, and
        software, is our property or the property of our licensors and is
        protected by Indian and international copyright, trademark, and other
        intellectual property laws.
      </p>

      <p>
        You may not reproduce, distribute, modify, display, or use our content
        without our prior written permission.
      </p>

      <h2>User Content</h2>
      <p>
        By submitting reviews, comments, or other content to our website, you
        grant us a non-exclusive, royalty-free, perpetual, irrevocable right to
        use, reproduce, modify, and display such content in connection with our
        business.
      </p>

      <p>
        You are solely responsible for any content you submit. Content must not
        be:
      </p>
      <ul>
        <li>Unlawful, harmful, threatening, or defamatory</li>
        <li>Infringing on intellectual property rights</li>
        <li>Containing viruses or malicious code</li>
        <li>Violating any person&apos;s privacy</li>
      </ul>

      <h2>Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, we shall not be liable for any
        indirect, incidental, special, consequential, or punitive damages
        arising from your use of our website or products.
      </p>

      <p>
        Our total liability to you for any claim arising from these Terms shall
        not exceed the amount you paid for your last purchase from us.
      </p>

      <h2>Indemnification</h2>
      <p>
        You agree to indemnify and hold us harmless from any claims, damages,
        liabilities, costs, or expenses arising from your violation of these
        Terms or your use of our website or products.
      </p>

      <h2>Governing Law</h2>
      <p>
        These Terms shall be governed by and construed in accordance with the
        laws of India, without regard to its conflict of law provisions. Any
        disputes arising under these Terms shall be subject to the exclusive
        jurisdiction of the courts in Ahmedabad, Gujarat, India.
      </p>

      <h2>Severability</h2>
      <p>
        If any provision of these Terms is found to be invalid or unenforceable,
        the remaining provisions will remain in full force and effect.
      </p>

      <h2>Contact Us</h2>
      <p>If you have any questions about these Terms, please contact us:</p>
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
