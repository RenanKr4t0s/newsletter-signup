const express = require("express")
const bodyParser = require('body-parser')
const app = express()
const mailchimp = require('@mailchimp/mailchimp_marketing');


app.use(bodyParser.urlencoded({extends:true}))

app.use(express.static('pages'))

mailchimp.setConfig({
apiKey: '7bdfd3001b10e640f4c103788a5f8e33-us13',
server: 'us13',
});
  


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/pages/signup.html")
})

app.post('/',(req,res)=>{
    let fName = req.body.nome
    let lName = req.body.sobrenome
    let email = req.body.email

    const addMember = async () => {
      try{
        const dataChimp = await mailchimp.lists.addListMember("615d6fc38e", {
          email_address: email,
          status: 'subscribed',
          merge_fields:{
            FNAME: fName,
            LNAME:lName
          }
        });
        console.log(dataChimp);
        res.sendFile(__dirname+"/pages/sucess.html")

      }catch (error){
        res.sendFile(__dirname+"/pages/failure.html")
        console.log(error)
      }
    };
    addMember()  
})

app.listen(3000,()=>{
    console.log('Rodando servidor na porta 3000')
})

//! key 7bdfd3001b10e640f4c103788a5f8e33-us13
// 615d6fc38e