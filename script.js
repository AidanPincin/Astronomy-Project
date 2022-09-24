const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const ratio = 1920/1080
let width = window.document.defaultView.innerWidth-20
let height = window.document.defaultView.innerHeight-20
if(height*ratio>width){
    canvas.height = width/ratio
    canvas.width = width
}
else{
    canvas.width = height*ratio
    canvas.height = height
}
class Info{
    constructor(x,y,r,info,name,meaning){
        this.x = x
        this.y = y
        this.r = r
        this.info = info
        this.isHovered = false
        this.name = name
        this.meaning = meaning
    }
    draw(){
        let fontSize = canvas.width/100
        if(fontSize<12){
            fontSize = 12
        }
        const txt = this.autoSize(this.info,fontSize)
        ctx.fillStyle = '#696969'
        ctx.fillRect(this.x+this.r,this.y+this.r/2,txt.maxWidth+10,txt.txts.length*fontSize+20+fontSize*1.5+fontSize*1.25)
        this.print(txt.txts,fontSize,txt.maxWidth)
    }
    drawi(){
        ctx.fillStyle = '#696969'
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.r,0,Math.PI*2,false)
        ctx.fill()
        ctx.fillStyle = '#000000'
        ctx.font = (this.r*2-2)+'px Arial'
        const width = ctx.measureText('i').width
        ctx.fillText('i',this.x-width/2,this.y+(this.r*2-2)/3)
    }
    autoSize(txt,fontSize){
        let lines = 1
        let startChar = 0
        let endChar = 0
        ctx.font = fontSize+'px Arial'
        const widths = []
        const txts = []
        const width = ctx.measureText(txt).width
        if(width>canvas.width/4){
            lines = Math.ceil(width/(canvas.width/4))
        }
        for(let i=0; i<lines; i++){
            const chars = Math.floor(txt.length/lines)
            if(i == lines-1){
                endChar = txt.length
            }
            else{
                endChar = txt.indexOf(' ',startChar+chars)
            }
            const newTxt = txt.slice(startChar,endChar)
            const w = ctx.measureText(newTxt).width
            widths.push(w)
            txts.push(newTxt)
            startChar = endChar
        }
        return {maxWidth: Math.max(...widths), txts: txts}
    }
    print(txts,fontSize,maxWidth){
        ctx.fillStyle = '#000000'
        ctx.font = fontSize*1.5+'px Arial'
        const w = ctx.measureText(this.name).width
        ctx.fillText(this.name,this.x+this.r+5+(maxWidth-w)/2,this.y+this.r/2+(fontSize*1.5)/1.33+5)
        ctx.font = fontSize*1.25+'px Arial'
        const w1 = ctx.measureText('Meaning -- '+this.meaning).width
        ctx.fillText('Meaning -- '+this.meaning,this.x+this.r+5+(maxWidth-w1)/2,this.y+this.r/2+fontSize*1.5+8+(fontSize*1.25)/1.33)
        ctx.font = fontSize+'px Arial'
        for(let i=0; i<txts.length; i++){
            const width = ctx.measureText(txts[i]).width
            const xCenter = (maxWidth-width)/2
            ctx.fillText(txts[i],this.x+xCenter+this.r+5,this.y+fontSize/1.33+fontSize*i+15+this.r/2+fontSize*1.5+fontSize*1.25)
        }
    }
    isHovering(e){
        const x = e.pageX-10
        const y = e.pageY-10
        const dist = Math.sqrt(Math.pow(this.x-x,2)+Math.pow(this.y-y,2))
        if(dist<this.r){
            this.isHovered = true
        }
        else{
            this.isHovered = false
        }
    }
}
class Star{
    constructor(x,y,r,color,inConstillation=true){
        this.x = x
        this.y = y
        this.r = r
        this.color = color
        this.inConstillation = inConstillation
    }
    draw(){
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.r,0,Math.PI*2,false)
        ctx.fill()
    }
}
class Renderer{
    constructor(){
        this.info = [new Info(714/(1920/canvas.width)+27.5,46/(1080/canvas.height),15,"This binary star system has a right ascension of 5h 59m 31.60s and a declination of +54Â °17' 05.0"+'"','Prijipati','Lord of Creation'),
        new Info(714/(1920/canvas.width)+25,402.5/(1080/canvas.height)+25,15,"This binaray star system has a right ascension of 5h 59m 32s and a declination of +44° 56' 51"+'"','Menkalinan','Shoulder of the Charioteer'),
        new Info(714/(1920/canvas.width)+20,681/(1080/canvas.height)-20,15,"This binary star system has a right ascension of 5h 59m 43s and a declination of +37° 12' 45"+'"','Mahasim','Wrist'),
        new Info(987.5/(1920/canvas.width),984/(1080/canvas.height)-30,15,"This giant blue-white star has a right acsension of 5h 26m 18s and a declination of +28° 36' 27"+'"','Elnath',"the butting(i.e. bull's horns)"),
        new Info(1208/(1920/canvas.width)+30,786/(1080/canvas.height),15,"This orange giant star has a right ascension of 4h 57m 0s and a declination of +33° 9' 58"+'"','Hassaleh','East End of the Belt'),
        new Info(1086/(1920/canvas.width)-30,498/(1080/canvas.height),15,"This blue subgiant star has a right ascension of 5h 6m 31s and a declination of +41° 14' 4"+'"','Haedus II','Middle of the Belt'),
        new Info(1140/(1920/canvas.width)+30,505/(1080/canvas.height),15,"This binary star system has a right ascension of 5h 6m 31s and a declination of +41° 13' 4"+'"','Haedus','One of the Kids'),
        new Info(1110/(1920/canvas.width)+30,397.5/(1080/canvas.height),15,"This eclipsing binary star system has a right ascension of 5h 1m 58s and a declination +43° 49' 24"+'"','Almaaz','He-Goat'),
        new Info(1002.5/(1920/canvas.width)+30,338/(1080/canvas.height)-30,15,"This double binary star system is the brightest point in the constillation and has a right ascension of 5h 16m 41s and a declination of +45° 59' 53"+'"','Capella','She-Goat')]
        this.stars = [new Star(714/(1920/canvas.width),46/(1080/canvas.height),canvas.width/274.25*1.5,'#ffffff'),
        new Star(714/(1920/canvas.width),402.5/(1080/canvas.height),canvas.width/153.6*1.5,'#ffffff'),
        new Star(714/(1920/canvas.width),681/(1080/canvas.height),canvas.width/240*1.5,'#ffffff'),
        new Star(987.5/(1920/canvas.width),984/(1080/canvas.height),canvas.width/384*1.5,'#ffffff'),
        new Star(1208/(1920/canvas.width),786/(1080/canvas.height),canvas.width/240*1.5,'#ffffff'),
        new Star(1086/(1920/canvas.width),498/(1080/canvas.height),canvas.width/384*1.5,'#ffffff'),
        new Star(1140/(1920/canvas.width),505/(1080/canvas.height),canvas.width/384*1.5,'#ffffff'),
        new Star(1110/(1920/canvas.width),397.5/(1080/canvas.height),canvas.width/274.25*1.5,'#ffffff'),
        new Star(1002.5/(1920/canvas.width),338/(1080/canvas.height),canvas.width/128*1.5,'#ffffff')]
    }
    draw(){
        ctx.fillStyle = '#000000'
        ctx.fillRect(0,0,canvas.width,canvas.height)
        ctx.font = '48px Arial'
        ctx.fillStyle = '#ffffff'
        ctx.fillText('Auriga',25,50)
        ctx.fillText('By Aidan Pincin',25,100)
        this.drawConstillation()
        this.stars.forEach(s => s.draw())
        this.info.forEach(i => {
            i.drawi()
            if(i.isHovered){i.draw()}
        })
    }
    drawConstillation(){
        ctx.strokeStyle = '#ffffff'
        ctx.beginPath()
        ctx.lineWidth = 2.5
        const coords = []
        for(let i=0; i<this.stars.length; i++){
            if(this.stars[i].inConstillation){
                coords.push({x: this.stars[i].x, y: this.stars[i].y})
            }
        }
        ctx.moveTo(coords[0].x,coords[0].y)
        for(let i=1; i<coords.length; i++){
            ctx.lineTo(coords[i].x,coords[i].y)
        }
        ctx.lineTo(coords[0].x,coords[0].y)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(coords[1].x,coords[1].y)
        ctx.lineTo(coords[8].x,coords[8].y)
        ctx.lineTo(coords[5].x,coords[5].y)
        ctx.stroke()
        ctx.strokeStyle = '#000000'
    }
}
let renderer = new Renderer()
function mainLoop(){
    renderer.draw()
    requestAnimationFrame(mainLoop)
}
mainLoop()
window.addEventListener('resize',function(e){
    width = window.document.defaultView.innerWidth-20
    height = window.document.defaultView.innerHeight-20
    if(height*ratio>width){
        canvas.height = width/ratio
        canvas.width = width
    }
    else{
        canvas.width = height*ratio
        canvas.height = height
    }
    renderer = new Renderer()
})
window.addEventListener('mousemove',function(e){
    renderer.info.forEach(i => i.isHovering(e))
})
