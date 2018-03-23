import axios from 'axios';
import config from '../../config'

export const getLmsContent = () => {
  return {
    type: "GET_LMS_CONTENT",
    payload: axios.get(`${config.app.api}/books/module1`)
  }
}
