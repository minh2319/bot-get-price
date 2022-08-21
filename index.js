const Telegram = require('telegram-notify');
async function main() {
    const arrDienMayXanh=[
       'https://www.dienmayxanh.com/may-lanh/casper-ic-09tl32',
        'https://www.dienmayxanh.com/may-lanh/casper-gc-09is32'
    ]
    const arrDienChoLon=[
        'https://dienmaycholon.vn/may-lanh/may-lanh-casper-inverter-1-hp-gsc09ip25',
        'https://dienmaycholon.vn/may-lanh/may-lanh-casper-inverter-1-hp-mc09is33',
        'https://dienmaycholon.vn/may-lanh/may-lanh-casper-inverter-1-hp-ic09tl32',
    ]
    const arrNguyenKim=[
        'https://www.nguyenkim.com/may-lanh-casper-inverter-1-hp-gsc-09ip25.html',
        'https://www.nguyenkim.com/may-lanh-casper-inverter-1hp-gc-09is33.html',
    ]
    const cheerio = require('cheerio'); // khai báo module cheerio
    const axios = require('axios'); // khai báo module request-promise
    const https = require('https'); // khai báo module request-promise
    const fs = require('fs'); // khai báo module request-promise
    let notify = new Telegram({
        token: '2036073407:AAF1Q-PP1EuAsg73GKRWw-cBg-QbW5Y7pZk',
        chatId: '-565852162'
    });
    const timeOut1=11000;
    const timeOut2=13000;
    const timeOut3=15000;

    const httpsAgent = new https.Agent({
        rejectUnauthorized: false, // (NOTE: this will disable client verification)
    })
    excute2(axios,cheerio,arrDienMayXanh,timeOut1,notify,'.kmbox.kb2.active','strong')
    excute(httpsAgent,axios,cheerio,arrDienChoLon,timeOut2,notify,'.price_block','strong')
    excute(httpsAgent,axios,cheerio,arrNguyenKim,timeOut3,notify,'.product_info_price_value-final','span')
}
  async function excute(httpsAgent,axios,cheerio,arrDienMayXanh,timeOut,notify,className,tag) {
    const arrDienMayXanhValue=[];

    setInterval(function () {

        arrDienMayXanh.forEach((value,index) => {
             axios.get(value, { httpsAgent })
                .then(function (response) {
                    console.log(response);
                    const $ = cheerio.load(response?.data); // load HTML
                    const job = $(className).find(tag).first().text(); // lấy tên job, được nằm trong thẻ a < .job__list-item-title
                    const text = value + ' : '+job;
                    if(arrDienMayXanhValue[value]!=text) {
                        const customText='Old : '+ arrDienMayXanhValue[value]+ '\n<b> New : '+text +'</b>'
                        notify.send(customText,{},{parse_mode:'html'});
                        arrDienMayXanhValue[value]=text
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    }, timeOut);
}
async function excute2(axios,cheerio,arrDienMayXanh,timeOut,notify,className,tag) {
    const arrDienMayXanhValue=[];

    setInterval(function () {

        arrDienMayXanh.forEach((value,index) => {
            axios.get(value)
                .then(function (response) {
                    console.log(response);
                    const $ = cheerio.load(response?.data); // load HTML
                    const job = $(className).find(tag).first().text(); // lấy tên job, được nằm trong thẻ a < .job__list-item-title
                    const text = value + ' : '+job;
                    if(arrDienMayXanhValue[value]!=text) {
                        const customText='Old : '+ arrDienMayXanhValue[value]+ '\n<b> New : '+text +'</b>'
                        notify.send(customText,{},{parse_mode:'html'});
                        arrDienMayXanhValue[value]=text
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    }, timeOut);
}
main();
