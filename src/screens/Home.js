import React from 'react'
import GoogleLogin from 'react-google-login'
import { Grid, Container } from '@material-ui/core'
import googleimg from '../images/google.png'
import './home.css'

const Home = () => {
  const resgoogle = (response) => {
    console.log(response)
    console.log(response.profileObj)
  }

  return (
    <div>
      <Grid container>
        <Grid item sm={4} xs={12}>
          <Container>
            <h1>Pablo's App</h1>
            <h1>Login to your account</h1>
            <GoogleLogin
              className='button'
              clientId='542443202716-1162el1e1nqk02h64h08frl40vsl5hgp.apps.googleusercontent.com'
              buttonText='Login with Google'
              onSuccess={resgoogle}
              onFailure={resgoogle}
              cookiePolicy={'single_host_origin'}
            />
          </Container>
        </Grid>

        <Grid item sm={8} xs={12}>
          <img
            src={googleimg}
            alt='my-img'
            style={{
              width: '70%',
              height: 600,
              display: 'block',
              margin: 'auto',
            }}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default Home
