import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { register } from '../../services/api'
import { useHistory } from 'react-router';
import { Text } from './style'

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

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  async function handleRegister() {
    const reg = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/
    if (reg.test(email) === true && password.length > 2 && name.length > 0) {
      const response = await register({ name, email, password })
      if(response.data.error === "User already exists.") {
        setMessage('Email já cadastrado!')
      } else {
        history.push("/")
      }
    } else {
      setMessage('Email, senha ou nome inválidos!')
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
          Cadastrar-se
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
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Text>{message}</Text>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleRegister}
          >
            Cadastrar
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Já possui uma conta? Faça login
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}