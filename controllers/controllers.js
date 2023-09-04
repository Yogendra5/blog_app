require('dotenv').config()
const express = require('express');
const app = express()
const schema = require('../models/schema')
const axios = require('axios')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { requireAuth, checkUser } = require('../middleware/authMiddleware')

exports.home = async (req, res) => {
  try {
    const blogs = await schema.find({})
    res.render('index', { blogs })
  } catch (error) {
    console.log(err);
    res.send(err)
  }
}


exports.posttask = async (req, res) => {
  try {
    const blog = await schema.create(req.body)
    // console.log(blog);
    // console.log(blog,User._id);
    res.status(200).redirect('/')
    // console.log(blog);
  } catch (error) {
    res.status(500).send({ message: error })
  }
}



exports.newblog = (req, res) => {
  res.render('newblog')
}


exports.readmore = async (req, res) => {
  try {
    const { id: taskId } = req.params
    const blog = await schema.findOne({ _id: taskId })
    if (!blog) {
      return res.status(404).json({ msg: 'there is no blog with the id' })
    }
    res.render('readmore', { blogs: blog })
  } catch (error) {
    res.status(500).send({ msg: error })
  }
}


exports.getalltasks = async (req, res) => {
  try {
    const blog = await schema.find({})
    res.status(200).send(blog)
  } catch (error) {
    res.status(500).send({ message: error })
  }
}


exports.category = async (req, res) => {
  try {
    const blog = await schema.find({ 'category': req.params.category })
    const title = req.params.category
    res.render('category', { blogs: blog, title })
  } catch (error) {
    res.status(500).send({ message: error })
  }
}


exports.gettask = async (req, res) => {
  try {
    const { id: taskId } = req.params
    const blog = await schema.findOne({ _id: taskId })
    // const userid=await User.findOne({_id})
    if (!blog) {
      return res.status(404).json({ msg: 'there is no blog with the id' })
    }
    res.send(blog)
  } catch (error) {
    res.status(500).send({ msg: error })
  }
}

// For updating a blog..
exports.updatetask = async (req, res) => {
  try {
    const { id: taskId } = req.params
    console.log(req.data);
    const task = await taskschema.findOneAndUpdate({ _id: taskId }, req.body, {
      new: true,
      runValidators: true,
    })
    if (!task) {
      return res.status(404).json({ msg: 'no task with id' })
    }
    res.status(200).json({ task })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}


exports.deletetask = async (req, res) => {
  try {
    const { id: taskId } = req.params
    // const id1 = req.params.id
    const blog = await schema.findByIdAndDelete({ _id: taskId })
    if (!blog) {
      return res.status(404).json({ msg: ' No blog with that Id no. ' })
    }
    res.redirect('/')
  }
  catch (error) {
    res.status(500).send({ msg: error })
  }

  // console.log(req.params);
}


exports.myblogs = async (req, res) => {
  try {
    const iddd = req.params.id;
    const blog = await schema.find({ 'writerid': iddd })
    res.render('myblogs', { blogs: blog })
    // console.log(blog);
  } catch (error) {
    res.status(500).send({ message: error })
  }
  // console.log(req.params.id);
}




const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered, Register now!!';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered, Please try logging in..';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}
// create json web token
const maxAge = 15 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'secret key', {
    expiresIn: maxAge
  });
};

// controller actions
module.exports.signup_get = (req, res) => {
  res.render('signup');
}

module.exports.login_get = (req, res) => {
  res.render('login');
}


module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    // console.log(user);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

}


module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    // console.log(user);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

}


module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}




// module.exports=userid;