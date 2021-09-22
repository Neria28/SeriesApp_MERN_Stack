// const Users = require("../Schemas/usersModel");
// const jwt = require("jsonwebtoken");

// exports.verifayUser = function (userName, pwd) {
//   return new Promise((resolve, reject) => {
//     Users.find({}, function (err, data) {
//       let allUsers = data;
//       let user = allUsers.find((x) => x.userName === userName);
//       if (user) {
//         if (user.pwd === pwd) {
//           (req, res) => {
//             const userId = user._id;
//             const RSA_PRIVATE_KEY = "KeYuNiQe";
//             var tokenValue = jwt.sign({ id: userId }, RSA_PRIVATE_KEY);
//             resolve(res.status(200).send({ token: tokenValue, user: user }));
//           };
//         } else {
//           resolve(false);
//         }
//       } else {
//         reject(err);
//       }
//     });
//   });
// };

// // Users.findOne({ userName: userName }, (err, data) => {
// //     if (err) {
// //       reject(err);
// //     } else {
// //       if (data.userName === userName && data.pwd === pwd) {
// //         console.log(data);
// //         resolve(true);
// //       } else {
// //         console.log(data);
// //         resolve(false);
// //       }
// //     }
// //   });
