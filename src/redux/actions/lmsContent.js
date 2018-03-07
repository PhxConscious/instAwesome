import axios from 'axios';


export const getLmsContent = () => {
  return {
    type: "GET_LMS_CONTENT",
    payload: axios.get("http://localhost:8080/books/module1")
  }
}
