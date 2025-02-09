import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { ListenerProvider } from './contexts/ListenerProvider';
import { ThemeProvider } from './contexts/ThemeProvider';
import App from './App';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <ListenerProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ListenerProvider>
  </StrictMode>,
);
