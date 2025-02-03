const express = require('express');
const app = express()
const bodyParser = require('body-Parser');
const mysql = require('mysql');
const port = process.env.PORT || 3001;
const cors = require('cors');


app.use(cors());
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
    // app.get('/employee', (req, res)=>{
    //     const id = req.params.id;
    //     console.log('please get this id from database : ' , id)
    //     const sql = "SELECT * FROM employees"
    //     db.query(sql,  (err, result)=>{
    //         if(err) console.log(err);
    //         for(var obj in result){
    //             console.log(result[obj])
    //            console.log(obj)
    //             res.send(result[obj]);    
    //         }
    //         //res.send(result);
    //     })
    // })  
    
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
    
    // app.get('/employee', (req, res)=>{
    //     const id = req.params.id;
    //     console.log('please get this id from database : ' , id)
    //     const sql = "SELECT * FROM employees"
    //     db.query(sql,  (err, result)=>{
    //         if(err) console.log(err);
    //         for(var obj in result){
    //             console.log(result[obj])
    //            console.log(obj)
    //             res.send(result[obj]);    
    //         }
    //         //res.send(result);
    //     })
    // })



    // app.get('/employee', (req, res) => {

    //     const sql = "SELECT * FROM employees"
    
    //     db.query(sql, (err, result) => {
    
    //         res.send(result);
    
    //     })
    
    // }) 
    
    app.get('/attendence', (req,res)=>{
        const sql = "select * from attendence a, employees e where a.employee_id = e.id "
        db.query(sql, (err, result)=>{
            res.send(result);
        })
    })


    // app.post('/employee/filter', (req, res)=>{    
    //     console.log("req filter : "+req);
    //     console.log("req filter designation id : "+req.body.desigNew+ " req department id: "+ req.body.dept);
    //     const  datas = req.body;     
    //     const sql = "SELECT * FROM employees where department=? AND  designation_id = ?"
    //     db.query(sql, [datas.dept, datas.desigNew],  (err, result)=>{
    //         if(err) console.log(err);
    //         res.send(result);            
    //     })
    // })

    app.post('/attendence/filter', (req,res)=>{
        const datas = req.body;
        
        console.log("req filter date :" + datas.date);
        // SELECT TIMEDIFF("18:20:00", "11:00:00"), a.id , employee_id, in_Time, out_Time, e.id, e.name, e.username, e.password, e.department, e.create_date, e.update_date, e.designation_id from attendence a , employees e where  CAST(a.in_Time as DATE) ='2025-01-02'  AND a.employee_id = e.id group by a.employee_id
        const sql = "SELECT TIMEDIFF(a.out_Time, a.in_Time) as duration,  a.id , employee_id, in_Time, out_Time, e.id, e.name, e.username, e.password, e.department, e.create_date, e.update_date, e.designation_id from attendence a, employees e where CAST(a.in_Time AS DATE) =? AND a.employee_id = e.id group by a.employee_id"
        db.query(sql, [datas.date], (err,result)=>{
            if(err) console.log(err);
            res.send(result);
        })
    })




    app.post('/attendence/avg', (req, res)=>{
        const sql = "select ROUND((AVG(TIMESTAMPDIFF(MINUTE, a.out_Time, a.in_Time) * -1)) / 60, 2) Average_Duty_Hour, a.id , e.id, e.name, e.username, e.password, e.department, e.create_date, e.update_date, e.designation_id,  d.title,  d2.title Designation_title from attendence a, employees e,department d,designation d2  where a.employee_id = e.id and e.department=d.department_id and e.designation_id= d2.designation_id group by a.employee_id;"

        db.query(sql, (err, result)=>{
            if(err) console.log(err);
            res.send(result);
        })

    })

    app.post('/employee/addSchedule', (req, res)=>{
        const id = req.params.id;
        const body =req.body;
        const sql = "INSERT INTO work_schedule ( employee_id,  Saturday, Sunday, Monday, Tuesday, Wednesday, Thursday, Friday) VALUES(?,?,?,?,?,?,?,?)"
        db.query(sql, [body.id, body.sat, body.sun, body.mon, body.tue, body.wed, body.thu, body.fri], (err,result)=>{
            console.log(err);
            res.send(result)
        })
    })

    // app.get('/attendence', (req,res)=>{
    //     const sql = "select * from attendence a, employees e where a.employee_id = e.id "
    //     db.query(sql, (err, result)=>{
    //         res.send(result);
    //     })
    // })

    // app.get('/addSchedule', (req, res)=>{
    //     const sql = "select * from employee_schedule es, employees e, days d, department d2, designation d3,duty_hour dh where es.Day_ID = d.id and es.duty_hour_id=dh.duty_hour_id and es.employee_id = e.id and e.department = d2.department_id  and e.designation_id =d3.designation_id and d.name = ?"
    //     db.query(sql, (err, result)=>{
    //         res.send(result);
    //     })
    // })

    app.post('/addSchedule/countabs', (req, res)=>{
        const body = req.body;
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentDay = new Date().getDay();
        console.log("Day: "+days[currentDay])
        let sql = ""
        switch(days[currentDay]){
            case "Saturday": sql = "select count(*) count from work_schedule ws , employees e where ws.employee_id =e.id and Saturday = '';"; break;
            case "Sunday": sql = "select count(*) count from work_schedule ws , employees e where ws.employee_id =e.id and Sunday = '';"; break;
            case "Monday": sql = "select count(*) count from work_schedule ws , employees e where ws.employee_id =e.id and Monday = '';"; break;
            case "Tuesday": sql = "select count(*) count from work_schedule ws , employees e where ws.employee_id =e.id and Tuesday = '';"; break;
            case "Wednesday": sql = "select count(*) count from work_schedule ws , employees e where ws.employee_id =e.id and Wednesday = '';"; break;
            case "Thursday": sql = "select count(*) count from work_schedule ws , employees e where ws.employee_id =e.id and Thursday = '';"; break;
            case "Friday": sql = "select count(*) count from work_schedule ws , employees e where ws.employee_id =e.id and Friday = '';"; break;
        }
        //const sql = "select count(*) count from work_schedule ws , employees e where ws.employee_id =e.id and coalesce (?, '') = '';"
        

        db.query(sql,  (err, result)=>{
            console.log(result)
            res.send(result);
        })
    })
    // app.get('/employee', (req, res) => {

    //     const sql = "SELECT * FROM employees"
    
    //     db.query(sql, (err, result) => {
    
    //         res.send(result);
    
    //     })
    
    // }) 

    app.get('/days', (req,res)=>{
        const sql = "SELECT * FROM days"
        db.query(sql, (err, result)=>{
            res.send(result);
        })

    })


    // app.post('/employee/addSchedule', (req, res)=>{
    //     const id = req.params.id;
    //     const body =req.body;
    //     const sql = "INSERT INTO work_schedule ( employee_id,  Saturday, Sunday, Monday, Tuesday, Wednesday, Thursday, Friday) VALUES(?,?,?,?,?,?,?,?)"
    //     db.query(sql, [body.id, body.sat, body.sun, body.mon, body.tue, body.wed, body.thu, body.fri], (err,result)=>{
    //         console.log(err);
    //         res.send(result)
    //     })
    // })

    app.post('/employee/dutyhour', (req, res)=>{
        const body = req.body;
        const sql = "INSERT INTO duty_hour (From_t, To_t, day_id) VALUES (?,?,?)"
        db.query(sql, [body.from, body.toTime, body.day], (err, result)=>{
            console.log(err);
            res.send(result)
        })

    })

    app.post('/employee/filterHour', (req,res)=>{
        const body = req.body;
        console.log(body.daySelected)
        const sql = "select * from duty_hour dh, days d2 where dh.day_id =d2.id and d2.id=?"
        db.query(sql, [body.daySelected], (err, result)=>{
            console.log(err);
            res.send(result)
        })
    })
    // app.post('/employee/dutyhour', (req, res)=>{
    //     const body = req.body;
    //     const sql = "INSERT INTO duty_hour (From_t, To_t, day_id) VALUES (?,?,?)"
    //     db.query(sql, [body.from, body.toTime, body.day], (err, result)=>{
    //         console.log(err);
    //         res.send(result)
    //     })

    // })

    app.post('/employee/empSch', (req, res)=>{
        const id = req.params.id;
        const body =req.body;
        console.log("DayID "+body.daySelected, "EmployeeID "+body.id,  "DutyHourID "+body.time)
        

        let sql = "select * from employee_schedule es where es.employee_id =?  and es.Day_ID = ? and es.duty_hour_id = ?"
        db.query(sql, [ body.id, body.daySelected, body.time], (err, result)=>{
            console.log("(result == null) : "+result);
            console.log("(result == null) : "+(result == ''));
            if(result == ''){
                sql = "INSERT INTO employee_schedule (Day_ID, employee_id, duty_hour_id) VALUES(?,?,?) "

                db.query(sql, [body.daySelected, body.id, body.time], (err,result)=>{
                    console.log(err);
                    res.send(result)
                })
            }else
            res.send(result)
        })
        
    })

   






    app.post("/employee/emptoday", (req, res)=> {
        const body = req.body;
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentDay = new Date().getDay();
        let sql = ""
        
            sql = "select dh.* from duty_hour dh, days d where dh.day_id = d.id and d.name=?"

        
        // const sql = "select es.Day_ID, es.employee_id, es.duty_hour_id, e.name, e.department, e.designation_id , d.name day_name , d3.title designation_title, d2.title department_title , dh.From_t , dh.To_t   from employee_schedule es, employees e, days d, department d2, designation d3,duty_hour dh where es.Day_ID = d.id and es.duty_hour_id=dh.duty_hour_id and es.employee_id = e.id and e.department = d2.department_id  and e.designation_id =d3.designation_id and d.name = 'Saturday'"
        db.query(sql, [days[currentDay]], (err, result)=>{
            res.send(result);
          
        })
       
    })
   
    app.post("/employee/emp", (req, res)=> {
        const body = req.body;
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentDay = new Date().getDay();
        let sql = ""
        
            sql = "select  es.Day_ID, es.employee_id, es.duty_hour_id,   e.name, e.department, e.designation_id , d.name day_name , d3.title designation_title, d2.title department_title , dh.From_t , dh.To_t   from employee_schedule es, employees e, days d, department d2, designation d3,duty_hour dh where es.Day_ID = d.id and es.duty_hour_id=dh.duty_hour_id and es.employee_id = e.id and e.department = d2.department_id  and e.designation_id =d3.designation_id and d.name = ?"

        
        // const sql = "select es.Day_ID, es.employee_id, es.duty_hour_id, e.name, e.department, e.designation_id , d.name day_name , d3.title designation_title, d2.title department_title , dh.From_t , dh.To_t   from employee_schedule es, employees e, days d, department d2, designation d3,duty_hour dh where es.Day_ID = d.id and es.duty_hour_id=dh.duty_hour_id and es.employee_id = e.id and e.department = d2.department_id  and e.designation_id =d3.designation_id and d.name = 'Saturday'"
        db.query(sql, [days[currentDay]], (err, result)=>{
            res.send(result);
            
        
         
        })
       
    })
    // app.post('/employee/filterDept', (req, res)=>{    
    //     console.log("req : "+req.body.desig);      
    //     const sql = "SELECT * FROM employees where department = ?"
    //     db.query(sql, [req.body.dept],  (err, result)=>{
    //         if(err) console.log(err);
    //         res.send(result);            
    //     })
    // })

    app.post("/employee/workthatday", (req, res)=>{
        
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentDay = new Date().getDay();
        const sql = "select distinct e.* from employee_schedule es, employees e, days d  where es.employee_id = e.id and es.Day_ID =d.id and d.name = ?"
        db.query(sql,   [days[currentDay]], (err, result)=>{
            console.log(result)
            res.send(result);
        })
    })

    
    

    
    
    

  




