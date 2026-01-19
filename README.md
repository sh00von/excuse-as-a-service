# 🎭 Excuse as a Service (EaaS) API

> A simple, pragmatic API that serves realistic excuses for avoiding responsibilities.

**100% guaranteed to work 0% of the time.**

## 🚀 Features

- **Extensive Database**: A wide variety of excuses ranging from polite declines to creative absurdities.
- **RESTful API**: Simple endpoints to fetch excuses by category or randomly.
- **JSON Response**: Clean, lightweight JSON output containing just the text you need.
- **Categories**: Polite, Funny, Introvert, Lazy, Savage, and Developer.

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd EAAS

# Install dependencies
npm install

# Start the server
npm run dev
```

The server will start on `http://localhost:3000`

## 🎯 API Endpoints

### Base URL

`http://localhost:3000`

### 1. Root Endpoint

Returns a welcome message and a list of available endpoints.

```bash
GET /
```

**Response:**

```json
{
  "message": "Excuse as a Service API",
  "endpoints": [
    "/api/excuse",
    "/api/excuse/:category",
    "/api/categories",
    "/api/stats"
  ]
}
```

### 2. Get Random Excuse

Returns a random excuse from any category.

```bash
GET /api/excuse
```

**Response:**

```json
{
  "text": "I have to wash my hair that decade."
}
```

### 3. Get Category-Specific Excuse

Returns a random excuse from the specified category.

```bash
GET /api/excuse/:category
```

**Available Categories:** `polite`, `funny`, `introvert`, `lazy`, `savage`, `developer`

**Example:**

```bash
curl http://localhost:3000/api/excuse/developer
```

**Response:**

```json
{
  "text": "I'm debugging a critical issue in the production environment."
}
```

### 4. List All Categories

Returns a list of all available excuse categories.

```bash
GET /api/categories
```

**Response:**

```json
{
  "categories": [
    "polite",
    "funny",
    "introvert",
    "lazy",
    "savage",
    "developer"
  ],
  "total": 6
}
```

### 5. Get Statistics

Returns the total number of excuses available in the database.

```bash
GET /api/stats
```

**Response:**

```json
{
  "totalExcuses": 85,
  "categories": 6
}
```

## 💻 Usage Examples

### JavaScript / Fetch

```javascript
// Get a random excuse
fetch('http://localhost:3000/api/excuse')
  .then(res => res.json())
  .then(data => console.log(data.text));

// Get a developer excuse
fetch('http://localhost:3000/api/excuse/developer')
  .then(res => res.json())
  .then(data => console.log(data.text));
```

### cURL

```bash
curl http://localhost:3000/api/excuse/savage
```

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Data Source**: JSON

## 📁 Project Structure

```
EAAS/
├── src/
│   ├── data/
│   │   └── excuses.json  # Consolidated excuse database
│   └── index.ts          # Main application logic & server
├── package.json
├── tsconfig.json
└── README.md
```

## 🎭 Categories Explained

1. **Polite**: Professional and courteous ways to say no.
2. **Funny**: Absurd and humorous reasons that probably won't work but will get a laugh.
3. **Introvert**: Excuses for when you just want to stay home.
4. **Lazy**: Honest admissions of procrastination and sloth.
5. **Savage**: Direct, blunt, and slightly rude refusals.
6. **Developer**: Tech-focused excuses for software engineers.

## ⚠️ Disclaimer

This project is for entertainment purposes. Use these excuses at your own risk. We are not responsible for any lost jobs, ruined friendships, or awkward silences.

## 📝 License

MIT License
