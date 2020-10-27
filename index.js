const rp = require('request-promise');
var cheerio = require('cheerio');
const fs = require('fs')



fs.readFile('data2.json', async (err, data) => {
    if (err) throw err;
    let anime = JSON.parse(data);
    let Db = []
    const ini = 7500
    const fin = 8000
    const animeslice = anime.slice(ini, fin)
    //const animeslice = anime.slice(ini)
    for (let i in animeslice) {
        console.log(i)
        const newd = await getdata(animeslice[i])
        Db.push(newd)
    }


    let Dbdata = JSON.stringify(Db);

    fs.writeFile('Fdb8.json', Dbdata, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
});



const getdata = async (final) => {
    try {
        let $ = await rp({
            uri: final.link,
            transform: (body) => {
                return cheerio.load(body)
            }
        })
        const imgGrande = $('#vid-art').attr('src')
        const imgPeq = $('#infotype-19 img').attr('src')
        let titulos = []
        $('#infotype-2 .tab').each((i, ele) => {
            titulos.push($(ele).text())
        })
        let generos = []
        $('#infotype-30 span a').each((i, ele) => {
            generos.push($(ele).text())
        })
        const duracion = $('#infotype-4 span').text()
        const numcapituls = $('#infotype-3 span').text()

        const exlink = $('#infotype-25 a').attr('href')

        const linkcapi = exlink === undefined ? '' : `https://www.animenewsnetwork.com${exlink}`

        let openmus = []
        $('#infotype-11 div').each((i, ele) => {
            openmus.push($(ele).text())
        })


        let endmus = []
        $('#infotype-24 div').each((i, ele) => {
            endmus.push($(ele).text())
        })


        let insertmus = []
        $('#infotype-35 div').each((i, ele) => {
            insertmus.push($(ele).text())
        })


        const costopeli = $('#infotype-26 span').text()
        let date = $('#infotype-7').text().trim()
        date = date.replace('Vintage:', '').trim()
        const rege = /\b(19|20)\d{2}\b/g
        const anios = date.match(rege)

        if (imgGrande === undefined && imgPeq !== undefined) {
            //console.log("peq")
            final['image'] = imgPeq.replace("//", "")
            final['titles'] = titulos
            final['genres'] = generos
            final['duration'] = duracion
            final['num_of_cap'] = numcapituls
            final['link_capi'] = linkcapi
            final['opening'] = openmus
            final['ending'] = endmus
            final['insert_music'] = insertmus
            final['years'] = anios
            final['cost_movie'] = costopeli
        }
        else if (imgGrande !== undefined) {
            // console.log("g")
            final['image'] = imgGrande.replace("//", "")
            final['titles'] = titulos
            final['genres'] = generos
            final['duration'] = duracion
            final['num_of_cap'] = numcapituls
            final['link_capi'] = linkcapi
            final['opening'] = openmus
            final['ending'] = endmus
            final['insert_music'] = insertmus
            final['years'] = anios
            final['cost_movie'] = costopeli
        }
        else {
            //console.log('sin img')
            final['image'] = ''
            final['titles'] = titulos
            final['genres'] = generos
            final['duration'] = duracion
            final['num_of_cap'] = numcapituls
            final['link_capi'] = linkcapi
            final['opening'] = openmus
            final['ending'] = endmus
            final['insert_music'] = insertmus
            final['years'] = anios
            final['cost_movie'] = costopeli
        }
        return final
    }
    catch (err) {
        consoe.log(err)
    }
    //console.log(imgS.html().
}

/*
var options = {
uri:"https://www.animenewsnetwork.com/encyclopedia/ratings-anime.php?top50=popular&n=50000000",
transform: function (body) {
return cheerio.load(body);
}
};

rp(options)
.then(function ($) {
let info = []
const tr = $('tr').each((i,e)=>{
if (i>1){
const link ='https://www.animenewsnetwork.com' + $(e).find('a').attr('href')
const name = $(e).find('a').text()
const rating = $(e).find('.r').text()
const data ={
name,
link,
rating
}
info.push(data)
//console.log(data)
}
})
info = info.slice(0,info.length-1)
let datas = JSON.stringify(info);

fs.writeFile('data2.json', datas, (err) => {
if (err) throw err;
console.log('Data written to file');
});

})
.catch(function (err) {
console.log('error',err)
});*/
