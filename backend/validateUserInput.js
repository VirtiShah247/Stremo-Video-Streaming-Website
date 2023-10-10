const emailValidator = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };
  
  const passwordValidator = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[^\s"'<>]{8,}$/;
    return passwordRegex.test(password);
  };
  
  const validateUserInput = (req, res, next) => {
    const { email, password } = req.body;
  
    if (!emailValidator(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
  
    if (!passwordValidator(password)) {
      return res.status(400).json({ error:           
     
     ` Password must be at least 8 characters,
      Password must have at least one uppercase letter,
      Password must have at least one lowercase letter,
      Password must have at least one digit,
      Password must have at least one special character,
      Password doesn't allow certain characters (whitespace, single quotes, double quotes, angle brackets),
    ` 
 });
    }
  
    // If both email and password are valid, proceed to the next middleware or route handler
    next();
  };
  
  module.exports = { validateUserInput };
  