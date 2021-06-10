const { bot } = require("../api/bot");
const { fetchSlots } = require("../api/fetchSlots");
const { filterCenters } = require("./filterCenters");
const jsondiff = require("json-diff");
const oldJson = require("../../test2.json");


const dataset = {
    data : [],

    get getData() {
        return this.data;
    },
    set setData(newData){
        this.data = newData;
    }
}

const sendMessageAction = () => {
    const channel_id = '-1001478182771';
    const myId = '374255531';
    let messageArray = [];
    fetchSlots()
        .then((data) => {
            const centers = filterCenters(data.data.centers);
            dataset.setData = centers;
            let diff = jsondiff.diff(dataset.getData, centers);
            if(diff){
                bot.sendMessage(myId, "diff found");
                console.log(diff);
                dataset.setData(centers)
            }
            else{
                bot.sendMessage(myId, "no diff found");
                console.log(diff);
            }


            // if (centers) {
            //     centers.map((center) => {
            //         let name = `${center.name} (${center.block_name})`;
            //         let {pincode, fee_type} = center;
            //         let message = `${name}\npincode: ${pincode}\nFee: ${fee_type}`
            //         center.sessions.map((session) => {
            //             let { date, available_capacity_dose1, available_capacity_dose2, vaccine, min_age_limit } = session;
            //             message += `\n\nMinimum Age: ${min_age_limit}\nDate: ${date}\nDose 1:${available_capacity_dose1}\nDose 2: ${available_capacity_dose2}\nVaccine: ${vaccine}`
            //             messageArray.push(message);
            //         })
            //     })
            // }
        })
        .catch((err) => {
            //bot.sendMessage(myId, "Error occured")
            console.log(err);
        })


    var timer = setInterval(function() {
        if(messageArray.length) {
            //bot.sendMessage(channel_id, messageArray.shift())
        } else {
            clearInterval(timer);
        }
    }, 5000);
}

module.exports = { sendMessageAction }