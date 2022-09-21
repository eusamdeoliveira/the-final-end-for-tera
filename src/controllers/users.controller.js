const db = require("../config/database");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Joi = require('@hapi/joi')

exports.signup = async (req, res) => {
  const { 
    username,
    name,
    password,
    role,
  } = req.body;

  const schema = Joi.object({
    username: Joi.string().min(3).required().email(),
    name: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
    role: Joi.number().min(0).max(2).required(),
  })

  try {
    const { error } = await schema.validateAsync({
      username,
      name,
      password,
      role,
    })
  
    if(error) {
      throw new Error()
    }
  } catch(e) {
    return res.status(406).send({
      message: "Invalid params"
    });
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  try {
    await db.query(
      `INSERT INTO users (
        user_username,
        user_password,
        user_name,
        user_role,
        user_isactive,
        user_createdat
      ) VALUES (
        '${username}',
        '${hashedPassword}',
        '${name}',
        '${role}',
        '${true}',
        'NOW()'
      )`,
    );

    res.status(201).send();
  } catch(e) {
    res.status(500).send({
      message: "Error creating the user"
    });
  }
  
};

exports.signin = async (req, res) => {
  const { 
    username,
    password,
  } = req.body;

  const schema = Joi.object({
    username: Joi.string().min(3).required().email(),
    password: Joi.string().min(6).required(),
  })

  try {
    const { error } = await schema.validateAsync({username, password})
    if(error) {
      throw new Error()
    }
  } catch(e) {
    return res.status(406).send({
      message: "Invalid params"
    });
  }

  try {
    const response = await db.query(
      `SELECT user_id, user_name, user_password, user_role FROM users WHERE user_username = '${username}' and user_isactive IS TRUE`,
    );
  
    if(response.rows[0] == undefined) {
      return res.status(404).send({
        message: "No User"
      });
    }
  
    const { user_id, user_name, user_role, user_password} = response.rows[0]
  
    const validPassword = await bcrypt.compare(password, user_password)
  
    if(validPassword) {
      const token = jwt.sign({id: user_id, username, name: user_name, role: user_role}, process.env.TOKEN_SECRET)
      return res.header("auth-token", token).status(200).send({token});
    } else {  
      return res.status(403).send({message: 'Username and Password do not match'});
    }
  } catch(e) {
    return res.status(500).send({
      message: "Server error",
    });
  }
};

exports.toggleUser = async (req, res) => {
  const { username } = req.body;

  const schema = Joi.object({ username: Joi.string().min(3).required().email() })

  try {
    const { error } = await schema.validateAsync({username})
  
    if(error) {
      throw new Error()
    }
  } catch(e) {
    res.status(406).send({
      message: "Invalid params"
    });
  }

  // Is not ADM and is not editing the same user as the logged in.
  if(req.user.role !== 0 && req.user.user_username !== username) {
    return res.status(403).send({
      message: "You can not update another account"
    });
  }

  try {
    const response = await db.query(
      `UPDATE users SET user_isactive = NOT user_isactive WHERE user_username = '${username}'`,
    );

    return res.status(200).send();
  } catch(e) {
    if(response.rows[0] == undefined) {
      return res.status(500).send({
        message: "It was not possible to toogle the user"
      });
    }
  }
  
};