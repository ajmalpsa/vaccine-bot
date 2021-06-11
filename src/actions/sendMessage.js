const { bot } = require("../api/bot");
const { fetchSlots } = require("../api/fetchSlots");
const { filterCenters } = require("./filterCenters");
const jsondiff = require("json-diff");
const oldJson = require("../../test2.json");


const dataset = {
    data: [],

    get getData() {
        return this.data;
    },
    set setData(newData) {
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
            // centers.map((item) => {
            //     console.log("new id", item.center_id);
            // })
            //console.log(dataset.getData.length);
            if (dataset.getData.length == 0) {
                dataset.setData = filterCenters(oldJson.centers);
                //bot.sendMessage(myId, "data set");
                console.log("data set");
                // dataset.getData.map((item) => {
                //     console.log("old", item.center_id);
                // })
            }
            else {
                oldcenters = dataset.getData;
                let diffarray = oldcenters.filter(({ center_id: oldid }) => centers.some(({ center_id: newid }) => oldid === newid));
                // diffarray = same element
                // diffarray.map(({ center_id }) => {
                //     console.log("diff", center_id);
                // })
                let newcenters = centers.filter((newitem) => {
                    return !diffarray.find((diffitem) => {
                        return newitem.center_id == diffitem.center_id
                    })
                });
                if (newcenters) {
                    dataset.setData = centers;
                    newcenters.map((center) => {
                        let name = `${center.name} (${center.block_name})`;
                        let { pincode, fee_type } = center;
                        let message = `${name}\npincode: ${pincode}\nFee: ${fee_type}`
                        center.sessions.map((session) => {
                            let { date, available_capacity_dose1, available_capacity_dose2, vaccine, min_age_limit } = session;
                            message += `\n\nMinimum Age: ${min_age_limit}\nDate: ${date}\nDose 1:${available_capacity_dose1}\nDose 2: ${available_capacity_dose2}\nVaccine: ${vaccine}`
                            messageArray.push(message);
                            //console.log(message);
                        })
                    })
                }
            }



        })
        .catch((err) => {
            bot.sendMessage(myId, "Error occured")
            //console.log(err);
        })


    var timer = setInterval(function () {
        if (messageArray.length) {
            bot.sendMessage(myId, messageArray.shift())
            //console.log(messageArray.shift());
        } else {
            clearInterval(timer);
        }
    }, 5000);
}

module.exports = { sendMessageAction }