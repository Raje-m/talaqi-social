/* eslint-disable no-unused-vars */
import { Dialog, TextField, DialogActions, DialogContent, DialogTitle, Button, styled, LinearProgress } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useCreateUserMutation, useLoginUserMutation } from '../../redux/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { openDialog, showAlert, userToLocale } from '../../redux/postsSlice';
import { useContext, useState } from 'react';
import { CameraAlt } from '@mui/icons-material';


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


export default function DialogToLogIn ()
{
  const theme = useTheme();
  // state to add image to user profile 
  const [ selectedFile, setSelectedFile ] = useState( null )
  const [ isLoading, setIsLoading ] = useState( false )

  //fetch Api
  const [ createUser ] = useCreateUserMutation();
  const [ loginUser ] = useLoginUserMutation();
  // fetch Api 
  const dispatch = useDispatch();
  const isOpen = useSelector( state => state.postsSlice.open );
  const register = isOpen.reg || false;
  const log = isOpen.log || false;
  const userInfo = useSelector( state => state.postsSlice.userInfo );

  //..... add user info to locale storage.....
  useContext( () =>
  {
    dispatch( userToLocale( userInfo ) );
  }, [ userInfo ] );

  const handleClose = () =>
  {
    setIsLoading( false )
    dispatch( openDialog( { ...isOpen, open: false, reg: false, log: false } ) );
  };

  //..... add user info to locale storage.....

  //........sign up.........
  const handleDataToRegister = async ( userInfoFromForm ) =>
  {
    try
    {
      setIsLoading( s => !s )
      const data = await createUser( userInfoFromForm ).unwrap();
      setIsLoading( s => !s )
      dispatch( userToLocale( data ) );
      dispatch( showAlert( { isShow: true, msg: 'The User Is Sign Up', alertColor: 'success' } ) );
      handleClose()
    } catch ( err )
    {
      setIsLoading(false )
      // console.error( 'Failed to create user: ', err );
      dispatch( showAlert( { isShow: true, msg: 'Failed to create New User. Please try again', alertColor: 'error' } ) );
    }
  };

  //.......sign up.......

  //.......login...........
  const handleDataToLogin = async ( userInfoFromForm ) =>
  {
    try
    {
      setIsLoading( s => !s )
      const data = await loginUser( userInfoFromForm ).unwrap();
      setIsLoading( s => !s )
      dispatch( userToLocale( data ) );
      dispatch( showAlert( { isShow: true, msg: 'The User Is Login', alertColor: 'success' } ) );
      handleClose()
    } catch ( e )
    {
      setIsLoading( false )
      dispatch( showAlert( { isShow: true, msg: 'Failed to Login User. Please try again', alertColor: 'error' } ) );
    }
  };
  //...........login..........

  return (
    <>
      <Dialog
        open={ log || register||false }
        onClose={ handleClose }
        sx={ { p: '25px', '.MuiPaper-root': { width: '400px' } } }
        PaperProps={ {
          component: 'form',
          onSubmit: ( event ) =>
          {
            event.preventDefault();
            const formData = new FormData( event.currentTarget );
            if ( selectedFile )
            {
              formData.append( 'image', selectedFile );
            }
            register ? handleDataToRegister( formData ) : log && handleDataToLogin( formData );
            // handleClose();
          },
        } }
      >
        { isLoading && <LinearProgress /> }

        <DialogTitle  fontWeight={ 900 } textAlign={ 'center' } bgcolor={ theme.palette.myColor.main }>
          { register ? 'Register New User' : log && "Log In" }
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="username"
            name="username"
            label="User Name"
            type="text"
            fullWidth
            color={ 'secondary' }
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="password"
            name="password"
            label="Your Password"
            type="password"
            fullWidth
            color={ 'secondary' }
            variant="standard"
          />
          { register && <>
            <TextField
              required
              margin="dense"
              id="name"
              name="name"
              label="Your Name"
              type="text"
              fullWidth
              color={ 'secondary' }
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              id="email"
              name="email"
              label="Your Email"
              type="email"
              fullWidth
              color={ 'secondary' }
              variant="standard"
            />
            <Button
              component="label"
              role={ 'img' }
              // variant="contained"
              tabIndex={ -1 }
              startIcon={ <CameraAlt /> }
              sx={ { mt: 1, color: theme.palette.text.primary, width: '100%', bgcolor: theme.palette.greyColor.main } }
            >
              Upload image
              <VisuallyHiddenInput
                type="file"
                onChange={ ( event ) => setSelectedFile( event.target.files[ 0 ] ) }
                multiple
              />
            </Button>
          </> }
        </DialogContent>
        <DialogActions sx={ { justifyContent: 'center', bgcolor: theme.palette.myColor.main } }>
          <Button size='small' variant='contained' color='error' type="submit">
            { register ? 'Register ' : log && "Log In" }
          </Button>
          <Button size='small' onClick={ handleClose } variant='contained' color='error'>
            Cancel
          </Button>
        </DialogActions>
        { isLoading && <LinearProgress /> }
      </Dialog>
    </>
  );
}


