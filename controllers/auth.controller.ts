const path = require('path');

exports.goToLoginPage = (req: any, res: any, next: any) => {
    console.log('LOGIN PAGE');
    res.render('login');
};