const express = require('express');
const userAuth = require('./routers/userAuth')
const seriesRouter = require('./routers/seriesRouter')
const membersRouter = require('./routers/membersRouter')
const subsRouter = require('./routers/subsRouter')


const cors = require('cors')

const app = express()

app.use(cors());

app.use(express.json())

require('./config/database')


app.use('/api/auth' , userAuth)
app.use('/api/series' , seriesRouter)
app.use('/api/members' , membersRouter)
app.use('/api/subs' , subsRouter)


app.listen(8080)