import { GlobalStyle } from '@styles/global';
import { TodoPage } from '@pages/todo';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TodoPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
