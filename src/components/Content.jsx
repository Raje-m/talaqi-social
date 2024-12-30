/* eslint-disable no-unused-vars */
import { Container, Fab, Stack, Tooltip, } from "@mui/material";
import Post from "./Post";
import { useGetPostsQuery, } from "../redux/apiSlice";
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from "react-redux";
import { openDialog, showAllPost } from "../redux/postsSlice";
import LoadingCard from "./loading-and-alert/LoadingCard";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import LinerProgress from "./loading-and-alert/LinerProgress";
export default function Content ()
{

  const [ page, setPage ] = useState( 1 );
  const [ hasMore, setHasMore ] = useState( true );
  const { data, error, isLoading } = useGetPostsQuery( page );
  const allPosts = useSelector( state => state.postsSlice.allPosts )
  const dispatch = useDispatch()
  const userInfo = useSelector( state => state.postsSlice.userInfo );

  // on first upload page the all Posts array well be empty
  useEffect( () =>
  {
    dispatch( showAllPost( [] ) );
  }, [ dispatch ] );
  

// show posts on home page 
  useEffect( () =>
  {
    if ( data && data.data )
    {
      const newPosts = data.data.filter( newPost => !allPosts.find( existingPost => existingPost.id === newPost.id ) );
      dispatch( showAllPost( [ ...allPosts, ...newPosts ] ) );
      setHasMore( data.meta.current_page < data.meta.last_page );

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ data, dispatch ] );

// infinity scroll 
  const fetchMoreData = () =>
  {
    if ( isLoading || !hasMore ) return;
    setPage( prevPage => prevPage + 1 );
  };

  // open dialog to add new post 
  function addNewPost ()
  {
    dispatch( openDialog( { addPost: true } ) )
    
  }


  return (
    <Container sx={ { position: 'relative' } }  >
      <InfiniteScroll dataLength={ allPosts.length } next={ fetchMoreData } hasMore={ hasMore } loader={ <LinerProgress /> } >
        <Stack justifyContent={ 'center' } gap={ 2 } alignItems={ 'center' } my={ 3 }>
          { isLoading && allPosts.length === 0 && <LoadingCard /> }
          { allPosts.length > 0 ? allPosts.map( ele => <Post key={ ele.id } post={ ele } /> ) : null }
        </Stack>
      </InfiniteScroll>
      { userInfo && userInfo.token != '' && <Tooltip title={ 'Add Post' } placement="top"><Fab color="primary" onClick={ addNewPost } aria-label="add" sx={ { position: 'fixed', bottom: {xs:'50px',sm:'100px'}, right: {xs:'10px',sm:'100px'},opacity:{xs:0.7,sm:1} } }>
        <AddIcon />
      </Fab>
      </Tooltip> }
    </Container>
  )
}
