import {useContext, useState} from 'react';
import {loginUser} from '../util/auth';
import {Alert} from 'react-native';

import {AuthContext} from '../store/authContext';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';

function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const loginHandler = async ({email, password}) => {
    setIsLoading(true);
    try {
      const token = await loginUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Authentication failed',
        'Please check your credentials or create a new account.'
      );
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingOverlay message="Logging in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
