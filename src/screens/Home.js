import React, { useState } from "react"
import GoogleLogin from "react-google-login"
import { Grid, Container, CircularProgress } from "@material-ui/core"
import googleimg from "../images/google.png"
import { useDispatch, useSelector } from "react-redux"
import "./home.css"
import { OauthLogin } from "../actions/oauthAction"

const Home = ({ history }) => {
  const dispatch = useDispatch()
  const packageid = "602f94f28be78a84324eeb1a"
  const getOauth = useSelector((state) => state.getOauth)
  const { loading, oauth, error } = getOauth
  const [isLoading, setIsLoading] = useState(false)

  const resgoogle = async (response) => {
    console.log("abc")
    setIsLoading(true)

    console.log(
      response.profileObj.email,
      response.profileObj.name,
      response.profileObj.imageUrl,
      response.tokenObj.access_token,
      response.tokenObj.expires_at,
      response.tokenObj.expires_in
    )
    if (response) {
      console.log("abc", response, "asd", response.profileObj.name)
      await dispatch(
        OauthLogin(
          response.profileObj.name,
          response.profileObj.email,
          response.profileObj.imageUrl,
          response.tokenObj.access_token,
          response.tokenObj.expires_in,
          response.tokenObj.expires_at,
          packageid
        )
      )
      setIsLoading(false)
      console.log("def")

      // console.log("abc22")

      // history.push("/graph")
    }
  }

  return (
    <div style={{ display: "flex" }}>
      <div className="hhh">
        <Container>
          <div style={{ textAlign: "center", height: 20 }}>
            <h1>Netbook</h1>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",

              justifyContent: "center",
              height: "calc(100vh - 20px)",
            }}
          >
            <h2>Login to your account</h2>
            <div style={{ height: 15 }}></div>           {" "}
            {isLoading ? (
              <div style={{ textAlign: "center" }}>
                                <CircularProgress />               {" "}
                <p>
                  It may take a few seconds while signing up or logging in...
                </p>
                             {" "}
              </div>
            ) : (
              <GoogleLogin
                theme="dark"
                className="button"
                clientId="542443202716-1162el1e1nqk02h64h08frl40vsl5hgp.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={resgoogle}
                // onFailure={resgoogle}
                isSignedIn={true}
                cookiePolicy={"single_host_origin"}
              />
            )}
          </div>
        </Container>
      </div>

      <div style={{ flex: 1 }}>
        <div className="img"></div>
      </div>
    </div>
  )
}

export default Home
