import { GlobalStyle } from '@styles/global';
import { TodoPage } from '@pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EditPage } from '@pages';

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TodoPage />}></Route>
          <Route path="/test" element={<EditPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
