import './App.css'
import { BrowserRouter } from 'react-router-dom';
import {PageShell} from '@/templates'
import AppProvider from '@/providers';
function App() {
  return (
    <AppProvider>
        <BrowserRouter>
            <PageShell>
            <h1>Hello World</h1>
            </PageShell>
        </BrowserRouter>
    </AppProvider>
  )
}

export default App
