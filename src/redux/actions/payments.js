import axios from 'axios';
import config from '../../config';


export const makePayment = (dto) => {
  return {
    type: "MAKE_PAYMENT",
    payload: axios.post(`${config.app.api}/payment`, dto)
  }
}
