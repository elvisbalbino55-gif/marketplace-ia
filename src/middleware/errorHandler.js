export function errorHandler(err, req, res, next) {
  console.error('Error:', err);

  // Erro de validação
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation failed',
      details: err.details
    });
  }

  // Erro de autenticação
  if (err.name === 'UnauthorizedError' || err.status === 401) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: err.message
    });
  }

  // Erro de acesso
  if (err.status === 403) {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Você não tem permissão para acessar este recurso'
    });
  }

  // Erro não encontrado
  if (err.status === 404) {
    return res.status(404).json({
      error: 'Not found',
      message: err.message
    });
  }

  // Erro de servidor
  res.status(err.status || 500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Algo deu errado',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}

export default errorHandler;