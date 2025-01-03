

import { ThemeProvider } from '@emotion/react'
import './App.css'
import { Header } from './components/Header'
import { ColorModeContext, useMode } from './theme'
import { Box } from '@mui/material';
import Content from './components/Content';
import { Route, Routes } from 'react-router-dom';
import PostDetails from './components/PostDetails';
import UserDetails from './components/UserDetails';
import AddNewPostDialog from './components/dialogs/AddNewPostDialog';
import DeletePostDialog from './components/dialogs/DeletePostDialog';
import SnackBar from './components/loading-and-alert/SnackBar';
import LinerProgress from './components/loading-and-alert/LinerProgress';

function App ()
{
  const [ theme, colorMode ] = useMode();
  return (
    <>
      <ColorModeContext.Provider value={ colorMode }>
        <ThemeProvider theme={ theme }>
          <Box sx={ { background: theme.palette.myColor.main, } }>
            <Header />
            <Routes>
              <Route path="/" element={ <Content /> } />
              <Route path="postdetails/:id" element={ <PostDetails /> } />
              <Route path="userDetails/:id" element={ <UserDetails /> } />
            </Routes>
            <AddNewPostDialog />
            <DeletePostDialog />
            <SnackBar />
            {/* <LinerProgress/> */ }
          </Box>
        </ThemeProvider>
      </ColorModeContext.Provider>

    </>



  )
}

export default App
