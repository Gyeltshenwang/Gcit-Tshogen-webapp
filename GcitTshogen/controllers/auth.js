

import crypto from 'crypto'
import User from '../models/userSignupModel.js';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'wangdigyeltshen2@gmail.com',
    pass: 'qxoomsxpdazxuorg',
  }
});
export const getUserSigin = (req, res) => {
    let message = req.flash('error');
    if (message.lenght > 0) { message = message[0]; } else { message = null; }
        
    res.render('signup/registration', { errorMessage: message });
}
export const getUserLogin = (req, res) => {
    let message = req.flash('error');
    if (message.lenght > 0) { message = message[0]; } else { message = null; }
    res.render('signup/login', { errorMessage: message });
}
export const homePage = (req, res) => {
    res.render('partials/homePage')
}
export const userVotingPage = (req, res) => {
    res.render('partials/userVotingPage')
}
//**** point to be notede */
export const logOut = (req, res) => {
   
    res.render('partials/homePage')
}
export const getReset = (req, res)=>{
    res.render('partials/reset')
}


  // create reusable transporter object using the default SMTP transport
  


//validation
export const postRegister = function (req, res) {
   
    const { username, email, password } = req.body;
    User.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                console.log('email already exists');
                req.flash('error', 'email already exists');
               
                return res.redirect('/signup');// user with same email exist 
            }
            // hash the password
            return bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        username,
                        email,
                        password: hashedPassword,
                        emailToken: crypto.randomBytes(64).toString('hex'),
                        isVarified: false
            
                    });
                    return user.save();
                    //  var mailOptions = {
                    //     form: `Verify your email `,
                    //      to: user.email,
                    //      subject: 'Gyeltshen wangdi  -verify your email',
                    //      html: `<h3> ${user.username}! Thanks for registring for registring on our website</h3>
                    //      <a href = "http://${req.header.host}/verify-email?token=${user.emailToken}">Chick here to get verified!!</a>`
                        
                    // }rsrs
                    // send mail 
                  
                    // transporter.sendMail(mailOptions, (error, info) => {
                    //     if (error) {
                    //         console.log(error);

                    //     } else {
                    //         console.log('verification email is sent on your account')
                    //     }
                    // })
                    //console.log(user);
                     
                    
                })
            
                .then(result => {
                   


                    res.redirect('/login');
                    // return transporter.sendMail({
                    // to: email,
                    // from: 'shop@node-complete.com',
                    // subject: 'Signup succeeded!',
                    // html: '<h1>You successfully signed up!</h1>'
                    //   });
           
                })
                .catch(err => {
                    console.log(err)
                });  // login after sign
        })
        
        .catch(err => {
            console.log(err)
        
        });
    
};
// user login 

export const postLogin = (req, res, next) => {
    const { email, password } = req.body;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        req.flash('error', 'Invalid email or password.');
        return res.redirect('/login');
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/voting');
            });
          }
         req.flash('error', 'Invalid email or password.');
          res.redirect('/login');
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch(err => console.log(err));
};


//PASSWORD RESETTING


export const postReset = (req, res, next) => {
    
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
            res.redirect('/reset')
        }
        const token = buffer.toString('hex');
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    console.log('No account  found');
                    res.redirect('/reset')
                }
                // check the reset token
                user.resetToken = token;
                user.resetTokenExpire = Date.now() + 3600000;
                return user.save();
                // if reset token exists then 
            })
            .then(result => {
                //redirect to same page
                res.redirect('/')

                //send email
                // transporter.sendMail({
                //     to: req.body.email,
                //     from: "gcit voting .com",
                //     subject: "Reset Password",
                //     html: `
                //     <p> you requested reset password</p>
                //     <p> click link "http://localhost:3000/reset/${token}"set a new password </p>`

                // });


let details = {
  from: 'wangdigyeltshen2@gmail.com',
  to: req.body.email,
  subject: 'Wang Di11',
    text: 'Hello, Wang Di11!',
    html: `
          <p> you requested reset password</p>
                //     <p> click link "http://localhost:3000/reset/${token}"set a new password </p>

    `
}
transporter.sendMail(details, (err) => {
  if (err) { console.log('error sending mail',err)} else {console.log('success sending mail') }

});
            })   
            .catch(err => {
                console.log(err);
            })

    })
}
    
// RESER TOKEN FOR PASSWORD 
export const getNewPassword = (req, res,next) => {
    const token = req.params.token;

    
    User.findOne({ resetToken: token, resetTokenExpire: { $gt: Date.now() } })
        .then(user => {
            res.render('partials/newPassword', {
                userId: user._id.toString(),
               passwordToken: token
            });
        })
        .catch(err => {
        colsole.log(err);
        });
        
}

// POST NEW TOKEN

export const  postNewPassword = (req, res, next) => {
    const { newPassword, userId, passwordToken } = req.body;
  let resetUser;
  User.findOne({
    resetToken: passwordToken,
    resetTokenExpire: { $gt: Date.now() },
    _id: userId
  })
    .then(user => {
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then(hashedPassword => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpire = undefined;
      return resetUser.save();
    })
    .then(result => {
      res.redirect('/login');
    })
    .catch(err => {
      console.log(err);
    });
};
