import React from 'react';
import Error403 from '@/UI/Errors/Error403';

interface Props extends React.PropsWithChildren {
  isAllowed: boolean | null;
}

const ProtectedRoute: React.FC<Props> = ({ isAllowed, children }) => {
  if (!isAllowed) {
    return <Error403 />;
  }

  return children;
};

export default ProtectedRoute;
