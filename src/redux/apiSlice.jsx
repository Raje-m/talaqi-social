import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice =  createApi( {
  reducerPath: 'api',
  baseQuery: fetchBaseQuery( { baseUrl: 'https://tarmeezacademy.com/api/v1/' } ),

  endpoints: ( builder ) => ( {

    // get posts 
    getPosts: builder.query( {
      query: (pageNum) => `posts?limit=10&page=${pageNum}`,
    } ),
    // get post 
    getPostDetails: builder.query( {
      query: ( id ) => `posts/${ id }`,
    } ),
    // show User Info 
    getUserDetails: builder.query( {
      query: ( id ) => `users/${ id }`,
    } ),
    // show User Posts 
    getUserPosts: builder.query( {
      query: ( id ) => `users/${ id }/posts`,
    } ),
    //add new post
    createPost: builder.mutation( {

      query: ( newPost ) => ( {
        url: 'posts',
        method: 'POST',
        body: newPost,

        headers: {
          'Authorization': `Bearer ${ JSON.parse( localStorage.getItem( 'token' ) ) }`,
        },
      } ),
    } ),
    //add new user
    createUser: builder.mutation( {
      query: ( newUser ) => ( {
        url: 'register',
        method: 'POST',
        body: newUser,
      } ),
    } ),
    // add Comment 
    addComment: builder.mutation( {

      query: ( { id, commentJson } ) => ( {
        url: `posts/${ id }/comments`,
        method: 'POST',
        body: commentJson,

        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ JSON.parse( localStorage.getItem( 'token' ) ) }`,
        },
      } ),
    } ),
    //login user
    loginUser: builder.mutation( {
      query: ( newUser ) => ( {
        url: 'login',
        method: 'POST',
        body: newUser,
      } ),
    } ),

    //log out user
    logOutUser: builder.mutation( {

      query: ( newUser ) => ( {
        url: 'logout',
        method: 'POST',
        body: newUser,
      } ),
    } ),

    //update Post
    updatePost: builder.mutation( {
      query: ( { id, postData } ) => ( {
        url: `posts/${ id }`,
        method: 'POST',
        body: postData,
        headers: {
          'Authorization': `Bearer ${ JSON.parse( localStorage.getItem( 'token' ) ) }`,
        },
      } ),
    } ),
    delPost: builder.mutation( {
      query: ( id  ) => ( {
        url: `posts/${ id }`,
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${ JSON.parse( localStorage.getItem( 'token' ) ) }`,
        },
      } ),
    } )
    ,

  } ),
} );

export const {
  useGetPostsQuery,
  useGetPostDetailsQuery,
  useGetUserDetailsQuery,
  useGetUserPostsQuery,
  useCreatePostMutation,
  useCreateUserMutation,
  useLogOutUserMutation,
  useAddCommentMutation,
  useUpdatePostMutation,
  useDelPostMutation,
  useLoginUserMutation,
} = apiSlice;