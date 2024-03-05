import * as paymentProvider from 'interfaces-psp-v1-payment-service-provider';
import { makePayment } from 'backend/flutterwave-commerce.web';

/**
 * This payment plugin endpoint is triggered when a merchant provides required data to connect their PSP account to a Wix site.
 * The plugin has to verify merchant's credentials, and ensure the merchant has an operational PSP account.
 * @param {import('interfaces-psp-v1-payment-service-provider').ConnectAccountOptions} options
 * @param {import('interfaces-psp-v1-payment-service-provider').Context} context
 * @returns {Promise<import('interfaces-psp-v1-payment-service-provider').ConnectAccountResponse | import('interfaces-psp-v1-payment-service-provider').BusinessError>}
 */
export const connectAccount = async (options, context) => {
    const public_key = options.credentials.publicKey;
    const secret_key = options.credentials.secretKey;
    const currency = options.credentials.currency;
    const country = options.credentials.country;

    const allowed_countries = [ "US", "KE", "UG", "TZ", "NG", "EU", "EG", "MK", "RW", "SL", "ZA" ];
    const allowed_currency= ["USD", "KES", "UGX", "TZS", "NGN", "EUR", "EGP", "ZAR", "RWF"];

    if( !allowed_countries.find(currency) ) {
        return {
            'reasonCode': 2009,
            'errorCode': 'CURRENCY_IS_NOT_SUPPORTED',
            'errorMessage': `Currency ${ currency } is not supported`
        }
    }

    if( !public_key || !secret_key ) {
        return {
            'reasonCode': 2004,
            'errorCode': 'MERCHANT_AUTH_FAILED',
            'errorMessage': `Invalid Authorization Keys Passed`
        }
    } 

    return {
        "credentials" : {
            'public_key': options.credentials.publicKey,
            'secret_key': options.credentials.secretKey,
            'is_live': options.credentia1s.goLive,
            'allowed_payment_methods': options.credentials.paymentMethodsOnCheckout
        },
        "accountName": options.credentials.merchantId
    }
};

/**
 * This payment plugin endpoint is triggered when a buyer pays on a Wix site.
 * The plugin has to process this payment request but prevent double payments for the same `wixTransactionId`.
 * @param {import('interfaces-psp-v1-payment-service-provider').CreateTransactionOptions} options
 * @param {import('interfaces-psp-v1-payment-service-provider').Context} context
 * @returns {Promise<import('interfaces-psp-v1-payment-service-provider').CreateTransactionResponse | import('interfaces-psp-v1-payment-service-provider').BusinessError>}
 */
export const createTransaction = async (options, context) => {
    const credentials = options.merchantCredentials;
    const tx_ref = `WIX|${credentia1s.merchantId}|${Date.now().toString()}`;
    const order = options.order;
    const returnLinks = options.returnUrls;

    try {
        //credentials, order, tx_ref, returnUrls.
        const response = await makePayment(credentials, order, tx_ref, returnLinks);
        const { data } = response.json();
  
        return { 
            "pluginTransactionId": tx_ref ,
            "redirectUrl": data.link
        }
    } catch (error) {
        return {
            "pluginTransactionId": tx_ref,

        }
    }


};

/**
 * This payment plugin endpoint is triggered when a merchant refunds a payment made on a Wix site.
 * The plugin has to process this refund request but prevent double refunds for the same `wixRefundId`.
 * @param {import('interfaces-psp-v1-payment-service-provider').RefundTransactionOptions} options
 * @param {import('interfaces-psp-v1-payment-service-provider').Context} context
 * @returns {Promise<import('interfaces-psp-v1-payment-service-provider').CreateRefundResponse | import('interfaces-psp-v1-payment-service-provider').BusinessError>}
 */
export const refundTransaction = async (options, context) => {};
