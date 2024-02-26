const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const transactionController = {
  getByBalance: (req, res) => {
    try {
      db.query(
        "SELECT balance from tb_balances where user_email=$1 ",
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
            message: "Get Balance berhasil",
            data: result.rows[0],
          });
        }
      );
    } catch (error) {
      //pesan error dari database
      return res.status(500).send({
        status: 102,
        message: error.message,
        data: null,
      });
    }
  },

  
  topup: (req, res) => {
    try {
      const { top_up_amount } = req.body;

      if (!( typeof top_up_amount === "number" &&
          !isNaN(top_up_amount) &&
          top_up_amount >= 0
        )
      ) {
        //pesan error format Parameter amount hanya boleh angka saja dan tidak boleh lebih kecil dari 0
        return res.status(400).send({
          status: 102,
          message:
            "Parameter amount hanya boleh angka saja dan tidak boleh lebih kecil dari 0",
          data: null,
        });
      }
      db.query(
        `
            SELECT balance, user_email from tb_balances WHERE
            user_email=$1
            `,
        [req.userEmail],
        (err, result) => {
          const sum = Number(result.rows[0].balance) + Number(top_up_amount);
          const user = String(result.rows[0].user_email);
          db.query(
            `
              UPDATE tb_balances SET balance = '${sum}' WHERE user_email=$1
              RETURNING balance`,
            [req.userEmail],
            (err, updateresult) => {
              if (err)
                return res.status(400).send({
                  message: err.message,
                  data: {},
                });
                
              db.query(
                `INSERT INTO tb_transaction (id_transaction, invoice_number,service_code, service_name, transaction_type, total_amount, created_on, user_email) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
                [
                  uuidv4(),
                  `INV-${uuidv4()}`,
                  "TOP UP BALANCE",
                  "Top Up Balance",
                  "TOPUP",
                  Number(top_up_amount),
                  new Date(),
                  user
                  ,
                ],
                (err, result) => {
                  if (err)
                    return res.status(400).send({
                      message: err.message,
                      data: {},
                    });
                  return res.status(200).send({
                    status: 0,
                    message: "Top up balance berhasil",
                    data: updateresult.rows[0],
                  });
                }
              );
            }
          );
        }
      );
    } catch (error) {
      //pesan error dari database
      return res.status(500).send({
        status: 102,
        message: error.message,
        data: null,
      });
    }
  },


  createTransaction: (req, res) => {
    try {
      const { service_code } = req.body;
      db.query(
        `
            SELECT balance,user_email from tb_balances WHERE
            user_email=$1
            `,
        [req.userEmail],
        (err, result) => {
          db.query(
            `SELECT * FROM tb_service where service_code=$1`,
            [service_code],
            (err, resultService) => {
              if (resultService.rows.length == 0) {
                //pesan error user tidak ditemukan
                return res.status(401).send({
                  status: 103,
                  message: "service not found",
                  data: null,
                });
              } else {
                const serviceData = resultService.rows[0];
                const sum =
                  Number(result.rows[0].balance) -
                  Number(serviceData.service_tariff);
                  const user = String(result.rows[0].user_email);
                db.query(
                  `
                              UPDATE tb_balances SET balance = '${sum}' WHERE user_email=$1
                              RETURNING balance`,
                  [req.userEmail],
                  (err, updateresult) => {
                    if (err)
                      return res.status(400).send({
                        message: err.message,
                        data: {},
                      });

                    db.query(
                      `INSERT INTO tb_transaction (id_transaction, invoice_number, transaction_type, total_amount, created_on, service_code, service_name,user_email) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
                      [
                        uuidv4(),
                        `INV-${uuidv4()}`,
                        "PAYMENT",
                        Number(serviceData.service_tariff),
                        new Date(),
                        serviceData.service_code,
                        serviceData.service_name,
                        user
                      ],
                      (err, resultTransaction) => {
                        if (err)
                          return res.status(400).send({
                            message: err.message,
                            data: {},
                          });
                        const transactionData = resultTransaction.rows[0];
                        return res.status(200).send({
                          status: 0,
                          message: "Payment Success",
                          data: {
                            invoice_number: transactionData.invoice_number,
                            service_code: serviceData.service_code,
                            service_name: serviceData.service_name,
                            transaction_type: transactionData.transaction_type,
                            total_amount: transactionData.total_amount,
                            created_on: transactionData.created_on,
                          },
                        });
                      }
                    );
                  }
                );
              }
            }
          );         
        }
      );
    } catch (error) {
      //pesan error dari database
      return res.status(500).send({
        status: 102,
        message: error.message,
        data: null,
      });
    }
  },

  getTransaction : (req, res)=>{
    try {
      db.query(
        "SELECT * from tb_balances where user_email=$1 ",
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
          db.query(`SELECT invoice_number, transaction_type, service_name, total_amount, created_on from tb_transaction WHERE user_email=$1`,[req.userEmail],(err, resultHistory)=>{
            if(err){
              return res.status(400).send({
                status:102,
                message:err.message,
                data:null
              })
            }

            //pesan sukses
          return res.status(200).send({
            status: 0,
            message: "Get History berhasil",
            data: resultHistory.rows
          });

          })

          
        }
      );
    } catch (error) {
      //pesan error dari database
      return res.status(500).send({
        status: 102,
        message: error.message,
        data: null,
      });
    }
  }
};

module.exports = transactionController;
