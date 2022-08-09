import passport from "passport";
import User from "@server/models/SignUser";
import dbConnect from '@server/dbConnect'

export default async function handler (req, res,next) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'POST':
      try {
        passport.authenticate("user", { failureRedirect: "/", failureFlash: "Invalid username or password.", successFlash: true }, 
        async (err, user) => {
          try {
            console.log(req.body);
            if (err) {  
              return next(err);
            }
            if (!user) {
              res.status(404).send(new Error("User is not correct"));
            }
            const test = await User.findOne({ email: user.email });
            if (test) {
              req.logIn(user, (err) => {
                if (err) {
                  return next(err);
                }
                console.log(test);
                res.status(200).send(test);
              });
            } else {
              res.status(404).send(new Error("User not found"));
            }
          } catch (err) {
            return res.status(404).send(err);
          }
        })(req, res, next);

      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}



// {
//   "email":"test1@test.com",
//   "password":"abc"
// }