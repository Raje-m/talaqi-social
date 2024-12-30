
import { Container, } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetPostDetailsQuery } from '../redux/apiSlice';
import Post from './Post';
import LoadingCard from './loading-and-alert/LoadingCard';
export default function PostDetails ()
{
  const { id } = useParams()

  // eslint-disable-next-line no-unused-vars
  const { data: post, error, isLoading } = useGetPostDetailsQuery( id )
  return (
    <Container sx={ { display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' ,minHeight:'100vh',py:5} }>
      { post ? <Post post={ post.data } /> : <LoadingCard /> }
    </Container>
  )
}
