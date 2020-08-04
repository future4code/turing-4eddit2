import React from 'react';
import './App.css';

import FeedPage from './components/FeedPage/FeedPage';
import PostPage from './components/PostPage/PostPage';

import { AppContainer } from './styles';
import { GlobalStyle } from './globalStyles';

function App() {
  return (
    <AppContainer>
      <GlobalStyle />
      <FeedPage />
      <hr />
      <PostPage />
    </AppContainer>
  );
}

export default App;
