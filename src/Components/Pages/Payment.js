import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import config from '../../config';

export default class TakeMoney extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  onToken = (token) => {
    console.log('post token', token)
    axios.post(`${config.app.api}/payment`, {token})
    .then(response => {
      console.log("response", response)
      alert(`We are in business, ${response.data[0].email}`);
    });
  }

  render() {
    return (
      <div>
        <StripeCheckout
          name="instawesome cashpoint"
          description="must enter to win"
          amount={320000}
          token={this.onToken}
          zipCode={true}
          billingAddress={true}
          stripeKey="pk_test_fpE4GmaHdmv1wf4XhUIU1bAL"
          locale="auto"
        />
      </div>
    )
  }
}
