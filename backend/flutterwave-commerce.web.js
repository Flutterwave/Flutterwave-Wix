import {Permissions, webMethod} from 'wix-web-module';
import { getSecret } from "wix-secrets-backend";
import { fetch } from "wix-fetch";

//credentials, order, tx_ref, returnUrls.

export const makePayment = webMethod(
  Permissions.Anyone, 
  async (credentia1s, order, tx_ref, returnLinks ) => {
    // initiate a payment via Flutterwave Standard.
    const secret_key = credentials.secret_key;

    //store return links in a collection to be used by custom redirect url and pass the custom redirect url.
    //returnLinks

    const success_redirect = returnLinks.successUrl;

    return await getPaymentLink( {  secret_key , order, tx_ref, success_redirect });

});

export async function getPaymentLink( data ) {
    const { secret_key , order, tx_ref, success_redirect } = data;
    const amount = order.description.totalAmount;
    const currency = order.description.currency;
    const order_id = order.description._id;
    const phone = order.description.billingAddress.phone;
    const full_name = order.description.billingAddress.firstName + " " + order.description.billingAddress.lastName;
    const email = order.description.billingAddress.email;
    const store_name = "FLW WIX TEST STORE";
    const store_logo = "https://ps.w.org/rave-woocommerce-payment-gateway/assets/icon-256%C3%97256.png";

    //prepare payload.
    let payload = {
        tx_ref,
        amount,
        currency,
        meta: {
          order_id,
          ip_address: order.fraudInformation.remoteIp
        },
        redirect_url: success_redirect,
        customer: {
            email,
            phonenumber: phone,
            name: full_name
        },
        customizations: {
            title: store_name,
            logo: store_logo
        }
    }

    //add redirect url.
    return await fetch("https://api.flutterwave.com/v3/payments", {
      method: "post",
      headers: {
        "Authorization" : "Bearer " + secret_key,
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(payload)
    }).then(function (response) {
      if (response.status >= 200 && response.status < 300)
        return response.json();
      else
        throw new Error(response.statusText);
  });

}
