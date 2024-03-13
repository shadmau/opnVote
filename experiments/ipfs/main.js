"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const FormData = require('form-data');
const ipfsAPI = 'http://127.0.0.1:5001/api/v0';
function uploadAndPinJSONData(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const jsonData = { content: data };
        const jsonBuffer = Buffer.from(JSON.stringify(jsonData));
        const formData = new FormData();
        formData.append('file', jsonBuffer, 'data.json');
        try {
            const addResponse = yield (0, node_fetch_1.default)(`${ipfsAPI}/add`, {
                method: 'POST',
                body: formData,
            });
            const addResult = yield addResponse.json();
            const cid = addResult.Hash;
            const pinResponse = yield (0, node_fetch_1.default)(`${ipfsAPI}/pin/add?arg=${cid}`, {
                method: 'POST',
            });
            const pinResult = yield pinResponse.json();
            console.log('Pinned CID:', cid);
            return cid;
        }
        catch (error) {
            console.error('Error uploading and pinning JSON data:', error);
            throw error;
        }
    });
}
const userData = "User provided text here";
uploadAndPinJSONData(userData)
    .then(cid => console.log(`JSON data successfully uploaded and pinned with CID: ${cid}`))
    .catch(error => console.error(error));
