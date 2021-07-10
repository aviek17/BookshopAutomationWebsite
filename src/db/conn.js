const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Registration", {
    useCreateIndex:true,
    useNewUrlParser :true,
    useUnifiedTopology : true,
    useFindAndModify : false
}).then(()=> {
    console.log("Connection Successful");
}).catch((err) => {
    console.log(err);
})