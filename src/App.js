import { GlobalStyle } from './styles/global';
import { TodoTemplate } from './components/todo';
import { Header } from './components/base';

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <TodoTemplate />
    </>
  );
}

export default App;
