import React from 'react';
import { connect } from 'react-redux';
import BuyInsta3200 from '../Payment/BuyInsta3200';
import Receipt from '../Payment/Receipt';

class Payment extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      clicked: false,
    }
    this.printReceipt = this.printReceipt.bind(this);
    this.showPurchaseScreen = this.showPurchaseScreen.bind(this);
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.payments.currentPayment !== this.props.payments.currentPayment){
      this.setState({clicked: true})
    }
  }

  printReceipt(){
    let { currentPayment } = this.props.payments;
    return (
      <div>
        <Receipt payment={currentPayment}/>
      </div>
    )
  }

  showPurchaseScreen(){
    return (

      <div style={{display:"flex", justifyContent:"center", backgroundColor:"#f3f3f3", height:"90vh"}}>
        <div style={{ margin:"10vh 0 10vh 0", flexDirection:"column", backgroundColor:"white", width:"60vw", padding:"0 10px 0 10px"}}>
          <h3>Do you agree to sign up?</h3>
          <p>Terms and conditions here</p>
          <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. </p>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
          <BuyInsta3200 />
        </div>
      </div>
    )
  }

  render() {
    let { clicked } = this.state;
    if(this.props.userInfo &&  this.props.userInfo.firebase_id){
      return (
        <div>
          {clicked ? this.printReceipt() : this.showPurchaseScreen()}
        </div>
      )
    } else {
      return <div>Please login</div>
    }

  }
}

const mapStateToProps = state => ({
  userInfo: state.userProgress.currentUser,
  payments: state.payments
})

export default connect(mapStateToProps, null)(Payment);
