import React, { useEffect } from 'react';
import { TodoTemplate } from 'components';
import { authMode, useAuthStore } from 'lib/stores';
import { useNavigate } from 'react-router-dom';

function TodoPage() {
  const { currentUserInfo, mode } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (mode === authMode.GUEST_MODE && currentUserInfo === null) return navigate('/');
  }, []);

  return <>{mode === authMode.LOGIN_MODE && currentUserInfo !== null ? <TodoTemplate /> : null}</>;
}

export default TodoPage;
