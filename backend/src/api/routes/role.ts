import { Router, Request, Response } from 'express';
import Container from 'typedi';
import { UserInput, UserOutput } from '@/models/user.model';
import UserService from '@/services/user.service';
import { celebrate, Joi, Segments,errors} from 'celebrate';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

const route = Router();

export default  (app: Router) => {
app.use('/role', route);

}