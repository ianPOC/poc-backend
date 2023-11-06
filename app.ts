const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error.controller');
const sequelize = require('./db/database');
const mongoConnect = require('./db/mongoDB').mongoConnect;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const authRoutes = require('./context/authRouter');
const userRoutes = require('./context/userRouter');
const commentRoutes = require('./context/commentRouter');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(authRoutes);
app.use(userRoutes);
app.use(commentRoutes);

app.use(errorController.pageNotFound);
app.use((err: any, req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }, next: any) => {
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = 3000;

try {
  Promise.all([sequelize.sync(), mongoConnect((client: any) => {
    console.log('MongoDB connection established');
  })])
} catch (err) {
  console.error('Error connecting to databases:', err);
} finally {
  console.log('DATABASES CONNECTED');
  app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
  });
}
