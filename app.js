require("dotenv").config()
const express = require("express")
const { graphqlHTTP } = require("express-graphql")
const schema = require("./schema/schema")
const mongoose = require("mongoose")
const cors = require("cors")

const PORT = process.env.PORT || 4000
const app = express()

app.use(cors())

//do database stuff
const pass = process.env.PASSWORD
const dbname = "playlist"
const connectionUrl = `mongodb+srv://softechy:${pass}@cluster0.4ay8a.mongodb.net/${dbname}?retryWrites=true&w=majority`
mongoose.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.once("open", () => {
    console.log("Connected to the database")
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))


app.listen(PORT, () => {
    console.log(`Now listening for requests on port ${PORT}`)
})