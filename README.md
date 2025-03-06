# **Oscar Winners API**

This is a **NestJS-based REST API** for managing Oscar-winning and nominated movies. The API allows listing, searching, filtering, adding, updating, and deleting movie records. It also supports automatic database seeding when the database is empty.

## **Features**
- **CRUD operations** for managing movies
- **Filtering and sorting** based on nomination status
- **Pagination and search functionality**
- **Swagger API documentation available at** [`http://localhost:3000/api`](http://localhost:3000/api)
- **MongoDB persistence using Mongoose**
- **Automatic database seeding** when starting the server (if the database is empty)
- **Unit and integration tests**

---

## **Installation & Setup**
### **1. Clone the Repository**
```bash
git clone https://github.com/your-repo/oscar-winners.git
cd oscar-winners
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Setup Environment Variables**
Create a `.env` file in the project root and define the necessary configuration:
```
MONGO_URI=mongodb://localhost:27017/oscar-winners
PORT=3000
```
> Ensure MongoDB is running before starting the application.

---

## **Running the Application**
### **Development Mode**
```bash
npm run start:dev
```
The server will be available at **[`http://localhost:3000`](http://localhost:3000)**.

### **Production Mode**
```bash
npm run start:prod
```

---

## **Database Seeding**
The application automatically **seeds the database** with movie data **if the database is empty** when the server starts.

To manually run the seeder, use:
```bash
cd ../oscar-winners
npx ts-node src/database/seeder.ts
```

---

## **API Endpoints**
### **Movies**
| Method | Endpoint | Description |
|--------|---------|-------------|
| `GET` | `/movies` | Get a list of all movies |
| `GET` | `/movies/winners` | Get only Oscar-winning movies |
| `GET` | `/movies/:id` | Get details of a specific movie |
| `POST` | `/movies` | Add a new movie |
| `PUT` | `/movies/:id` | Update a movie's details |
| `DELETE` | `/movies/:id` | Remove a movie |

### **Search & Filtering**
- Use `GET /movies?search=title` to filter movies by title.
- Use `GET /movies?sort=title` to sort by title.
- Use `GET /movies?sort=isWinner` to show winners first.

---

## **Testing**
Run the unit tests:
```bash
npm run test
```

Run end-to-end tests:
```bash
npm run test:e2e
```

Check test coverage:
```bash
npm run test:cov
```

---

## **Swagger API Documentation**
Once the server is running, open your browser and visit:
- [`http://localhost:3000/api`](http://localhost:3000/api)  

Swagger allows you to test API endpoints directly in the browser.

---

## **Deployment**
For production deployment:
```bash
npm run build
npm run start:prod
```

---

## **Contributors**
- **Geszti Tamás** - [GitHub](https://github.com/gesztitamas14)

---

## **License**
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
