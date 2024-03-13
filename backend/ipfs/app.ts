import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import { ethers } from 'ethers';
import FormData from 'form-data';
import rateLimit from 'express-rate-limit';
import { allowedAuthors } from './admins';
const cors = require('cors');


const { body, validationResult } = require('express-validator');

require('dotenv').config();
const ipfsAPI = process.env.IPFS_API
const SWAGGER_URL = process.env.SWAGGER_URL;
const app = express();
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

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(bodyParser.json());
app.use(express.json());
app.get('/', (req, res) => {
    res.redirect('/api-docs');
});

const apiLimiter = rateLimit({
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

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

interface ElectionData {
    description: string;
    summary: string;
    ballot: string[];
}

async function uploadAndPinJSONData(electionData: ElectionData, signature: string) {

    try {
        const message = JSON.stringify(electionData);

        const signerAddress = ethers.verifyMessage(message, signature).toLowerCase();
        const admin = allowedAuthors.find(admin => admin.walletAddress.toLowerCase() === signerAddress);

        if (!admin) {
            throw new Error("Unauthorized: Signer is not an authorized admin");
        }

        const dataWithAuthor = { ...electionData, author: admin.name };
        const formData = new FormData();
        const jsonData = JSON.stringify(dataWithAuthor);
        formData.append('file', Buffer.from(jsonData), { filename: 'electionData.json', contentType: 'application/json' });

        const addResponse = await fetch(`${ipfsAPI}/add`, {
            method: 'POST',
            body: formData,
        });

        if (!addResponse.ok) {
            throw new Error(`IPFS add failed: ${addResponse.statusText}`);
        }

        const addResult = await addResponse.json() as { Hash: string };
        return addResult.Hash;
    } catch (error) {
        throw error;
    }
}

app.post('/pinElectionData', [
    body('electionData.description').isString(),
    body('electionData.summary').isString(),
    body('electionData.ballot').isArray(),
    body('signature').isString(),
], async (req: Request, res: Response) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { electionData, signature } = req.body;

    if (!electionData || !signature) {
        return res.status(400).send("Missing election data or signature");
    }

    try {
        const hash = await uploadAndPinJSONData(electionData, signature);
        res.json({ success: true, message: "Election data pinned successfully", cid: hash });
    } catch (error) {
        const errorMessage = (error as Error).message;
        console.error('Error verifying admin signature', errorMessage);
        res.status(500).send(errorMessage);
    }
});

