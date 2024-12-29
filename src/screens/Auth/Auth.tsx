import { Authenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import '@aws-amplify/ui-react/styles.css';
import './Auth.css';

function Auth() {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <Authenticator>
        {({ signOut, user }) => (
          <div className="auth-success">
            <h1>Welcome to Alchemy{user?.username ? `, ${user.username}` : ''}!</h1>
            <button onClick={() => {
              if (signOut) {
                signOut();
              }
              navigate('/');
            }}>
              Sign Out
            </button>
          </div>
        )}
      </Authenticator>
    </div>
  );
}

export default Auth; 