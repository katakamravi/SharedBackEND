const jwt = require('jsonwebtoken');
var MongoClient = require('mongodb').MongoClient
var state = {
  db: null,
}

MongoClient.connect('mongodb://localhost:27017/', { useUnifiedTopology: true }, function (err, db) {
  //  if (err) return done(err)

  state.db = db.db('task1');
  //  console.log(state.db);
  // done()
})
const commonfun = {

  insert(collName, body) {
    //    console.log(db.get());
    // jwt.verify(token, config.secret, function(err, decoded) {
    //   if (err)
    //   return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // });  
    state.db.collection(collName).insertOne(body, function (err, docs) {
      //    res.render('comments', {comments: docs})
      console.log(docs);
      return docs;
    })
  },

  findWithCond(collName, credentials, response){
    state.db.collection(collName).find(credentials).toArray((err,resp) => {
      console.log(resp);
     return response(resp);
    })
  },

  findAll(collName, response){
    state.db.collection(collName).find().toArray((err,resp) => {
      // console.log("in common function", resp);
      return response(resp);
    })
  }
  
}



module.exports = commonfun;


