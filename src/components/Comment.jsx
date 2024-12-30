/* eslint-disable react/prop-types */
import { useTheme } from '@emotion/react'
import { Avatar, IconButton, Stack, Typography } from '@mui/material'
import { red } from '@mui/material/colors';
import { Link } from 'react-router-dom';

export default function Comment ( { comment} )
{

  const { author, body}  = comment;
  const {id, name, profile_image } = author;
  const theme=useTheme()
  return (
    <Stack  alignItems={ 'flex-start' } justifyContent={ 'center' } width={ '100%' } bgcolor={ theme.palette.greyColor.main }>
      <Link to={ `/userDetails/${ id }` } style={ { textDecoration: 'none', width: '100%' } }>
        <IconButton sx={ { borderRadius: '5px', bgcolor:'#2b2b2f82',width:'100%' ,display:'flex',justifyContent:'flex-start',alignItems:'center'} } aria-label="settings"   >        
        {
          profile_image.length > 0 ? <img src={ profile_image } alt={ name } style={ { width: '25px', height: '25px', borderRadius: '50%', paddingRight: "5px" } } /> : <Avatar sx={ { bgcolor: red[ 500 ], mr: 1,width:'25px',height:'25px' } } aria-label="recipe">
          { name[ 0 ].toUpperCase() }
        </Avatar> }
        <Stack alignItems={ 'flex-start' } justifyContent={ 'center' }  >
          <Typography variant='subtitle1' fontSize={ 14 }  >{ name }</Typography>
        </Stack>
        </IconButton>
        </Link>
      <Typography  variant='body2'  sx={{padding:'5px 5px 5px 15px'}} >{ body}</Typography>
    </Stack>
  )
}
