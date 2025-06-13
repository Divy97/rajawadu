import crypto from 'crypto';
import { PayUHashParams, PayUPaymentResponse } from '@/types/payu';

/**
 * Generate SHA-512 hash for PayU payment request
 * Format: key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||salt
 */
export function generatePaymentHash(params: PayUHashParams, salt: string): string {
  if (!salt) {
    throw new Error('PayU salt is required for hash generation');
  }

  // Validate required parameters
  const requiredFields = ['key', 'txnid', 'amount', 'productinfo', 'firstname', 'email'];
  for (const field of requiredFields) {
    if (!params[field as keyof PayUHashParams]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  // Build hash string according to PayU specification
  const hashString = [
    params.key,
    params.txnid,
    params.amount,
    params.productinfo,
    params.firstname,
    params.email,
    params.udf1 || '',
    params.udf2 || '',
    params.udf3 || '',
    params.udf4 || '',
    params.udf5 || '',
    '', '', '', '', '', // Additional empty fields as per PayU spec
    salt
  ].join('|');

  // Generate SHA-512 hash
  const hash = crypto
    .createHash('sha512')
    .update(hashString)
    .digest('hex')
    .toLowerCase();

  return hash;
}

/**
 * Generate hash for verifying PayU response (reverse hash)
 * Format: salt|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key
 */
export function generateResponseHash(response: PayUPaymentResponse, salt: string): string {
  if (!salt) {
    throw new Error('PayU salt is required for response hash verification');
  }

  // Build reverse hash string according to PayU specification
  const hashString = [
    salt,
    response.status,
    '', '', '', '', '', // Additional empty fields
    response.udf5 || '',
    response.udf4 || '',
    response.udf3 || '',
    response.udf2 || '',
    response.udf1 || '',
    response.email,
    response.firstname,
    response.productinfo,
    response.amount,
    response.txnid,
    response.key
  ].join('|');

  // Generate SHA-512 hash
  const hash = crypto
    .createHash('sha512')
    .update(hashString)
    .digest('hex')
    .toLowerCase();

  return hash;
}

/**
 * Verify PayU response hash to ensure data integrity
 */
export function verifyResponseHash(response: PayUPaymentResponse, salt: string): boolean {
  try {
    const calculatedHash = generateResponseHash(response, salt);
    const receivedHash = response.hash?.toLowerCase();
    
    if (!receivedHash) {
      console.error('No hash found in PayU response');
      return false;
    }

    const isValid = calculatedHash === receivedHash;
    
    if (!isValid) {
      console.error('PayU response hash verification failed', {
        calculated: calculatedHash,
        received: receivedHash,
        txnid: response.txnid
      });
    }

    return isValid;
  } catch (error) {
    console.error('Error verifying PayU response hash:', error);
    return false;
  }
}

/**
 * Generate unique transaction ID
 */
export function generateTransactionId(prefix = 'RAJA'): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}_${timestamp}_${random}`;
}

/**
 * Sanitize and validate amount for PayU
 */
export function formatAmount(amount: number): string {
  if (typeof amount !== 'number' || amount <= 0) {
    throw new Error('Amount must be a positive number');
  }

  // PayU expects amount with 2 decimal places
  return amount.toFixed(2);
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (Indian format)
 */
export function validatePhone(phone: string): boolean {
  // Remove any non-digit characters
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Check for Indian mobile number format (10 digits starting with 6-9)
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(cleanPhone);
}

/**
 * Sanitize string input to prevent injection attacks
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }
  
  // Remove any potentially harmful characters
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/[|]/g, '') // Remove pipe characters (important for hash)
    .substring(0, 255); // Limit length
}

/**
 * Get PayU configuration from environment variables
 */
export function getPayUConfig() {
  const config = {
    merchantKey: process.env.PAYU_MERCHANT_KEY,
    salt: process.env.PAYU_SALT,
    isTestMode: process.env.PAYU_TEST_MODE === 'true',
    testUrl: process.env.PAYU_TEST_URL || 'https://test.payu.in/_payment',
    prodUrl: process.env.PAYU_PROD_URL || 'https://secure.payu.in/_payment',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  };

  // Validate required configuration
  if (!config.merchantKey) {
    throw new Error('PAYU_MERCHANT_KEY is not configured');
  }

  if (!config.salt) {
    throw new Error('PAYU_SALT is not configured');
  }

  return config;
}

/**
 * Get PayU payment URL based on environment
 */
export function getPayUUrl(): string {
  const config = getPayUConfig();
  return config.isTestMode ? config.testUrl : config.prodUrl;
} 