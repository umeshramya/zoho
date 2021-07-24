import { useRef } from "react"
import { Row, Col, Form, FormGroup, Input, Label, Container } from "reactstrap"
import axios from "axios"
import jsonToCSV from "json-2-csv"
import saveAs from "file-saver"
import ButtonP from "../compoenents/lib/ButtonP"
import AlertP from "../compoenents/lib/AlertP"


export default function index(props) {


    return (
        <>
            <Zoho
            />

        </>
    )
}




const Zoho = () => {
    const PurchaseCSV = useRef()
    const purRefBut = useRef()
    const SaleCSV = useRef()
    const saleRefBut = useRef()
    const alerRef = useRef()

    const submitPurachaseHandle = async (e) => {
        try {
            e.preventDefault();
            purRefBut.current.spin()
            let Data = new FormData();
            await Data.append("purchase", PurchaseCSV.current.files[0], "purcahseCSV")

            const result = await axios.post("/api/zoho/gst/purchase-csv-to-gst", Data).then(result => result)
            let curData = result.data.data;
            let preFinalData = [];
            let finalData = [];
            let purchaseSet = new Set();

            curData.forEach((bill) => { purchaseSet.add(bill["Purchase ID"]) });

            for (let item of purchaseSet) {
                let curBills = curData.filter(curBill => {
                    if (curBill["Purchase ID"] == item) {
                        return curBill
                    }
                })

                preFinalData.push(curBills);

            }




            preFinalData.forEach(item => {
                let s = {};
                let BillDate, BillNumber, Vendor, GSTIN;
                let ItemTotal = 0, CGST2point5 = 0, SGST2point5 = 0, CGST6 = 0, SGST6 = 0, CGST9 = 0, SGST9 = 0, CGST14 = 0, SGST14 = 0, IGST5 = 0, IGST12 = 0, IGST18 = 0, IGST28 = 0


                item.forEach(ele => {
                    BillDate = ele["Bill Date"]
                    BillNumber = ele["Bill Number"]
                    Vendor = ele["Vendor"]
                    GSTIN = ele["GSTIN"]

                    ItemTotal += parseFloat(ele["Item Total"])

                    CGST2point5 += parseFloat(ele["CGST 2.5"])
                    SGST2point5 += parseFloat(ele["SGST 2.5"])

                    CGST2point5 += parseFloat(ele["CGST 2.5"])
                    SGST2point5 += parseFloat(ele["SGST 2.5"])

                    CGST6 += parseFloat(ele["CGST 6"])
                    SGST6 += parseFloat(ele["SGST 6"])

                    CGST9 += parseFloat(ele["CGST 9"])
                    SGST9 += parseFloat(ele["SGST 9"])

                    CGST14 += parseFloat(ele["CGST 14"])
                    SGST14 += parseFloat(ele["SGST 14"])

                    IGST5 += parseFloat(ele["IGST 5"])
                    IGST12 += parseFloat(ele["IGST 12"])
                    IGST18 += parseFloat(ele["IGST 18"])
                    IGST28 += parseFloat(ele["IGST 28"])

                })


                if (CGST2point5 > 0 || SGST2point5 > 0 || CGST6 > 0 || SGST6 > 0 || CGST9 > 0 || SGST9 > 0 || CGST14 > 0 || SGST14 > 0 || IGST5 > 0 || IGST12 > 0 || IGST18 > 0 || IGST28 > 0) {

                    s["Bill Date"] = BillDate
                    s["Bill Number"] = BillNumber
                    s["Vendor"] = Vendor
                    s["GSTIN"] = GSTIN

                    s["Bill Total"] = ItemTotal

                    s["CGST 2 5"] = CGST2point5
                    s["SGST 2 5"] = SGST2point5

                    s["CGST 6"] = CGST6
                    s["SGST 6"] = SGST6

                    s["CGST 9"] = CGST9
                    s["SGST 9"] = CGST9

                    s["CGST 14"] = CGST14
                    s["SGST 14"] = SGST14

                    s["IGST 5"] = IGST5
                    s["IGST 12"] = IGST12
                    s["IGST 18"] = IGST18
                    s["IGST 28"] = IGST28


                    finalData.push(s);
                }

            })



            jsonToCSV.json2csv(finalData, (err, curCSV) => {
                let blob = new Blob([curCSV], { type: "text/csv;charset=utf-8" });
                saveAs.saveAs(blob, "purchase.csv")
            })

            purRefBut.current.spin()

        } catch (error) {
            console.log(error)
            purRefBut.current.spin()

        }
    }

    const submitsaleHandle = async (e) => {
        try {
            e.preventDefault();//prevemnt default
            saleRefBut.current.spin()
            let Data = new FormData();// create new form data
            await Data.append("sale", SaleCSV.current.files[0], "saleCSV")// append file

            const result = await axios.post("/api/zoho/gst/sale-csv-to-gst", Data).then(result => result) // send  toserver
            let curData = result.data.data;
            let preFinalData = [];
            let finalData = [];
            let invoicesSet = new Set();
            curData.forEach((invoice) => { invoicesSet.add(invoice["Invoice Number"]) });

            for (let item of invoicesSet) {
                let curInvoices = curData.filter(curInvoice => {
                    if (curInvoice["Invoice Number"] == item) {
                        return curInvoice
                    }
                })

                preFinalData.push(curInvoices);

            }
            // Invoice Date	Invoice Number	Customer Name	GSTIN	
            // Item Total	CGST 2.5	SGST 2.5	CGST 6	SGST 6	CGST 9	SGST 9	CGST 14	SGST 14	IGST 5	IGST 12	IGST 18	IGST 28

            preFinalData.forEach(item => {
                let s = {};
                let InvoiceDate, InvoiceNumber, CustomerName, GSTIN;
                let ItemTotal = 0, CGST2point5 = 0, SGST2point5 = 0, CGST6 = 0, SGST6 = 0, CGST9 = 0, SGST9 = 0, CGST14 = 0, SGST14 = 0, IGST5 = 0, IGST12 = 0, IGST18 = 0, IGST28 = 0


                item.forEach(ele => {
                    InvoiceDate = ele["Invoice Date"]
                    InvoiceNumber = ele["Invoice Number"]
                    CustomerName = ele["Customer Name"]
                    GSTIN = ele["GSTIN"]

                    ItemTotal += parseFloat(ele["Item Total"])

                    CGST2point5 += parseFloat(ele["CGST 2.5"])
                    SGST2point5 += parseFloat(ele["SGST 2.5"])

                    CGST6 += parseFloat(ele["CGST 6"])
                    SGST6 += parseFloat(ele["SGST 6"])

                    CGST9 += parseFloat(ele["CGST 9"])
                    SGST9 += parseFloat(ele["SGST 9"])

                    CGST14 += parseFloat(ele["CGST 14"])
                    SGST14 += parseFloat(ele["SGST 14"])

                    IGST5 += parseFloat(ele["IGST 5"])
                    IGST12 += parseFloat(ele["IGST 12"])
                    IGST18 += parseFloat(ele["IGST 18"])
                    IGST28 += parseFloat(ele["IGST 28"])

                })

                if (CGST2point5 > 0 || SGST2point5 > 0 || CGST6 > 0 || SGST6 > 0 || CGST9 > 0 || SGST9 > 0 || CGST14 > 0 || SGST14 > 0 || IGST5 > 0 || IGST12 > 0 || IGST18 > 0 || IGST28 > 0) {

                    s["Invoice Date"] = InvoiceDate
                    s["Invoice Number"] = InvoiceNumber
                    s["Customer Name"] = CustomerName
                    s["GSTIN"] = GSTIN

                    s["Bill Total"] = ItemTotal

                    s["CGST 2 5"] = CGST2point5
                    s["SGST 2 5"] = SGST2point5

                    s["CGST 6"] = CGST6
                    s["SGST 6"] = SGST6

                    s["CGST 9"] = CGST9
                    s["SGST 9"] = CGST9

                    s["CGST 14"] = CGST14
                    s["SGST 14"] = SGST14

                    s["IGST 5"] = IGST5
                    s["IGST 12"] = IGST12
                    s["IGST 18"] = IGST18
                    s["IGST 28"] = IGST28


                    finalData.push(s);
                }

            })


            jsonToCSV.json2csv(finalData, (err, curCSV) => {
                let blob = new Blob([curCSV], { type: "text/csv;charset=utf-8" });
                saveAs.saveAs(blob, "sale.csv")
            })

            saleRefBut.current.spin()

        } catch (error) {
            console.log(error)
            saleRefBut.current.spin()

        }
    }


    function sortByProperty(property) {
        return function (a, b) {
            if (a[property] > b[property])
                return 1;
            else if (a[property] < b[property])
                return -1;

            return 0;
        }
    }

    return (

        <main>
            <Container>
                <Row>
                    <Col>
                        <h3>Zoho purcahse and sale CSV files  to CA needed GST formats</h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form onSubmit={submitPurachaseHandle}>
                            <h4>Purchases</h4>
                            <FormGroup>
                                <Label for="PurchaseCSV"></Label>
                                <Input type="file" innerRef={PurchaseCSV} name="PurchaseCSV" placeholder="Purchase CSV" accept=".csv" required />

                            </FormGroup>
                            <FormGroup>
                                <ButtonP ref={purRefBut} text="Upload"></ButtonP>
                            </FormGroup>
                        </Form>
                        <AlertP ref={alerRef} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form onSubmit={submitsaleHandle}>
                            <h4>Sales</h4>
                            <FormGroup>
                                <Label for="SaleCSV"></Label>
                                <Input type="file" innerRef={SaleCSV} name="PurchaseCSV" placeholder="Sale CSV" required accept=".csv" />

                            </FormGroup>
                            <FormGroup>
                                <ButtonP ref={saleRefBut} text="Upload"></ButtonP>
                            </FormGroup>
                        </Form>
                        <AlertP ref={alerRef} />
                    </Col>
                </Row>
            </Container>
        </main>


    )


}