// this file for routes of auth 

const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const csv = require("csvtojson")

router.post("/purchase-csv-to-gst", upload.single("purchase"), async (req, res) => {
    try {
        const fileString = req.file.buffer.toString()
        const purchases = await purachseCSVHandle(fileString).then(result => result)

        res.status(200).json({ data: purchases, mes: "recived bills" })
    } catch (error) {
        res.status(500).send(error)
    }
})




const purachseCSVHandle = (fileString) => {
    return new Promise((resolve, reject) => {

        csv().fromString(fileString).then((result) => {

            let bills = result.map((row) => {

                return {
                    'Bill Date': row["Bill Date"],
                    "Bill Number": row["Bill Number"],
                    'Purchase ID': `${row["Bill Number"]} ${row["Vendor Name"]}`,
                    "Vendor": row["Vendor Name"],
                    "GSTIN": row["GST Identification Number (GSTIN)"],

                    "Item Total": parseFloat(row["Item Total"]),


                    "CGST 2.5": parseFloat(row["CGST Rate %"]) === 2.5 ? parseFloat(row["CGST(FCY)"]) : 0,
                    "SGST 2.5": parseFloat(row["SGST Rate %"]) === 2.5 ? parseFloat(row["SGST(FCY)"]) : 0,


                    "CGST 6": parseFloat(row["CGST Rate %"]) === 6 ? parseFloat(row["CGST(FCY)"]) : 0,
                    "SGST 6": parseFloat(row["SGST Rate %"]) === 6 ? parseFloat(row["SGST(FCY)"]) : 0,

                    "CGST 9": parseFloat(row["CGST Rate %"]) === 9 ? parseFloat(row["CGST(FCY)"]) : 0,
                    "SGST 9": parseFloat(row["SGST Rate %"]) === 9 ? parseFloat(row["SGST(FCY)"]) : 0,


                    "CGST 14": parseFloat(row["CGST Rate %"]) === 14 ? parseFloat(row["CGST(FCY)"]) : 0,
                    "SGST 14": parseFloat(row["SGST Rate %"]) === 14 ? parseFloat(row["SGST(FCY)"]) : 0,


                    "IGST 5": parseFloat(row["IGST Rate %"]) === 5 ? parseFloat(row["IGST(FCY)"]) : 0,
                    "IGST 12": parseFloat(row["IGST Rate %"]) === 12 ? parseFloat(row["IGST(FCY)"]) : 0,
                    "IGST 18": parseFloat(row["IGST Rate %"]) === 18 ? parseFloat(row["IGST(FCY)"]) : 0,
                    "IGST 28": parseFloat(row["IGST Rate %"]) === 28 ? parseFloat(row["IGST(FCY)"]) : 0,
                }
            })

            resolve(bills)
        }).catch(err => {
            reject(err)
        })

    })

}



/*

=====================
SALE
===================

*/


router.post("/sale-csv-to-gst", upload.single("sale"), async (req, res) => {
    try {

        const fileString = req.file.buffer.toString()
        const sales = await saleCSVHandle(fileString).then(result => result)
        res.status(200).json({ data: sales, mes: "sales" })
    } catch (error) {
        res.status(500).send(error)
    }
})


const saleCSVHandle = (fileString) => {

    return new Promise((resolve, reject) => {

        csv().fromString(fileString)
            .then(result => {

                const cursales = result.map((row) => {

                    return {


                        'Invoice Date': row['Invoice Date'],
                        'Invoice Number': row['Invoice Number'],
                        'Customer Name': row['Customer Name'],
                        'GSTIN': row['GST Identification Number (GSTIN)'],
                        'Item Total': row['Item Total'],

                        "CGST 2.5": parseFloat(row["CGST Rate %"]) === 2.5 ? parseFloat(row["CGST(FCY)"]) : 0,
                        "SGST 2.5": parseFloat(row["SGST Rate %"]) === 2.5 ? parseFloat(row["SGST(FCY)"]) : 0,


                        "CGST 6": parseFloat(row["CGST Rate %"]) === 6 ? parseFloat(row["CGST(FCY)"]) : 0,
                        "SGST 6": parseFloat(row["SGST Rate %"]) === 6 ? parseFloat(row["SGST(FCY)"]) : 0,

                        "CGST 9": parseFloat(row["CGST Rate %"]) === 9 ? parseFloat(row["CGST(FCY)"]) : 0,
                        "SGST 9": parseFloat(row["SGST Rate %"]) === 9 ? parseFloat(row["SGST(FCY)"]) : 0,


                        "CGST 14": parseFloat(row["CGST Rate %"]) === 14 ? parseFloat(row["CGST(FCY)"]) : 0,
                        "SGST 14": parseFloat(row["SGST Rate %"]) === 14 ? parseFloat(row["SGST(FCY)"]) : 0,


                        "IGST 5": parseFloat(row["IGST Rate %"]) === 5 ? parseFloat(row["IGST(FCY)"]) : 0,
                        "IGST 12": parseFloat(row["IGST Rate %"]) === 12 ? parseFloat(row["IGST(FCY)"]) : 0,
                        "IGST 18": parseFloat(row["IGST Rate %"]) === 18 ? parseFloat(row["IGST(FCY)"]) : 0,
                        "IGST 28": parseFloat(row["IGST Rate %"]) === 28 ? parseFloat(row["IGST(FCY)"]) : 0,

                    }
                })
                resolve(cursales);

            }).catch(err => reject(err))
    })
}

module.exports = router;