import { GlobalStyle } from './styles/global';
import { TodoTemplate } from './components/todo';
import { Header } from './components/base';
import { TodoStateProvider } from './hooks/todoContext';

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <TodoStateProvider>
        <TodoTemplate />
      </TodoStateProvider>
    </>
  );
}

export default App;
