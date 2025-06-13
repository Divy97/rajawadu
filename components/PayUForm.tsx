"use client";

import { useRef, useEffect } from 'react';
import { PayUPaymentRequest } from '@/types/payu';

interface PayUFormProps {
  paymentUrl: string;
  formData: PayUPaymentRequest;
  autoSubmit?: boolean;
  onSubmit?: () => void;
  className?: string;
}

export function PayUForm({ 
  paymentUrl, 
  formData, 
  autoSubmit = true, 
  onSubmit,
  className = "" 
}: PayUFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (autoSubmit && formRef.current) {
      // Small delay to ensure form is rendered
      const timer = setTimeout(() => {
        if (formRef.current) {
          onSubmit?.();
          formRef.current.submit();
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [autoSubmit, onSubmit]);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.();
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  return (
    <form
      ref={formRef}
      action={paymentUrl}
      method="POST"
      className={className}
      onSubmit={handleManualSubmit}
    >
      {/* Required PayU parameters */}
      <input type="hidden" name="key" value={formData.key} />
      <input type="hidden" name="txnid" value={formData.txnid} />
      <input type="hidden" name="amount" value={formData.amount} />
      <input type="hidden" name="productinfo" value={formData.productinfo} />
      <input type="hidden" name="firstname" value={formData.firstname} />
      <input type="hidden" name="email" value={formData.email} />
      <input type="hidden" name="phone" value={formData.phone} />
      <input type="hidden" name="surl" value={formData.surl} />
      <input type="hidden" name="furl" value={formData.furl} />
      <input type="hidden" name="hash" value={formData.hash} />

      {/* Optional parameters */}
      {formData.lastname && (
        <input type="hidden" name="lastname" value={formData.lastname} />
      )}
      {formData.address1 && (
        <input type="hidden" name="address1" value={formData.address1} />
      )}
      {formData.address2 && (
        <input type="hidden" name="address2" value={formData.address2} />
      )}
      {formData.city && (
        <input type="hidden" name="city" value={formData.city} />
      )}
      {formData.state && (
        <input type="hidden" name="state" value={formData.state} />
      )}
      {formData.country && (
        <input type="hidden" name="country" value={formData.country} />
      )}
      {formData.zipcode && (
        <input type="hidden" name="zipcode" value={formData.zipcode} />
      )}

      {/* User defined fields */}
      {formData.udf1 && (
        <input type="hidden" name="udf1" value={formData.udf1} />
      )}
      {formData.udf2 && (
        <input type="hidden" name="udf2" value={formData.udf2} />
      )}
      {formData.udf3 && (
        <input type="hidden" name="udf3" value={formData.udf3} />
      )}
      {formData.udf4 && (
        <input type="hidden" name="udf4" value={formData.udf4} />
      )}
      {formData.udf5 && (
        <input type="hidden" name="udf5" value={formData.udf5} />
      )}

      {/* Payment method specific fields */}
      {formData.pg && (
        <input type="hidden" name="pg" value={formData.pg} />
      )}
      {formData.bankcode && (
        <input type="hidden" name="bankcode" value={formData.bankcode} />
      )}

      {/* Manual submit button (hidden by default for auto-submit) */}
      {!autoSubmit && (
        <button 
          type="submit"
          className="w-full bg-sweet-brown hover:bg-sweet-orange text-white py-3 px-6 rounded-lg font-logo tracking-wide transition-all"
        >
          Proceed to Payment
        </button>
      )}
    </form>
  );
} 