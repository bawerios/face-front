import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { signin, orderByIdStatus } from '../../services/api'
import { useHistory } from 'react-router';
import { Text } from './style'
import Cookies from 'js-cookie'


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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  text: {
    color: 'black',
    textAlign: 'center',
    marginTop: '30%'
  },
  textStatus: {
    color: '#F50057',
    textAlign: 'center',
  }
}));

export default function SignIn() {
  const history = useHistory()
  const classes = useStyles();
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [status, setStatus] = useState('')
  const [orderId, setOrderId] = useState('')
  const [message, setMessage] = useState(false)

  async function handleViewStatus() {
    const response = await orderByIdStatus({ orderId })
    setStatus(response.data.status || "Pedido não encontrado")
  }

  async function handleLogin() {
    const response = await signin({ email, password })
    if(response.data.auth === true) {
      const token = response.data.token
      const user = response.data.user
      Cookies.set('token', token, {sameSite: "Lax"})
      Cookies.set('user', user.role, {sameSite: "Lax"})
      history.push('/order')
    } else {
      setMessage("Email ou senha inválidos!")
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Entrar
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
          />
          <Text>{message}</Text>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLogin}
          >
            Entrar
          </Button>
        </form>
      </div>
      <Typography component="h1" variant="h5" className={classes.text}>
        Ver status do seu pedido
      </Typography>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="orderId"
        label="Código do pedido"
        name="orderId"
        autoComplete="orderId"
        autoFocus
        onChange={e => setOrderId(e.target.value)}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={handleViewStatus}
      >
        Ver status do seu pedido
      </Button>
      <Typography component="h1" variant="h5" className={classes.textStatus}>
        {status && `Seu pedido: ${status}`}
      </Typography>
    </Container>
  );
}