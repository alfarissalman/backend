const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const verifyToken = require("../helper/verifyToken");

const authController = {
  updateByImage: (req, res) => {
   try {
    if (!req.file) {
        return res.status(400).json({
          status: 102,
          error: "Format image tidak sesuai",
          data: null,
        });
      }
      db.query(
        `
                  SELECT profile_image from tb_users WHERE
                  email=$1
                  `,
        (err, result) => {
          const {
            profile_image = `http://localhost:5000/${req?.file.filename}` ||
              result.rows[0].profile_image,
          } = req.body;
  
          db.query(
            `
                  UPDATE tb_users SET  
                  profile_image = '${profile_image}' WHERE email=$1
                  RETURNING email, first_name, last_name, profile_image `,
            [req.userEmail],
            (err, updateresult) => {
              if (err)
                return res.status(400).send({
                  message: err.message,
                  data: {},
                });
              return res.status(200).send({
                status: 0,
                message: "update profile image berhasil",
                data: updateresult.rows[0],
              });
            }
          );
        }
      );
   } catch (error) {
    return res.status(500).send({
        status: 102,
        message: error.message,
        data: null,
      });
   }
  
  },

  update: (req, res) => {
    try {
        db.query(
            `
                      SELECT first_name,last_name from tb_users WHERE
                      email=$1
                      `,
            (err, result) => {
              const {
                first_name = result.rows[0].first_name,
                last_name = result.rows[0].last_products,
              } = req.body;
      
              db.query(
                `
                      UPDATE tb_users SET first_name = '${first_name}', 
                      last_name = '${last_name}' WHERE email=$1
                      RETURNING first_name, last_name `,
                [req.userEmail],
                (err, updateresult) => {
                  if (err)
                    return res.status(400).send({
                      message: err.message,
                      data: {},
                    });
                  return res.status(200).send({
                    status: 0,
                    message: "update profile berhasil",
                    data: updateresult.rows[0],
                  });
                }
              );
            }
          );
    } catch (error) {
        return res.status(500).send({
            status: 102,
            message: error.message,
            data: null,
          });
    }
   
  },

  getByProfile: (req, res) => {
    console.log(req.userEmail);
    try {
      db.query(
        "SELECT email, first_name, last_name, profile_image from tb_users where email=$1",
        [req.userEmail],
        (err, result) => {
          //pesan error dari sistem query
          if (err)
            return res.status(400).send({
              status: 102,
              message: err.message,
              data: null,
            });
          if (result.rows.length == 0) {
            //pesan error user tidak ditemukan
            return res.status(401).send({
              status: 103,
              message: "user not found",
              data: null,
            });
          }

          //pesan sukses
          return res.status(200).send({
            status: 0,
            message: "Sukses",
            data: result.rows[0],
          });
        }
      );
    } catch (error) {
      return res.status(500).send({
        status: 102,
        message: error.message,
        data: null,
      });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      if (!email.includes("@")) {
        //pesan error format email tidak sesuai
        return res.status(400).send({
          status: 102,
          message: "Paramter email tidak sesuai format",
          data: null,
        });
      }
      db.query(
        `SELECT * from tb_users WHERE email=$1`,
        [email],
        async (err, result) => {
          if (err) {
            //pesan error dari sistem query
            return res.status(400).send({
              status: 102,
              message: err.message,
              data: null,
            });
          }
          if (result.rows.length == 0) {
            //pesan error username atau password
            return res.status(401).send({
              status: 103,
              message: "Username atau password salah",
              data: null,
            });
          }

          const user = result.rows[0];
          const validPassword = await argon2.verify(user.password, password);
          if (!validPassword) {
            //pesan error salah password
            return res.status(401).send({
              message: "Password salah",
            });
          }
          const token = jwt.sign(
            {
              email: result.rows[0].email,
            },
            "g3d2983hd238idiudgd87g8d3278d23",
            {
              expiresIn: "12h",
            }
          );
          //pesan berhasil login
          return res.status(200).send({
            status: 0,
            message: "Login sukses",
            data: {
              token: token,
            },
          });
        }
      );
    } catch (error) {
      // pesan error dari sistem database
      return res.status(500).send({
        status: 102,
        message: error.message,
        data: null,
      });
    }
  },

  register: async (req, res) => {
    const { email, first_name, last_name, password } = req.body;

    try {
      if (!email.includes("@")) {
        //pesan error format email tidak sesuai
        return res.status(400).send({
          status: 102,
          message: "Parameter email tidak sesuai format",
          data: null,
        });
      }

      if (password.length < 8) {
        //pesan error password kurang minimal 8 karakter
        return res.status(400).send({
          status: 102,
          message: "Password kurang dari 8 karakter",
          data: null,
        });
      }
      const hash = await argon2.hash(password);
      db.query(
        `INSERT INTO tb_users(id, email, first_name, last_name, password, role) VALUES($1, $2, $3, $4, $5, $6) RETURNING email, first_name, last_name, password `,
        [uuidv4(), email, first_name, last_name, hash,'user'],
        (err, result) => {
          if (err) {
            console.log(err);
            if (err.code == "23505") {
              //pesan error karena duplicate email
              return res.status(400).send({
                status: 102,
                message: `Email sudah terdaftar`,
                data: null,
              });
            }
            //pesan error dari sistem query
            return res.status(400).send({
              status: 102,
              message: err.message,
              data: null,
            });
          }
          //pesan register berhasil
          return res.status(200).send({
            status: 0,
            message: "Register berhasil silahkan login",
            data: result.rows[0],
          });
        }
      );
    } catch (error) {
      return res.status(500).send({
        //    pesan error dari sistem database
        status: 102,
        message: error.message,
        data: {},
      });
    }
  },
};

module.exports = authController;
