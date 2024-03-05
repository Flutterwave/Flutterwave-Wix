import * as paymentProvider from 'interfaces-psp-v1-payment-service-provider';

/** @returns {import('interfaces-psp-v1-payment-service-provider').PaymentServiceProviderConfig} */
export function getConfig() {
  return {
    title: 'Flutterwave',
    paymentMethods: [{
      hostedPage: {
        title: 'Flutterwave',
        billingAddressMandatoryFields: ['EMAIL', 'FIRST_NAME', 'LAST_NAME', 'PHONE', 'COUNTRY_CODE'],
        logos: {
          white: {
            svg: 'https://flutterwave.com/images/logo/logo-mark/full.svg',
            png: 'https://github.com/Flutterwave/Woocommerce-v2/blob/master/.wordpress-org/icon-256%C3%97256.png'
          },
          colored: {
            svg: 'https://flutterwave.com/images/logo/logo-mark/full.svg',
            png: 'https://github.com/Flutterwave/Woocommerce-v2/blob/master/.wordpress-org/icon-256%C3%97256.png'
          }
        }
      }
    }],
    credentialsFields: [{
      simpleField: {
        name: 'merchantId',
        label: 'MERCHANT ID'
      }
    },
    {
      simpleField: {
        name: 'publicKey',
        label: 'PUBLIC API KEY'
      }
    }, 
    {
      simpleField: {
        name: 'secretKey',
        label: 'SECRET API KEY'
      }
    },
    {
      checkboxField: {
        name: 'goLive',
        label: 'GO LIVE',

      }
    },
    {
      dropdownField: {
        name: 'paymentMethodsOnCheckout',
        label: 'Allowed Payment Methods',
        options: [
          { all: "card,ussd,account,mpesa,banktransfer,mobilemoneyghana,mobilemoneyfranco,mobilemoneyrwanda, mobilemoneyzambia,mobilemoneyuganda,ussd" },
          { card: "card"},
          { ussd: "ussd"},
          { account: "account"},
          { mpesa: "mpesa"},
          { banktransfer: "banktransfer"},
          { mobilemoneyghana: "mobilemoneyghana"},
          { mobilemoneyfranco: "mobilemoneyfranco"},
          { mobilemoneyrwanda: "mobilemoneyrwanda"},
          { mobilemoneyzambia: "mobilemoneyzambia"},
          { mobilemoneyuganda: "mobilemoneyuganda"}
        ]
      }
    }]
  }

}
