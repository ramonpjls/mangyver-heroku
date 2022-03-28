import React, { useState, useEffect } from 'react'
import {
  Button,
  Grid,
  MenuItem,
  TextField,
  Select,
  InputLabel,
} from '@mui/material'
import axios from '../../axiosinstance'

//todos los campos seran requeridos menos codigo sap y subarea

const UserForm = ({ userValue }) => {
  const [operations, setOperations] = useState([])
  const [role, setRole] = useState([])
  const [area, setArea] = useState([])

  const [user, setUser] = useState(userValue)
  
  const HandleSubmit = (e) => {
    e.preventDefault()
    console.log(user)

    axios
      .put(`/users/${userValue.id}?auth=${ user.auth === 'active'? 'true': 'false' }`, { user })
      .then((res) => {
        console.log('LA RESPUESTA', res)
        window.location.reload()
      })
      .catch((err) => {
        console.warn(err)
      })
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await Promise.all([
        axios.get('/operations'),
        axios.get('/roles'),
        axios.get('/areas'),
      ])

      setOperations(res[0].data)
      setRole(res[1].data)
      setArea(res[2].data)
    }

    fetchData()
  }, [])

  const handleChange = ({target}) => {
    setUser({ 
      ...user, 
      [target.name]: target.value 
    })
  }

  return (
    <div>
      <form style={{ paddingTop: '1rem' }} onSubmit={HandleSubmit}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            container
            spacing={4}
            alignItems="stretch"
            direction="column"
            justifyContent="center"
          >
            <Grid
              container
              item
              alignItems="center"
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Grid item xs={8}>
                <InputLabel> Nombres </InputLabel>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  name="name"
                  value={ user?.name || '' }
                  onChange={ handleChange }
                />
              </Grid>
            </Grid>
            <Grid
              container
              item
              alignItems="center"
              direction="row"
              justifyContent="center"
            >
              <Grid item xs={8}>
                <InputLabel> Email </InputLabel>
                <TextField
                  variant="outlined"
                  fullWidth
                  type="email"
                  size="small"
                  name="email"
                  value={ user?.email || '' }
                  onChange={ handleChange }
                />
              </Grid>
            </Grid>
            <Grid
              container
              item
              alignItems="center"
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Grid item xs={4}>
                <InputLabel> Codigo SAP </InputLabel>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  type="text"
                  name="SAPCode"
                  value={ user?.SAPCode || '' }
                  onChange={ handleChange }
                />
              </Grid>
              <Grid item xs={4}>
                <InputLabel> Usuario SAP </InputLabel>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  type="text"
                  name="SAPUser"
                  value={ user?.SAPUser || '' }
                  onChange={ handleChange }
                />
              </Grid>
            </Grid>
            <Grid
              container
              item
              alignItems="center"
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Grid item xs={4}>
                <InputLabel> Operacion </InputLabel>
                <Select
                  id="departamento"
                  variant="outlined"
                  fullWidth
                  required
                  name="operation"
                  value={ user?.operation?.id || user?.operation || '' }
                  onChange={ handleChange }
                  size="small"
                >
                  {operations.map((elemento) => (
                    <MenuItem key={elemento.id} value={elemento.id}>
                      {elemento.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={4}>
                <InputLabel> Rol </InputLabel>
                <Select
                  id="role"
                  variant="outlined"
                  fullWidth
                  required
                  name="role"
                  value={ user?.role?.id || user?.role || '' }
                  onChange={ handleChange }
                  size="small"
                >
                  {role.map((elemento) => (
                    <MenuItem key={elemento.id} value={elemento.id}>
                      {elemento.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
            <Grid
              container
              item
              alignItems="center"
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Grid item xs={4}>
                <InputLabel> Area </InputLabel>
                <Select
                  id="departamento"
                  variant="outlined"
                  fullWidth
                  required
                  name="area"
                  value={ user?.area?.id || user?.area || '' }
                  onChange={ handleChange }
                  size="small"
                >
                  {area.map((elemento) => (
                    <MenuItem key={elemento.id} value={elemento.id}>
                      {elemento.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={4}>
                <InputLabel> Estatus </InputLabel>
                <Select
                  id="role"
                  variant="outlined"
                  fullWidth
                  required
                  name="auth"
                  value={ user?.auth }
                  onChange={ handleChange }
                  size="small"
                >
                  <MenuItem value={'pending'}>Pendiente</MenuItem>
                  <MenuItem value={'active'}>activo</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Grid
              container
              item
              alignItems="center"
              justifyContent="space-evenly"
            >
              <Grid>
                <Button type="submit" color="primary" variant="contained">
                  Actualizar usuario
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default UserForm
