import { globalStyledCss } from 'styles';
import { TodoPage, MDPlaygroundPage, PodoteEditorPage, TrashBinPage } from 'pages';
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
          <Route path="/trash" element={<TrashBinPage />}></Route>
          <Route path="/mdplayground" element={<MDPlaygroundPage />}></Route>
          <Route path="/editorplayground" element={<PodoteEditorPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
