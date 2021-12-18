import { useContext, useCallback } from 'react';
import { FeedbackContext } from '@/contexts/Feedback';

interface FlowArgsT {
  method: () => Promise<void>;
  listener: (callback: () => void) => Promise<void>;
  success: string;
}

export const useFeedback = (mutate?: () => void) => {
  const { backdrop, message, setBackdrop, setMessage } =
    useContext(FeedbackContext);

  const flow = useCallback(
    ({ method, listener, success }: FlowArgsT) => {
      setBackdrop(true);
      method()
        .then(() => {
          listener(() => {
            mutate?.();
            setMessage(success);
            setBackdrop(false);
          });
        })
        .catch(() => {
          setBackdrop(false);
          setMessage('Something went wrong');
        });
    },
    [mutate, setBackdrop, setMessage],
  );

  return { backdrop, message, setBackdrop, setMessage, flow };
};
