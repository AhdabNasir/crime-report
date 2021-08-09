import React, { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ScrollToTop from '../hooks/scroll-to-top';
import Loader from '../components/loader';

const CrimeLookup = lazy(() => import('../views/crime-lookup'));
const CrimeDetails = lazy(() => import('../views/crime-details'));
const TeamDetails = lazy(() => import('../views/team-details'));
const NotFound = lazy(() => import('../views/not-found'));
const ServiceProblem = lazy(() => import('../views/service-problem'));

const Routes = () => (
  <Suspense fallback={<Loader />}>
    <ScrollToTop />
    <Switch>
      <Route exact path="/">
        <Redirect to="/crime-lookup" />
      </Route>
      <Route exact path="/crime-lookup" component={CrimeLookup} />
      <Route exact path="/crime-lookup/crime/:id" component={CrimeDetails} />
      <Route exact path="/crime-lookup/team/:id" component={TeamDetails} />
      <Route exact path="/500" component={ServiceProblem} />
      <Route component={NotFound} />
    </Switch>
  </Suspense>
);

export default Routes;
