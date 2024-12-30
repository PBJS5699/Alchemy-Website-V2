import { Authenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef, useMemo } from 'react';
import { signUp, SignUpInput, signIn, ConfirmSignUpInput, confirmSignUp, SignUpOutput, ConfirmSignUpOutput } from '@aws-amplify/auth';
import '@aws-amplify/ui-react/styles.css';
import './Auth.css';

// List of US colleges
const US_COLLEGES = [
  "Massachusetts Institute of Technology",
  "Harvard University",
  "Stanford University",
  "California Institute of Technology",
  "Princeton University",
  "Yale University",
  "Columbia University",
  "University of California, Berkeley",
  "University of Michigan",
  "Cornell University",
  "University of Washington",
  "Carnegie Mellon University",
  "Johns Hopkins University",
  "University of Illinois at Urbana-Champaign",
  "Georgia Institute of Technology",
  "University of Texas at Austin",
].sort();

interface AffiliationFieldProps {
  label: string;
  onChange: (value: string) => void;
}

const AffiliationField: React.FC<AffiliationFieldProps> = ({ label, onChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredColleges = useMemo(() => {
    return US_COLLEGES.filter(college => 
      college.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 100);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="form-field" ref={dropdownRef}>
      <label>{label}</label>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder="Search for your university"
      />
      {isOpen && (
        <div className="dropdown">
          {filteredColleges.map((college, index) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={() => {
                setSearchTerm(college);
                onChange(college);
                setIsOpen(false);
              }}
            >
              {college}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AuthSuccess: React.FC<{ user: any }> = ({ user }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);

  return <div style={{ display: 'none' }} />;
};

function Auth() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<{ username: string; password: string } | null>(null);

  useEffect(() => {
    return () => {
      localStorage.removeItem('tempCredentials');
    };
  }, []);

  const handleSignUp = async (input: SignUpInput): Promise<SignUpOutput> => {
    try {
      if (!input.password || !input.options?.userAttributes?.email) {
        throw new Error('Email and password are required');
      }

      // Get the custom attributes from the form
      const universityInput = document.querySelector('input[name="custom:university"]') as HTMLInputElement;
      const nameInput = document.querySelector('input[name="custom:name"]') as HTMLInputElement;
      
      const university = universityInput?.value || '';
      const name = nameInput?.value || '';
      
      console.log('Signing up with:', { email: input.options.userAttributes.email, name, university }); // Debug log
      
      const signUpResult = await signUp({
        username: input.options.userAttributes.email, // Use email as username
        password: input.password,
        options: {
          userAttributes: {
            email: input.options.userAttributes.email,
            'custom:name': name,
            'custom:university': university
          }
        }
      });

      const newCredentials = {
        username: input.options.userAttributes.email,
        password: input.password
      };
      setCredentials(newCredentials);
      localStorage.setItem('tempCredentials', JSON.stringify(newCredentials));
      
      return signUpResult;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const handleConfirmSignUp = async (input: ConfirmSignUpInput): Promise<ConfirmSignUpOutput> => {
    try {
      const savedCredentials = credentials || JSON.parse(localStorage.getItem('tempCredentials') || 'null');
      
      if (!savedCredentials?.username) {
        throw new Error('Email not found. Please try signing up again.');
      }

      const confirmResult = await confirmSignUp({
        username: savedCredentials.username,
        confirmationCode: input.confirmationCode
      });

      if (savedCredentials.password) {
        await signIn({
          username: savedCredentials.username,
          password: savedCredentials.password
        });
        
        localStorage.removeItem('tempCredentials');
        setCredentials(null);
        
        navigate('/profile');
      }

      return confirmResult;
    } catch (error) {
      console.error('Error during confirmation or auto sign-in:', error);
      throw error;
    }
  };

  return (
    <div className="auth-container">
      <Authenticator
        initialState="signUp"
        components={{
          SignUp: {
            FormFields() {
              return (
                <>
                  <div className="form-field">
                    <label>Email</label>
                    <input
                      name="email"
                      placeholder="Enter your email"
                      type="email"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label>Name</label>
                    <input
                      name="custom:name"
                      placeholder="Enter your full name"
                      type="text"
                      required
                    />
                  </div>
                  <div style={{ display: 'none' }}>
                    <input name="custom:university" />
                  </div>
                  <AffiliationField
                    label="University Affiliation"
                    onChange={(value) => {
                      const input = document.querySelector('input[name="custom:university"]');
                      if (input) {
                        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                          window.HTMLInputElement.prototype,
                          "value"
                        )?.set;
                        if (nativeInputValueSetter) {
                          nativeInputValueSetter.call(input, value);
                          input.dispatchEvent(new Event('input', { bubbles: true }));
                        }
                      }
                    }}
                  />
                  <div className="form-field">
                    <label>Password</label>
                    <input
                      name="password"
                      placeholder="Create a password"
                      type="password"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label>Confirm Password</label>
                    <input
                      name="confirm_password"
                      placeholder="Confirm your password"
                      type="password"
                      required
                    />
                  </div>
                </>
              );
            },
          },
        }}
        services={{
          handleSignUp,
          handleConfirmSignUp
        }}
      >
        {({ user }) => <AuthSuccess user={user} />}
      </Authenticator>
    </div>
  );
}

export default Auth; 