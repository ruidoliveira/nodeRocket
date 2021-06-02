class AuthController {
    async registerUser(req, res){
        const { email } = req.body;
         try{
             if(await User.findOne({ email }))
                 return res.status(400).send({error: 'User already exists'});
     
             const user = await User.create(req.body);
     
             user.password = undefined;
     
             return res.send({ 
                 user,
                 token: generateToken({id: user.id}),
             });    
         } catch (err){
             return res.status(400).send({error: 'Registration Failed'});
         }
     };

    async authenticate(req, res) {
            const {email, password}  = req.body;
        
            const user = await User.findOne({email}).select('+password');
        
            if(!user)
                return res.status(400).send({error: 'User not found'});
        
            if(!await bcrypt.compare(password, user.password));
                return res.status(400).send({error: 'Invalid password'});
        
            
            user.password = undefined;    
        
           
            res.send({
                user,
                token: generateToken({ id: user.id}),
            });   
    }  

    async forgotPassword(req, res){
        const {email} = req.body;
        try{
            const {email} = await User.findOne({email});
    
            if(!user)
                return res.status(400).send({error: 'User not found'});
    
        const token = crypto.randomBytes(20).toString('hex');
    
        const now = new Date();
        now.setHours(now.getHours() + 1);
    
        await User.findByIdAndUpdate(user.id, {
            '$set':{
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        });
            }
    }

    async resetPassword(req,res){
        const{ email, token, password} = req.body;

        try{
            const user = await User.findOne({email})
            .select('+passwordResetToken passwordResetExpires');

            if(!user)
                return res.status(400).send({ error: 'User not found'});
            if(token !== user.passwordResetToken)
            return res.status(400).send({error: 'Token Invaid'});

            const now = new Date();

            if(now > user.passwordResetExpires)
            return res.status(400).send({error: 'Token expired, generate a new one'});

            user.password = password;

            await user.save();
            res.send();

        }catch{
            res.status(400).send({error: 'Cannot reset password, try again'});
        }
    }

    
    
  
  module.exports = new AuthController()