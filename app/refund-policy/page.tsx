import PolicyLayout from "@/components/shared/PolicyLayout";

export const metadata = {
  title: "Refund Policy | Rajawadu",
  description:
    "Learn about our refund and return policies for Rajawadu products",
};

export default function RefundPolicyPage() {
  return (
    <PolicyLayout title="Refund Policy" lastUpdated="January 15, 2023">
      <p className="text-lg">
        At Rajawadu, we take pride in the quality of our mukhwas products. We
        want you to be completely satisfied with your purchase. This Refund
        Policy outlines our guidelines for returns, exchanges, and refunds.
      </p>

      <h2>Return Eligibility</h2>
      <p>
        You may return or exchange products purchased from Rajawadu within 7
        days of delivery, provided that:
      </p>
      <ul>
        <li>The product is unused, unopened, and in its original packaging</li>
        <li>You have the original receipt or proof of purchase</li>
        <li>The product is not damaged due to misuse or negligence</li>
        <li>
          The product is not a seasonal, sale, or clearance item marked as final
          sale
        </li>
      </ul>

      <p>
        Please note that for food products, we have strict quality control
        measures in place. If you receive a product that appears damaged, has an
        issue with quality, or doesn&apos;t match the description, please
        contact us immediately with photos of the product.
      </p>

      <h2>Return Process</h2>
      <p>To initiate a return or exchange:</p>
      <ol>
        <li>
          Contact our customer service team at{" "}
          <a href="mailto:cc@rajawadu.in">cc@rajawadu.in</a> or call +91
          9772272659 within 7 days of receiving your order
        </li>
        <li>
          Provide your order number, the items you wish to return, and the
          reason for the return
        </li>
        <li>
          Our customer service team will guide you through the return process
          and provide a return authorization if applicable
        </li>
        <li>Package the item securely in its original packaging if possible</li>
        <li>
          Ship the item to the address provided by our customer service team
        </li>
      </ol>

      <h2>Refund Processing</h2>
      <p>
        Once we receive and inspect your return, we will notify you about the
        status of your refund:
      </p>
      <ul>
        <li>
          If approved, your refund will be processed within 5-7 business days
        </li>
        <li>
          Refunds will be issued to the original payment method used for the
          purchase
        </li>
        <li>
          Depending on your payment provider, it may take additional time for
          the refund to appear in your account
        </li>
      </ul>

      <h2>Shipping Costs</h2>
      <p>Please note the following regarding shipping costs for returns:</p>
      <ul>
        <li>
          If you receive a damaged or defective product, we will cover the
          return shipping costs
        </li>
        <li>
          For change of mind returns, the customer is responsible for return
          shipping costs
        </li>
        <li>
          Original shipping charges are non-refundable unless the return is due
          to our error
        </li>
      </ul>

      <h2>Exchanges</h2>
      <p>If you wish to exchange a product for a different variety or size:</p>
      <ul>
        <li>Follow the same return process as outlined above</li>
        <li>Specify which product you would like as a replacement</li>
        <li>
          If there is a price difference, it will be charged or refunded
          accordingly
        </li>
        <li>Exchanges are subject to product availability</li>
      </ul>

      <h2>Non-Returnable Items</h2>
      <p>The following items cannot be returned or exchanged:</p>
      <ul>
        <li>Products that have been opened, used, or consumed</li>
        <li>Products specifically marked as non-returnable or final sale</li>
        <li>Gift cards</li>
        <li>Personalized or custom-made products</li>
      </ul>

      <h2>Damaged or Defective Products</h2>
      <p>If you receive a damaged or defective product:</p>
      <ul>
        <li>Contact us within 48 hours of receipt</li>
        <li>Provide photos of the damaged product and packaging</li>
        <li>We will arrange for a replacement or refund at our discretion</li>
      </ul>

      <h2>Contact Us</h2>
      <p>
        If you have any questions about our Refund Policy, please contact us:
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
