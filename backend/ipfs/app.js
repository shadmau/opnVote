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
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const body_parser_1 = __importDefault(require("body-parser"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const ethers_1 = require("ethers");
const form_data_1 = __importDefault(require("form-data"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const admins_1 = require("./admins");
const cors = require('cors');
const { body, validationResult } = require('express-validator');
require('dotenv').config();
const ipfsAPI = process.env.IPFS_API;
const SWAGGER_URL = process.env.SWAGGER_URL;
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Opn Vote IPFS Election Data Pinning',
            version: '1.0.0',
            description: 'API for pinning election data to IPFS.',
        },
        servers: [
            {
                url: SWAGGER_URL,
                description: 'Development server',
            },
        ],
        components: {
            schemas: {
                ElectionData: {
                    type: 'object',
                    required: ['description', 'summary', 'ballot'],
                    properties: {
                        description: {
                            type: 'string',
                            description: 'Full description of the election.',
                        },
                        summary: {
                            type: 'string',
                            description: 'Summary of the election description.',
                        },
                        ballot: {
                            type: 'array',
                            items: {
                                type: 'string',
                            },
                            description: 'List of ballot questions.',
                        },
                    },
                },
                PinElectionDataRequest: {
                    type: 'object',
                    required: ['electionData', 'signature'],
                    properties: {
                        electionData: {
                            $ref: '#/components/schemas/ElectionData',
                        },
                        signature: {
                            type: 'string',
                            description: 'Ethereum signature to verify admin authorization.',
                        },
                    },
                },
            },
        },
    },
    apis: ['./app.ts'], // Make sure this path matches your file structure
};
app.use(cors());
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.redirect('/api-docs');
});
const apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 2
});
app.use("/pinElectionData", apiLimiter);
/**
 * @swagger
 * /pinElectionData:
 *   post:
 *     summary: Pins election data to IPFS
 *     description: Verifies if the signature is from an authorized admin and pins the provided election data to IPFS.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PinElectionDataRequest'
 *     responses:
 *       200:
 *         description: Election data successfully pinned to IPFS. Returns the CID of the pinned content.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 cid:
 *                   type: string
 *       400:
 *         description: Missing or invalid election data or signature.
 *       500:
 *         description: Server error or unauthorized admin signature.
 */
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});
function uploadAndPinJSONData(electionData, signature) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const message = JSON.stringify(electionData);
            const signerAddress = ethers_1.ethers.verifyMessage(message, signature).toLowerCase();
            const admin = admins_1.allowedAuthors.find(admin => admin.walletAddress.toLowerCase() === signerAddress);
            if (!admin) {
                throw new Error("Unauthorized: Signer is not an authorized admin");
            }
            const dataWithAuthor = Object.assign(Object.assign({}, electionData), { author: admin.name });
            const formData = new form_data_1.default();
            const jsonData = JSON.stringify(dataWithAuthor);
            formData.append('file', Buffer.from(jsonData), { filename: 'electionData.json', contentType: 'application/json' });
            const addResponse = yield (0, node_fetch_1.default)(`${ipfsAPI}/add`, {
                method: 'POST',
                body: formData,
            });
            if (!addResponse.ok) {
                throw new Error(`IPFS add failed: ${addResponse.statusText}`);
            }
            const addResult = yield addResponse.json();
            return addResult.Hash;
        }
        catch (error) {
            throw error;
        }
    });
}
app.post('/pinElectionData', [
    body('electionData.description').isString(),
    body('electionData.summary').isString(),
    body('electionData.ballot').isArray(),
    body('signature').isString(),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { electionData, signature } = req.body;
    if (!electionData || !signature) {
        return res.status(400).send("Missing election data or signature");
    }
    try {
        const hash = yield uploadAndPinJSONData(electionData, signature);
        res.json({ success: true, message: "Election data pinned successfully", cid: hash });
    }
    catch (error) {
        const errorMessage = error.message;
        console.error('Error verifying admin signature', errorMessage);
        res.status(500).send(errorMessage);
    }
}));
