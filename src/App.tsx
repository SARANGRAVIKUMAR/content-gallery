/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useEffect } from 'react';
import './App.less';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import ApplicationRoutes from './routing/ApplicationRoutes';

const App = () => (
  <div className="app-container">
    <Router>
      <ApplicationRoutes />
    </Router>

  </div>
);

export default App;
