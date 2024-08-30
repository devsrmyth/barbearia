import { Menu } from './Menu';

import styles from './App.module.css';
import heart from './assets/heart.svg';
import caduceus from './assets/caduceus.svg';
import Rotas from './Routes';

const App = () => {
  return (
    <>
      <Menu />
      <Rotas />
    </>
  );
}

export default App;