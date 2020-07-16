import React from 'react';
import axios from 'axios';
//import console = require('console');

export const emailSender = (emailObject) => {
    axios.post('https://milanlaser.com/quote/april2020/send_email.php', emailObject, {headers: { 'X-Requested-With': 'XMLHttpRequest',
    'Cache-Control': 'no-cache'}})
     /* .then(function (response) {
        console.log(response);
        return true;
      })
      .catch(function (error) {
        console.log(error);
      }); */
}