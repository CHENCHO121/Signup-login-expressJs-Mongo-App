import UserModel from "../models/User.js"
import bcrypt from 'bcrypt';

class UserController{

    static Home=(req,res)=>{
        res.render('index')
    }

    static SignUp=(req,res)=>{
        res.render('registration')
    }


    //without hash pwd

    // static createUserDoc=async(req,res)=>{

    //     try{
    //          //creating new document

    //         const doc = new UserModel({
    //             name:req.body.name,
    //             email:req.body.email,
    //             password:req.body.password
    //         })

    //         //save document

    //         await doc.save()

    //         res.redirect('/login')


    //     }catch(error){
    //         console.log(error)
    //     }
    // }


    //with hashpwd

    static createUserDoc=async(req,res)=>{
       

        const hashPassword = await bcrypt.hash(req.body.password,10)

        try{
             //creating new document

            const doc = new UserModel({
                name:req.body.name,
                email:req.body.email,
                password:hashPassword
            })

            //save document

            await doc.save()

            res.redirect('/login')


        }catch(error){
            console.log(error)
        }
    }




    static Login=(req,res)=>{
        res.render('login')
    }


    //without hashpassword
    // static verifyLogin=async(req,res)=>{

    //     try{

    //         const {email,password} = req.body;
    //         const result = await UserModel.findOne({email:email})
    //         // console.log(result)

    //         if(result != null){

    //             if(result.email == email && result.password == password){

    //                 res.send('<h1>Dashboard...login Successfull</h1>')
    //             }else{
    
    //                 res.send('<h1>Failed to login</h1>')
    
    //             }

    //         }else{
    //             res.send('<h1>Email does not exist!</h1>')
    //         }

          
         


    //     }catch(error){
    //         console.log(error)
    //     }
    // }


    //with hash password

    static verifyLogin=async(req,res)=>{

        try{

            const {email,password} = req.body;
            const result = await UserModel.findOne({email:email})
            // console.log(result)

            if(result != null){

                const isMatchPwd = await bcrypt.compare(password,result.password) 

                if(result.email == email && isMatchPwd){

                    res.send('<h1>Dashboard...login Successfull</h1>')
                }else{
    
                    res.send('<h1>Failed to login</h1>')
    
                }

            }else{
                res.send('<h1>Email does not exist!</h1>')
            }

          
         


        }catch(error){
            console.log(error)
        }
    }


}


export default UserController