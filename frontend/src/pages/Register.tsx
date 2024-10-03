import { Box, Typography, Button, Container, FormControl, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { IRegister } from "../interfaces/IRegisterInterface"
import axios from 'axios'
const Register = () => {
  const navigate = useNavigate()
  const [registerDetail, setRegisterDetail] = useState<IRegister>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  })
  const [error, setError] = useState<boolean>(false)
  const handleRegister = async () => {
    if (registerDetail.email == '' || registerDetail.firstName == "" || registerDetail.lastName == "", registerDetail.password == '') {
      setError(true)
    }
    setError(false)
    try {
      const response = await axios.post('http://localhost:3000/auth/register', registerDetail)
      console.log(response.data)
      Swal.fire('Success', '', 'success')
    } catch (error) {

      Swal.fire(error?.response?.data?.message, '', 'error')
    }
  }
  return (
    <Container maxWidth='xl' sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '90vh'
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 500,
        boxShadow: 4,
        paddingX: 4,
        paddingY: 2,

      }}>
        <Typography variant='h3' textAlign="center">Register</Typography>
        <FormControl fullWidth sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          marginTop: 3,
        }}>
          <TextField required label='Email' variant='outlined' error={error} onChange={(e) => setRegisterDetail({ ...registerDetail, email: e.target.value })} />
          <TextField required label='First Name' variant='outlined' error={error} onChange={(e) => setRegisterDetail({ ...registerDetail, firstName: e.target.value })} />
          <TextField required label='Last Name' variant='outlined' error={error}
            onChange={
              (e) => setRegisterDetail({ ...registerDetail, lastName: e.target.value })
            }
          />
          <TextField required label='Password' variant='outlined' error={error} onChange={
            (e) => setRegisterDetail({ ...registerDetail, password: e.target.value })
          } />
          <Typography sx={{ fontSize: 18 }}
            onClick={() => navigate('/login')}
          >Already have account ? <span style={{ textDecoration: 'underline', color: 'blue', }}>Login</span></Typography>
        </FormControl>
        <Box sx={{
          marginTop: 3,
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
          <Button variant='contained' onClick={handleRegister}  >Register</Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Register
