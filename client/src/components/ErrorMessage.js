import { Alert } from 'react-bootstrap';

const ErrorMessage = ({ variant = 'info', children }) => {
  return (
    <Alert variant={variant} style={{ fontsize: 10 }}>
      <strong>{children}</strong>
    </Alert>
  )
}

export default ErrorMessage;