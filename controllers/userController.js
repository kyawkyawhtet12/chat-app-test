import { PrismaClient } from "@prisma/client"
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";


const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY;

const register = async(req, res) => {

    const saltRounds = 10; 
    // console.log(req.body);
    const hashedPassword = await bcryptjs.hash(req.body.password, saltRounds);
    try {
        const user = await prisma.user.create({
            data: {
                user_name: req.body.user_name,
                password: hashedPassword,
                email: req.body.email
            }
        })

        res.send(user);

    } catch (error) {
        console.log(error);
        
    }


}

const login = async (req, res) => {

    const {user_name, password} = req.body

    const user = await prisma.user.findFirst({where: {user_name: user_name}})

    if (user) {
        if (user_name === user.user_name && bcryptjs.compare(password, user.password)) {
            const payload = {
                user_name : user_name,
                email : user.email,
                password : user.password

            }

            const token = jsonwebtoken.sign(payload, SECRET_KEY, { expiresIn: '1h' });


            res.send({
                user: user,
                token: token,
            })
        }else{
            res.send({
                message: "Incorrect Crenditial",
            })
        }
    }

    res.send({
        message: "User Not Found",
    })

}



const userProfile = async (req, res) => {
   try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

    const decoded = jsonwebtoken.verify(token, SECRET_KEY); // Decode token

    console.log(decoded);
    
    const user = await prisma.user.findUnique({where : 
        {user_name : decoded.user_name}
    })

    if(!user){
        res.send({
            message: "User Not Found"
        })
    }

    res.send(user)
   } catch (error) {
    console.log(error);
    
   }
}


export {login, register, userProfile}