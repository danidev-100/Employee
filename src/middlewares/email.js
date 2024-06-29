import brevo from '@getbrevo/brevo'

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const api = new brevo.TransactionalEmailsApi()

api.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.SECRET_KEY_MAIL
)

export  async function getEmail (){

     const resulted = await prisma.employee.findMany()

     
     
     try {
         const sendEmail =  new brevo.SendSmtpEmail()
         
         sendEmail.subject= 'Hello'
         sendEmail.to = resulted.map(email => email)
    
    
    sendEmail.htmlContent = `<html><body><h1>Hola las amoooo !!!!</h1></body></html>`
    
    sendEmail.sender = {

        name: 'dani',
        email: 'adriandanielfernandez@gmail.com'
    }
    
    const result = await api.sendTransacEmail(sendEmail)
    
   
    
   } catch (error) {
    console.error(error)
   }
}



export async function getEmailConfirm (email,name){

   
     try {
         const sendEmail =  new brevo.SendSmtpEmail()
         
         sendEmail.subject= 'Account Confirmation'
         sendEmail.to = [{
            email
         }]

    
    
    sendEmail.htmlContent = `<html><body><h1>Hello ${name} !!!!</h1></body></html>`
    
    sendEmail.sender = {

        name: 'dani',
        email: 'adriandanielfernandez@gmail.com'
    }
    
    const result = await api.sendTransacEmail(sendEmail)
    
   
    
   } catch (error) {
    console.error(error)
   }
}



