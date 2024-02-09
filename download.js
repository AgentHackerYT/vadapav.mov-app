const fetch = require('node-fetch').default;
const fs = require('fs')
const path = require('path')
module.export = () =>{
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("output").value = localStorage.getItem("output") || ""
    document.getElementById("submit").onclick = ()=>{

        const i = document.getElementById("fid")
        const o = document.getElementById("output").value || localStorage.getItem("output") || undefined
        if(!i.value) return alert("Directory ID missing");
        if(!o) return alert("Output location missing");
        localStorage.setItem("output", o)
        let files = []
        fetch("https://vadapav.mov/api/d/"+i.value).then(x => x.json()).then(g =>{
        //document.getElementById("fid").value = ""
        //document.getElementById("downloading").innerText = ""
        const list = document.getElementById("result")
        //list.innerText = ""
        g.data.files.forEach(x =>{
            if(x.dir) return;
            files.push(x)
        })

        files.forEach(x =>{

            const h3 = document.createElement("h3")
            h3.className = "list-text"
            h3.innerText = x.name
            list.appendChild(h3)
        })

        }).then(x =>{
            //downloader(files)
            files.forEach(x => downloaderv2(x))
        })
    }

})

async function downloaderv2(files){


    if(!files || typeof files == "undefined") return alert("download completed");

    const server = document.getElementById("server").value
    const o = document.getElementById("output").value || localStorage.getItem("output")
    if(server === "drunk") {
        console.log("drunk")
        const s = (await fetch("https://drunk.vadapav.mov/f/"+ files.id)).body
        if(!fs.existsSync(o)) fs.mkdirSync(o);
        const stream = s.pipe(fs.createWriteStream(path.join(o, files.name)))
    
        const downloadingText = document.createElement("h5")
        const downloading = document.getElementById("downloading")
        downloading.appendChild(downloadingText)
            setInterval(() =>{
                downloadingText.innerText = `Currently Downloading: ${files.name}\n\n${formatBytes(stream.bytesWritten)}`
                }, 500)

    }else{
        console.log("base")
    const s = (await fetch("https://vadapav.mov/f/"+ files.id)).body
    if(!fs.existsSync(o)) fs.mkdirSync(o);
    const stream = s.pipe(fs.createWriteStream(path.join(o, files.name)))

    const downloadingText = document.createElement("h5")
    const downloading = document.getElementById("downloading")
    downloading.appendChild(downloadingText)
        setInterval(() =>{
            downloadingText.innerText = `Currently Downloading: ${files.name}\n\n${formatBytes(stream.bytesWritten)}`
            }, 500)
}

}

async function downloader(files){


    if(!files[0] || typeof files[0] == "undefined") return alert("download completed");

    const server = document.getElementById("server").value
    const downloading = document.getElementById("downloading")

    if(server === "drunk") {
        console.log("drunk")
        const s = (await fetch("https://drunk.vadapav.mov/f/"+ files[0].id)).body
    
        const stream = s.pipe(fs.createWriteStream(files[0].name))
    
        setInterval(() =>{
            downloading.innerText = `Currently Downloading: ${files[0].name}\n\n${formatBytes(stream.bytesWritten)}`
            }, 500)
    
        stream.on("finish", () =>{
            files.shift()
            downloader2(files)
    
        })
    }else{
        console.log("base")
    const s = (await fetch("https://vadapav.mov/f/"+ files[0].id)).body

    const stream = s.pipe(fs.createWriteStream(files[0].name))

    setInterval(() =>{
        downloading.innerText = `Currently Downloading: ${files[0].name}\n\n${formatBytes(stream.bytesWritten)}`
        }, 500)

    stream.on("finish", () =>{
        files.shift()
        downloader2(files)

    })
}

}

async function downloader2(files){

    const server = document.getElementById("server").value
    const downloading = document.getElementById("downloading")
    if(!files[0] || typeof files[0] == "undefined") return alert("download completed");

    if(server === "drunk") {
        console.log("drunk")
        const s = (await fetch("https://drunk.vadapav.mov/f/"+ files[0].id)).body
    
        const stream = s.pipe(fs.createWriteStream(files[0].name))
    
        setInterval(() =>{
            downloading.innerText = `Currently Downloading: ${files[0].name}\n\n${formatBytes(stream.bytesWritten)}`
            }, 500)
    
        stream.on("finish", () =>{
            files.shift()
            downloader(files)
    
        })
    }else{
        console.log("base")
    const s = (await fetch("https://vadapav.mov/f/"+ files[0].id)).body

    const stream = s.pipe(fs.createWriteStream(files[0].name))

    setInterval(() =>{
        downloading.innerText = `Currently Downloading: ${files[0].name}\n\n${formatBytes(stream.bytesWritten)}`
        }, 500)

    stream.on("finish", () =>{
        files.shift()
        downloader(files)

    })
}

}

function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
}