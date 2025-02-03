import { Header, ActionBar, TreeBar, Drawer } from 'figura/components';
import { DrawerProvider } from './contexts/DrawerProvider';

import './App.css';

function App() {
  return (
    <DrawerProvider>
      <Header />
      <main className="figura-container">
        <TreeBar />
        <Drawer className="content" />
        <ActionBar />
      </main>
    </DrawerProvider>
  );
}

export default App;
