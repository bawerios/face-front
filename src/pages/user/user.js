import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Title from './title';
import { user, userDelete } from '../../services/api'
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

export default function User() {
  const userRole = Cookies.get('user')
  const [data, setData] = useState([])
  const [owner, setOwner] = useState(false)

  const history = useHistory()

  async function handleData() {
    if(userRole === "owner") {
      setOwner(true)
    }
    const response = await user()
    setData(response?.data)
  }

  const classes = useStyles();

  useEffect(() => {
    handleData()
  }, )

  async function handleDelete({user}) {
    if(window.confirm(`Deseja realmente excluir o usuários ${user.name} de email ${user.email} ?`)){
      await userDelete({ userId: user.userId })
      handleData()
    }
  }

  function handleEdit({userId}) {
    history.push({
      pathname: '/userEdit',
      state: { userId }
    })
  }

  function handleCreate() {
    history.push('/userCreate')
  }

  return (
    <React.Fragment>
      <Title>Usuários</Title>
      {owner && <AddIcon className={classes.actions} onClick={() => handleCreate()}></AddIcon>}
      <Table size="small">
        <TableHead>
          <TableRow>
            {owner && <TableCell className={classes.header}>Ação</TableCell>}
            <TableCell className={classes.header}>Nome</TableCell>
            <TableCell className={classes.header}>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item) => (
            <TableRow key={item.userId}>
              {owner && <TableCell className={classes.header}>
                <DeleteIcon className={classes.actions} onClick={() => handleDelete({ user: item })}></DeleteIcon>
                <EditIcon className={classes.actions} onClick={() => handleEdit({ userId: item.userId })}></EditIcon>
              </TableCell>}
              <TableCell className={classes.infos}>{item.name}</TableCell>
              <TableCell className={classes.infos}>{item.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}