import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { orderCreate } from '../../services/api'
import { useHistory } from 'react-router';
import { Text, Div, Separator, Quantity } from './style';
import { mask, unMask } from 'remask';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from "@material-ui/core/FormControl";
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import RemoveIcon from '@material-ui/icons/Remove';

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
  delivery: {
    width: '40%',
  },
  formControl: {
    minWidth: 237,
  },
  input: {
    marginBottom: '12px',
  }
}));

export default function OrderCreate({ location }) {
  const history = useHistory()
  const {clientId} = location.state
  
  const [deliveryDate, setDeliveryDate] = useState('')
  const [orderItems, setOrderItems] = useState([
    { 
      garment: '',
      customization: '',
      print: '',
      pp: 0,
      p: 0,
      m: 0,
      g: 0,
      gg: 0,
    },
  ])
  const [value, setValue] = useState('')
  const [formOfPayment, setFormOfPayment] = useState('')
  const [message, setMessage] = useState('')

  const deliveryDateFormat = e => {
    const originalValue = unMask(e.target.value)

    const maskedValue = mask(originalValue, ['99/99/9999'])
    setDeliveryDate(maskedValue)
  }

  const handleAdd = () => {
    setOrderItems([...orderItems, {
      garment: '',
      customization: '',
      print: '',
      pp: 0,
      p: 0,
      m: 0,
      g: 0,
      gg: 0,
    }])
  }

  const handleLess = (index) => {
    const values = [...orderItems]
    values.splice(index, 1)
    setOrderItems(values)
  }

  const handleChangeInput = (index, event) => {
    const values = [...orderItems]
    values[index][event.target.name] = event.target.value
    setOrderItems(values)
  }

  const handleChange = (event) => {
    setFormOfPayment(event.target.value)
  }

  const classes = useStyles();

  async function handleSubmit() {
    if(deliveryDate.length < 8) {
      setMessage("Data incompleta")
    } else {
      const response = await orderCreate({ deliveryDate, orderItems, formOfPayment, clientId, value })
      if (response.status === 201) {
        history.push("/order")
      } else {
        setMessage(response.data.error)
      }
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddShoppingCartIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Criar pedido
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <TextField
                className={classes.delivery}
                variant="outlined"
                required
                id="deliveryDate"
                label="Data de entrega"
                value={deliveryDate}
                name="deliveryDate"
                onChange={deliveryDateFormat}
              />
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Método de pagamento *</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={formOfPayment}
                  onChange={handleChange}
                  label="Método de pagamento"
                >
                  <MenuItem value="Transferência Bradesco">
                    <em>Transferência Bradesco</em>
                  </MenuItem>
                  <MenuItem value={"Transferência Itaú"}>Transferência Itaú</MenuItem>
                </Select>
             </FormControl>
            </Grid>
            { orderItems.map((orderItems, index) => (
              <Grid item sm={12}>
                <Grid item xs={12}>
                  <TextField
                    className={classes.input}
                    variant="outlined"
                    required
                    fullWidth
                    id="garment"
                    label="Peça"
                    name="garment"
                    value={orderItems.garment}
                    onChange={event => handleChangeInput(index, event)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.input}
                    variant="outlined"
                    required
                    multiline
                    fullWidth
                    name="customization"
                    label="Customização"
                    type="customization"
                    id="customization"
                    value={orderItems.customization}
                    onChange={event => handleChangeInput(index, event)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    multiline
                    fullWidth
                    name="print"
                    label="Estampa"
                    type="print"
                    id="print"
                    value={orderItems.print}
                    onChange={event => handleChangeInput(index, event)}
                  />
                </Grid>
                <Quantity>Quantidade total de peças: {
                  isNaN(
                    parseInt(orderItems.pp) 
                    + parseInt(orderItems.p) 
                    + parseInt(orderItems.m) 
                    + parseInt(orderItems.g) 
                    + parseInt(orderItems.gg))
                    ? "Preencha todos os tamanhos com números"
                    : (
                      parseInt(orderItems.pp) 
                    + parseInt(orderItems.p) 
                    + parseInt(orderItems.m)
                    + parseInt(orderItems.g) 
                    + parseInt(orderItems.gg)
                      )
                }</Quantity>
                <Div>
                  <Grid item xs={2}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="pp"
                      label="PP"
                      type="pp"
                      id="pp"
                      value={orderItems.pp}
                      onChange={event => handleChangeInput(index, event)}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="p"
                      label="P"
                      type="p"
                      id="p"
                      value={orderItems.p}
                      onChange={event => handleChangeInput(index, event)}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="m"
                      label="M"
                      type="m"
                      id="m"
                      value={orderItems.m}
                      onChange={event => handleChangeInput(index, event)}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="g"
                      label="G"
                      type="g"
                      id="g"
                      value={orderItems.g}
                      onChange={event => handleChangeInput(index, event)}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="gg"
                      label="GG"
                      type="gg"
                      id="gg"
                      value={orderItems.gg}
                      onChange={event => handleChangeInput(index, event)}
                    />
                  </Grid>
                  {index > 0 && <Avatar className={classes.avatar}>
                    <RemoveIcon className={classes.icons} onClick={() => handleLess(index)} />
                  </Avatar>}
                </Div>
                <Separator />
              </Grid>
            )) }
            <Avatar className={classes.avatar}>
              <AddOutlinedIcon className={classes.icons} onClick={() => handleAdd()} />
            </Avatar>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                multiline
                fullWidth
                name="value"
                label="Valor"
                type="value"
                id="value"
                onChange={e => setValue(e.target.value)}
              />
            </Grid>
          </Grid>
          <Text>{message}</Text>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Criar pedido
          </Button>
          <Grid container justify="flex-end">
          </Grid>
        </form>
      </div>
    </Container>
  );
}