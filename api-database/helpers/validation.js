import Joi from "joi";

export const userSignUp = (data) =>{
    const schema = Joi.object({

    Fullname : Joi.string().min(3).required(),
    Email : Joi.string().min(10).email().required(),
    Password : Joi.string().min(6).required()
 });

 return schema.validate(data);

}

export const userLogIn = (data) =>{

    const schema = Joi.object({
        Email : Joi.string().min(10).email().required(),
        Password : Joi.string().min(6).required()
    });

    return schema.validate(data);

}