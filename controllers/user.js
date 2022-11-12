import becrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

import Usermodel from "../models/user.js";

const secret = process.env.SECRETEJWT

export const signup = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    try {
        const oldUser = await Usermodel.findOne({ email });
        if (oldUser) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const hashedPassword = await becrypt.hash(password, 12);

        const result = await Usermodel.create({
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`
        })

        const token = jwt.sign({
            email: result.email,
            id: result._id
        }, secret, {
            expiresIn: "1h"
        })

        res.status(201).json({
            result, token
        });

    } catch (error) {
        res.status(500).json({
            message: "something went wrong"
        })
        console.log(error);
    }
}

export const signin = async (req, res) => {
    const { email, password } = req.body;
    console.log(
        "signin"
    );

    try {
        const oldUser = await Usermodel.findOne({ email });
        if (!oldUser) return res.status(404).json({ message: "user does'nt exist" })
        const isPasswordCorrect = await becrypt.compare(password, oldUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Password" });
        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });
        res.status(200).json({ result: oldUser, token });
    } catch (error) {
        res.status(500).json({
            message: "something went wrong"
        })
        console.log(error);
    }
}

export const googlesignin = async (req, res) => {
    const { email, name, token, googleId } = req.body;
    try {
        const oldUser = await Usermodel.findOne({ email });
        var token1;
        if (oldUser) {
            token1 = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });
            const result = { _id: oldUser.toString(), email, name }
            return res.status(200).json({ result, token1 })
        }
        const result = await Usermodel.create({
            email, name, googleId
        });
        const oldUser1 = await Usermodel.findOne({ email });
        token1 = jwt.sign({ email: oldUser1.email, id: oldUser1._id }, secret, { expiresIn: "1h" });
        res.status(200).json({ result, token1 })
    } catch (error) {
        res.status(500).json({
            message: "something went wrong"
        })
        console.log(error);
    }
}