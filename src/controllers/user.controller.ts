import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import jwt from "jsonwebtoken";
import { getTemplate, sendEmail } from "../services/mailer";
import { getDataToken } from "../services/verifyToken";

export const register = async (req: Request, res: Response) => {

    // modelo con interfas de usuario
    const user:IUser = new User({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    });
    user.password = await user.encrypPassword(user.password); // cifrar contraseña
    const saveUser = await user.save(); // guardar en la base de datos

    //token 
    const token: string = jwt.sign({_id: saveUser._id}, process.env.TOKEN_SECRET || 'tokentest', {
        expiresIn: '24h'
    });

    // Envio de correo
    const template = getTemplate(user.name, token);
    await sendEmail(user.email, 'Confirmacion de correo', template);

    // retornar datos con token como cabezera
    res.header('token-access', token).json({
        message: 'Se envio un correo de verificación de cuenta al correo proporcionado',
        user: saveUser
    }); 
}

export const showuser = async (req: Request, res: Response) => {
    const user = await User.findOne({email: req.body.email});

    if (!user) return res.status(400).json({
        message: 'Correo o constraseña no en contrado(a)s'
    });

    if(req.userTokenId !== user.id) {
        res.status(401).json({
            message: 'Token invalido para este usuario'
        });
    }
    else { 
        if (user.verifyEmail) {
            res.status(200).json({
                'usuario': user
            });
        } else {
            res.status(401).json({
                message: 'El usuario aun no ha validado su correo'
            });
        }
    }
    
} 

export const verifyEmail = async (req: Request, res: Response) => {

    const { token } = req.params;

    const data = getDataToken(token);
    
    if (data == null) {
        return res.status(401).json({
            message: 'Error al obtener el token'
        });
    }
    
    const user = await User.findById(data._id);
    if (!user) return res.status(404).json('Usuario no encontrado');

    user.verifyEmail = true;
    await user.save();

    res.status(200).json({
        message: 'Se ha verificado correctamente',
    });
}