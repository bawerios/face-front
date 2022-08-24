import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Content, Page, Pages } from './style'
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from 'react-router';
import Cookies from 'js-cookie'
import { Text } from './style';

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function Header() {
  const classes = useStyles();
  const history = useHistory()

  function handleBudgets() {
    history.push('/order')
  }

  function handleClients() {
    history.push('/client')
  }

  function handleUsers() {
    history.push('/user')
  }

  function handleLogouts() {
    Cookies.remove('token')
    history.push('/')
  }

  return (
    <Container component="main" maxWidth="xs">
      <Content>
        <Pages>
          <Page onClick={handleBudgets}>Pedidos</Page>
          <Page onClick={handleClients}>Clientes</Page>
          <Page onClick={handleUsers}>Usuários</Page>
        </Pages>
        <Text>Face a Face</Text>
        <Avatar className={classes.avatar}>
          <ExitToAppOutlinedIcon onClick={handleLogouts} />
        </Avatar>
      </Content>
    </Container>
  );
}