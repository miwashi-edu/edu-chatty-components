import './App.css'
import { BrowserRouter } from 'react-router-dom';
import {PageShell} from '@/templates'
import AppProvider from '@/providers';
import {AppRoutes} from '@/routes';
function App() {
  return (
    <AppProvider>
        <BrowserRouter>
            <PageShell>
                <AppRoutes />
            </PageShell>
        </BrowserRouter>
    </AppProvider>
  )
}

export default App
