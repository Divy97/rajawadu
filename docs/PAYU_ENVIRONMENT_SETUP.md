# PayU Environment Setup Guide

## Required Environment Variables

Add these variables to your `.env.local` file:

```bash
# Supabase Configuration (already configured)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# App Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
APP_SECRET=your_app_secret_key_for_additional_security

# PayU Configuration
PAYU_MERCHANT_KEY=your_payu_merchant_key
PAYU_SALT=your_payu_salt_key
PAYU_TEST_MODE=true
PAYU_TEST_URL=https://test.payu.in/_payment
PAYU_PROD_URL=https://secure.payu.in/_payment

# Email Configuration (Optional)
EMAIL_FROM=noreply@rajawadu.com
```

## PayU Credentials Setup

### For Testing:
1. Register at PayU India: https://onboarding.payu.in/app/account
2. Complete KYC and get approval
3. Access PayU Dashboard in Test Mode
4. Navigate to **Developers** → **API Keys**
5. Copy your Test Merchant Key and Salt

### For Production:
1. Switch to **Live Mode** in PayU Dashboard
2. Navigate to **Developers** → **API Keys**
3. Copy your Production Merchant Key and Salt
4. Update environment variables
5. Set `PAYU_TEST_MODE=false`

## Security Notes

- ⚠️ **Never commit `.env.local` to git**
- ⚠️ **Keep Salt secret - never expose to client-side**
- ⚠️ **Use different credentials for test/production**
- ⚠️ **Enable HTTPS for all payment URLs**

## Test Credentials

PayU provides test cards and UPI IDs for testing:

### Test Cards:
- **Success Card**: 5123456789012346
- **Failure Card**: 4111111111111111
- **CVV**: 123
- **Expiry**: Any future date

### Test UPI:
- **Success UPI**: success@payu
- **Failure UPI**: failure@payu

### Test Net Banking:
- **Username**: payu
- **Password**: payu
- **OTP**: 123456 