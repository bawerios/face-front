import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { makeStyles } from '@material-ui/core/styles';
import Title from './title';
import { order, orderDelete } from '../../services/api'
import { useHistory } from 'react-router';
import Cookies from 'js-cookie'

const useStyles = makeStyles((theme) => ({
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  infos:{
    textAlign: 'center',
  },
  actions: {
    cursor: 'pointer',
  },
}));

export default function Orders() {
  const userRole = Cookies.get('user')
  const [data, setData] = useState([])
  const [owner, setOwner] = useState(false)

  const history = useHistory()

  async function handleData() {
    if(userRole === "owner") {
      setOwner(true)
    }
    const response = await order()
    setData(response?.data)
  }

  const classes = useStyles();

  useEffect(() => {
    handleData()
  },)

  async function handleDelete({order}) {
    if(window.confirm(`Deseja realmente excluir o orçamento do cliente ${order.clientName}, que esta com status ${order.status} ?`)){
      await orderDelete({ orderId: order.orderId })
      handleData()
    }
  }

  function handleEdit({orderId}) {
    history.push({
      pathname: '/orderEdit',
      state: { orderId }
    })
  }

  function handleView({orderId}) {
    history.push({
      pathname: '/orderView',
      state: { orderId }
    })
  }

  function handleCreate() {
    history.push('/client')
  }

  return (
    <React.Fragment>
      <Title>Pedidos</Title>
      <AddIcon className={classes.actions} onClick={() => handleCreate()}></AddIcon>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell className={classes.header}>Ação</TableCell>
            <TableCell className={classes.header}>Data de Solicitação</TableCell>
            <TableCell className={classes.header}>Data de entrega</TableCell>
            <TableCell className={classes.header}>Status</TableCell>
            <TableCell className={classes.header}>Forma de pagamento</TableCell>
            <TableCell className={classes.header}>Cliente</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item) => (
            <TableRow key={item.orderId}>
              <TableCell className={classes.header}>
                {owner && <DeleteIcon className={classes.actions} onClick={() => handleDelete({ order: item })}></DeleteIcon>}
                {owner && <EditIcon className={classes.actions} onClick={() => handleEdit({ orderId: item.orderId })}></EditIcon>}
                <VisibilityIcon className={classes.actions} onClick={() => handleView({ orderId: item.orderId })}></VisibilityIcon>
              </TableCell>
              <TableCell className={classes.infos}>{item.orderCreationDate}</TableCell>
              <TableCell className={classes.infos}>{item.deliveryDate}</TableCell>
              <TableCell className={classes.infos}>{item.status}</TableCell>
              <TableCell className={classes.infos}>{item.formOfPayment}</TableCell>
              <TableCell className={classes.infos}>{item.clientName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}