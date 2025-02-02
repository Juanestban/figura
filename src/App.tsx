import { Header, ActionBar, TreeBar, Drawer } from 'figura/components';

import './App.css';

function App() {
  return (
    <>
      <Header />
      <main className="figura-container">
        <TreeBar />
        <Drawer className="content" />
        <ActionBar />
      </main>
    </>
  );
}

export default App;
