import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import PageviewIcon from '@material-ui/icons/Pageview';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { orderById } from '../../services/api'
import { useHistory } from 'react-router';
import { Div, Separator, Quantity } from './style';

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
  input: {
    marginBottom: '12px',
  }
}));

export default function OrderEdit({ location }) {
  const { orderId } = location.state

  const classes = useStyles();
  const history = useHistory()

  const [deliveryDate, setDeliveryDate] = useState('')
  const [orderItems, setOrderItems] = useState([])
  const [clientName, setClientName] = useState('')
  const [status, setStatus] = useState('')
  const [formOfPayment, setFormOfPayment] = useState('')
  const [value, setValue] = useState('')

  useEffect(() => {
    async function handleOrder() {
      const response = await orderById({ orderId })
      setDeliveryDate(response.data.deliveryDate)
      setOrderItems(response.data.orderItems)
      setStatus(response.data.status)
      setFormOfPayment(response.data.formOfPayment)
      setClientName(response.data.clientName)
      setValue(response.data.value)
    }
    handleOrder()
  }, [orderId])

  async function handleEditOrder() {
    history.push("/order")
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PageviewIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Pedido
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                disabled
                fullWidth
                autoFocus
                label="Código do pedido"
                value={orderId}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                disabled
                fullWidth
                autoFocus
                label="Cliente"
                value={clientName}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                disabled
                fullWidth
                autoFocus
                label="Data que o pedido deve ser entregue."
                value={deliveryDate}
              />
            </Grid>
            { orderItems.map((orderItems) => (
              <Grid item sm={12}>
                <Grid item xs={12}>
                  <TextField
                    className={classes.input}
                    variant="outlined"
                    disabled
                    fullWidth
                    id="garment"
                    label="Peça"
                    name="garment"
                    value={orderItems.garment}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.input}
                    variant="outlined"
                    disabled
                    multiline
                    fullWidth
                    name="customization"
                    label="Customização"
                    type="customization"
                    id="customization"
                    value={orderItems.customization}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    disabled
                    multiline
                    fullWidth
                    name="print"
                    label="Estampa"
                    type="print"
                    id="print"
                    value={orderItems.print}
                  />
                </Grid>
                <Quantity>Quantidade total de peças: {
                  isNaN(parseInt(orderItems.pp) 
                  + parseInt(orderItems.p) 
                  + parseInt(orderItems.m) 
                  + parseInt(orderItems.g) 
                  + parseInt(orderItems.gg))
                  ? "Preencha todos os tamanhos com números"
                  : (parseInt(orderItems.pp) 
                  + parseInt(orderItems.p) 
                  + parseInt(orderItems.m) 
                  + parseInt(orderItems.g) 
                  + parseInt(orderItems.gg))

                }</Quantity>
                <Div>
                  <Grid item xs={2}>
                    <TextField
                      variant="outlined"
                      disabled
                      fullWidth
                      name="pp"
                      label="PP"
                      type="pp"
                      id="pp"
                      value={orderItems.pp}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      variant="outlined"
                      disabled
                      fullWidth
                      name="p"
                      label="P"
                      type="p"
                      id="p"
                      value={orderItems.p}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      variant="outlined"
                      disabled
                      fullWidth
                      name="m"
                      label="M"
                      type="m"
                      id="m"
                      value={orderItems.m}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      variant="outlined"
                      disabled
                      fullWidth
                      name="g"
                      label="G"
                      type="g"
                      id="g"
                      value={orderItems.g}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      variant="outlined"
                      disabled
                      fullWidth
                      name="gg"
                      label="GG"
                      type="gg"
                      id="gg"
                      value={orderItems.gg}
                    />
                  </Grid>
                </Div>
                <Separator />
              </Grid>
            )) }
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                disabled
                fullWidth
                label="Status do pedido"
                value={status}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                disabled
                fullWidth
                label="Forma de pagamento"
                value={formOfPayment}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                disabled
                fullWidth
                value={value}
                label="Valor do pedido"
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleEditOrder}
          >
            Pedidos
          </Button>
        </form>
      </div>
    </Container>
  );
}