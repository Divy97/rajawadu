import PolicyLayout from "@/components/shared/PolicyLayout";

export const metadata = {
  title: "Shipping Policy | Rajawadu",
  description:
    "Information about shipping methods, delivery times, and costs for Rajawadu products",
};

export default function ShippingPolicyPage() {
  return (
    <PolicyLayout title="Shipping Policy" lastUpdated="March 5, 2023">
      <p className="text-lg">
        At Rajawadu, we aim to deliver your mukhwas products promptly and in
        perfect condition. This Shipping Policy provides information about our
        shipping methods, delivery times, and costs.
      </p>

      <h2>Shipping Coverage</h2>
      <p>
        We currently ship to all locations within India. International shipping
        is not available at this time, but we plan to expand our shipping
        services in the future.
      </p>

      <h2>Shipping Methods and Delivery Times</h2>
      <p>We offer the following shipping options:</p>
      <ul>
        <li>
          <strong>Standard Shipping:</strong> 5-7 business days
        </li>
        <li>
          <strong>Express Shipping:</strong> 2-3 business days
        </li>
        <li>
          <strong>Same-Day Delivery:</strong> Available only in Ahmedabad
          (orders placed before 12 PM)
        </li>
      </ul>

      <p>
        Please note that these delivery times are estimates and not guarantees.
        Actual delivery times may vary based on:
      </p>
      <ul>
        <li>Your location</li>
        <li>Order processing time</li>
        <li>Shipping carrier workload</li>
        <li>Weather conditions or other unforeseen circumstances</li>
      </ul>

      <h2>Shipping Costs</h2>
      <p>Shipping costs are calculated based on:</p>
      <ul>
        <li>The shipping method selected</li>
        <li>The delivery location</li>
        <li>The weight and dimensions of the package</li>
      </ul>

      <p>
        Exact shipping costs will be displayed during checkout before you
        complete your order. We offer free standard shipping on orders over
        ₹999.
      </p>

      <h2>Order Processing</h2>
      <p>
        Orders are typically processed within 24-48 hours after payment
        confirmation. During peak seasons or promotional periods, processing
        times may be slightly longer.
      </p>

      <p>
        Once your order is processed and shipped, you will receive a
        confirmation email with tracking information, allowing you to monitor
        your package&apos;s journey.
      </p>

      <h2>Packaging</h2>
      <p>
        We take great care in packaging our products to ensure they arrive in
        perfect condition:
      </p>
      <ul>
        <li>
          All mukhwas products are sealed in airtight packaging to maintain
          freshness
        </li>
        <li>
          Products are placed in protective boxes or bubble wrap to prevent
          damage
        </li>
        <li>Shipping boxes are securely sealed and labeled</li>
      </ul>

      <h2>Order Tracking</h2>
      <p>
        Once your order ships, you will receive a tracking number via email. You
        can also view your order status and tracking information by logging into
        your account on our website.
      </p>

      <h2>Shipping Delays</h2>
      <p>
        While we strive to deliver your orders on time, occasionally delays may
        occur due to:
      </p>
      <ul>
        <li>High order volumes during peak seasons</li>
        <li>Shipping carrier delays</li>
        <li>Weather conditions or natural disasters</li>
        <li>Public holidays</li>
        <li>Incorrect or incomplete shipping information provided</li>
      </ul>

      <p>
        If your order is significantly delayed, please contact our customer
        service team for assistance.
      </p>

      <h2>Address Accuracy</h2>
      <p>
        Please ensure that the shipping address you provide is accurate and
        complete. We are not responsible for delays or non-delivery due to
        incorrect address information. Additional shipping charges may apply if
        a package is returned to us due to an incorrect address.
      </p>

      <h2>Lost or Damaged Packages</h2>
      <p>If your package appears to be lost or arrives damaged:</p>
      <ol>
        <li>
          Contact our customer service team within 48 hours of the scheduled
          delivery date
        </li>
        <li>
          For damaged packages, please take photos of the damaged packaging and
          products
        </li>
        <li>
          We will work with the shipping carrier to locate lost packages or
          process a claim for damaged items
        </li>
        <li>
          Depending on the situation, we will arrange for a replacement or
          refund
        </li>
      </ol>

      <h2>Contact Us</h2>
      <p>
        If you have any questions about our Shipping Policy or need assistance
        with your order, please contact us:
      </p>
      <p>
        Email: <a href="mailto:cc@rajawadu.in">cc@rajawadu.in</a>
        <br />
        Phone: +91 9772272659
        <br />
        WhatsApp: +91 9420244111
      </p>
    </PolicyLayout>
  );
}
