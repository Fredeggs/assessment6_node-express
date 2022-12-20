const fs = require('fs')
const axios = require('axios');
const args = process.argv;

function createUrlArray(path){
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
          // handle possible error
          console.error(err);
          // kill the process and tell the shell it errored
          process.exit(1);
        }
        const urlArr = data.split(/\r?\n/);
        writeUrlHtml(urlArr); 
    })
}


async function writeUrlHtml(arr){
    for (const url of arr) {
        try {
            const res = await axios.get(url, {headers: { "Accept-Encoding": "gzip,deflate,compress" }})
            fs.writeFile(`${res.request.host}`, res.data, {encoding: 'utf8', flag: 'w'}, (err, data) => {
                if (err){
                    console.log(`Error writing to file: ${res.request.host}: `, err)
                    process.kill(1)
                }
                return console.log("Wrote to file: ", res.request.host)
            })
        }
        catch (error) {
            console.error(`Couldn't download ${url}`)
        }
    }
    // try {
    //     let res = await axios.get(url);
    // }
    // catch {
    //     console.error('ERROR: Please enter a valid url')
    // }
}

createUrlArray(args[2])