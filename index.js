const express = require("express");
const robot = require("robotjs");
const {keyboard} = require("@nut-tree/nut-js");

const PORT = 2357;

const app = express();

keyboard.config.autoDelayMs=0;
app.get('/keypress', (req,res)=>{
    const key = req.query.key;
    switch (key) {
        case 's':
            robot.moveMouse(1350, 610)
            break;
        case 'x':
            robot.mouseClick('left');
            break;
        case 'c':
            robot.mouseClick('right');
            break;
        default:
            //console.log("\007");
            keyboard.type(key);
            break;
    }
    res.sendStatus(200);
});

const screenSize = robot.getScreenSize();
app.get('/coords', (req,res)=>{
    const pos = robot.getMousePos();
    res.json({
        x: pos.x / screenSize.width,
        y: pos.y / screenSize.height
    });
});

app.listen(PORT, ()=>{
    console.log(`listening to port ${PORT}`);
});