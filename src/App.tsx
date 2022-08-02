import { globalStyledCss } from 'styles';
import { TodoPage, MdPlaygroundPage, PodoteEditorPage, TrashPage } from 'pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { MainHeader } from 'components';

export const GlobalStyle = createGlobalStyle`
  ${globalStyledCss}
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <MainHeader />
        <Routes>
          <Route path="/" element={<TodoPage />}></Route>
          <Route path="/trash" element={<TrashPage />}></Route>
          <Route path="/mdplayground" element={<MdPlaygroundPage />}></Route>
          <Route path="/editorplayground" element={<PodoteEditorPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
