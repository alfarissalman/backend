const db = require("../config/db")

const informationController = {
    getAllBanner : (req, res)=>{

        try {
            db.query("SELECT banner_name, banner_image, description from tb_banner ORDER BY id_banner ASC",(err, result)=>{
              //pesan error dari query
                if(err)
                return res.status(400).send({
                    status:102,
                    message:err.message,
                    data:null
                })
              //pesan sukses
              return res.status(200).send({
                    status:0,
                    message:"Sukses",
                    data:result.rows
              })  

            })
            
        } catch (error) {
            //pesan error dari database
            return res.status(500).send({
                status:102,
                message:error.message,
                data:null
            })
        }
        
    },

    getAllService : (req, res)=>{
        try {
            db.query("SELECT service_code, service_name, service_icon, service_tariff from tb_service ORDER BY id_service ASC",(err, result)=>{
                if(err)
                //pesan error dari query
                  return res.status(400).send({
                      status:102,
                      message:err.message,
                      data:null
                  })
                //pesan berhasil
                return res.status(200).send({
                      status:0,
                      message:"Sukses",
                      data:result.rows
                })  
  
              })
        } catch (error) {
            //pesan error dari database
            return res.status(500).send({
                status:102,
                message:error.message,
                data:null
            })   
        }
    }

}

module.exports = informationController