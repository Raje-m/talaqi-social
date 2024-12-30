/* eslint-disable react/prop-types */
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Badge, Box, Button, CardActionArea, Divider, Stack, TextField, Tooltip } from '@mui/material';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import { useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { delPost, openDialog, postToUpdate, showAlert } from '../redux/postsSlice';
import Comment from './Comment';
import { useAddCommentMutation, useGetPostDetailsQuery } from '../redux/apiSlice';
import { useState } from 'react';
import {  AddComment } from '@mui/icons-material';
export default function Post ( { post } )
{

  const dispatch = useDispatch()
  const userInfo = useSelector( state => state.postsSlice.userInfo );

  const [ allComments, setAllComments ] = useState( post.comments );
  // use it when i click on add comment it will be true this main open text Field to add comment 
  const [ isAddComment, setIsAddComment ] = useState( false )
  // use it when i click on show comment it will be true this main show All Comment
  const [ showComments, setShowComments ] = useState( false )
  // read data from text field 
  const [ commentInput, setCommentInput ] = useState( '' )
  // add comment 
  const [ addComment ] = useAddCommentMutation()

  const { id, body, comments_count, image, title, tags, created_at } = post;

  const { id: userId, email, name, profile_image } = post.author

  const theme = useTheme()

  //get Post Details to show comments
  const  { data, error,  } =  useGetPostDetailsQuery( id )
  if ( error )
  {
    // console.log( 'Error is  ', error );
  }

  //  update post 
  const handleUpdatePost = ( post ) =>
  {
    dispatch( postToUpdate( post ) )
    dispatch( openDialog( {  updatePost: true } ))
  }


  // del post 
  const handleDelPost = ( post ) =>
  {
    dispatch( delPost( { post } ) )
  }

// show comments 
  const handleShowComments = (  ) =>
  {
    setShowComments( prev => !prev );
    if ( !showComments )
    {
      setAllComments( data?.data.comments || [] ); 
    }    
  }


  // addComment
  const handleAddComment = async () =>
  {
    if ( !commentInput.trim() )
    {
      dispatch( showAlert( { isShow: true, msg: 'Please Add Any Thing Not Space', alertColor: 'error' } ))
      return;
    }
    try
    {
      const commentJson = JSON.stringify( { body: commentInput } );
      const { data } = await addComment( { id, commentJson } ).unwrap();
      setShowComments( true );
      setAllComments( allComments ? [ ...allComments, data ] : [ data ] )
      
      setCommentInput( '' );
    } catch ( error )
    {
      dispatch( showAlert( { isShow: true, msg: error, alertColor: 'error' } ))
    }
  };
  return (
    <Card key={ id } sx={ { maxWidth: '100%', minWidth: 300 ,width:345} }>
      <CardHeader sx={ { '.MuiCardHeader-content': { flex: 0 }, padding: '10px 10px 10px 0' } }
        action={
          <Box display={ 'flex' } alignItems={ 'center' } justifyContent={ 'space-between' } sx={ { '.MuiCardHeader-action': { width: '100% !important' } } }>
            <Link to={ `/userDetails/${ userId }` } style={ { textDecoration: 'none' } }>
              <IconButton sx={ { borderRadius: '5px' } } aria-label="settings"   >
                { profile_image.length > 0 ? <img src={ profile_image } alt={ name } style={ { width: '40px', height: '40px', borderRadius: '50%', paddingRight: "5px" } } /> : <Avatar sx={ { bgcolor: red[ 500 ], mr: 2 } } aria-label="recipe">
                  { name[ 0 ].toUpperCase() }
                </Avatar> }
                <Stack alignItems={ 'flex-start' } justifyContent={ 'center' }  >
                  <Typography variant='subtitle1' fontSize={ 14 } >{ name }</Typography>
                  <Typography variant='subtitle2' color='text.secondary' fontSize={ 11 } >{ email }</Typography>
                </Stack>
              </IconButton>
            </Link>
            {/* if user create this post show button del and edit  */ }
            { userInfo.user && userInfo.user.id === post.author.id && <Stack direction={ 'row' } gap={ 1 }>
              <Button variant='contained' size='small' onClick={ () => { handleUpdatePost( post ) } } sx={ { fontSize: '10px', minWidth: '20px', p: '3px 6px' } }>Edit</Button>
              <Button variant='contained' size='small' onClick={ () => { handleDelPost( post ) } } sx={ { fontSize: '10px', minWidth: '20px', p: '3px 6px' } }>Del</Button>
            </Stack> }

          </Box>
        }

      />
      <Link to={ `/postdetails/${ id }` } style={ { textDecoration: 'none' } }>
        <CardActionArea >
          <CardMedia
            component="img"
            height="194"
            image={ `${ image }` }
            alt={ '' }
          />
          <CardContent sx={ { pt: 1 } }>
            <Typography variant='body2' component={ 'div' } sx={ { textAlign: 'right', fontSize: 8, color: 'text.secondary' } } >{ created_at }</Typography>
            <Typography variant="subtitle1" sx={ { color: 'text.primary', pt: 1 } }>
              { title }
            </Typography>
            <Typography variant="body2" sx={ { color: 'text.secondary' } }>
              { body }
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>

        <CardActions >
          <IconButton aria-label="comments" onClick={()=>handleShowComments(id)} >
            <Badge badgeContent={allComments?allComments.length:comments_count } color={ "error" }>
              <CommentOutlinedIcon fontSize='small' color="action" />
            </Badge>
          </IconButton>
          <Typography variant='subtitle1' fontSize={ 14 }> </Typography>
          <Box display={ 'flex' } alignItems={ 'center' } gap={ 1 } flexWrap={ 'wrap' }>

            { tags && tags.map( ele => <Typography key={ ele } variant='caption' p={ '2px 5px' } fontSize={ 10 } sx={ { borderRadius: '5px', color: theme.palette.text.primary } } bgcolor={ theme.palette.favColor.main }>
              { ele }
            </Typography> ) }
        </Box>
      {userInfo.token!='' && <Tooltip title="Add Comment" placement="top">
        <IconButton aria-label="comments" onClick={ () => setIsAddComment(!isAddComment ) } >
            <AddComment fontSize='small' color="action" />
        </IconButton>
      </Tooltip>}
        </CardActions>
      <Stack alignItems={ 'center' }>
        { showComments && allComments.map( ( comment, index ) =>
        {
          return (
            <Box key={ comment.id } sx={ { width: '100%' } } >
              <Comment key={ index } comment={ comment } />
              { allComments.length - 1 !== index && <Divider sx={ { borderColor: "#fff", width: '100%', height: '2px' } } /> }
            </Box> )
        } )
          
        }
      </Stack>

    {isAddComment&&  <Box sx={ { position: 'relative' } }>
        <TextField size='medium' fullWidth value={commentInput} onChange={ ( e ) => { setCommentInput( e.target.value ) } }></TextField>
        <Button variant='contained' color='error' onClick={ handleAddComment } disabled={commentInput==[]} sx={ { position: 'absolute', top: 1, right: 0, bottom: 1, width: 100, fontSize: '8px' } }>Add Comment</Button>
      </Box>}

    </Card >
  )
}
