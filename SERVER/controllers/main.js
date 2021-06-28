const mainDB = require('../schemas/productShopSchema')

module.exports = {
    createObj: (req, res) => {

        let obj = new mainDB
        obj.title = req.body.title
        obj.amount = req.body.amount
        obj.price = req.body.price


        obj.save().then(() => {
            mainDB.find().then((data)=>res.send({data}))

        }).catch(e => {
            res.send({error: true, message: e})
        })

    },
    findProducts: async (req, res) => {
        mainDB.find().then((data)=>res.send({data}))
    },
    addProduct: async (req, res) => {

        let tempObj = await mainDB.findOne({_id: req.params.id})

        mainDB.findOneAndUpdate(
            {_id: req.params.id},
            {$set: {amount: tempObj.amount+1}},
            {returnOriginal: false})
            .then(() => {
                mainDB.find().then((data)=>res.send({data}))
            }).catch(e => {
            console.log(e)
        })
    },
    reduceProduct: async (req, res) => {

        let tempObj = await mainDB.findOne({_id: req.params.id})
        if(tempObj.amount>0) {
            mainDB.findOneAndUpdate(
                {_id: req.params.id},
                {$set: {amount: tempObj.amount - 1}},
                {returnOriginal: false})
                .then(() => {
                    mainDB.find().then((data) => res.send({data}))
                }).catch(e => {
                console.log(e)
            })
        }
    },
    deleteProduct: async (req, res) => {
        await mainDB.deleteOne({_id: req.params.id})
            .then(() => {
                mainDB.find().then((data)=>res.send({data}))
            }).catch(e => {
                console.log(e)
    })
    },
}




//
//
// updateAmount: async (req, res) => {
//     console.log(req.body)
//     mainDB.findOneAndUpdate(
//         {_id: req.body.id},
//         {$set: {amount: req.body.amount}},
//         {returnOriginal: false})
//         .then(() => {
//             mainDB.find().then((data)=>res.send({data}))
//         }).catch(e => {
//         console.log(e)
//     })
// },