import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Title from './title';
import { client, clientDelete } from '../../services/api'
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

export default function Client() {
  const userRole = Cookies.get('user')
  const [data, setData] = useState([])
  const [owner, setOwner] = useState(false)

  const history = useHistory()

  async function handleData() {
    if(userRole === "owner") {
      setOwner(true)
    }
    const response = await client()
    setData(response?.data)
  }

  const classes = useStyles();

  useEffect(() => {
    handleData()
  }, )

  async function handleDelete({client}) {
    if(window.confirm(`Deseja realmente excluir o cliente ${client.name} de CNPJ ${client.cnpj} ?`)){
      await clientDelete({ clientId: client.clientId })
      handleData()
    }
  }

  function handleEdit({clientId}) {
    history.push({
      pathname: '/clientEdit',
      state: { clientId }
    })
  }

  function handleAddOrder({clientId}) {
    history.push({
      pathname: '/orderCreate',
      state: { clientId }
    })
  }

  function handleCreate() {
    history.push('/clientCreate')
  }

  return (
    <React.Fragment>
      <Title>Clientes</Title>
      <AddIcon className={classes.actions} onClick={() => handleCreate()}></AddIcon>
      <Table size="small">
        <TableHead>
          <TableRow>
            {owner && <TableCell className={classes.header}>Ação</TableCell>}
            <TableCell className={classes.header}>Nome</TableCell>
            <TableCell className={classes.header}>Email</TableCell>
            <TableCell className={classes.header}>CNPJ</TableCell>
            <TableCell className={classes.header}>Telefone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item) => (
            <TableRow key={item.clientId}>
              {owner && <TableCell className={classes.header}>
                <AddShoppingCartIcon className={classes.actions} onClick={() => handleAddOrder({ clientId: item.clientId })}></AddShoppingCartIcon>
                <DeleteIcon className={classes.actions} onClick={() => handleDelete({ client: item })}></DeleteIcon>
                <EditIcon className={classes.actions} onClick={() => handleEdit({ clientId: item.clientId })}></EditIcon>
              </TableCell>}
              <TableCell className={classes.infos}>{item.name}</TableCell>
              <TableCell className={classes.infos}>{item.email}</TableCell>
              <TableCell className={classes.infos}>{item.cnpj}</TableCell>
              <TableCell className={classes.infos}>{item.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}