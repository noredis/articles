import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './common/ui/Header';
import { ArticleList } from './feature/ArticleList';
import { NotFound } from './common/ui/NotFound';
import { ArticleDetailsPage } from './page/ArticleDetailsPage';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';

function App() {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<ArticleList />} />
                    <Route path="/articles" element={<ArticleList />} />
                    <Route path="/articles/:id" element={<ArticleDetailsPage />} />
                    <Route path="*" element={<NotFound content="Страницы не существует"/>} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
