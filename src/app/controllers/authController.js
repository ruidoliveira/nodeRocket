class AuthController {

    async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email }).select('+password');

            if (!user)
                return res.status(400).send({ error: 'User not found' });


            if (!await bcrypt.compare(password, user.password))
                return res.status(400).send({ error: 'Invalid password' });

            user.password = undefined;

            return res.send({
                user,
                token: generateToken({ id: user.id }),
            });
        } catch (error) {
            console.log(erro);
            res.status(400).send({ error: erro.message });
        }
    }

    async forgotPassword(req, res) {
        const { email } = req.body;
        try {

            const user = await User.findOne({ email });

            if (!user)
                return res.status(400).send({ error: 'User not found' });

            const token = crypto.randomBytes(20).toString('hex');

            const now = new Date();
            now.setHours(now.getHours() + 1);

            await User.findByIdAndUpdate(user.id, {
                '$set': {
                    passwordResetToken: token,
                    passwordResetExpires: now,
                }
            });

        } catch (error) {
            console.log(erro);
            res.status(400).send({ error: erro.message });
        }
    }

    async resetPassword(req, res) {
        const { email, token, password } = req.body;

        try {
            const user = await User.findOne({ email })
                .select('+passwordResetToken passwordResetExpires');

            if (!user)
                return res.status(400).send({ error: 'User not found' });
            if (token !== user.passwordResetToken)
                return res.status(400).send({ error: 'Token Invaid' });

            const now = new Date();

            if (now > user.passwordResetExpires)
                return res.status(400).send({ error: 'Token expired, generate a new one' });

            user.password = password;

            await user.save();
            res.send();
        } catch (error) {
            console.log(erro);
            res.status(400).send({ error: `Cannot reset password, try again ${erro.message}` });
        }
    }
}

module.exports = new AuthController()