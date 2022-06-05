import { GlobalStyle } from 'styles';
import { TodoPage, EditPage, PodoteEditorPage } from 'pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TodoPage />}></Route>
          <Route path="/test" element={<EditPage />}></Route>
          <Route path="/editor" element={<PodoteEditorPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
