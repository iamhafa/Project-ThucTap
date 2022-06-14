const express = require('express');
const cors = require('cors');

const app = express();

const { sequelize } = require('./models/index');

// use .env file
require('dotenv').config();

// import routes
const userRoutes = require('./routes/user.routes');
const customerRoutes = require('./routes/customer.routes');
const employeeRoutes = require('./routes/employee.routes');
const reportRoutes = require('./routes/report.routes');

// middleware to use json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware to use cors
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    })
);

// Routes
app.use('/users', userRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/reports', reportRoutes);
//* catch all err when ant other route throw
app.use((err, req, res, next) => {
    console.error('*** ERROR ***', err.message);
    return res.json({
        status: 'error',
        message: err.message
    });
});
// response not found with wrong url
app.all('*', (req, res) => {
    res.status(404).json({
        status: 'failed',
        message: 'Route not found'
    });
});

// sync database
app.listen(process.env.PORT, async () => {
    try {
        // xac nhan co ket noi den database
        await sequelize.authenticate();
        console.log(`>>> CONNECT database success`);

        // dong bo du lieu vao database
        // await sequelize.sync({ force: true });

        await sequelize.sync();
        //* force true để xóa bảng trước nếu có rồi tạo bảng mới
        //* alter true để thay đổi bảng
        console.log(`>>> SYNC database success`);
    } catch (error) {
        console.log('Unable to connect to the database:', error.message);
    }
});
