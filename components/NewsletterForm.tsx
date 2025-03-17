"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Success case
      addToast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
        type: "success",
      });

      // Reset form
      setEmail("");
    } catch (error) {
      // Error case
      console.error("Newsletter subscription error:", error);

      addToast({
        title: "Subscription failed",
        description:
          "There was an error subscribing to the newsletter. Please try again.",
        type: "error",
        action: {
          label: "Try Again",
          onClick: () => handleSubmit(e),
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="max-w-md mx-auto"
      onSubmit={handleSubmit}
      aria-labelledby="newsletter-heading"
    >
      <div className="sr-only" id="newsletter-heading">
        Newsletter Signup
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <label htmlFor="email-input" className="sr-only">
            Email address
          </label>
          <input
            id="email-input"
            type="email"
            placeholder="Enter your email"
            className="w-full px-6 py-4 rounded-lg border-2 border-sweet-orange/20 focus:border-sweet-orange focus:outline-none font-serif"
            aria-required="true"
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            title="Please enter a valid email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
        <Button
          type="submit"
          className="bg-sweet-orange hover:bg-sweet-orange/90 text-white rounded-lg px-8 py-7"
          aria-label="Subscribe to newsletter"
          disabled={isSubmitting}
        >
          <span className="font-logo tracking-wide">
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </span>
        </Button>
      </div>
    </form>
  );
}
