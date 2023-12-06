const exp=require("express")
const app=exp()

const userApp=require("./API's/userApi")
app.use("/user-api",userApp)

require("dotenv").config()
const port=process.env.PORT||3500
app.listen(port,()=>console.log("web server listening on port 3500"))

const path=require("path")
app.use(exp.static(path.join(__dirname,'./build')))

const mclient=require('mongodb').MongoClient
mclient.connect("mongodb://127.0.0.1/27017")
.then((dbRef)=>{
    const dbObj=dbRef.db('userdb')
    const userCollectionObj=dbObj.collection('usercollection')
    const productCollectionObj=dbObj.collection('productcollection')
    app.set('userCollectionObj',userCollectionObj)
    app.set('productCollectionObj',productCollectionObj)
    console.log("DB connection success");
})
.catch((err)=>console.log("Database connect error:",err))

const proApp=require("./API's/productApi")
app.use("/product-api",proApp)

const pageRefresh=(request,response,next)=>{
    response.sendFile(path.join(__dirname,'./build/index.html'))
}
app.use("*",pageRefresh)



const invalidPathMiddleware=(request,response,next)=>{
    response.send({message:'Invalid Path'})
}
app.use("*",invalidPathMiddleware)

const errhandlingMiddleware=(error,request,response,next)=>{
    response.send({message:error.message})
}
app.use(errhandlingMiddleware)