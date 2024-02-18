const fetch = require('node-fetch').default;
const fs = require('fs')
const path = require('path')


if (location.href.endsWith("index.html")){
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("output").value = localStorage.getItem("output") || ""
    document.getElementById("submit").onclick = ()=>{
        const i = document.getElementById("fid")
        const o = document.getElementById("output").value || localStorage.getItem("output") || undefined
        if(!i.value) return alert("Directory ID missing");
        if(!o) return alert("Output location missing");
        localStorage.setItem("output", o)
        let files = []
        let finalFiles = []
        var finalURL = "" 

        if(isValidUrl(i.value)){
            finalURL = new URL(i.value).pathname.replace(/\/*/g, "")
        }else{
            finalURL = i.value
        }


        fetch("https://vadapav.mov/api/d/"+finalURL).then(x => x.json()).then(g =>{
            document.getElementById("sf").style.display = "block"
            document.getElementById("sa").style.display = "block"
        //document.getElementById("fid").value = ""
        //document.getElementById("downloading").innerText = ""
        const list = document.getElementById("result")
        list.innerText = ""
        g.data.files.forEach(x =>{
            if(x.dir) return;
            files.push(x)
        })
        var i = 0
        files.forEach(x =>{
            const cb = document.createElement("input")
            cb.type = "checkbox"
            cb.className = "checkbox"
            cb.value = "checkbox"
            cb.name = `${x.id};;;${x.name}`
            const label1 = document.createElement("label")
            label1.className = "main-checkbox"
            const label = document.createElement("span")
            label.for = `${x.id};;;${x.name}`
            label.innerText = x.name
            label.className = "list-text"
            label1.appendChild(cb)
            label1.appendChild(label)
            i++
            list.appendChild(label1)
            list.appendChild(document.createElement('br'))
        })

        }).then(x => document.getElementById("download").style.display = "block")
            //downloader(files)
            const down = document.getElementById("download")
            down.onclick = () =>{
            for(const file of document.getElementsByClassName("checkbox")){    
                    if(file.checked){
                        const info = file.name.split(";;;")
                        finalFiles.push({name: info[1], id: info[0]})
                        downloaderv2({name: info[1], id: info[0]})
                    }
    
                }
            }
    }

})

async function downloaderv2(files){


    if(!files || typeof files == "undefined") return alert("download completed");

    const server = document.getElementById("server").value
    const o = document.getElementById("output").value || localStorage.getItem("output")
    if(server === "drunk") {
        const s = (await fetch("https://drunk.vadapav.mov/f/"+ files.id,
        { 
            headers: {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,/*;q=0.8',
            'accept-language': 'en-US,en;q=0.5',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
            'host': 'www.vadapav.mov'
        }
        }
        ))
        if(!fs.existsSync(o)) fs.mkdirSync(o);
        const stream = s.body.pipe(fs.createWriteStream(path.join(o, files.name)))
    
        const downloadingText = document.createElement("h5")
        const downloading = document.getElementById("downloading")
        downloading.appendChild(downloadingText)
        let lastWritten;
        setInterval(() =>{
            downloadingText.innerText = `Currently Downloading: ${files.name}\n\n${formatBytes(stream.bytesWritten)}/${formatBytes(s.headers.get("Content-Length"))}, Speed: ${formatBytes(stream.bytesWritten - lastWritten)}`
            lastWritten = stream.bytesWritten
            }, 1000)

    }else if(server == "base"){
    const s = (await fetch("https://vadapav.mov"+ files.id,
    { 
        headers: {
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,/*;q=0.8',
        'accept-language': 'en-US,en;q=0.5',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
        'host': 'www.vadapav.mov'
    }
    }))
    if(!fs.existsSync(o)) fs.mkdirSync(o);
    const stream = s.body.pipe(fs.createWriteStream(path.join(o, files.name)))

    const downloadingText = document.createElement("h5")
    const downloading = document.getElementById("downloading")
    downloading.appendChild(downloadingText)
    let lastWritten;
        setInterval(() =>{
            downloadingText.innerText = `Currently Downloading: ${files.name}\n\n${formatBytes(stream.bytesWritten)}/${formatBytes(s.headers.get("Content-Length"))}, Speed: ${formatBytes((stream.bytesWritten - lastWritten))}/sec`
            lastWritten = stream.bytesWritten
            }, 1000)
    }else{
        const s = (await fetch("https://dl.vadapav.mov"+ files.id,
        { 
            headers: {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,/*;q=0.8',
            'accept-language': 'en-US,en;q=0.5',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
            'host': 'www,vadapav.mov'
        }
        }))
        if(!fs.existsSync(o)) fs.mkdirSync(o);
        const stream = s.body.pipe(fs.createWriteStream(path.join(o, files.name)))
    
        const downloadingText = document.createElement("h5")
        const downloading = document.getElementById("downloading")
        downloading.appendChild(downloadingText)
        let lastWritten;
            setInterval(() =>{
                downloadingText.innerText = `Currently Downloading: ${files.name}\n\n${formatBytes(stream.bytesWritten)}/${formatBytes(s.headers.get("Content-Length"))}, Speed: ${formatBytes((stream.bytesWritten - lastWritten))}/sec`
                lastWritten = stream.bytesWritten
                }, 1000)
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

}else if(location.href.endsWith("watch.html")){
    window.onload = () =>{
        document.getElementById("submit").onclick = ()=>{
            const i = document.getElementById("fid")
            if(!i.value) return alert("Enter a file id")
            var finalURL = ""
            if(isValidUrl(i.value)){
                finalURL = new URL(i.value).pathname.replace(/\/*/g, "")
            }else{
                finalURL = i.value
            }

            let files = []
            
            fetch("https://vadapav.mov/api/d/"+finalURL).then(x => x.json()).then(g =>{

            const el = document.getElementById("loading")
            el.innerText = "Loading the stream may take some time."
            window.scrollTo(0, document.body.scrollHeight);
                g.data.files.forEach(x =>{
                    if(x.dir) return;
                    files.push(x)
                })

                const select = document.getElementById("sel")
                select.style.display = "block"

                select.innerHTML = ""

                files.forEach(x =>{
                    const option = document.createElement("option")
                    option.value = x.id 
                    option.innerText = x.name
                    select.appendChild(option)
                })
                const server = document.getElementById("server").value
                const video = document.getElementById("video")
                video.style.display = "block"
                if(server === "drunk"){
                    video.src = `https://drunk.vadapav.mov/f/${files[0].id}`
                }else if(server === "base"){
                    video.src = `https://vadapav.mov/f/${files[0].id}`
                }else{
                    video.src = `https://dl.vadapav.mov/f/${files[0].id}`
                }


            })
        }

    }
}

function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }
