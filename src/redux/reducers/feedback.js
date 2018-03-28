let initState = {parentId:{}};

export default (state = initState, action) => {
  switch (action.type) {

    case "GET_FEEDBACK_BY_USER_ID_FULFILLED":
      return {
        ...state, allCommentsCurUser: action.payload.data
      }

    case "GET_FEEDBACK_BY_COMMENT_ID_FULFILLED":
      return {
        ...state, selectedComment: action.payload.data
      }

    case "GET_ALL_FEEDBACK_FULFILLED":
      return {
        ...state, allComments: action.payload.data
      }

    case "POST_FEEDBACK_FULFILLED":
      let updatedAllComments;
      let updatedChildGroup;
      if(action.payload.data[0].parent_id){
        // console.log("its a child comment")

        // case1: there's already a child group for this parent
        if(state.parentId[action.payload.data[0].parent_id]){
          let origChildGroup = state.parentId[action.payload.data[0].parent_id]

          updatedChildGroup = origChildGroup.concat(action.payload.data[0]);
        } else {
          // case2: we still need to generate a child group for this parent
          updatedChildGroup = action.payload.data;
        }

        return {
          ...state, parentId: {...state.parentId, [action.payload.data[0].parent_id]: updatedChildGroup}
        }

      } else {
        // console.log("its a parent comment")
        updatedAllComments =  state.allComments.concat(action.payload.data[0])
        return {
          ...state, allComments: updatedAllComments
        }
      }


    case "GET_FEEDBACK_BY_PARENT_ID_FULFILLED":
      if(!action.payload.data[0]){
        return {...state};
      }
      return {
        ...state, parentId: {...state.parentId, [action.payload.data[0].parent_id]: action.payload.data}
      }

    case "GET_FEEDBACK_BY_USER_ID_PENDING":
      return { ...state }
    case "GET_FEEDBACK_BY_COMMENT_ID_PENDING":
      return { ...state }
    case "GET_ALL_FEEDBACK_PENDING":
      return { ...state }
    case "POST_FEEDBACK_PENDING":
      return { ...state }
    case "GET_FEEDBACK_BY_PARENT_ID_PENDING":
      return { ...state }

    case "GET_FEEDBACK_BY_USER_ID_REJECTED":
      return { ...state }
    case "GET_FEEDBACK_BY_COMMENT_ID_REJECTED":
      return { ...state }
    case "GET_ALL_FEEDBACK_REJECTED":
      return { ...state }
    case "POST_FEEDBACK_REJECTED":
      return { ...state }
    case "GET_FEEDBACK_BY_PARENT_ID_REJECTED":
      return { ...state }

    default:
      return { ...state}
  }
}
