import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { showAlert } from '../../redux/postsSlice';

export default function SnackBar ()
{
  const dispatch=useDispatch()
  const alertMsg = useSelector( state => state.postsSlice.alertMsg )
  

  const handleClose = ( event, reason ) =>
  {
    if ( reason === 'clickaway' )
    {
      return;
    }
    dispatch( showAlert( { isShow: false, msg: '', alertColor: '' }))
  };

  return (
    <div>
      <Snackbar open={ alertMsg.isShow } autoHideDuration={ 3000 } onClose={ handleClose }>
        <Alert
          onClose={ handleClose }
          // severity=''
          severity={alertMsg.alertColor}
          variant="standard"
          sx={ { width: '100%' } }
        >
          {alertMsg.msg}
        </Alert>
      </Snackbar>
    </div>
  );
}