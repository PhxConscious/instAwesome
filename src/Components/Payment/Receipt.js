import React from 'react';
import '../../Styles/ReceiptStyles.css';
import moment from 'moment';

class Receipt extends React.Component {

  render() {
    let { payment } = this.props;
    let date = moment(payment.created_at).format("MMM DD YYYY");

    return (
      <div id="page">
        <div id="mainContainer">
          <h1>Thank you</h1>
          <h4>Congratulations! You are are enrolled in the InstaAwesome 3 month program! Your order has been processed and you are now an active user.</h4>
          <h1>${payment.amount/100}</h1>

          <p>card ending in <strong>{payment.last4}</strong> was charged</p>

          <div id="detailContainer">
            <span className=""><strong>Order Summary</strong></span>
            <div style={{clear:"both"}}></div>

            <span className="left">Beginning of service:</span>
            <span className="right">{date}</span>
            <div style={{clear:"both"}}></div>

            <span className="left">Billing Name:</span>
            <span className="right">{payment.name}</span>
            <div style={{clear:"both"}}></div>

            <span className="left">Billing Street:</span>
            <span className="right">{payment.address_line1}</span>
            <div style={{clear:"both"}}></div>

            <span className="left">Billing Address:</span>
            <span className="right">{payment.address_city} {payment.address_state}, {payment.address_zip}</span>
          </div>
        </div>

      </div>
    )
  }
}

export default Receipt;
