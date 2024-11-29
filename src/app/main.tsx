import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import QueryProviders from './providers/QueryClientProvider.tsx';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './providers/AuthProvider.ts';


createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <QueryProviders>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </QueryProviders>
    </AuthProvider>
)


