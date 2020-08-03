import React from 'react';
import './App.css';

import FeedPage from './components/FeedPage/FeedPage';
import PostPage from './components/PostPage/PostPage';

function App() {
  return (
    <div className="App">
      <FeedPage />
      <hr />
      <PostPage />
    </div>
  );
}

export default App;
