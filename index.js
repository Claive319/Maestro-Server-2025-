const express = require('express');
const app = express()
const bodyParser = require('body-Parser');
const mysql = require('mysql');
const port = process.env.PORT || 3001;
const cors = require('cors');


app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(3001, () => {

    console.log('Server is running on Port 3001')

})


const db = mysql.createPool({

    host: "localhost",

    user: "root",

    password: "",

    database: "maestro_project"

})


app.post('/employee', (req, res) => {
    console.log(req.body);
    const body = req.body
    const sql = "INSERT INTO employees (name, username, password, designation_id, department, create_date,update_date) VALUES(?,?,?,?,?,?,?)"

    db.query(sql, [body.name, body.username, body.password, body.designation, body.dept, body.createDate, body.updateDate], (err, result) => {

        console.log(err);
        res.send(result)

    })
})

app.post('/saveDesig', (req, res) => {
    console.log(req.body);
    const body = req.body
    const sql = "INSERT INTO designation (title) VALUES(?)"

    db.query(sql, [body.dTitle], (err, result) => {


        console.log(err);
        res.send(result)

    })
})
app.post('/addDept', (req, res) => {
    console.log(req.body);
    const body = req.body
    const sql = "INSERT INTO department (title) VALUES(?)"

    db.query(sql, [body.deptTitle], (err, result) => {


        console.log(err);
        res.send(result)

    })
})
app.delete('/designations/:id',(req,res)=>{

    const id = req.params.id;
    console.log('please Delete id from database : ', id)
    const sql="DELETE FROM designation WHERE designation_id=?"
    
    db.query(sql , [id] ,(err,result)=>{
    
    if(err) console.log(err);
    
    res.send(result);
    
    })
    
    })


app.get('/designations', (req, res) => {

    const sql = "SELECT * FROM designation"

    db.query(sql, (err, result) => {

        res.send(result);

    })

})

app.get('/designations/:id', (req,res)=>{
    const id = req.params.id;
    const sql = "SELECT * FROM designation WHERE designation_id=?"
    db.query(sql , [id] ,(err,result)=>{
    
        if(err) console.log(err);

        //var obj=null;
       for(var obj in result){
            console.log(result[obj])
           console.log(obj)
            res.send(result[obj]);    
        }
        //res.send(result);
        
        })
   
  })
  app.put('/designations/:id',(req,res)=>{
    const id = req.params.id;
    console.log('Please Update this id from the database : ', id)
    const body = req.body;
    const sql = "UPDATE  designation SET title=? WHERE designation_id=? limit 1"
    db.query(sql , [body.dTitle, id] ,(err,result)=>{

        if(err) console.log(err);
        
        res.send(result);
        
        })
})
app.get('/dept', (req, res) => {

    const sql = "SELECT * FROM department"

    db.query(sql, (err, result) => {

        res.send(result);

    })

})
app.get('/dept/:id', (req,res)=>{
    const id = req.params.id;
    const sql = "SELECT * FROM department WHERE department_id=?"
    db.query(sql , [id] ,(err,result)=>{
    
        if(err) console.log(err);

        //var obj=null;
       for(var obj in result){
            console.log(result[obj])
           console.log(obj)
            res.send(result[obj]);    
        }
        //res.send(result);
        
        })
   
  })
  app.delete('/dept/:id',(req,res)=>{

    const id = req.params.id;
    console.log('please Delete id from database : ', id)
    const sql="DELETE FROM department WHERE department_id=?"
    
    db.query(sql , [id] ,(err,result)=>{
    
    if(err) console.log(err);
    
    res.send(result);
    
    })
    
    })  

    app.put('/dept/:id',(req,res)=>{
        const id = req.params.id;
        console.log('Please Update this id from the database : ', id)
        const body = req.body;
        const sql = "UPDATE  department SET title=? WHERE department_id=? limit 1"
        db.query(sql , [body.deptTitle, id] ,(err,result)=>{
    
            if(err) console.log(err);
            
            res.send(result);
            
            })
    })  
    
    app.get('/desigDept', (req,res)=>{
        var ret = {};
        var sql = "SELECT * FROM department"
        db.query(sql ,(err,result)=>{
        
            if(err) console.log(err);
            console.log("Res1 "+result)
            ret.dept = result

            sql = "SELECT * FROM designation"
            db.query(sql ,(err,result)=>{
        
            if(err) console.log(err);
            console.log("Res2 "+result)
            ret.desig = result
            console.log("Ret "+ret.dept[0])

            res.send(ret); 
            
            })
            })
    })

    app.get('/employee', (req, res) => {

        const sql = "SELECT * FROM employees"
    
        db.query(sql, (err, result) => {
    
            res.send(result);
    
        })
    
    }) 
    
    app.delete('/employee/:id',(req,res)=>{

        const id = req.params.id;
        console.log('please Delete id from database : ', id)
        const sql="DELETE FROM employees WHERE id=?"
        
        db.query(sql , [id] ,(err,result)=>{
        
        if(err) console.log(err);
        
        res.send(result);
        
        })
        
        })
    app.get('/employee', (req, res)=>{
        const id = req.params.id;
        console.log('please get this id from database : ' , id)
        const sql = "SELECT * FROM employees"
        db.query(sql,  (err, result)=>{
            if(err) console.log(err);
            for(var obj in result){
                console.log(result[obj])
               console.log(obj)
                res.send(result[obj]);    
            }
            //res.send(result);
        })
    })  
    
    // app.post('/employee/filter', (req, res)=>{    
    //     console.log("req : "+req.body.desig);      
    //     const sql = "SELECT * FROM employees where  designation_id = ?"
    //     db.query(sql, [req.body.dept],  (err, result)=>{
    //         if(err) console.log(err);
    //         res.send(result);            
    //     })
    // }) 

    app.post('/employee/filter', (req, res)=>{    
        console.log("req filter : "+req);
        console.log("req filter designation id : "+req.body.desigNew+ " req department id: "+ req.body.dept);
        const  datas = req.body;     
        const sql = "SELECT * FROM employees where department=? AND  designation_id = ?"
        db.query(sql, [datas.dept, datas.desigNew],  (err, result)=>{
            if(err) console.log(err);
            res.send(result);            
        })
    })

    
    
    app.post('/employee/filterDept', (req, res)=>{    
        console.log("req : "+req.body.desig);      
        const sql = "SELECT * FROM employees where department = ?"
        db.query(sql, [req.body.dept],  (err, result)=>{
            if(err) console.log(err);
            res.send(result);            
        })
    })
    
    app.get('/employee/:id', (req,res)=>{
        const id = req.params.id;
        const sql = "SELECT * FROM employees WHERE id=?"
        db.query(sql , [id] ,(err,result)=>{
        
            if(err) console.log(err);
    
            //var obj=null;
           for(var obj in result){
                console.log(result[obj])
               console.log(obj)
                res.send(result[obj]);    
            }
            //res.send(result);
            
            })
       
      })

    
    //   app.put('/dept/:id',(req,res)=>{
    //     const id = req.params.id;
    //     console.log('Please Update this id from the database : ', id)
    //     const body = req.body;
    //     const sql = "UPDATE  department SET title=? WHERE department_id=? limit 1"
    //     db.query(sql , [body.deptTitle, id] ,(err,result)=>{
    
    //         if(err) console.log(err);
            
    //         res.send(result);
            
    //         })
    // }) 
    
    

    // app.post('/employee', (req, res) => {
    //     console.log(req.body);
    //     const body = req.body
    //     const sql = "INSERT INTO employees (name, username, password, designation_id, department, create_date,update_date) VALUES(?,?,?,?,?,?,?)"
    
    //     db.query(sql, [body.name, body.username, body.password, body.designation, body.dept, body.createDate, body.updateDate], (err, result) => {
    
    //         console.log(err);
    //         res.send(result)
    
    //     })
    // })

    app.post('/employee/addAttendence', (req, res)=>{
        const id = req.params.id;
        const body =req.body;
        const sql = "INSERT INTO Attendence ( employee_id, in_Time, out_Time) VALUES(?,?,?)"
        db.query(sql, [body.id, body.inTime, body.outTime], (err,result)=>{
            console.log(err);
            res.send(result)
        })
    })  