import React, { useEffect } from 'react';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import styled from 'styled-components';
import { buttonStyledCss } from 'styles';
import { useLazyQuery, useMutation } from '@apollo/client';
import { CREATE_USER } from 'lib/graphql/mutation';
import { GET_USER } from 'lib/graphql/query';
import dayjs from 'dayjs';
import { authMode, useAuthStore } from 'lib/stores';
import { useNavigate } from 'react-router-dom';

const Button = styled.button`
  ${buttonStyledCss}
`;

export default function AuthGoogleLogin() {
  const { userLogin, updateMode, mode, userLogout } = useAuthStore();
  const authService = getAuth();

  const [addUser] = useMutation(CREATE_USER);
  const [retrieveUserById] = useLazyQuery(GET_USER);

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(authService, user => {
      if (user) {
        // logged in
        updateMode(authMode.LOGIN_MODE);
      } else {
        // logged out
        updateMode(authMode.GUEST_MODE);
      }
    });
  }, []);

  const onSocialClick = async () => {
    const provider = new GoogleAuthProvider();

    const { user } = await signInWithPopup(authService, provider);
    if (user) {
      console.log(authService.currentUser);

      // graphql query code here...

      const { loading, data } = await retrieveUserById({
        context: {
          headers: {
            uid: user.uid
          }
        }
      });

      if (!loading) {
        if (data && data.retrieveUserById) {
          // login code here...
          // To Update AuthMode(login, guest) of authStore, you need to call it here....
          userLogin({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            providerId: user.providerData[0].providerId,
            lastLoginAt: dayjs(user.metadata.lastSignInTime).format('YYYY-MM-DD HH:mm:ss')
          });
          updateMode(authMode.LOGIN_MODE);
          navigate('/todo');
        } else {
          // register code here...
          const createDt = dayjs(user.metadata.creationTime).format('YYYY-MM-DD HH:mm:ss');
          const { data } = await addUser({
            variables: {
              data: {
                email: user.email,
                name: user.displayName,
                snsTypeName: user.providerData[0].providerId,
                createDt: createDt
              }
            },
            context: {
              headers: {
                uid: user.uid
              }
            }
          });

          if (data && data.addUser) {
            // To add currentUser of authStore, you need to call it here....
            // To Update AuthMode(login, guest) of authStore, you need to call it here....
            userLogin({
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              providerId: user.providerData[0].providerId,
              lastLoginAt: dayjs(user.metadata.lastSignInTime).format('YYYY-MM-DD HH:mm:ss')
            });
            updateMode(authMode.LOGIN_MODE);
            navigate('/todo');
          }
        }
      }
    } else {
      updateMode(authMode.GUEST_MODE);
      navigate('/');
    }
  };

  const onSocialLogoutClick = () => {
    signOut(authService)
      .then(() => {
        // Sign-out successful.
        userLogout();
        console.log('로그아웃', authService.currentUser);
        navigate('/');
      })
      .catch(error => {
        // An error happened.
        console.error({ code: error.code, message: error.message });
      });
  };

  return (
    <React.Fragment>
      {mode === authMode.LOGIN_MODE ? (
        <Button onClick={onSocialLogoutClick}>Logout</Button>
      ) : (
        <Button onClick={onSocialClick}>Google Login</Button>
      )}
    </React.Fragment>
  );
}
