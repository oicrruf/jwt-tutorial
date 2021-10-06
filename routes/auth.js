const router = require('express').Router();
const User = require('../models/User');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');

const schemaRegister = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(8).max(1024).required()
})

router.post('/register', async (req, res) => {

  const { error } = schemaRegister.validate(req.body)

  const isEmailExist = await User.findOne({ email: req.body.email });


  if (error) {
    return res.status(400).json(
      { error: error.details[0].message }
    )
  }

  if (isEmailExist) {
    return res.status(400).json(
      { error: "El correo electronico ya existe en la base de datos" }
    )
  }

  // hash contraseña
  const salt = await bcrypt.genSalt(5);
  const password = await bcrypt.hash(req.body.password, salt);

  console.log(salt)
  console.log(password)

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: password
  });

  try {
    const savedUser = await user.save();
    res.json({
      error: null,
      data: savedUser
    })
  } catch (error) {
    res.status(400).json({ error })
  }
})

const schemaLogin = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(8).max(1024).required()
})

router.post('/login', async (req, res) => {
  // validaciones
  const { error } = schemaLogin.validate(req.body);

  if (error) return res.status(400).json({ error: error.details[0].message })

  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' })

  res.json({
    error: null,
    data: 'exito bienvenido'
  })
})


module.exports = router;