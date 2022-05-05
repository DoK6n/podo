import { GlobalStyle } from './styles/global';
import { TodoTemplate } from './components/todo';
import { Header } from './components/base';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<TodoTemplate />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
