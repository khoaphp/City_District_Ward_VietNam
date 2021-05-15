var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.listen(3000);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));



const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://xxx:xxx@cluster0.qah5q.mongodb.net/xxx?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}, function(err){
    if(err){
        console.log("Mongo error!");
    }else{
        console.log("Mongo connected successfully.");
    }
});

// https://thongtindoanhnghiep.co/api/city
// City: ID, Title, Alias, Ordering

// https://thongtindoanhnghiep.co/api/city/3/district
// District: ID, Title, Alias, Ordering, ID_City (TinhThanhID), Title_City (TinhThanhTitle), Alias_Title_City(TinhThanhTitleAscii)

// https://thongtindoanhnghiep.co/api/district/73/ward
// Ward: ID,Title, Alias, Ordering, ID_City (TinhThanhID), ID_Districy (QuanHuyenID)
const axios = require('axios');

const cityModel = new mongoose.model("City", new mongoose.Schema({
    ID: Number,
    Title: String,
    Alias: String,
    Ordering: Number,
}));

const districtModel = new mongoose.model("District", new mongoose.Schema({
    ID: Number,
    Title: String,
    Alias: String,
    Ordering: Number,
    ID_City:Number,
    Title_City:String,
    Alias_Title_City:String
}));

const wardModel = new mongoose.model("Ward", new mongoose.Schema({
    ID: Number,
    Title: String,
    Alias: String,
    Ordering: Number,
    ID_City:Number,
    Title_City:String,
    Alias_Title_City:String,
    ID_District:Number,
    Title_District:String,
    Alias_Title_District:String
}));

app.get("/", function(req, res){
    res.render("home");
});

app.get("/location/city", function(req, res){
    cityModel.find(function(err, data){
        if(err){
            res.json({"result":0, data:"Lỗi DB"});
        }else{
            res.json({"result":1, data:data});
        }
    });
});

app.get("/location/district/:idCity", function(req, res){
    districtModel.find({ID_City:req.params.idCity}, function(err, data){
        if(err){
            res.json({"result":0, data:"Lỗi DB"});
        }else{
            res.json({"result":1, data:data});
        }
    });
});

app.get("/location/ward/:idDistrict", function(req, res){
    wardModel.find({ID_District:req.params.idDistrict}, function(err, data){
        if(err){
            res.json({"result":0, data:"Lỗi DB"});
        }else{
            res.json({"result":1, data:data});
        }
    });
});

/* Ward done
districtModel.find(function(err, data){
    data.forEach(function(district){
        axios.get('https://thongtindoanhnghiep.co/api/district/'+district.ID+'/ward')
        .then(function (response) {
            // handle success
            response.data.forEach(function(ward){
                var newWard = new wardModel({
                    ID: ward.ID,
                    Title: ward.Title,
                    Alias: ward.SolrID,
                    Ordering: ward.STT,
                    ID_City:ward.TinhThanhID,
                    Title_City:ward.TinhThanhTitle,
                    Alias_Title_City:ward.TinhThanhTitleAscii,
                    ID_District:ward.QuanHuyenID,
                    Title_District:ward.QuanHuyenTitle,
                    Alias_Title_District:ward.QuanHuyenTitleAscii
                });
                newWard.save(function(err){
                    if(!err){
                        console.log("Saved.");
                    }
                });
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    });
});
*/

/* District done!
cityModel.find(function(err, data){
    data.forEach(function(city){
        axios.get('https://thongtindoanhnghiep.co/api/city/'+city.ID+'/district')
        .then(function (response) {
            // handle success
            response.data.forEach(function(district){
                var newDistrict = new districtModel({
                    ID: district.ID,
                    Title: district.Title,
                    Alias: district.SolrID,
                    Ordering: district.STT,
                    ID_City:district.TinhThanhID,
                    Title_City:district.TinhThanhTitle,
                    Alias_Title_City:district.TinhThanhTitleAscii
                });
                newDistrict.save(function(err){
                    if(!err){
                        console.log("Saved.");
                    }
                });
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    });
});
*/

/* City Done

axios.get('https://thongtindoanhnghiep.co/api/city')
  .then(function (response) {
    // handle success
    response.data.LtsItem.forEach(function(city){
        var newCity = new cityModel({
            ID: city.ID,
            Title: city.Title,
            Alias: city.SolrID,
            Ordering: city.STT
        });
        newCity.save(function(err){
            if(!err){
                console.log("Saved.");
            }
        });
    });
  })
  .catch(function (error) {
    // handle error
    console.log(error);
})
*/







