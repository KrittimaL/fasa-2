const express = require("express");

// caseRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /case.
const caseRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the cases.
caseRoutes.route("/case").get(async function (req, res) {
  const collection = dbo.getDb().collection("cases");
  const result = await collection.find({}).toArray();
  res.json(result);
});

// This section will help you update a case by id.
caseRoutes.route("/update/:id").post(async function (req, res) {
  const collection = dbo.getDb().collection("cases");
  let myquery = { _id: new ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      case_date: req.body.case_date,
      camera_id: req.body.camera_id,
      // Save image?
      images: req.body.images,
      address: req.body.address,
      location: req.body.location,
      status: req.body.status,
      response: req.body.response,
    },
  };
  const result = await collection.updateOne(myquery, newvalues);
  console.log("1 document updated");
  res.json(result);
});

// This section will help you mark all cases as read
caseRoutes.route("/allread").get(async function (req, res) {
  const collection = dbo.getDb().collection("cases");
  const result = await collection.updateMany(
    {},
    {
      $set: {
        status: true,
      },
    }
  );
  res.json(result);
});

//! deprecated
// This section will help you get a single case by id
caseRoutes.route("/case/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("cases").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// This section will help you create a new case.
caseRoutes.route("/case/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    case_date: req.body.case_date,
    camera_id: req.body.camera_id,
    // Save image?
    images: req.body.images,
    address: req.body.address,
    location: req.body.location,
    status: req.body.status,
    response: req.body.response,
  };
  db_connect.collection("cases").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you delete a case
caseRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("cases").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = caseRoutes;
