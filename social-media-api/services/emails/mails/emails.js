const mailer = require('../mail-client/mailClient')

const sendConfirmationEmail = (email, token) => {
    mailer.sendMail({
        from: 'no-reply@test.com',
        to: email,
        subject: 'Activate your account',
        html: `<p>please activate your account by click this <a href="${token}">link</a></p` //href will be replaced by the client address when client side will be ready
    })
}

module.exports = {
    sendConfirmationEmail
}