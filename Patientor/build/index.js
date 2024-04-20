"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get('/api/ping', (_req, res) => {
    console.log('Get request recieved');
    res.json('pong');
});
app.listen(4000, () => {
    console.log('Server Listening at port 4000');
});
