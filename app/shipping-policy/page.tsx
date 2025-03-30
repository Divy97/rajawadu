import PolicyLayout from "@/components/shared/PolicyLayout";
import {
  Globe,
  Truck,
  DollarSign,
  Package,
  Map,
  Clock,
  AlertTriangle,
  MapPin,
  AlertOctagon,
} from "lucide-react";

export const metadata = {
  title: "Shipping Policy | Rajawadu",
  description:
    "Learn about shipping methods, delivery times, and costs for Rajawadu products",
};

export default function ShippingPolicyPage() {
  return (
    <PolicyLayout title="Shipping Policy" lastUpdated="January 15, 2023">
      <div className="space-y-8">
        <section className="border-b border-sweet-brown/10 pb-6">
          <p className="text-base sm:text-lg font-medium text-sweet-brown">
            At Rajawadu, we are committed to providing reliable and efficient
            shipping services for our customers. This Shipping Policy outlines
            our shipping methods, delivery times, costs, and other important
            information regarding the delivery of our products.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-sweet-orange/10 rounded-full flex items-center justify-center text-sweet-orange">
              <Globe size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl">Shipping Coverage</h2>
          </div>

          <div className="pl-0 sm:pl-14">
            <p>
              Currently, we ship our products within India. We plan to expand
              our shipping services to international locations in the future. If
              you are located outside India and wish to purchase our products,
              please contact our customer service team for assistance.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-sweet-orange/10 rounded-full flex items-center justify-center text-sweet-orange">
              <Truck size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl">
              Shipping Methods and Delivery Times
            </h2>
          </div>

          <div className="pl-0 sm:pl-14">
            <p>We offer the following shipping options:</p>
            <ul className="mt-2 space-y-2 list-disc list-inside marker:text-sweet-orange">
              <li className="pl-2 -indent-2">
                <span className="font-medium">Standard Shipping:</span> Delivery
                within 5-7 business days
              </li>
              {/* <li className="pl-2 -indent-2">
                <span className="font-medium">Express Shipping:</span> Delivery
                within 2-3 business days
              </li>
              <li className="pl-2 -indent-2">
                <span className="font-medium">Same-Day Delivery:</span>{" "}
                Available only in Ahmedabad for orders placed before 12 PM
              </li> */}
            </ul>

            <p className="mt-4">
              Please note that business days are Monday through Friday,
              excluding public holidays. Delivery times are estimates and may
              vary based on your location and other factors beyond our control.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-sweet-orange/10 rounded-full flex items-center justify-center text-sweet-orange">
              <DollarSign size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl">Shipping Costs</h2>
          </div>

          <div className="pl-0 sm:pl-14">
            <p>
              Shipping costs are calculated based on the shipping method
              selected, delivery location, and the weight and dimensions of the
              package. The exact shipping cost will be displayed at checkout
              before you complete your purchase.
            </p>

            <p className="mt-4">
              We offer free standard shipping on orders over ₹999 within India.
            </p>

            {/* <div className="mt-4 bg-sweet-orange/5 p-4 rounded-lg">
              <p className="font-medium">Shipping rates:</p>
              <ul className="mt-2 space-y-2 list-disc list-inside marker:text-sweet-orange">
                <li className="pl-2 -indent-2">
                  <span className="font-medium">Standard Shipping:</span> ₹60 -
                  ₹120 (depending on location)
                </li>
                <li className="pl-2 -indent-2">
                  <span className="font-medium">Express Shipping:</span> ₹120 -
                  ₹200 (depending on location)
                </li>
                <li className="pl-2 -indent-2">
                  <span className="font-medium">
                    Same-Day Delivery (Ahmedabad only):
                  </span>{" "}
                  ₹100
                </li>
              </ul>
            </div> */}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-sweet-orange/10 rounded-full flex items-center justify-center text-sweet-orange">
              <Clock size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl">Order Processing</h2>
          </div>

          <div className="pl-0 sm:pl-14">
            <p>
              We process all orders within 24-48 hours after payment
              confirmation, excluding weekends and holidays. During peak seasons
              (such as festivals), order processing may take longer due to high
              volume. We will notify you of any significant delays in processing
              your order.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-sweet-orange/10 rounded-full flex items-center justify-center text-sweet-orange">
              <Package size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl">Packaging</h2>
          </div>

          <div className="pl-0 sm:pl-14">
            <p>
              We take great care in packaging our products to ensure they arrive
              safely and in perfect condition. All mukhwas products are packed
              in food-grade, airtight packaging to maintain freshness and
              quality during transit.
            </p>

            <p className="mt-4">
              We use eco-friendly packaging materials whenever possible to
              reduce our environmental impact. If you have any specific
              packaging requirements, please include them in the order notes
              during checkout, and we will try to accommodate them.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-sweet-orange/10 rounded-full flex items-center justify-center text-sweet-orange">
              <Map size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl">Order Tracking</h2>
          </div>

          <div className="pl-0 sm:pl-14">
            <p>
              Once your order has been shipped, you will receive a confirmation
              email with a tracking number and link to track your package. You
              can also track your order by logging into your account on our
              website or by contacting our customer service team.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-sweet-orange/10 rounded-full flex items-center justify-center text-sweet-orange">
              <AlertTriangle size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl">Shipping Delays</h2>
          </div>

          <div className="pl-0 sm:pl-14">
            <p>
              While we strive to deliver your order within the estimated
              timeframe, please understand that delays may occur due to factors
              beyond our control, including but not limited to:
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside marker:text-sweet-orange">
              <li>High order volumes during peak seasons or festivals</li>
              <li>Adverse weather conditions</li>
              <li>Transportation issues</li>
              <li>Customs delays (for future international shipments)</li>
              <li>Incorrect or incomplete address information</li>
            </ul>

            <p className="mt-4">
              We will make every effort to notify you of any significant delays
              in the delivery of your order.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-sweet-orange/10 rounded-full flex items-center justify-center text-sweet-orange">
              <MapPin size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl">Address Accuracy</h2>
          </div>

          <div className="pl-0 sm:pl-14">
            <p>
              It is your responsibility to provide accurate and complete
              shipping information, including your name, shipping address, phone
              number, and email address. We are not responsible for delays or
              non-delivery due to incorrect address information.
            </p>

            <p className="mt-4">
              If you need to change your shipping address after placing an
              order, please contact our customer service team as soon as
              possible. We will try to accommodate your request if the order has
              not been shipped yet.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-sweet-orange/10 rounded-full flex items-center justify-center text-sweet-orange">
              <AlertOctagon size={20} />
            </div>
            <h2 className="text-xl sm:text-2xl">Lost or Damaged Packages</h2>
          </div>

          <div className="pl-0 sm:pl-14">
            <p>
              If your package is lost or damaged during transit, please contact
              our customer service team within 48 hours of the expected delivery
              date. We will work with the shipping carrier to locate your
              package or initiate a claim for a lost or damaged package.
            </p>

            <p className="mt-4">
              In the case of a lost or damaged package, we may:
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside marker:text-sweet-orange">
              <li>Ship a replacement order at no additional cost</li>
              <li>Provide a refund for the lost or damaged items</li>
              <li>
                Offer store credit equivalent to the value of the lost or
                damaged items
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
              If you have any questions about our Shipping Policy or need
              assistance with your order, please contact us:
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
