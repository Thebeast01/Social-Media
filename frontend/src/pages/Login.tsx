import { Box, Container, TextField, Typography, FormControl, Button } from "@mui/material"
import { useState } from "react"
import { ILogin } from "../interfaces/ILoginInterface"
import axios from "axios"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
const Login = () => {
  const navigate = useNavigate();
  const [loginDetail, setLoginDetail] = useState<ILogin>({
    email: '',
    password: '',

  })


  const [error, setError] = useState<boolean>(false)
  const handleLogin = async () => {
    if (loginDetail.password == "" || loginDetail.email == "") {
      setError(true)
    }
    try {
      const response = await axios.post('http://localhost:3000/auth/login', loginDetail)
      console.log('response', response)
      if (response?.data?.user) {
        navigate('/')
        Swal.fire('Success', '', 'success')
      }

    } catch (error) {
      Swal.fire('error', 'Invalid Credential', 'error')
    }
    console.log(loginDetail)
  }
  return (
    <Container maxWidth='xl'
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
        , height: '90vh'
      }}
    >

      <Box sx={{

        height: 400,
        width: 500,
        boxShadow: 6,
        display: 'flex',
        flexDirection: 'column',
        paddingX: 5,
        paddingY: 3,
        gap: 4,
        borderRadius: 5

      }}>
        <Typography variant="h3" textAlign={'center'}> Login </Typography>
        <FormControl sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,

        }} fullWidth>
          <TextField label="Email" variant={'outlined'} error={error} required
            onChange={(e) => setLoginDetail({ ...loginDetail, email: e.target.value })
            }
            sx={{
              fontSize: 18,
              fontWeight: 'bold'
            }}
          />
          <TextField label="Password" variant={'outlined'} error={error} required
            onChange={(e) => setLoginDetail({ ...loginDetail, password: e.target.value })
            }
          />
        </FormControl>
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 3,
        }}>
          <Button type="submit" variant="contained" onClick={() => navigate('/register')}>Register</Button>
          <Button type="submit" onClick={handleLogin} variant="contained" sx={{ backgroundColor: 'green' }}>Login</Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Login
