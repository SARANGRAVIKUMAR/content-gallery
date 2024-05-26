/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/react-in-jsx-scope */
import { Skeleton } from 'antd';
import React, { Suspense } from 'react';
import { Route } from 'react-router-dom';
import Routes from '../Global/routes';

const ContentPosterGallery = React.lazy(() => import('../Pages/ContentPosterGallery'));

const Router = () => (
  <Suspense fallback={<Skeleton />}>
    <Route
      exact
      path={Routes.home}
      render={() => (<ContentPosterGallery />)}
    />

  </Suspense>
);

export default Router;
