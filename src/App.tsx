import { GlobalStyle } from 'styles';
import { TodoPage, EditPage } from 'pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
