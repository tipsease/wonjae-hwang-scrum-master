const express = require('express');
const stripe = require('stripe')('sk_test_E34xtwxsdRkXr8Z06g4g5AsS');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const app = express();

// Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// Parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}));

// Static folder
app.use(express.static(`${__dirname}/public`));
console.log(__dirname);

// Index route
app.get('/', (req, res) => {
    res.render('index');
});

// Charge route
app.post('/your-server-side-code', (req, res) => {
    const amount = 2500;
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    })
    .then(customer => stripe.charges.create({
        amount,
        description: "web development e book",
        currency: "usd",
        customer: customer.id
    }))
    .then(charge => res.render('success'));
});

const port = process.env.PORT || 3400;

app.listen(port, () => {
    console.log(`Server at port${port}`)
})