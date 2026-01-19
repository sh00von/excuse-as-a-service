import express from 'express';
import cors from 'cors';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const cowsay = require('cowsay');
const excuseDatabase = require('./data/excuses.json');
const categories = Object.keys(excuseDatabase);

function getRandomExcuse(): string {
    const category = categories[Math.floor(Math.random() * categories.length)];
    return getExcuseByCategory(category);
}

function getExcuseByCategory(category: string): string {
    // @ts-ignore
    const categoryExcuses = excuseDatabase[category];

    if (!categoryExcuses) {
        throw new Error(`Category '${category}' not found.`);
    }

    return categoryExcuses[Math.floor(Math.random() * categoryExcuses.length)];
}

function getStats() {
    // @ts-ignore
    const totalExcuses = Object.values(excuseDatabase).reduce((sum: number, arr: string[]) => sum + arr.length, 0);

    return {
        totalExcuses,
        categories: categories.length
    };
}

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

// One helper to rule them all
const sendExcuse = (res: express.Response, req: express.Request, excuse: string) => {
    const format = req.query.format as string;

    if (format === 'cowsay') {
        res.setHeader('Content-Type', 'text/plain');
        return res.send(cowsay.say({
            text: excuse,
            e: "oO",
            T: "U "
        }));
    }

    res.json({ text: excuse });
};

// API Routes
app.get('/', (req, res) => {
    res.json({
        message: 'Excuse as a Service API',
        endpoints: [
            '/api/excuse',
            '/api/excuse/:category',
            '/api/categories',
            '/api/stats'
        ]
    });
});

app.get('/api/excuse', (req, res) => {
    const excuse = getRandomExcuse();
    sendExcuse(res, req, excuse);
});

app.get('/api/excuse/:category', (req, res) => {
    const { category } = req.params;

    if (!categories.includes(category)) {
        return res.status(400).json({
            error: 'Invalid category',
            availableCategories: categories
        });
    }

    const excuse = getExcuseByCategory(category);
    sendExcuse(res, req, excuse);
});

app.get('/api/categories', (req, res) => {
    res.json({
        categories,
        total: categories.length
    });
});

app.get('/api/stats', (req, res) => {
    res.json(getStats());
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', uptime: process.uptime() });
});

// 404
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// Error Handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

export default app;
