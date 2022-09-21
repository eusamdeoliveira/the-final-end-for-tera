import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { CardsQuestions } from '../components/CardsQuestions';

export const QuestionsPage = () => {
  const {state} = useLocation();
  const navigate = useNavigate();
  

  if(!state || !state.id) {
    navigate('/dashboard')
    return <div></div>
  }

  const { id } = state;

  return <CardsQuestions courseId={id}/>
}