import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { clientCreate } from '../../services/api'
import { useHistory } from 'react-router';
import { Text } from './style'
import { mask, unMask } from 'remask';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ClientCreate() {
  const classes = useStyles();
  const history = useHistory()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [phone, setPhone] = useState()
  const [message, setMessage] = useState(false)

  const emailFormat = e => {
    const originalValue = unMask(e.target.value)

    const maskedValue = mask(originalValue, ['99.999.999/9999-99'])
    setCnpj(maskedValue)
  }

  async function handleCreateClient() {
    const response = await clientCreate({ name, email, cnpj, phone })
    if(response.data.error === 'Client already exists.'){
      setMessage("CNPJ já existente na base de dados.")
    } else if (response.status === 400) {
      setMessage("Campos incorretos.")
    } else {
      history.push("/client")
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonAddOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Criar cliente
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Nome"
                autoFocus
                onChange={e => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Email"
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="CNPJ"
                value={cnpj}
                onChange={emailFormat}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Telefone"
                onChange={e => setPhone(e.target.value)}
              />
            </Grid>
          </Grid>
          <Text>{message}</Text>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleCreateClient}
          >
            Cadastrar cliente
          </Button>
        </form>
      </div>
    </Container>
  );
}