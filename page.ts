import axios from "axios";
import fs from 'fs';


async function getWidget() {
    const res = await axios.get(
        `http://localhost:8080/uitest/widgetService/getAllWIdgets`
    )
    if (!res) {
        console.log("fetch widget info error")
        return
    }
    for (let page of Object.keys(res.data.data)) {
        const filename = `page1/${page}.ts`
        let data:string
        data = `module.exports = ${JSON.stringify(res['data']['data'][page],null,"\t")}`
        fs.writeFileSync(filename,data)
    }
}

getWidget()