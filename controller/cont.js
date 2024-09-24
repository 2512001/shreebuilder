const { contact } = require("../model/schema");

module.exports.post_contact = async (req, res) => {
  
      let { name, email, subject, message } = req.body;
      const contacts = new contact({
         name,
         email,
         subject,
         message
      })
      let response = await contacts.save();
      res.status(201).json({
         message: "contact details added successfully",
         response
      })

}