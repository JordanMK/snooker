const { schemas } = require('../validators');

const validator = (schema) => { 
 return (req, res, next) => {
    const schemaArray = Object.values(schemas);
   if (schemaArray.includes(schema)) {
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({
          message: error.message
        });
      }
    } else {
      return res.status(500).json({
        message: 'An unexpected error occurred.'
      });
    }
    next();
  }; 
};

module.exports = validator;
