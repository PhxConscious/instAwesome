import axios from 'axios';


export const getLmsContent = () => {
  console.log('in action')
  return {
    type: "GET_LMS_CONTENT",
    payload: axios.get("http://localhost:8080/books/test")
  }
}
