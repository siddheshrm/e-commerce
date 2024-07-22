import express from "express";
import bcrypt from "bcrypt";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  collection,
  setDoc,
  getDoc,
  updateDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  limit,
} from "firebase/firestore";
import stripe from "stripe";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFAF2XJkhQI6RhC6wzDjmckv7bkR5ncxE",
  authDomain: "online-ecommerce-website.firebaseapp.com",
  projectId: "online-ecommerce-website",
  storageBucket: "online-ecommerce-website.appspot.com",
  messagingSenderId: "480575089097",
  appId: "1:480575089097:web:72c353d4cf6d8d82952018",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore();

// Init server
const app = express();

// Middlewares - to make public folder to static folder
app.use(express.static("public"));

// Enable form sharing
app.use(express.json());

// AWS
import aws from "aws-sdk";
import "dotenv/config";

// AWS setup
const region = "ap-south-1";
const bucketName = "furnituredotcom";
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

aws.config.update({
  region,
  accessKeyId,
  secretAccessKey,
});

// Init s3
const s3 = new aws.S3();

// Generate image url
async function generateURL() {
  let date = new Date();

  const imageName = `${date.getTime()}.jpeg`;

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 300,
    ContentType: "image/jpeg",
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
}

app.get("/s3url", (req, res) => {
  generateURL().then((url) => res.json(url));
});

// Routes
// Home route
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});

// Signup route
app.get("/signup", (req, res) => {
  res.sendFile("signup.html", { root: "public" });
});

app.post("/signup", (req, res) => {
  const { name, email, password, number, tac } = req.body;
  // Form validations
  if (name.length < 5) {
    res.json({ alert: "Name must be at least 5 characters long." });
  } else if (!email.length) {
    res.json({ alert: "Please enter a valid email." });
  } else if (password.length < 8) {
    res.json({ alert: "Password must be at least 8 characters long." });
  } else if (!/^\d{10}$/.test(number)) {
    res.json({ alert: "Please enter a valid 10-digit mobile number." });
  } else if (!tac) {
    res.json({ alert: "Please agree to our terms and conditions." });
  } else {
    // Store the data in db
    const users = collection(db, "users");

    getDoc(doc(users, email)).then((user) => {
      if (user.exists()) {
        return res.json({
          alert: "Email already exists, please use different email to signup.",
        });
      } else {
        // Encrypt the password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            req.body.password = hash;
            req.body.seller = false;

            // Set the doc
            setDoc(doc(users, email), req.body).then((data) => {
              res.json({
                name: req.body.name,
                email: req.body.email,
                seller: req.body.seller,
              });
            });
          });
        });
      }
    });
  }
});

// Login route
app.get("/login", (req, res) => {
  res.sendFile("login.html", { root: "public" });
});

app.post("/login", (req, res) => {
  let { email, password } = req.body;

  if (!email.length || !password.length) {
    return res.json({ alert: "fill all the inputs" });
  }

  const users = collection(db, "users");

  getDoc(doc(users, email)).then((user) => {
    if (!user.exists()) {
      return res.json({ alert: "email does not exists" });
    } else {
      bcrypt.compare(password, user.data().password, (err, result) => {
        if (result) {
          let data = user.data();
          return res.json({
            name: data.name,
            email: data.email,
            seller: data.seller,
          });
        } else {
          return res.json({ alert: "password is incorrect" });
        }
      });
    }
  });
});

// Seller route
app.get("/seller", (req, res) => {
  res.sendFile("seller.html", { root: "public" });
});

app.post("/seller", (req, res) => {
  let { name, address, about, number, email } = req.body;

  if (
    !name.length ||
    !address.length ||
    !about.length ||
    number.length < 10 ||
    !Number(number)
  ) {
    return res.json({ alert: "some information(s) is/are incorrect" });
  } else {
    // Update the seller status
    const sellers = collection(db, "sellers");
    setDoc(doc(sellers, email), req.body).then((data) => {
      const users = collection(db, "users");
      updateDoc(doc(users, email), {
        seller: true,
      }).then((data) => {
        res.json({ seller: true });
      });
    });
  }
});

// Dashboard route
app.get("/dashboard", (req, res) => {
  res.sendFile("dashboard.html", { root: "public" });
});

// Add product route
app.get("/add-product", (req, res) => {
  res.sendFile("add-product.html", { root: "public" });
});

// Edit product route
app.get("/add-product/:id", (req, res) => {
  res.sendFile("add-product.html", { root: "public" });
});

app.post("/add-product", (req, res) => {
  let { name, shortDes, detail, price, image, tags, email, draft, id } =
    req.body;

  if (!draft) {
    if (!name.length) {
      res.json({ alert: "should enter product name" });
    } else if (!shortDes.length) {
      res.json({ alert: "short des must be 80 letters long" });
    } else if (!price.length || !Number(price)) {
      res.json({ alert: "enter valid price" });
    } else if (!detail.length) {
      res.json({ alert: "must enter the detail" });
    } else if (!tags.length) {
      res.json({ alert: "enter tags" });
    }
  }

  let docName =
    id == undefined
      ? `${name.toLowerCase()}-${Math.floor(Math.random() * 50000)}`
      : id;

  let products = collection(db, "products");
  setDoc(doc(products, docName), req.body)
    .then((data) => {
      res.json({ product: name });
    })
    .catch((err) => {
      res.json({ alert: "some error occured." });
    });
});

app.post("/get-products", (req, res) => {
  let { email, id, tag } = req.body;

  let products = collection(db, "products");
  let docRef;

  if (id) {
    docRef = getDoc(doc(products, id));
  } else if (tag) {
    docRef = getDocs(query(products, where("tags", "array-contains", tag)));
  } else {
    docRef = getDocs(query(products, where("email", "==", email)));
  }

  docRef.then((products) => {
    if (products.empty) {
      return res.json("no products");
    }
    let productArr = [];

    if (id) {
      return res.json(products.data());
    } else {
      products.forEach((item) => {
        let data = item.data();
        data.id = item.id;
        productArr.push(data);
      });
    }

    res.json(productArr);
  });
});

// Delete route
app.post("/delete-product", (req, res) => {
  let { id } = req.body;

  deleteDoc(doc(collection(db, "products"), id))
    .then((data) => {
      res.json("success");
    })
    .catch((err) => {
      res.json("error");
    });
});

// Product page route by id
app.get("/products/:id", (req, res) => {
  res.sendFile("product.html", { root: "public" });
});

// Serach route
app.get("/search/:key", (req, res) => {
  res.sendFile("search.html", { root: "public" });
});

// Review route
app.post("/add-review", (req, res) => {
  let { headline, review, rate, email, product } = req.body;

  // Form validations
  if (
    !headline.length ||
    !review.length ||
    rate == 0 ||
    email == null ||
    !product
  ) {
    return res.json({ alert: "Fill all the inputs" });
  }

  // Storing in Firestore
  let reviews = collection(db, "reviews");
  let docName = `review-${email}-${product}`;

  setDoc(doc(reviews, docName), req.body)
    .then((data) => {
      return res.json("review");
    })
    .catch((err) => {
      res.json({ alert: "some err occurred" });
    });
});

app.post("/get-reviews", (req, res) => {
  let { product, email } = req.body;

  let reviews = collection(db, "reviews");

  getDocs(query(reviews, where("product", "==", product)), limit(4)).then(
    (review) => {
      let reviewArr = [];

      if (review.empty) {
        return res.json(reviewArr);
      }

      let userEmail = false;

      review.forEach((item, i) => {
        let reivewEmail = item.data().email;
        if (reivewEmail == email) {
          userEmail = true;
        }
        reviewArr.push(item.data());
      });

      if (!userEmail) {
        getDoc(doc(reviews, `review-${email}-${product}`)).then((data) =>
          reviewArr.push(data.data())
        );
      }

      return res.json(reviewArr);
    }
  );
});

// Cart route
app.get("/cart", (req, res) => {
  res.sendFile("cart.html", { root: "public" });
});

// Checkout route
app.get("/checkout", (req, res) => {
  res.sendFile("checkout.html", { root: "public" });
});

// Stripe payment
let stripeGateway = stripe(process.env.stripe_key);
let DOMAIN = process.env.DOMAIN;

app.post("/stripe-checkout", async (req, res) => {
  const session = await stripeGateway.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}&order=${JSON.stringify(
      req.body
    )}`,
    cancel_url: `${DOMAIN}/checkout?payment_fail=true`,
    line_items: req.body.items.map((item) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
            description: item.shortDes,
            images: [item.image],
          },
          unit_amount: item.price * 100,
        },
        quantity: item.item,
      };
    }),
  });

  res.json(session.url);
});

// Payment success route
app.get("/success", async (req, res) => {
  let { order, session_id } = req.query;

  try {
    const session = await stripeGateway.checkout.sessions.retrieve(session_id);
    const customer = await stripeGateway.customers.retrieve(session.customer);

    let date = new Date();

    let order_collection = collection(db, "orders");
    let docName = `${customer.email}-order-${date.getTime()}`;

    setDoc(doc(order_collection, docName), JSON.parse(order)).then((date) => {
      res.redirect("/checkout?payment=done");
    });
  } catch {
    res.redirect("/404");
  }
});

// 404 route
app.get("/404", (req, res) => {
  res.sendFile("404.html", { root: "public" });
});

app.use((req, res) => {
  res.redirect("/404");
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
