import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';

import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);

export const signUpConfig = {
  defaultCountryCode: '1',
  signUpAttributes: ['email', 'name'],
  formFields: {
    signUp: {
      email: {
        order: 1,
        label: 'Email',
        placeholder: 'Enter your email',
        isRequired: true,
        type: 'email'
      },
      name: {
        order: 2,
        label: 'Full Name',
        placeholder: 'Enter your full name',
        isRequired: true,
        type: 'string'
      },
      university: {
        order: 3,
        label: 'University',
        placeholder: 'Your university affiliation',
        isRequired: true,
        type: 'string'
      },
      password: {
        order: 4,
        label: 'Password',
        placeholder: 'Create a password',
        isRequired: true,
        type: 'password'
      }
    }
  }
}; 