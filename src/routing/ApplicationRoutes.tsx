/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/react-in-jsx-scope */
import { Skeleton } from 'antd';
import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Routes from '../Global/routes';

const Home = React.lazy(() => import('../Pages/ContentPosterGallery'));

const Router = () => {
  console.log('inside router');
  return (
    <Suspense fallback={<Skeleton />}>
      <Switch>
        <Route exact path="/">
          <Redirect to={Routes.landing} />
        </Route>
        <Route
          exact
          path={Routes.landing}
          render={() => (<Home />)}
        />

      </Switch>
    </Suspense>
  );
};

export default Router;
