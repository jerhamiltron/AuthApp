import {useContext, useState} from 'react';

import {AuthContext} from '../store/authContext';
import AuthContent from '../components/Auth/AuthContent';
import {createUser} from '../util/auth';
import LoadingOverlay from './../components/ui/LoadingOverlay';
import {Alert} from 'react-native';

function SignupScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const signupHandler = async ({email, password}) => {
    setIsLoading(true);
    try {
      const token = await createUser(email, password);
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
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
