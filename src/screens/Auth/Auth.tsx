import { Authenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import { useState, useMemo, useRef, useEffect } from 'react';
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

const AffiliationField = ({ label, onChange }: AffiliationFieldProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredColleges = useMemo(() => {
    return US_COLLEGES.filter(college =>
      college.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="custom-select-container">
      <label>{label}</label>
      <div className="dropdown-container" ref={dropdownRef}>
        <input
          type="text"
          placeholder="Search for your institution..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="college-search-input"
        />
        {isOpen && (
          <div className="college-dropdown">
            {filteredColleges.map((college) => (
              <div
                key={college}
                className="college-option"
                onClick={() => {
                  onChange(college);
                  setSearchTerm(college);
                  setIsOpen(false);
                }}
              >
                {college}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

function Auth() {
  const navigate = useNavigate();

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
                    <label>Username</label>
                    <input
                      name="username"
                      placeholder="Enter your username"
                      type="text"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label>Email</label>
                    <input
                      name="email"
                      placeholder="Enter your email"
                      type="email"
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
          async handleSignUp(formData) {
            const { username, password, attributes } = formData;
            return {
              username,
              password,
              attributes: {
                ...attributes,
                'custom:university': formData['custom:university']
              }
            };
          }
        }}
      >
        {({ signOut, user }) => (
          <div className="auth-success">
            <h1>Welcome to Alchemy{user?.username ? `, ${user.username}` : ''}!</h1>
            <p>University: {user?.attributes?.['custom:university']}</p>
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