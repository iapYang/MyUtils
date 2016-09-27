function loadXlsData() {
    let url = "data/Cheveron_IDV_Data.xlsx";
    let oReq = new XMLHttpRequest();
    oReq.open("GET", url, true);
    oReq.responseType = "arraybuffer";

    oReq.onload = function(e) {
        let arraybuffer = oReq.response;

        /* convert data to binary string */
        let data = new Uint8Array(arraybuffer);
        let arr = [];
        for (let i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        let bstr = arr.join('');

        /* Call XLSX */
        let workbook = XLSX.read(bstr, {
            type: 'binary'
        });

        let first_sheet_name = workbook.SheetNames[0];
        let worksheet = workbook.Sheets[first_sheet_name];
        let xlsx_raw_json = XLSX.utils.sheet_to_json(worksheet);
        console.log(xlsx_raw_json);
    }

    oReq.send();
}
