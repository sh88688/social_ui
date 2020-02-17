import React from 'react';
import { IndexRedirect, Route } from 'react-router';

import { loginRedirect } from './actions';
import { setReportsLastViewedOn } from './actions/user';
import store from './store';

import App from './containers/app';
// import Login from './containers/login';
import OtpLogin from './containers/otplogin';
// import SignUp from './containers/signup';
import OtpSignUp from './containers/otpsignup';
import LoggedIn from './containers/loggedin';
import { getLoginRedirectUrl } from './actions/login-login';
import CreditForAllCustomers from './components/loggedin/components/credit-for-all-customers';
import CreditForOneCustomer from './components/loggedin/components/credit-for-one-customer';
// import Leads from './components/loggedin/components/leads';
// import OrdersBags from './components/loggedin/components/orders_bags';
// import Loyalty from './components/loggedin/components/loyalty';
// import Notifications from './components/loggedin/components/notifications';
// import NotificationsSettings from './components/loggedin/
// components/notifications/components/notifications-settings';
import UserBusinessProfile from './components/loggedin/components/user-business-profile';
import CustomerProfile from './components/loggedin/components/credit-for-one-customer/components/customer-profile';
import Dashboard from './components/loggedin/components/home-page';
// merger app
import Sales from './components/loggedin/components/sales';
// import OrdersRetailerPos from './components/loggedin/components/orders-retailer-pos';
// import Orders from './components/loggedin/components/orders';
import Reports from './components/loggedin/components/reports';
// import Stock from './components/loggedin/components/stock';
import StockNewListing from './components/loggedin/components/stock-new-listing';
// import Quiz from './components/loggedin/components/quiz';
// app may show "no connection screen"
// TODO roll requireLoggedin into Loggedin component
// Zambia routes
// import NewOrdersZambia from
//  './components/loggedin/components/home-page/components/digital-ordering/components/new-orders';
// import NewOrdersZambia from
//  './components/loggedin/components/home-page/components/digital-ordering/components/book-order';
import NewOrdersZambia from './containers/book-order';
import PlaceOrderSage from './components/loggedin/components/place-order-sage';

import DeliveryModeZambia from './components/loggedin/components/home-page/components/digital-ordering/components/new-orders/components/delivery-mode';
import TrackOrdersZambia from './components/loggedin/components/home-page/components/digital-ordering/components/track-orders';
import SelfCollectDetailZambia from './components/loggedin/components/home-page/components/digital-ordering/components/track-orders/components/self-collect-detail';
import DeliveredDetailZambia from './components/loggedin/components/home-page/components/digital-ordering/components/track-orders/components/delivered-detail';
import FilterPop from './components/loggedin/components/home-page/components/digital-ordering/components/track-orders/components/filter-pop';
import Statement from './components/loggedin/components/statement';
import MyPerformance from './components/loggedin/components/my-performance';
import reorder from './components/loggedin/components/home-page/components/digital-ordering/re-order';

function setReportsLastViewedNow() {
  store.dispatch(setReportsLastViewedOn(new Date()));
}
export default (
  <Route path="/" component={App}>
    {/* public routes */}
    <IndexRedirect to="login" />
    <Route
      path="login"
      component={OtpLogin}
      onEnter={requireNotLoggedIn}
      data-transition-id="login-page"
    />
    <Route
      path="signup"
      component={OtpSignUp}
      onEnter={requireNotLoggedIn}
      data-transition-id="signup-page"
    />

    {/* logged in only routes */}
    <Route component={LoggedIn} onEnter={requireLoggedIn} data-transition-id="loggedin">
      <Route path="home" component={Dashboard} data-transition-id="dashboard" />
      <Route path="dashboard" component={Dashboard} data-transition-id="dashboard" />
      <Route path="credit" component={CreditForAllCustomers} data-transition-id="credit-for-all-customers" />
      <Route path="credit/:customerId" component={CreditForOneCustomer} data-transition-id="credit-for-one-customer" />
      {/* <Route path="leads" component={Leads} data-transition-id="leads" /> */}
      {/* <Route path="bags-lifted" component={OrdersBags} data-transition-id="ordersxes" /> */}
      {/* <Route path="loyalty" component={Loyalty} data-transition-id="loyalty" /> */}
      {/* <Route path="loyalty" component={Loyalty} data-transition-id="loyalty" /> */}
      {/* <Route path="notifications" component={Notifications}
    data-transition-id="notifications" /> */}
      {/* <Route path="notifications-settings" component={NotificationsSettings}
     data-transition-id="notifications-settings" /> */}
      <Route path="quick-order" component={reorder} data-transition-id="reorder" />
      <Route path="business-profile" component={UserBusinessProfile} data-transition-id="business-profile" />
      <Route path="customer/:customerId" component={CustomerProfile} data-transition-id="customer-profile" />
      <Route path="sales" component={Sales} data-transition-id="sales-page" />
      <Route path="sales/make-sale" component={Sales} data-transition-id="sales-page" />
      <Route path="sales/:saleId" component={Sales} data-transition-id="sale-details-page" />
      <Route path="reports" component={Reports} data-transition-id="reports-page" onEnter={setReportsLastViewedNow} />
      <Route path="reports" component={Reports} data-transition-id="reports-page" />
      <Route path="reports/make-sale" component={Reports} data-transition-id="reports-page" />
      <Route path="reports/:dailyOrWeekly/make-sale" component={Reports} data-transition-id="reports-page" />
      <Route path="reports/:dailyOrWeekly" component={Reports} data-transition-id="reports-page" />
      <Route path="reports/:dailyOrWeekly/:reportId" component={Reports} data-transition-id="reports-details-page" />
      <Route path="stock" component={StockNewListing} data-transition-id="stock-page" />
      <Route path="stock/product" component={StockNewListing} data-transition-id="stock-page" />
      <Route path="stock/product/:productId" component={StockNewListing} data-transition-id="stock-page" />
      {/* <Route path="orders" component={OrdersRetailerPos} data-transition-id="orders" /> */}
      {/* <Route path="orders/:orderId" component={OrdersRetailerPos}
    data-transition-id="orders" /> */}
      {/* <Route path="old-orders" component={Orders} data-transition-id="orders" /> */}
      {/* <Route path="quiz" component={Quiz} data-transition-id="quiz" /> */}
      <Route path="delivered-detail-default" component={DeliveredDetailZambia} data-transition-id="delivered-detail-default" />
      <Route path="self-collect-detail-default" component={SelfCollectDetailZambia} data-transition-id="self-collect-detail-default" />
      <Route path="track-orders-default" component={TrackOrdersZambia} data-transition-id="track-orders-default" />
      <Route path="delivery-mode-default" component={DeliveryModeZambia} data-transition-id="delivery-mode-default" />
      <Route path="new-orders-default" component={NewOrdersZambia} data-transition-id="new-orders-default" />
      <Route path="place-order-sage" component={PlaceOrderSage} />
      <Route path="new-orders-default(/:orderid)" component={NewOrdersZambia} data-transition-id="new-orders-default" />
      <Route path="new-orders-default(/:orderid)(/:step)" component={NewOrdersZambia} data-transition-id="new-orders-default" />
      <Route path="filter" component={FilterPop} data-transition-id="filter=pop" />
      <Route path="statement" component={Statement} data-transition-id="statment" />
      <Route path="performance" component={MyPerformance} data-transition-id="performance" />
    </Route>
  </Route>
);

function requireNotLoggedIn(nextState, replace) {
  const state = store.getState();
  const isLoggedIn = state.user && state.user.href;

  if (isLoggedIn) {
    // const urlRepl = '/credit';
    const finalReplUrl = getLoginRedirectUrl(state.user);
    replace(finalReplUrl);
  }
}

function requireLoggedIn(nextState, replace) {
  const state = store.getState();
  const isLoggedIn = state.user && state.user.href;

  const currUrl = state.routing.locationBeforeTransitions.pathname || '';

  if (!isLoggedIn) {
    store.dispatch(loginRedirect(currUrl));
    replace('/login');
  }
}