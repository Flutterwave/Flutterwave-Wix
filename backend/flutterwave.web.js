import {Permissions, webMethod} from 'wix-web-module';
import { getSecret } from "wix-secrets-backend";
import { fetch } from "wix-fetch";


export const submitPayment = webMethod(
  Permissions.Anyone, 
  async (amount, currency, email, full_name ) => {
    const secret_key = await getSecret("FLUTTERWAVE_SECRET_KEY");
    const public_key =  await getSecret("FLUTTERWAVE_PUBLIC_KEY")

    const tx_ref = "WIX_" +  Math.random() + "-TX";
    const order_id = "200";
    const phone = "+2349067985861";

    // initiate a payment via Flutterwave Standard.
    return await getPaymentLink( {  amount, currency, email, full_name, tx_ref, order_id, phone });

});

export async function getPaymentLink( data ) {
    const { amount, currency, email, full_name, tx_ref, order_id, phone } = data;
    const secret_key = await getSecret("FLUTTERWAVE_SECRET_KEY");
    const store_name = "FLW WIX TEST STORE";
    const store_logo = "https://ps.w.org/rave-woocommerce-payment-gateway/assets/icon-256%C3%97256.png";

    //prepare payload.
    let payload = {
        tx_ref,
        amount,
        currency,
        meta: {order_id},
        redirect_url: "https://webhook.site/9d0b00ba-9a69-44fa-a43d-a82c33c36fdc",
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
