import { 
  PayUPaymentRequest, 
  PayUPaymentResponse,
  PayUAPIResponse,
  OrderData,
  PaymentVerificationResponse 
} from '@/types/payu';
import { 
  generatePaymentHash, 
  generateTransactionId, 
  formatAmount,
  validateEmail,
  validatePhone,
  sanitizeInput,
  getPayUConfig,
  getPayUUrl,
  verifyResponseHash
} from './hash';

/**
 * PayU Client for handling payment operations
 */
export class PayUClient {
  private config: ReturnType<typeof getPayUConfig>;

  constructor() {
    this.config = getPayUConfig();
  }

  /**
   * Prepare payment request data for PayU
   */
  async preparePaymentRequest(orderData: OrderData): Promise<PayUAPIResponse<{
    paymentUrl: string;
    formData: PayUPaymentRequest;
  }>> {
    try {
      // Validate input data
      const validationResult = this.validateOrderData(orderData);
      if (!validationResult.isValid) {
        return {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: validationResult.error || 'Invalid order data',
          }
        };
      }

      // Generate unique transaction ID
      const txnid = generateTransactionId();
      
      // Format amount
      const amount = formatAmount(orderData.amount);

      // Sanitize inputs
      const sanitizedData = this.sanitizeOrderData(orderData);

      // Prepare payment parameters
      const paymentParams = {
        key: this.config.merchantKey as string,
        txnid,
        amount,
        productinfo: sanitizedData.productInfo,
        firstname: sanitizedData.customerDetails.firstName,
        lastname: sanitizedData.customerDetails.lastName || '',
        email: sanitizedData.customerDetails.email,
        phone: sanitizedData.customerDetails.phone,
        surl: `${this.config.siteUrl}/api/payment/success`,
        furl: `${this.config.siteUrl}/api/payment/failure`,
        udf1: orderData.orderId, // Store order ID for reference
        udf2: JSON.stringify(orderData.orderItems), // Store order items (if within limits)
        udf3: '', // Reserved for future use
        udf4: '', // Reserved for future use
        udf5: '', // Reserved for future use
      };

      // Add address information if available
      if (sanitizedData.customerDetails.address) {
        Object.assign(paymentParams, {
          address1: sanitizedData.customerDetails.address.street,
          city: sanitizedData.customerDetails.address.city,
          state: sanitizedData.customerDetails.address.state,
          zipcode: sanitizedData.customerDetails.address.zipcode,
          country: sanitizedData.customerDetails.address.country,
        });
      }

      // Generate hash
      const hash = generatePaymentHash(paymentParams, this.config.salt as string);

      // Create final payment request
      const paymentRequest: PayUPaymentRequest = {
        ...paymentParams,
        hash,
      };

      return {
        success: true,
        data: {
          paymentUrl: getPayUUrl(),
          formData: paymentRequest,
        }
      };

    } catch (error) {
      console.error('Error preparing PayU payment request:', error);
      return {
        success: false,
        error: {
          code: 'PREPARATION_ERROR',
          message: error instanceof Error ? error.message : 'Failed to prepare payment request',
        }
      };
    }
  }

  /**
   * Verify payment response from PayU
   */
  async verifyPayment(response: PayUPaymentResponse): Promise<PaymentVerificationResponse> {
    try {
      // Verify hash integrity
      const isHashValid = verifyResponseHash(response, this.config.salt as string);
      
      if (!isHashValid) {
        return {
          isValid: false,
          transactionStatus: 'failure',
          error: 'Hash verification failed - possible data tampering'
        };
      }

      // Determine transaction status
      const transactionStatus = response.status === 'success' ? 'success' : 
                                response.status === 'failure' ? 'failure' : 'pending';

      return {
        isValid: true,
        transactionStatus,
        paymentDetails: response
      };

    } catch (error) {
      console.error('Error verifying PayU payment:', error);
      return {
        isValid: false,
        transactionStatus: 'failure',
        error: error instanceof Error ? error.message : 'Payment verification failed'
      };
    }
  }

  /**
   * Validate order data before processing
   */
  private validateOrderData(orderData: OrderData): { isValid: boolean; error?: string } {
    // Check required fields
    if (!orderData.orderId) {
      return { isValid: false, error: 'Order ID is required' };
    }

    if (!orderData.amount || orderData.amount <= 0) {
      return { isValid: false, error: 'Valid amount is required' };
    }

    if (!orderData.productInfo) {
      return { isValid: false, error: 'Product information is required' };
    }

    // Validate customer details
    const customer = orderData.customerDetails;
    if (!customer.firstName) {
      return { isValid: false, error: 'Customer first name is required' };
    }

    if (!validateEmail(customer.email)) {
      return { isValid: false, error: 'Valid email address is required' };
    }

    if (!validatePhone(customer.phone)) {
      return { isValid: false, error: 'Valid phone number is required' };
    }

    // Check order items
    if (!orderData.orderItems || orderData.orderItems.length === 0) {
      return { isValid: false, error: 'Order items are required' };
    }

    // Validate amount matches order total
    const calculatedTotal = orderData.orderItems.reduce(
      (total, item) => total + (item.price * item.quantity), 
      0
    );

    // Allow for small floating point differences and shipping costs
    const tolerance = 100; // ₹100 tolerance for shipping, taxes, etc.
    if (Math.abs(orderData.amount - calculatedTotal) > tolerance) {
      return { 
        isValid: false, 
        error: `Amount mismatch: expected ${calculatedTotal}, got ${orderData.amount}` 
      };
    }

    return { isValid: true };
  }

  /**
   * Sanitize order data to prevent injection attacks
   */
  private sanitizeOrderData(orderData: OrderData): OrderData {
    return {
      orderId: sanitizeInput(orderData.orderId),
      amount: orderData.amount,
      productInfo: sanitizeInput(orderData.productInfo),
      customerDetails: {
        firstName: sanitizeInput(orderData.customerDetails.firstName),
        lastName: orderData.customerDetails.lastName ? 
          sanitizeInput(orderData.customerDetails.lastName) : undefined,
        email: sanitizeInput(orderData.customerDetails.email),
        phone: orderData.customerDetails.phone.replace(/\D/g, ''), // Keep only digits
        address: orderData.customerDetails.address ? {
          street: sanitizeInput(orderData.customerDetails.address.street),
          city: sanitizeInput(orderData.customerDetails.address.city),
          state: sanitizeInput(orderData.customerDetails.address.state),
          zipcode: sanitizeInput(orderData.customerDetails.address.zipcode),
          country: sanitizeInput(orderData.customerDetails.address.country),
        } : undefined,
      },
      orderItems: orderData.orderItems.map(item => ({
        productId: sanitizeInput(item.productId),
        name: sanitizeInput(item.name),
        quantity: Math.max(1, Math.floor(item.quantity)),
        price: Math.max(0, item.price),
      })),
    };
  }

  /**
   * Get PayU test credentials information
   */
  getTestInfo() {
    return {
      isTestMode: this.config.isTestMode,
      testCards: {
        success: '5123456789012346',
        failure: '4111111111111111',
      },
      testUPI: {
        success: 'success@payu',
        failure: 'failure@payu',
      },
      testNetBanking: {
        username: 'payu',
        password: 'payu',
        otp: '123456',
      }
    };
  }
}

// Export singleton instance
export const payuClient = new PayUClient(); 