import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    secure: false,
    auth: {
        user: "1a32fca793aace",
        pass: "639670f66bd60f"
    }
});

export const sendEmail = async (email: string, subject: string , html: any) => {
    try {
        await transport.sendMail({
            from: 'test@gmail.com',
            to: email,
            subject: subject,
            text: "Registro de un usuario nuevo",
            html,
        });
    } catch (error) {
        console.log(error);
    }
}


export const getTemplate = (name: string, token: string) => {
    return `
    <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>

    <div id="email__content">
        <img src="" alt="">
        <h2>Hola ${ name }</h2>
        <p>Para confirmar el correo electronico, porfavor haz clic en el siguiente enlace</p>
        <a href="localhost:3000/api/user/verifyemail/${ token }">Confirmar cuenta</a>
    </div> `;
}