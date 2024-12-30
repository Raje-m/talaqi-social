import { Box, Button, IconButton, Typography, useMediaQuery } from "@mui/material"
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { useContext } from "react";
import { useTheme } from "@emotion/react";
import { ColorModeContext } from "../theme";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import Avatar from '@mui/material/Avatar';
import DialogToLogIn from "./dialogs/DialogToLogIn";
import { blueGrey, red } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { openDialog, showAlert, userToLocale } from "../redux/postsSlice";
import { Link } from "react-router-dom";


export const Header = () =>
{

  const colorMode = useContext( ColorModeContext );
  const theme = useTheme();
  const matches = useMediaQuery( '(max-width:600px)' );
  const isOpen = useSelector( ( state ) =>
  {
    state.postsSlice.open
  } );

  const userInfo = useSelector( ( state ) => state.postsSlice.userInfo );
  const dispatch = useDispatch();

  // log in
  function handleLogIn ()
  {
    dispatch( openDialog( {  log: true } ) )
  }
  // log in

  //Sign Up
  function handleSignUp ()
  {
    dispatch( openDialog( { reg: true } ) )
  }

  //Sign Up

  //log out
  async function handleSignOut ()
  {
    dispatch( userToLocale( { token: '', user: '' } ) )
    dispatch( showAlert( {isShow: true, msg: 'The User Is Logout', alertColor: 'success'} ) )

  }
  //log out

  return (
    <>
        <Box sx={ { display: 'flex', alignItems: 'center', background: blueGrey[600], px: 1, borderBottomLeftRadius: '6px', borderBottomRightRadius: '6px', boxShadow: '0 0  2px #ddd', p: '2px 15px' } }>
          <Box display={ 'flex' } alignItems={ "center" } >

          <Link to="/" sx={ { textDecoration: 'none', color: '#fff' } }>
            <img src="/public/logo.png" style={ { width: '40px', borderRadius: '50%', background: '#fff' } } />
          </Link>
             {/* <SearchAppBar/>  */}
            <Link to={ '/' } style={{color:"#fff"}}>
              <Button
                color="#fff" size="small">Home</Button>
            </Link >
            <Link to={ userInfo && userInfo.token != '' ? `userDetails/${ userInfo.user.id }` : '' } style={ { color: "#fff" } }>
              <Button color="#fff" size="small">Profile</Button>
            </Link>
          </Box>
          <Box flexGrow={ 1 } />
          <Box display={ 'flex' } gap={ 1 } alignItems={ 'center' }>
            <div>
              { theme.palette.mode === "light" ? (
                <IconButton
                  onClick={ () =>
                  {
                    localStorage.setItem(
                      "mode",
                      theme.palette.mode === "dark" ? "light" : "dark"
                    );
                    colorMode.toggleColorMode();
                  } }
                // color="inherit"
                sx={{color:'#fff'}}
                
                >
                  <LightModeOutlined fontSize="small" color="#fff " />
                </IconButton>
              ) : (
                <IconButton
                  onClick={ () =>
                  {
                    localStorage.setItem(
                      "mode",
                      theme.palette.mode === "dark" ? "light" : "dark"
                    );
                    colorMode.toggleColorMode();
                  } }
                  color="inherit"
                >
                  <DarkModeOutlined fontSize="small" />
                </IconButton>
              ) }
            </div>
            <Box display={ userInfo.token == "" ? "flex" : "none" } gap={ 1 } alignItems={ 'center' }>
              <Button size="small" variant="contained" startIcon={ < LoginOutlinedIcon fontSize="small" /> } onClick={ handleSignUp } sx={ { bgcolor: theme.palette.mainColor.main, color: '#fff' } } > { matches ? "" : 'Sign Up' }   </Button>
              <Button size="small" variant="contained" startIcon={ <ExitToAppOutlinedIcon fontSize="small" /> } onClick={ handleLogIn } sx={ { bgcolor: theme.palette.mainColor.main, color: '#fff' } }>{ matches ? "" : 'Log In' }</Button>
            </Box>
            { userInfo.token !== '' && <Box display={ userInfo.token == "" ? "none" : "flex" } gap={ 1 } alignItems={ 'center' } position={ 'relative' } >
              <Link to={ userInfo && userInfo.token != '' ? `userDetails/${ userInfo.user.id }` : '' }>
              <IconButton sx={ { borderRadius: '5px', mr: 0 } } aria-label="settings"    >
                { userInfo.user.profile_image.length > 0 ? <img src={ userInfo.user.profile_image } alt={ userInfo.user.name } style={ { width: '40px', height: '40px', borderRadius: '50%', paddingRight: "5px" } } /> : <Avatar sx={ { bgcolor: red[ 500 ], mr:0 } } aria-label="recipe">
                  { userInfo.user.name[ 0 ].toUpperCase() }
                </Avatar> }
              </IconButton>
              </Link>
              <Button size="small" variant="contained" startIcon={ < LoginOutlinedIcon fontSize="small" /> } onClick={ handleSignOut } sx={ { bgcolor: theme.palette.mainColor.main, color: '#fff', p: 1 } } >  </Button>
            </Box> }
          </Box>
        </Box>
      <DialogToLogIn value={ isOpen } />

    </>
  )
}