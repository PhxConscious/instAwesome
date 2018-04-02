import React from 'react'
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { updateIsInstaStud } from '../../redux/actions/userProgress';
import axios from 'axios';
import config from '../../config';

class TakeMoney extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  onToken = (token) => {

    let dto = {...token,
      amount:3200,
      firebase_id: this.props.userInfo.firebase_id
    }
    console.log('post newObj', dto)
    axios.post(`${config.app.api}/payment`, {dto})
    .then(response => {
      this.props.updateIsInstaStud(this.props.userInfo.firebase_id, true);
      alert(`We are in business, ${response.data[0].email} \nis user ${this.props.userInfo.firebase_id} an instaStud? ${this.props.userInfo.isInstaStud}`);
    });
  }

  render() {
    console.log("user", this.props.userInfo)
    return (
      <div>
        <StripeCheckout
          name="instawesome cashpoint"
          description="must enter to win"
          amount={320000}
          token={this.onToken}
          zipCode={true}
          // billingAddress={true}
          stripeKey="pk_test_fpE4GmaHdmv1wf4XhUIU1bAL"
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
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TakeMoney);
