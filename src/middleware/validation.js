export function validateRequest(schema) {
  return (req, res, next) => {
    try {
      const { error, value } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({
          error: 'Validation failed',
          details: error.details.map(d => ({
            field: d.path.join('.'),
            message: d.message
          }))
        });
      }
      req.validated = value;
      next();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
}

export function validateParams(schema) {
  return (req, res, next) => {
    try {
      const { error, value } = schema.validate(req.params);
      if (error) {
        return res.status(400).json({
          error: 'Invalid parameters',
          details: error.details
        });
      }
      req.params = value;
      next();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
}

export default validateRequest;