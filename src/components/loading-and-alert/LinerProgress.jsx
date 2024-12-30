import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';

export default function LinerProgress ()
{
  return (
    <Container sx={{position:'relative'}} >
      <Box sx={ { display: 'flex' ,alignItems:'center',justifyContent:'center',maxWidth:1,position:'absolute',bottom:'50px',left:'50%'} }>
        <CircularProgress />
      </Box>
    </Container>
  );
}