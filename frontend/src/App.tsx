import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './common/ui/Header';
import { ArticleList } from './feature/ArticleList';
import { ArticleDetails } from './feature/ArticleDetails';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/articles/:id" element={<ArticleDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
