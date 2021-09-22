const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://users:.@cluster0.tt2bx.mongodb.net/seriesDB?retryWrites=true&w=majority', 
{ useNewUrlParser: true, useUnifiedTopology: true });