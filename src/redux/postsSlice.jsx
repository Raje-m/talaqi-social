import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  open: { reg: false, addPost: false, log: false, updatePost: false, isDel: false },
  postToUp: { body: '', title: '' },
  postToDel: null,
  alertMsg: { isShow: false, msg: '', alertColor: '' },
  allPosts: [],
  userInfo: { token: JSON.parse( localStorage.getItem( 'token' ) ), user: JSON.parse( localStorage.getItem( 'user' ) ) },
  userPosts: [],
  postComments: {},

}

export const postsSlice = createSlice( {
  name: 'postsSlice',
  initialState,
  reducers: {
    userToLocale: ( state, action ) =>
    {

      localStorage.setItem( 'token', JSON.stringify( action.payload.token ) );
      localStorage.setItem( 'user', JSON.stringify( action.payload.user ) );
      state.userInfo = { token: action.payload.token, user: action.payload.user }


      
    },
    openDialog: ( state, action ) =>
    {
      
      // console.log( Object.keys( action.payload)[0]);
      state.open = { ...state.open, ...action.payload }
      
    },
    postToUpdate: ( state, action ) =>
    {
      state.postToUp = action.payload
    
    },
    delPost: ( state, action ) =>
    {
      state.postToDel = action.payload
      state.open.isDel = true
    },
    showAlert: ( state, action ) =>
    {
      state.alertMsg = action.payload
    },
    showAllPost: ( state, action ) =>
    {
      state.allPosts = action.payload.length == 1 ? [ ...action.payload, ...state.allPosts ] : action.payload
    },
    showUserPosts: ( state, action ) =>
    {
      state.userPosts = action.payload
    },
    showPostComments: ( state, action ) =>
    {
      const { postId, comments } = action.payload;
      state.postComments[ postId ] = comments;
    }

  },
} )

export const { userToLocale, openDialog, postToUpdate, delPost, showAlert, showAllPost, showUserPosts, showPostComments } = postsSlice.actions

export default postsSlice.reducer