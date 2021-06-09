const axios = require("axios");
const moment = require("moment");
const {header, session_url} = require("../configs/configs");



const fetchSlots = () =>{
    const date = moment().format("DD-MM-YYYY");
    let config = {
      method: 'GET',
      url: session_url  + date,
      headers: header
    };
    return axios(config)
      .then(function (result) {
        if (result.status == 200) {
          return result;
        } else {
          throw 'error fetching...';
        }
      })
}

module.exports = {fetchSlots}