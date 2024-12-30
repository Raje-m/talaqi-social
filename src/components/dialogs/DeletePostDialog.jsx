/* eslint-disable no-unused-vars */
import { useTheme } from '@emotion/react';
import { Button, Dialog, DialogActions, DialogTitle, LinearProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { openDialog, showAlert, showAllPost, showUserPosts } from '../../redux/postsSlice';
import { useDelPostMutation } from '../../redux/apiSlice';
import { Login } from '@mui/icons-material';
import { useState } from 'react';

export default function DeletePostDialog ()
{
  const dispatch = useDispatch();
  const allPosts = useSelector( state => state.postsSlice.allPosts )
  const userPosts = useSelector( state => state.postsSlice.userPosts )
  // const userInfo = useSelector( state => state.postsSlice.userInfo );

  const post = useSelector( state => state.postsSlice.postToDel );
  const isOpen = useSelector( state => state.postsSlice.open );
  const isDel = isOpen.isDel;
  const [isLoading,setIsLoading]=useState(false)
  const theme = useTheme();
  const [ delPost ] = useDelPostMutation()



  const handleClose = () =>
  {
    dispatch( openDialog( { ...isOpen, isDel: false } ) );
  };

  const handleDelPost = async () =>
  {
    try
    {
      setIsLoading(state=>!state)
      const { data } = await delPost( post.post.id ).unwrap()
      setIsLoading(state=>!state)
      handleClose()

      dispatch( showAlert( { isShow: true, msg: 'The Post Is Deleted', alertColor: 'success' } ) )
      // update home page 
      dispatch( showAllPost( allPosts.filter( p => p.id != data.id ) ) )
      // update userDitails page 
      dispatch( showUserPosts( userPosts.filter( p => p.id != data.id ) ) )

    } catch ( error )
    {
      setIsLoading( state => !state )
      dispatch( showAlert( { isShow: true, msg: 'Failed to delete post. Please try again', alertColor: 'error' } ) )
      handleClose()

    }
  }

  return (
    <Dialog
      open={ isDel }
      onClose={ handleClose }
      sx={ { p: '25px', '.MuiPaper-root': { width: '400px' } } }
    >
      
      {isLoading&&  <LinearProgress/>}
      <DialogTitle fontWeight={ 500 } textAlign={ 'center' } bgcolor={ theme.palette.myColor.main }>Are You Sure To Delete This Post</DialogTitle>
      <DialogActions sx={ { justifyContent: 'space-evenly', bgcolor: theme.palette.myColor.main, p: 2 } }>
        <Button size='small' variant='contained' color='error' onClick={ handleDelPost }>Delete</Button>
        <Button size='small' onClick={ handleClose } variant='contained' color='error'>Cancel</Button>
      </DialogActions>
      { isLoading && <LinearProgress /> }

    </Dialog>
  )
}
