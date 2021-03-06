const fs = require('fs');
const path = require('path');
const Canvas = require('canvas');

function getPng(){
    const canvas = new Canvas(100, 30);
    const ctx = canvas.getContext('2d');
    
    ctx.font = '24px "Microsoft YaHei"';
    
    // 绘制文本
    let drawText = (text, x) => {
        ctx.save();
        // 旋转角度
        const angle = Math.random() / 10;
        // y 坐标
        const y = 22;
        ctx.rotate(angle);
        ctx.fillText(text, x, y);
        ctx.restore();
    }
    
    // 随机画线
    let drawLine = () => {
        const num = Math.floor(Math.random() * 2 + 3);
        // 随机画几条彩色线条
        for (let i = 0; i < num; i++) {
            const color = '#' + (Math.random() * 0xffffff << 0).toString(16);
            const y1 = Math.random() * 30;
            const y2 = Math.random() * 30;
            // 画线
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.lineTo(0, y1);
            ctx.lineTo(100, y2);
            ctx.stroke();
        }
    }
    
    // 数字的文本随机从小写汉字、大写汉字、数字里选择
    const numArr = [
        '〇一二三四五六七八九',
        '0123456789',
        '零壹贰叁肆伍陆柒捌玖'
    ];
    // 第一个数字
    const fir = Math.floor(Math.random() * 10);
    // 第二个数字
    const sec = Math.floor(Math.random() * 10);
    // 随机选取运算
    const operArr = ['加', '减', '乘'];
    const oper = Math.floor(Math.random() * operArr.length);
    
    drawLine();
    drawText(numArr[Math.floor(Math.random() * numArr.length)][fir], 10);
    drawText(operArr[oper], 40);
    drawText(numArr[Math.floor(Math.random() * numArr.length)][sec], 70);
    drawText('=', 100);
    drawText('?', 130);

    const dataUrl = canvas.toDataURL();
    const writeData = canvas.toBuffer();
    fs.writeFile(path.join(__dirname, '../public/images/test1.png'), writeData);
    // 验证码值的计算
    // let captcha;
    // switch (oper) {
    //     case 0:
    //         captcha = fir + sec;
    //         break;
    //     case 1:
    //         captcha = fir - sec;
    //         break;
    //     case 2:
    //         captcha = fir * sec;
    //         break;
    // }
    
    // // 存入 session
    // req.session.captcha = captcha;
}

getPng();
