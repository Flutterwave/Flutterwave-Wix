// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction

import { submitPayment } from 'backend/flutterwave-form.web';
import {currentUser} from 'wix-users';
import wixLocation from 'wix-location';

$w.onReady(function () {

	// Write your Javascript code here using the Velo framework API

	// redirect to payemnt link.
	// amount, currency, email, full_name
	submitPayment(2000, "NGN", "olaobajua@gmail.com", "Abraham Olaobaju", "WIX_" +  Math.random() + "-TX" ).then(
		(response) => {
			let payment_link = response.data.link;
			wixLocation.to(payment_link)
		}
	).catch( err => {
		console.error("Error: ", err);
	})

});