/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext, useState } from 'react';

// import { useHistory } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader } from 'reactstrap';

import { Providers } from '../../../config/firebase';
import logging from '../../../config/logging';
import UserContext from '../../../contexts/user';
import { Authenticate, SignInWithSocialMedia } from '../../../modules/Auth';
import CenterPiece from '../CenterPiece';
import ErrorText from '../ErrorText';
import LoadingComponent from '../LoadingComponent';
import '../../../styles/bootstrap.min.scss';

const MLoginPage: React.FunctionComponent<{}> = (props) => {
  const [authenticating, setAuthenticating] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const userContext = useContext(UserContext);
  // const history = useHistory();
  const navigate = useNavigate();
  const isLogin = window.location.pathname.includes('login');

  const signInWithSocialMedia = (provider: firebase.auth.AuthProvider) => {
    if (error !== '') setError('');

    setAuthenticating(true);

    SignInWithSocialMedia(provider)
      .then(async (result) => {
        logging.info(result);

        const { user } = result;

        if (user) {
          const { uid } = user;
          const name = user.displayName;

          if (name) {
            try {
              const fire_token = await user.getIdToken();

              Authenticate(uid, name, fire_token, (error, _user) => {
                if (error) {
                  setError(error);
                  setAuthenticating(false);
                } else if (_user) {
                  userContext.userDispatch({
                    type: 'login',
                    payload: { user: _user, fire_token },
                  });
                  // history.push('/');
                  navigate('/mblog');
                }
              });
            } catch (error) {
              setError('Invalid token.');
              logging.error(error);
              setAuthenticating(false);
            }
          } else {
            /**
             * We can set these manually with a new form
             * For example, the Twitter provider sometimes
             * does not provide a username as some users sign
             * up with a phone number.  Here you could ask
             * them to provide a name that would be displayed
             * on this website.
             * */
            setError('The identify provider is missing a display name.');
            setAuthenticating(false);
          }
        } else {
          setError(
            'The social media provider does not have enough information. Please try a different provider.'
          );
          setAuthenticating(false);
        }
      })
      .catch((error) => {
        logging.error(error);
        setAuthenticating(false);
        setError(error.message);
      });
  };

  return (
    <div className="relative mt-32">
      <div className="usebootstrap">
        {/* <Container fluid className="flex items-center justify-center"> */}
        <CenterPiece>
          <Card>
            <CardHeader>{isLogin ? 'Login' : 'Sign Up'}</CardHeader>
            <CardBody>
              <ErrorText error={error} />
              <Button
                block
                disabled={authenticating}
                onClick={() => signInWithSocialMedia(Providers.google)}
                style={{ backgroundColor: '#ea4335', borderColor: '#ea4335' }}
              >
                <i className="fab fa-google mr-2"></i> Sign{' '}
                {isLogin ? 'in' : 'up'} with Google
              </Button>
              <Link
                className="mt-10"
                to={isLogin ? '/blog/login' : '/blog/register'}
              >
                <Button variant="outlined">
                  {' '}
                  Sign {isLogin ? 'in' : 'up'} with Local Account{' '}
                </Button>
              </Link>
              {authenticating && <LoadingComponent card={false} />}
            </CardBody>
          </Card>
        </CenterPiece>
        {/* </Container> */}
      </div>
    </div>
  );
};

export default MLoginPage;
