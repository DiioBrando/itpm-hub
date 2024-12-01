import {createRoot} from 'react-dom/client'
import './index.css'
import AuthProvider from './providers/AuthProvider.tsx';
import QueryProviders from './providers/QueryClientProvider.tsx';
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes/routes.tsx';


createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <QueryProviders>
            <RouterProvider router={routes} />
        </QueryProviders>
    </AuthProvider>
)


