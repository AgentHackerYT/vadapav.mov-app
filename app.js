const fetch = require("node-fetch").default
const fs = require("fs")
const path = require("path")

if (location.href.endsWith("index.html")) {
  window.onload = () => {
    const l = document.getElementById("loading")
    document.getElementById("output").value = localStorage.getItem("output") || ""
    showDir()
    const down = document.getElementById("download")
    down.onclick = () =>{
      const o = document.getElementById("output").value || localStorage.getItem("output") || undefined
      if(!o) return alert("Output location missing");
      localStorage.setItem("output", o)
    for(const file of document.getElementsByClassName("checkbox")){    
            if(file.checked){
                const info = file.name.split(";;;")
                downloaderv2({name: info[1], id: info[0]})
            }

        }
      }

      function search(){
        const i = document.getElementById("search")
        var finalURL = "" 
  
        if(isValidUrl(i.value)){
            finalURL = new URL(i.value).pathname.replace(/\/*/g, "")
        }else{
            finalURL = i.value
        }
        fetch("https://vadapav.mov/api/s/" + finalURL).then(x => x.json())
        .then(x =>{
          if(x.data.length === 0){
            showDir(finalURL)
          }else{
            const el = document.getElementById("dirs")
            el.innerHTML = ""
            const back = document.getElementById("back")
            back.disabled = false
            back.setAttribute("back", "11111111-1111-1111-1111-111111111111")
            x.data.forEach(x => {
              const a = document.createElement("a")
              if (x.dir === true) {
                document.getElementById("sa").style.display = "none"
                a.className = "dir"
                a.id = x.id
                a.innerText = "📁" + x.name
                el.appendChild(a)
                el.appendChild(document.createElement("br"))
              } else {
                document.getElementById("sa").style.display = ""
                const vlcLogo = document.createElement("img")
                vlcLogo.src = "https://upload.wikimedia.org/wikipedia/commons/3/38/VLC_icon.png"
                vlcLogo.height = "18"
                vlcLogo.width = "18"
                vlcLogo.className = "vlclogo"
                vlcLogo.alt = `${x.name}`
                vlcLogo.onclick = () =>{
                  var VLC = require('vlc-simple-player')
                  new VLC(`https://vadapav.mov/f/${x.id}`)
                }
                const cb = document.createElement("input")
                cb.type = "checkbox"
                cb.className = "checkbox"
                cb.value = "checkbox"
                cb.name = `${x.id};;;${x.name}`
                const label1 = document.createElement("label")
                label1.className = "main-checkbox"
                const label = document.createElement("span")
                label.for = `${x.id};;;${x.name}`
                label.innerHTML = "💾" + x.name + ` <b>${formatBytes(x.size)}<b>`
                label.className = "list-text"
                label1.appendChild(vlcLogo)
                label1.appendChild(cb)
                label1.appendChild(label)
                el.appendChild(label1)
                el.appendChild(document.createElement('br'))
              }
            })
          }
          for (const dir of dirs) {
            dir.onclick = () => {
              const id = dir.id
              showDir(id)
            }
          }
        }).catch((e)=>{
          console.log(e)
        })
        i.value = ""
      }
    const submitsearch = document.getElementById("submit")

    submitsearch.onclick = () =>{
      search()
    }
    document.addEventListener("keypress", (e) =>{
      if(e.keyCode === 13){
        search()
      }
  })


    document.getElementById("back").onclick = () => {

      showDir(document.getElementById("back").getAttribute("back"))

    }
    const dirs = document.getElementsByClassName("dir")

    function showDir(dirid = "") {
      const backbutton = document.getElementById("back")

      if(dirid === "" || dirid.startsWith("1111")) backbutton.disabled = true
      else backbutton.disabled = false

      fetch("https://vadapav.mov/api/d/" + dirid)
        .then(g => g.json())
        .then(data => {
          document.getElementById("main").style.display = ""
          l.style.display = "none"
          const el = document.getElementById("dirs")
          el.innerHTML = ""
          const back = document.getElementById("back")
          const ads = document.getElementById("ads")
          if(!ads.src) ads.src = 'https://pl22991898.profitablegatecpm.com/22/97/31/2297315db84866d51a7e3632043f6ae2.js'
          back.style.display = ""
          back.setAttribute("back", data.data.parent || "")
          data.data.files.forEach(x => {
            const a = document.createElement("a")
            if (x.dir === true) {
              document.getElementById("sa").style.display = "none"
              a.className = "dir"
              a.id = x.id
              a.innerText = "📁" + x.name
              el.appendChild(a)
              el.appendChild(document.createElement("br"))
            } else {
              document.getElementById("sa").style.display = ""
              const vlcLogo = document.createElement("img")
              vlcLogo.src = "https://upload.wikimedia.org/wikipedia/commons/3/38/VLC_icon.png"
              vlcLogo.height = "18"
              vlcLogo.width = "18"
              vlcLogo.className = "vlclogo"
              vlcLogo.alt = `${x.name}`
              vlcLogo.onclick = () =>{
                var VLC = require('vlc-simple-player')
                new VLC(`https://vadapav.mov/f/${x.id}`)
              }
              const cb = document.createElement("input")
              cb.type = "checkbox"
              cb.className = "checkbox"
              cb.value = "checkbox"
              cb.name = `${x.id};;;${x.name}`
              const label1 = document.createElement("label")
              label1.className = "main-checkbox"
              const label = document.createElement("span")
              label.for = `${x.id};;;${x.name}`
              label.innerHTML = "💾" + x.name + ` <b>${formatBytes(x.size)}<b>`
              label.className = "list-text"
              label1.appendChild(vlcLogo)
              label1.appendChild(cb)
              label1.appendChild(label)
              el.appendChild(label1)
              el.appendChild(document.createElement('br'))
            }
          })

          for (const dir of dirs) {
            dir.onclick = () => {
              const id = dir.id
              showDir(id)
            }

          }

        })

    }



    async function downloaderv2(files, fp) {
      const o = document.getElementById("output").value || localStorage.getItem("output")
      const s = (await fetch("https://vadapav.mov/f/" + files.id, ))
      if (!fs.existsSync(o)) fs.mkdirSync(o);
      const stream = s.body.pipe(fs.createWriteStream(path.join(o, files.name)))
      const downloadingText = document.createElement("h5")
      const downloading = document.getElementById("downloading")
      downloading.appendChild(downloadingText)
        downloading.style.display = "block"
        downloading.setAttribute("d", "yes")
        document.getElementById("ddb").style.display = ""
        document.getElementById("ddb").innerText = "🔼 Downloading"

      let lastWritten;
      setInterval(() => {
        const percent = Math.floor((stream.bytesWritten / (s.headers.get("Content-Length"))) * 100)
        if(Math.floor(percent) === 100 || percent === Infinity){
          downloadingText.innerText = `Download Completed: ${files.name} ${formatBytes(stream.bytesWritten)}/${formatBytes(s.headers.get("Content-Length"))}`
          downloadingText.onclick = () => downloadingText.style.display = "none"
        }else{
        downloadingText.innerText = `Currently Downloading: ${files.name}\n\n${formatBytes(stream.bytesWritten)}/${formatBytes(s.headers.get("Content-Length"))}  ${percent}%, Speed: ${formatBytes((stream.bytesWritten - lastWritten))}/sec`
        lastWritten = stream.bytesWritten
        }
      }, 1000)
    }

    async function downloaderv3(files){
      const o = document.getElementById("output").value || localStorage.getItem("output")
      const s = new easydl("https://vadapav.mov/f/" + files.id, path.join(o, files.name), {"connections": 20, "maxRetry": 1})
      if(!fs.existsSync(o)) fs.mkdirSync(o);
      const downloadingText = document.createElement("h5")
      const downloading = document.getElementById("downloading")
      downloading.appendChild(downloadingText)
        downloading.style.display = "block"
        downloading.setAttribute("d", "yes")
        document.getElementById("ddb").style.display = ""
        document.getElementById("ddb").innerText = "🔼 Downloading"
        
        setInterval(async() =>{
          console.log(s)
          const written = s.totalProgress.bytes
          const percent = Math.floor(s.totalProgress.percentage)
          if(Math.floor(percent) === 100 || percent === Infinity) return downloadingText.innerText = `Download Completed: ${files.name} ${formatBytes(written)}/${formatBytes(s.size)}`
          downloadingText.innerText = `Currently Downloading: ${files.name}\n\n${formatBytes(written)}/${formatBytes(s.size)}  ${percent}%, Speed: ${formatBytes(s.totalProgress.speed)}/sec`
        }, 1000)
    
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

function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
