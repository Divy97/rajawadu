// PayU Payment Request Parameters
export interface PayUPaymentRequest {
  key: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  phone: string;
  surl: string;
  furl: string;
  hash: string;
  
  // Optional parameters
  lastname?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  country?: string;
  zipcode?: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
  pg?: string;
  bankcode?: string;
  ccnum?: string;
  ccname?: string;
  ccvv?: string;
  ccexpmon?: string;
  ccexpyr?: string;
  card_token?: string;
}

// PayU Payment Response (Success/Failure callback)
export interface PayUPaymentResponse {
  mihpayid: string;
  mode: string;
  status: 'success' | 'failure' | 'pending';
  key: string;
  txnid: string;
  amount: string;
  addedon: string;
  productinfo: string;
  firstname: string;
  lastname: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  email: string;
  phone: string;
  udf1: string;
  udf2: string;
  udf3: string;
  udf4: string;
  udf5: string;
  udf6: string;
  udf7: string;
  udf8: string;
  udf9: string;
  udf10: string;
  hash: string;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
  field6: string;
  field7: string;
  field8: string;
  field9: string;
  payment_source: string;
  PG_TYPE: string;
  bank_ref_no: string;
  bank_ref_num: string;
  bankcode: string;
  error: string;
  error_Message: string;
  name_on_card?: string;
  cardnum?: string;
  cardhash?: string;
  net_amount_debit: string;
  unmappedstatus: string;
  cardToken?: string;
  easypayid?: string;
  surl: string;
  furl: string;
}

// PayU Webhook Payload
export interface PayUWebhookPayload {
  merchantTransactionId: string;
  payuTransactionId: string;
  amount: string;
  status: 'success' | 'failure' | 'pending';
  paymentMode: string;
  txnDate: string;
  hash: string;
  additionalCharges?: string;
  settlementId?: string;
  error?: string;
  errorMessage?: string;
}

// Hash Generation Parameters
export interface PayUHashParams {
  key: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
}

// PayU Environment Configuration
export interface PayUConfig {
  merchantKey: string;
  salt: string;
  isTestMode: boolean;
  testUrl: string;
  prodUrl: string;
}

// Payment Method Types
export type PaymentMethod = 
  | 'CC' // Credit Card
  | 'DC' // Debit Card
  | 'NB' // Net Banking
  | 'UPI' // UPI
  | 'WALLET' // Wallet
  | 'EMI'; // EMI

// Transaction Status
export type TransactionStatus = 
  | 'success'
  | 'failure' 
  | 'pending'
  | 'cancelled'
  | 'expired';

// Order Data for Payment Initiation
export interface OrderData {
  orderId: string;
  amount: number;
  productInfo: string;
  customerDetails: {
    firstName: string;
    lastName?: string;
    email: string;
    phone: string;
    address?: {
      street: string;
      city: string;
      state: string;
      zipcode: string;
      country: string;
    };
  };
  orderItems: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }>;
}

// PayU API Response Wrapper
export interface PayUAPIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

// Payment Verification Response
export interface PaymentVerificationResponse {
  isValid: boolean;
  transactionStatus: TransactionStatus;
  paymentDetails?: PayUPaymentResponse;
  error?: string;
}

// Database Payment Transaction Record
export interface PaymentTransaction {
  id: string;
  orderId: string;
  payuTxnid: string;
  payuMihpayid?: string;
  amount: number;
  status: TransactionStatus;
  paymentMethod?: PaymentMethod;
  rawResponse: PayUPaymentResponse | PayUWebhookPayload;
  createdAt: string;
  updatedAt: string;
} 