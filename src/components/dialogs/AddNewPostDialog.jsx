import { Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, styled, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { openDialog, postToUpdate, showAlert, showAllPost, showUserPosts } from '../../redux/postsSlice';
import { useTheme } from '@emotion/react';
import { useCreatePostMutation, useUpdatePostMutation } from '../../redux/apiSlice';
import { CameraAlt } from '@mui/icons-material';
import { useState } from 'react';

// for button add image 
const VisuallyHiddenInput = styled( 'input' )( {
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
} );

export default function AddNewPostDialog ()
{

  const dispatch = useDispatch();
  const post = useSelector( state => state.postsSlice.postToUp );
  const userPosts = useSelector( state => state.postsSlice.userPosts )
  const userInfo = useSelector( state => state.postsSlice.userInfo );
  const allPosts = useSelector( state => state.postsSlice.allPosts )
  const isOpen = useSelector( state => state.postsSlice.open );
  const addPost = isOpen.addPost;
  const isUpdatePost = isOpen.updatePost;
  const theme = useTheme();
  const [ selectedFile, setSelectedFile ] = useState( null )
  const [ isLoading, setIsLoading ] = useState( false )
  const [ createPost ] = useCreatePostMutation();
  const [ updatePost ] = useUpdatePostMutation();
  const handleClose = () =>
  {
    setIsLoading(false)
    dispatch( openDialog( { ...isOpen, addPost: false, updatePost: false } ) );
  };

  //Add New Post
  const handleDataToAddPost = async ( postData ) =>
  {
    try
    {
      setIsLoading(s=>!s)
      const data = await createPost( postData ).unwrap();
      setIsLoading(s=>!s)
      dispatch( showAlert( { isShow: true, msg: 'The Post Is Add', alertColor: 'success' } ) )
      handleClose()
      dispatch( showAllPost( [ data.data ] ) )

      // eslint-disable-next-line no-unused-vars
    } catch ( error )
    {
      setIsLoading( s => !s )
      dispatch( showAlert( { isShow: true, msg: 'Failed to create post. Please try again', alertColor: 'error' } ) )
    }
  };

  //Update New Post
  const handleDataToUpPost = async ( postData ) =>
  {
    try
    {
      postData.append( '_method', 'put' )
      setIsLoading( s => !s )
      const { data } = await updatePost( { id: post.id, postData } ).unwrap();
      setIsLoading( s => !s )
      dispatch( showAllPost( allPosts.map( p => { return p.id === data.id ? data : p } ) ) );
      dispatch( showAlert( { isShow: true, msg: 'The Post Is Updated', alertColor: 'success' } ) );

      // if author of this post  update userDetails page 
      userInfo.user && userInfo.user.id === post.author.id && dispatch( showUserPosts( userPosts.map( p => { return p.id === data.id ? data : p } ) ) )
    }
    // eslint-disable-next-line no-unused-vars
    catch ( e )
    {
      setIsLoading( s => !s )
      dispatch( showAlert( { isShow: true, msg: 'Failed to Update post. Please try again', alertColor: 'error' } ) )
    }
  }
  return (
    <Dialog
      //if addPost open dialog to add post or id isUpdatePost open dialog to up post
      open={ addPost || isUpdatePost }
      onClose={ handleClose }
      sx={ { p: '25px', '.MuiPaper-root': { width: '400px' } } }
      PaperProps={ {
        component: 'form',
        onSubmit: async ( event ) =>
        {
          event.preventDefault();
          const formData = new FormData( event.currentTarget );
          // if i selected image add this image to form data 
          if ( selectedFile )
          {
            formData.append( 'image', selectedFile );
          }

          isUpdatePost ? await handleDataToUpPost( formData ) : await handleDataToAddPost( formData );
          handleClose();
        },
      } }
    >
      {isLoading&&<LinearProgress/>}
      <DialogTitle fontWeight={ 900 } textAlign={ 'center' } bgcolor={ theme.palette.myColor.main }>{ isUpdatePost ? 'Update Post' : 'Add New Post' }</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="title"
          name="title"
          label="Title"
          type="text"
          fullWidth
          color={ 'secondary' }
          variant="standard"
          value={ post.title }
          onChange={ ( e ) => { dispatch( postToUpdate( { ...post, title: e.target.value } ) ) } }

        />

        <TextField
          required
          margin="dense"
          id="body"
          name="body"
          label="Body Of The Post"
          type="text"
          value={ post.body }
          onChange={ ( e ) => { dispatch( postToUpdate( { ...post, body: e.target.value } ) ) } }
          fullWidth
          color={ 'secondary' }
          variant="standard"
        />
        <Button
          component="label"
          role={ 'img' }
          // variant="contained"
          // tabIndex={ -1 }
          startIcon={ <CameraAlt /> }
          sx={ { mt: 1, color: theme.palette.text.primary, width: '100%', bgcolor: theme.palette.greyColor.main } }
        >
          Upload image
          <VisuallyHiddenInput
            type="file"
            onChange={ ( event ) => setSelectedFile( event.target.files[ 0 ] ) }

          />
        </Button>
      </DialogContent>
      <DialogActions sx={ { justifyContent: 'center', bgcolor: theme.palette.myColor.main } }>
        <Button size='small' variant='contained' color='error' type="submit" >{ isUpdatePost ? 'Update' : 'Add Post' }</Button>
        <Button size='small' onClick={ handleClose } variant='contained' color='error'>Cancel</Button>
      </DialogActions>
      { isLoading && <LinearProgress /> }
    </Dialog>
  );
}

