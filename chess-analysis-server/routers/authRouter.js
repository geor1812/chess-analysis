import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import { getAccountByEmail, createAccount } from '../data/accountData.js'

const SALT_ROUNDS = 10
export const router = express.Router()
dotenv.config()

//Create new account
router.post('/register', async (req, res) => {
  try {
    //Check for duplicate email
    const account = await getAccountByEmail(req.body.email)
    if (account) {
      res.status(403).send({
        error: 'Email address is already in use',
      })
    } else {
      //Password hashing
      bcrypt.genSalt(SALT_ROUNDS, (error, salt) => {
        bcrypt.hash(req.body.password, salt, async (error, hash) => {
          await createAccount({
            email: req.body.email,
            salt: salt,
            hash: hash,
          })

          res.status(201).send({
            success: 'Account successfully created',
          })
        })
      })
    }
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

router.post('/login', async (req, res) => {
  try {
    const account = await getAccountByEmail(req.body.email)
    if (!account) {
      res.status(401).send({ error: 'Invalid email' })
    } else {
      const email = account.email
      const hash = account.hash

      let token = jwt.sign(
        {
          email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: 3600, //One hour
        }
      )

      bcrypt.compare(req.body.password, hash, async (error, isMatching) => {
        if (isMatching) {
          res.status(200).json({
            token: token,
            email,
          })
        } else {
          res.status(401).send({ error: 'Invalid password' })
        }
      })
    }
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})
