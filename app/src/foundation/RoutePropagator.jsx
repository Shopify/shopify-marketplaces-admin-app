import React, {useEffect} from 'react';
import {
  RoutePropagator as AppBridgeRoutePropagator,
  useAppBridge,
} from '@shopify/app-bridge-react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Redirect} from '@shopify/app-bridge/actions';

const RoutePropagator = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const app = useAppBridge();

  useEffect(() => {
    app.subscribe(Redirect.Action.APP, (payload) => {
      navigate(payload.path);
    });
  }, [app]);

  return <AppBridgeRoutePropagator location={location} />;
};
export default RoutePropagator;
