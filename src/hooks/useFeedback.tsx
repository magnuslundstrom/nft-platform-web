import { useContext } from 'react';
import { FeedbackContext } from '@/contexts/Feedback';

export const useFeedback = () => useContext(FeedbackContext);
