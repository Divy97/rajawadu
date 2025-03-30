import PolicyLayout from "@/components/shared/PolicyLayout";
import {
  RotateCcw,
  Truck,
  CreditCard,
  ShoppingBag,
  Clock,
  AlertCircle,
  CheckSquare,
} from "lucide-react";

export const metadata = {
  title: "Refund Policy | Rajawadu",
  description:
    "Learn about our refund and return policies for Rajawadu products",
};

export default function RefundPolicyPage() {
  return (
    <PolicyLayout title="Refund Policy" lastUpdated="January 15, 2023">
      <div className="space-y-8">
        <section className="border-b border-sweet-brown/10 pb-6">
          <p className="text-base sm:text-lg font-medium text-sweet-brown">
            At Rajawadu, we take pride in the quality of our mukhwas products.
            We want you to be completely satisfied with your purchase. This
            Refund Policy outlines our guidelines for returns, exchanges, and
            refunds.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-sweet-orange/10 rounded-full flex items-center justify-center text-sweet-orange">
              <CheckSquare size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl">Return Eligibility</h2>
          </div>

          <div className="pl-0 sm:pl-14">
            <p>
              You may return or exchange products purchased from Rajawadu within
              7 days of delivery, provided that:
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside marker:text-sweet-orange">
              <li>
                The product is unused, unopened, and in its original packaging
              </li>
              <li>You have the original receipt or proof of purchase</li>
              <li>The product is not damaged due to misuse or negligence</li>
              <li>
                The product is not a seasonal, sale, or clearance item marked as
                final sale
              </li>
            </ul>

            <p className="mt-4">
              Please note that for food products, we have strict quality control
              measures in place. If you receive a product that appears damaged,
              has an issue with quality, or doesn&apos;t match the description,
              please contact us immediately with photos of the product.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-sweet-orange/10 rounded-full flex items-center justify-center text-sweet-orange">
              <RotateCcw size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl">Return Process</h2>
          </div>

          <div className="pl-0 sm:pl-14">
            <p>To initiate a return or exchange:</p>
            <ol className="mt-2 space-y-2 list-decimal list-inside marker:text-sweet-orange">
              <li className="pl-2 -indent-2">
                Contact our customer service team at{" "}
                <a
                  href="mailto:sales@rajawadu.com"
                  className="text-sweet-orange hover:underline"
                >
                  sales@rajawadu.com
                </a>{" "}
                or call{" "}
                <span className="whitespace-nowrap">+91 7600130164</span> within
                7 days of receiving your order
              </li>
              <li className="pl-2 -indent-2">
                Provide your order number, the items you wish to return, and the
                reason for the return
              </li>
              <li className="pl-2 -indent-2">
                Our customer service team will guide you through the return
                process and provide a return authorization if applicable
              </li>
              <li className="pl-2 -indent-2">
                Package the item securely in its original packaging if possible
              </li>
              <li className="pl-2 -indent-2">
                Ship the item to the address provided by our customer service
                team
              </li>
            </ol>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-sweet-orange/10 rounded-full flex items-center justify-center text-sweet-orange">
              <CreditCard size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl">Refund Processing</h2>
          </div>

          <div className="pl-0 sm:pl-14">
            <p>
              Once we receive and inspect your return, we will notify you about
              the status of your refund:
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside marker:text-sweet-orange">
              <li>
                If approved, your refund will be processed within 5-7 business
                days
              </li>
              <li>
                Refunds will be issued to the original payment method used for
                the purchase
              </li>
              <li>
                Depending on your payment provider, it may take additional time
                for the refund to appear in your account
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-sweet-orange/10 rounded-full flex items-center justify-center text-sweet-orange">
              <Truck size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl">Shipping Costs</h2>
          </div>

          <div className="pl-0 sm:pl-14">
            <p>
              Please note the following regarding shipping costs for returns:
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside marker:text-sweet-orange">
              <li>
                If you receive a damaged or defective product, we will cover the
                return shipping costs
              </li>
              <li>
                For change of mind returns, the customer is responsible for
                return shipping costs
              </li>
              <li>
                Original shipping charges are non-refundable unless the return
                is due to our error
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-sweet-orange/10 rounded-full flex items-center justify-center text-sweet-orange">
              <ShoppingBag size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl">Exchanges</h2>
          </div>

          <div className="pl-0 sm:pl-14">
            <p>
              If you wish to exchange a product for a different variety or size:
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside marker:text-sweet-orange">
              <li>Follow the same return process as outlined above</li>
              <li>Specify which product you would like as a replacement</li>
              <li>
                If there is a price difference, it will be charged or refunded
                accordingly
              </li>
              <li>Exchanges are subject to product availability</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-sweet-orange/10 rounded-full flex items-center justify-center text-sweet-orange">
              <Clock size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl">Non-Returnable Items</h2>
          </div>

          <div className="pl-0 sm:pl-14">
            <p>The following items cannot be returned or exchanged:</p>
            <ul className="mt-2 space-y-1 list-disc list-inside marker:text-sweet-orange">
              <li>Products that have been opened, used, or consumed</li>
              <li>
                Products specifically marked as non-returnable or final sale
              </li>
              <li>Gift cards</li>
              <li>Personalized or custom-made products</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-sweet-orange/10 rounded-full flex items-center justify-center text-sweet-orange">
              <AlertCircle size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl">
              Damaged or Defective Products
            </h2>
          </div>

          <div className="pl-0 sm:pl-14">
            <p>If you receive a damaged or defective product:</p>
            <ul className="mt-2 space-y-1 list-disc list-inside marker:text-sweet-orange">
              <li>Contact us within 48 hours of receipt</li>
              <li>Provide photos of the damaged product and packaging</li>
              <li>
                We will arrange for a replacement or refund at our discretion
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-4 mt-8">
          <h2 className="text-xl sm:text-2xl text-center border-b border-sweet-brown/10 pb-4 mb-4">
            Contact Us
          </h2>

          <div className="bg-sweet-orange/5 p-4 sm:p-6 rounded-xl">
            <p className="font-medium text-sweet-brown">
              If you have any questions about our Refund Policy, please contact
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
