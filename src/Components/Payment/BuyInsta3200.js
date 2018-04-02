import React from 'react'
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { updateIsInstaStud } from '../../redux/actions/userProgress';
import { makePayment } from '../../redux/actions/payments';
import axios from 'axios';
import config from '../../config';

class TakeMoney extends React.Component {

  onToken = (token) => {
    let dto = {...token,
      amount:320000,
      firebase_id: this.props.userInfo.firebase_id
    }
    this.props.makePayment(dto);
  }

  render() {

    return (
      <div>
        <StripeCheckout
          name="instawesome cashpoint"
          description="Your ticket to instaAwesomeness"
          amount={320000}
          token={this.onToken}
          zipCode={true}
          billingAddress={true}
          stripeKey="pk_test_byPrlZKXyoevtxbYU9rjQyrT"
          locale="auto"
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userProgress.currentUser
})

const mapDispatchToProps = dispatch => ({
  updateIsInstaStud: (id, bool) => {
    dispatch(updateIsInstaStud(id, bool))
  },
  makePayment: (dto) => {
    dispatch(makePayment(dto))
    .then((data)=>{
      // this give permissions to user who just paid for LMS
      dispatch(updateIsInstaStud(data.value.data[0].firebase_id, true))
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TakeMoney);
