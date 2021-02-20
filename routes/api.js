const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurants");

router.get("/restaurants", function(req, res, next){
    Restaurant.aggregate([
        {
          $geoNear: {
             near: { type: "Point", coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
             maxDistance: 100000,
             spherical: true,
             distanceField: "dist.calculated",
          }
        }
     ])
     .then(function(restaurants){
         res.send(restaurants);
     })
     .catch(next);
});
    
router.post("/restaurants", function(req, res, next){
    Restaurant.create(req.body)
    .then(function(restaurant){
        res.send(restaurant)
    })
    .catch(next);
});

router.put("/restaurants/:id", function(req, res, next){
    Restaurant.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(function(){
        Restaurant.findOne({_id: req.params.id})
        .then(function(restaurant) {
            res.send(restaurant);
        });
    })
    .catch(next);
});

router.delete("/restaurants/:id", function(req, res, next){
    Restaurant.findByIdAndRemove({_id: req.params.id})
    .then(function(restaurant){
        res.send(restaurant);
    })
    .catch(next);
});

module.exports = router;