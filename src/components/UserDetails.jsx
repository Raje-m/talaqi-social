/* eslint-disable no-unused-vars */
import { useParams } from 'react-router-dom'
import { useGetUserDetailsQuery, useGetUserPostsQuery } from '../redux/apiSlice';
import { Box, Container, IconButton, Stack, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Post from './Post';
import { red } from '@mui/material/colors';
import { useTheme } from '@emotion/react';
import LoadingCard from './loading-and-alert/LoadingCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { showUserPosts } from '../redux/postsSlice';

export default function UserDetails ()
{
  const dispatch = useDispatch()
  const userPosts = useSelector( state => state.postsSlice.userPosts )

  const { id } = useParams()
  // get info for user 

  const { data, error, isLoading } = useGetUserDetailsQuery( id )

  // get posts for user id 
  const { data: postData, error: postError, isLoading: postIsLoading } = useGetUserPostsQuery( id )

  useEffect( () =>
  {
    if ( postData )
    {
      dispatch( showUserPosts( postData.data ) );
    }
  }, [ postData, dispatch ] );


  const theme = useTheme()
  return (
    <Container sx={ { display: 'flex', justifyContent: 'center', alignItems: 'center' } }>
      { data ? <Box display={ 'flex' } flexDirection={ 'column' } alignItems={ 'center' }>
        <IconButton sx={ { borderRadius: '5px' } } aria-label="settings"   >
          { data.data.profile_image.length > 0 ? <img src={ data.data.profile_image } alt={ '' } style={ { minWidth: '150px !important', minHeight: '150px !important', maxHeight: '150px !important', maxWidth: '150px', borderRadius: '50%', paddingRight: "5px" } } /> : <Avatar sx={ { bgcolor: red[ 500 ], p: 3, width: '50px', height: '50px', boxShadow: '0 0 5px #ddd' } } aria-label="recipe">
            { data.data.name[ 0 ].toUpperCase() }
          </Avatar> }
        </IconButton>
        <Box>
          <Stack p={ 0 } pt={ 2 } gap={ 2 } alignItems={ 'center' } mb={ 2 } sx={ { maxWidth: '345px', minWidth: '345px' } }>
            <Typography sx={ { bgcolor: theme.palette.greyColor.main, color: theme.palette.text.primary, p: 1, borderRadius: '6px', width: '100%', textAlign: 'center', boxShadow: '0 0 5px #dddddd8a', fontSize: 16 } } variant='body1' >Name: <Typography display={ 'inline-flex' } variant='caption' >{ data.data.name }</Typography></Typography>
            <Typography sx={ { bgcolor: theme.palette.greyColor.main, color: theme.palette.text.primary, p: 1, borderRadius: '6px', width: '100%', textAlign: 'center', boxShadow: '0 0 5px #dddddd8a', fontSize: 16 } } variant='body1'>Email : <Typography display={ 'inline-flex' } variant='caption' >{ data.data.email }</Typography></Typography>
          </Stack>
          <Box display={ 'flex' } alignItems={ 'center' } justifyContent={ 'space-between' } gap={ 2 } maxWidth={ '345px' }>
            <Typography sx={ { bgcolor: theme.palette.greyColor.main, color: theme.palette.text.primary, p: 1, pl: 0, borderRadius: '6px', width: '100%', textAlign: 'center', boxShadow: '0 0 5px #dddddd8a' } } variant='caption'>Posts Count: <Typography variant='body2' display={ 'inline-flex' }>{ userPosts ? userPosts.length : data.data.posts_count }</Typography> </Typography>
            <Typography sx={ { bgcolor: theme.palette.greyColor.main, color: theme.palette.text.primary, p: 1, borderRadius: '6px', width: '100%', textAlign: 'center', boxShadow: '0 0 5px #dddddd8a' } } variant='caption'>{ `Comments Count: ` } <Typography variant='body2' display={ 'inline-flex' }>{ data.data.comments_count }</Typography></Typography>
          </Box>
        </Box>
        <Stack gap={ 2 } pt={ 2 }>
          { userPosts && userPosts.map( post => <Post key={ post.id } post={ post } /> ) }
        </Stack>
      </Box> : <LoadingCard /> }
    </Container>
  )
}
