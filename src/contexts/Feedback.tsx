import { createContext, useState, useCallback } from 'react';

export const FeedbackContext = createContext({
  message: '',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setMessage: (_message: string) => {
    /* */
  },
  backdrop: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setBackdrop: (_backdrop: boolean) => {
    /* */
  },
});

export const FeedbackProvider: React.FC = ({ children }) => {
  const [message, _setMessage] = useState('');
  const [backdrop, _setBackdrop] = useState(false);

  const setMessage = useCallback((_message: string) => {
    _setMessage(_message);
  }, []);
  const setBackdrop = useCallback((_backdrop: boolean) => {
    _setBackdrop(_backdrop);
  }, []);

  return (
    <FeedbackContext.Provider
      value={{
        message,
        backdrop,
        setMessage,
        setBackdrop,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};
