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
app.delete('/designations/:id', (req, res) => {

    const id = req.params.id;
    console.log('please Delete id from database : ', id)
    const sql = "DELETE FROM designation WHERE designation_id=?"

    db.query(sql, [id], (err, result) => {

        if (err) console.log(err);

        res.send(result);

    })

})


app.get('/designations', (req, res) => {

    const sql = "SELECT * FROM designation"

    db.query(sql, (err, result) => {

        res.send(result);

    })

})

app.get('/designations/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM designation WHERE designation_id=?"
    db.query(sql, [id], (err, result) => {

        if (err) console.log(err);

        //var obj=null;
        for (var obj in result) {
            console.log(result[obj])
            console.log(obj)
            res.send(result[obj]);
        }
        //res.send(result);

    })

})
app.put('/designations/:id', (req, res) => {
    const id = req.params.id;
    console.log('Please Update this id from the database : ', id)
    const body = req.body;
    const sql = "UPDATE  designation SET title=? WHERE designation_id=? limit 1"
    db.query(sql, [body.dTitle, id], (err, result) => {

        if (err) console.log(err);

        res.send(result);

    })
})
app.get('/dept', (req, res) => {

    const sql = "SELECT * FROM department"

    db.query(sql, (err, result) => {

        res.send(result);

    })

})
app.get('/dept/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM department WHERE department_id=?"
    db.query(sql, [id], (err, result) => {

        if (err) console.log(err);

        //var obj=null;
        for (var obj in result) {
            console.log(result[obj])
            console.log(obj)
            res.send(result[obj]);
        }
        //res.send(result);

    })

})
app.delete('/dept/:id', (req, res) => {

    const id = req.params.id;
    console.log('please Delete id from database : ', id)
    const sql = "DELETE FROM department WHERE department_id=?"

    db.query(sql, [id], (err, result) => {

        if (err) console.log(err);

        res.send(result);

    })

})

app.put('/dept/:id', (req, res) => {
    const id = req.params.id;
    console.log('Please Update this id from the database : ', id)
    const body = req.body;
    const sql = "UPDATE  department SET title=? WHERE department_id=? limit 1"
    db.query(sql, [body.deptTitle, id], (err, result) => {

        if (err) console.log(err);

        res.send(result);

    })
})

app.get('/desigDept', (req, res) => {
    var ret = {};
    var sql = "SELECT * FROM department"
    db.query(sql, (err, result) => {

        if (err) console.log(err);
        console.log("Res1 " + result)
        ret.dept = result

        sql = "SELECT * FROM designation"
        db.query(sql, (err, result) => {

            if (err) console.log(err);
            console.log("Res2 " + result)
            ret.desig = result
            console.log("Ret " + ret.dept[0])

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

app.delete('/employee/:id', (req, res) => {

    const id = req.params.id;
    console.log('please Delete id from database : ', id)
    const sql = "DELETE FROM employees WHERE id=?"

    db.query(sql, [id], (err, result) => {

        if (err) console.log(err);

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

app.post('/employee/filter', (req, res) => {
    console.log("req filter : " + req);
    console.log("req filter designation id : " + req.body.desigNew + " req department id: " + req.body.dept);
    const datas = req.body;
    const sql = "SELECT * FROM employees where department=? AND  designation_id = ?"
    db.query(sql, [datas.dept, datas.desigNew], (err, result) => {
        if (err) console.log(err);
        res.send(result);
    })
})



app.post('/employee/filterDept', (req, res) => {
    console.log("req : " + req.body.desig);
    const sql = "SELECT * FROM employees where department = ?"
    db.query(sql, [req.body.dept], (err, result) => {
        if (err) console.log(err);
        res.send(result);
    })
})

app.get('/employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employees WHERE id=?"
    db.query(sql, [id], (err, result) => {

        if (err) console.log(err);

        //var obj=null;
        for (var obj in result) {
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

app.post('/employee/addAttendence', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const sql = "INSERT INTO Attendence ( employee_id, in_Time, out_Time) VALUES(?,?,?)"
    db.query(sql, [body.id, body.inTime, body.outTime], (err, result) => {
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

app.get('/attendence', (req, res) => {
    const sql = "select * from attendence a, employees e where a.employee_id = e.id "
    db.query(sql, (err, result) => {
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

app.post('/attendence/filter', (req, res) => {
    const datas = req.body;

    console.log("req filter date :" + datas.date);
    // SELECT TIMEDIFF("18:20:00", "11:00:00"), a.id , employee_id, in_Time, out_Time, e.id, e.name, e.username, e.password, e.department, e.create_date, e.update_date, e.designation_id from attendence a , employees e where  CAST(a.in_Time as DATE) ='2025-01-02'  AND a.employee_id = e.id group by a.employee_id
    const sql = "SELECT TIMEDIFF(a.out_Time, a.in_Time) as duration,  a.id , employee_id, in_Time, out_Time, e.id, e.name, e.username, e.password, e.department, e.create_date, e.update_date, e.designation_id from attendence a, employees e where CAST(a.in_Time AS DATE) =? AND a.employee_id = e.id group by a.employee_id"
    db.query(sql, [datas.date], (err, result) => {
        if (err) console.log(err);
        res.send(result);
    })
})




app.post('/attendence/avg', (req, res) => {
    const sql = "select ROUND((AVG(TIMESTAMPDIFF(MINUTE, a.out_Time, a.in_Time) * -1)) / 60, 2) Average_Duty_Hour, a.id , e.id, e.name, e.username, e.password, e.department, e.create_date, e.update_date, e.designation_id,  d.title,  d2.title Designation_title from attendence a, employees e,department d,designation d2  where a.employee_id = e.id and e.department=d.department_id and e.designation_id= d2.designation_id group by a.employee_id;"

    db.query(sql, (err, result) => {
        if (err) console.log(err);
        res.send(result);
    })

})

app.post('/employee/addSchedule', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const sql = "INSERT INTO work_schedule ( employee_id,  Saturday, Sunday, Monday, Tuesday, Wednesday, Thursday, Friday) VALUES(?,?,?,?,?,?,?,?)"
    db.query(sql, [body.id, body.sat, body.sun, body.mon, body.tue, body.wed, body.thu, body.fri], (err, result) => {
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

app.post('/addSchedule/countabs', (req, res) => {
    const body = req.body;
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = new Date().getDay();
    // console.log("Day: " + days[currentDay])
    let sql = ""
    switch (days[currentDay]) {
        case "Saturday": sql = "select count(*) count from work_schedule ws , employees e where ws.employee_id =e.id and Saturday = '';"; break;
        case "Sunday": sql = "select count(*) count from work_schedule ws , employees e where ws.employee_id =e.id and Sunday = '';"; break;
        case "Monday": sql = "select count(*) count from work_schedule ws , employees e where ws.employee_id =e.id and Monday = '';"; break;
        case "Tuesday": sql = "select count(*) count from work_schedule ws , employees e where ws.employee_id =e.id and Tuesday = '';"; break;
        case "Wednesday": sql = "select count(*) count from work_schedule ws , employees e where ws.employee_id =e.id and Wednesday = '';"; break;
        case "Thursday": sql = "select count(*) count from work_schedule ws , employees e where ws.employee_id =e.id and Thursday = '';"; break;
        case "Friday": sql = "select count(*) count from work_schedule ws , employees e where ws.employee_id =e.id and Friday = '';"; break;
    }
    //const sql = "select count(*) count from work_schedule ws , employees e where ws.employee_id =e.id and coalesce (?, '') = '';"


    db.query(sql, (err, result) => {
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

app.get('/days', (req, res) => {
    const sql = "SELECT * FROM days"
    db.query(sql, (err, result) => {
        res.send(result);
    })

})
app.get('/sch', (req, res) => {
    const sql = "SELECT * FROM employee_schedule"
    db.query(sql, (err, result) => {
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

app.post('/employee/dutyhour', (req, res) => {
    const body = req.body;
    const sql = "INSERT INTO duty_hour (From_t, To_t, day_id) VALUES (?,?,?)"
    db.query(sql, [body.from, body.toTime, body.day], (err, result) => {
        console.log(err);
        res.send(result)
    })

})

app.post('/employee/filterHour', (req, res) => {
    const body = req.body;
    console.log(body.daySelected)
    const sql = "select * from duty_hour dh, days d2 where dh.day_id =d2.id and d2.id=?"
    db.query(sql, [body.daySelected], (err, result) => {
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

app.post('/employee/empSch', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log("DayID " + body.daySelected, "EmployeeID " + body.id, "DutyHourID " + body.time)


    let sql = "select * from employee_schedule es where es.employee_id =?  and es.Day_ID = ? and es.duty_hour_id = ?"
    db.query(sql, [body.id, body.daySelected, body.time], (err, result) => {
        console.log("(result == null) : " + result);
        console.log("(result == null) : " + (result == ''));
        if (result == '') {
            sql = "INSERT INTO employee_schedule (Day_ID, employee_id, duty_hour_id) VALUES(?,?,?) "

            db.query(sql, [body.daySelected, body.id, body.time], (err, result) => {
                console.log(err);
                res.send(result)
            })
        } else
            res.send(result)
    })

})


// app.put('/dept/:id', (req, res) => {
//     const id = req.params.id;
//     console.log('Please Update this id from the database : ', id)
//     const body = req.body;
//     const sql = "UPDATE  department SET title=? WHERE department_id=? limit 1"
//     db.query(sql, [body.deptTitle, id], (err, result) => {

//         if (err) console.log(err);

//         res.send(result);

//     })
// })

app.put('/employeeUpdSch/update', (req, res)=>{
    // const id = req.params.id;
    // console.log('Please Update this Id from the database : ', id)
    const body= req.body;
    const sql = "UPDATE employee_schedule SET Day_ID=?  WHERE employee_id=? AND Day_ID=?"
    db.query(sql, [body.dayToBeChangedInto ,body.id, body. daySelected], (err, result)=>{
        if(err) console.log(err);
        res.send(result);
    })
})





app.post("/employee/emptoday", (req, res) => {
    const body = req.body;
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = new Date().getDay();
    let sql = ""

    sql = "select dh.* from duty_hour dh, days d where dh.day_id = d.id and d.name=?"


    // const sql = "select es.Day_ID, es.employee_id, es.duty_hour_id, e.name, e.department, e.designation_id , d.name day_name , d3.title designation_title, d2.title department_title , dh.From_t , dh.To_t   from employee_schedule es, employees e, days d, department d2, designation d3,duty_hour dh where es.Day_ID = d.id and es.duty_hour_id=dh.duty_hour_id and es.employee_id = e.id and e.department = d2.department_id  and e.designation_id =d3.designation_id and d.name = 'Saturday'"
    db.query(sql, [days[currentDay]], (err, result) => {
        res.send(result);

    })

})

app.post("/employee/nowEmp", (req, res)=>{
    const body = req.body;
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
})

app.post("/employee/emp", (req, res) => {
    const body = req.body;
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = new Date().getDay();
    let sql = ""

    sql = "select  es.*, e.name  from employee_schedule es ,duty_hour dh, days d, employees e  where es.duty_hour_id= dh.duty_hour_id and es.Day_ID = d.id and es.employee_id=e.id   and d.name=?;"


    // const sql = "select es.Day_ID, es.employee_id, es.duty_hour_id, e.name, e.department, e.designation_id , d.name day_name , d3.title designation_title, d2.title department_title , dh.From_t , dh.To_t   from employee_schedule es, employees e, days d, department d2, designation d3,duty_hour dh where es.Day_ID = d.id and es.duty_hour_id=dh.duty_hour_id and es.employee_id = e.id and e.department = d2.department_id  and e.designation_id =d3.designation_id and d.name = 'Saturday'"
    db.query(sql, [days[currentDay]], (err, result) => {
        res.send(result);



    })

})
// app.get('/days', (req, res) => {
//     const sql = "SELECT * FROM days"
//     db.query(sql, (err, result) => {
//         res.send(result);
//     })

// })

app.get('/empschedule', (req, res)=>{
    const sql = "SELECT * FROM employee_schedule"
    db.query(sql, (err,result)=>{
        res.send(result);
    })
})
// app.get('/employee/:id', (req, res) => {
//     const id = req.params.id;
//     const sql = "SELECT * FROM employees WHERE id=?"
//     db.query(sql, [id], (err, result) => {

//         if (err) console.log(err);

//         //var obj=null;
//         for (var obj in result) {
//             console.log(result[obj])
//             console.log(obj)
//             res.send(result[obj]);
//         }
//         //res.send(result);

//     })

// })
app.get('/empschedule/:id', (req, res)=>{
    const id = req.params.id; 
    const sql = "SELECT * FROM employee_schedule WHERE id=?"
    db.query(sql , [id], (err, result)=>{
        if(err) console.log(err);
        for(var obj in result){
            console.log(result[obj])
            console.log(obj)
            res.send(result[obj]);
        }
    })
})


app.post("/employee/workthatday", (req, res) => {

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = new Date().getDay();
    const sql = "select distinct e.* from employee_schedule es, employees e, days d  where es.employee_id = e.id and es.Day_ID =d.id and d.name = ?"
    db.query(sql, [days[currentDay]], (err, result) => {
        console.log(result)
        res.send(result);
    })
})


app.post("/employee/exchange", (req, res) => {
    const body = req.body;
    console.log(body.id)
    const sql = "select * from employee_schedule es, duty_hour dh, days d where es.duty_hour_id = dh.duty_hour_id and es.Day_ID =d.id and es.employee_id =?"
    db.query(sql, [body.id], (err, result) => {
        console.log(result)
        res.send(result);
    })
})
app.post('/employee/depatmentBased', (req, res)=>{
    const sql = "select count(*) count, e.department, d.title from employees e, department d where e.department= d.department_id group by e.department ;"
    db.query(sql, (err,result)=>{
        console.log(result)
        res.send(result);
    })
})
app.post("/employee/matchedDeptEmp", (req, res) => {
    const body = req.body;
    console.log("dept ID" + body.deptId)
    const sql = "select * from department d, employees e where d.department_id = ? and e.department = d.department_id"
    db.query(sql, [body.deptId], (err, result) => {
        console.log(result)
        res.send(result);
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

app.post('/employee/scheduleexchangeInsert', (req, res) => {
    const body = req.body;
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = new Date();
    const sql = "INSERT INTO schedule_exchange (Emp_for, employee_schedule_id, Emp_with, Created_on, Exchange_date) VALUES (?,?,?,?,?)"
    console.log("Emp_for" + body.idd + "employee_schedule_id" + body.employeeSchId + "Emp_with" + body.empWith + "Created_on" + days[currentDay] + "Exchange_date" + body.exchangeDate)
    db.query(sql, [body.idd, body.employeeSchId, body.empWith, currentDay, body.exchangeDate], (err, result) => {
        console.log(result)
        res.send(result);
    })
})

app.post('/employee/checkIFtodayisTheDay', (req, res) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = new Date();

    // Get today's date in YYYY-MM-DD format
    const todayDate = currentDay.toISOString().split('T')[0];

    console.log(todayDate); 

    // console.log(currentDay)
    const sql = "select *,(select e.name from employees e where e.id = se.Emp_for) employee_to_be_switch,(select e.name from employees e where e.id = se.Emp_with) employee_to_be_switch_with  from schedule_exchange se where se.Exchange_date =?"
    db.query(sql, [todayDate], (err, result) => {
        console.log(result)
        res.send(result);
        console.log("This is the Latest Result "+result);
    })
})

// app.post('/addSchedule/countabs', (req, res) => {
//     const body = req.body;
//     const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     const currentDay = new Date().getDay();
//     // console.log("Day: " + days[currentDay])
//     let sql = ""
//     switch (days[currentDay]) {
//         case "Saturday": sql = "select count(*) count from work_schedule ws , employees e where ws.employee_id =e.id and Saturday = '';"; break;
//         case "Sunday": sql = "select count(*) count from work_schedule ws , employees e where ws.employee_id =e.id and Sunday = '';"; break;
//         case "Monday": sql = "select count(*) count from work_schedule ws , employees e where ws.employee_id =e.id and Monday = '';"; break;
//         case "Tuesday": sql = "select count(*) count from work_schedule ws , employees e where ws.employee_id =e.id and Tuesday = '';"; break;
//         case "Wednesday": sql = "select count(*) count from work_schedule ws , employees e where ws.employee_id =e.id and Wednesday = '';"; break;
//         case "Thursday": sql = "select count(*) count from work_schedule ws , employees e where ws.employee_id =e.id and Thursday = '';"; break;
//         case "Friday": sql = "select count(*) count from work_schedule ws , employees e where ws.employee_id =e.id and Friday = '';"; break;
//     }
//     //const sql = "select count(*) count from work_schedule ws , employees e where ws.employee_id =e.id and coalesce (?, '') = '';"


//     db.query(sql, (err, result) => {
//         console.log(result)
//         res.send(result);
//     })
// })
 
// app.post('/attendence/countTotatlAbs', (req, res)=>{
//     const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     const currentDay = new Date().getDay();

// })

app.post('/attendence/totalpresent', (req,res)=>{
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = new Date();

    // Get today's date in YYYY-MM-DD format
    const todayDate = currentDay.toISOString().split('T')[0];

    console.log(todayDate); 
    const sql = "SELECT COUNT(*) count  FROM attendence a JOIN employees e ON a.employee_id = e.id WHERE CAST(a.in_Time AS DATE) = ?" 
    db.query(sql, [todayDate], (err, result)=>{
        console.log(result)
        res.send(result)

    })

})


app.post('/attendence/totalemployees', (req, res)=>{
    const sql  = "select count(e.id) count  from employees e";
    db.query(sql, (err, result)=>{
        console.log(result)
        res.send(result)
    })
})


// app.put('/employeeUpdSch/update', (req, res)=>{
//     // const id = req.params.id;
//     // console.log('Please Update this Id from the database : ', id)
//     const body= req.body;
//     const sql = "UPDATE employee_schedule SET Day_ID=?  WHERE employee_id=? AND Day_ID=?"
//     db.query(sql, [body.dayToBeChangedInto ,body.id, body. daySelected], (err, result)=>{
//         if(err) console.log(err);
//         res.send(result);
//     })
// })


// app.post('/employee/empSch', (req, res) => {
//     const id = req.params.id;
//     const body = req.body;
//     console.log("DayID " + body.daySelected, "EmployeeID " + body.id, "DutyHourID " + body.time)


//     let sql = "select * from employee_schedule es where es.employee_id =?  and es.Day_ID = ? and es.duty_hour_id = ?"
//     db.query(sql, [body.id, body.daySelected, body.time], (err, result) => {
//         console.log("(result == null) : " + result);
//         console.log("(result == null) : " + (result == ''));
//         if (result == '') {
//             sql = "INSERT INTO employee_schedule (Day_ID, employee_id, duty_hour_id) VALUES(?,?,?) "

//             db.query(sql, [body.daySelected, body.id, body.time], (err, result) => {
//                 console.log(err);
//                 res.send(result)
//             })
//         } else
//             res.send(result)
//     })

// })
// app.post('/attendence/totalemployees', (req, res)=>{
//     const sql  = "select count(e.id) count  from employees e";
//     db.query(sql, (err, result)=>{
//         console.log(result)
//         res.send(result)
//     })
// })


app.post('/employee/allinfo', (req,res)=>{
    // const id = req.params.id;
    
    const { id } = req.body;
    console.log("Show This Id" ,id)
    const sql = "select e.name employee_name, e.username, d2.title department_title, d3.title designation_title,d.name day,dh.From_t,  dh.To_t, dayname(a.in_Time) as Attendence_Day, date(a.in_Time)as date_of_attendendence, a.in_Time, a.out_Time  from employee_schedule es, days d, duty_hour dh, attendence a, employees e, department d2, designation d3 where es.employee_id =? and es.Day_ID= d.id and es.duty_hour_id=dh.duty_hour_id and es.employee_id= a.employee_id and es.employee_id=e.id and e.department=d2.department_id and e.designation_id=d3.designation_id ;"
    db.query(sql, [id], (err, result)=>{
        // console.log(result)
        res.send(result)
    })
})


app.post('/employee/allscheduleofEmp', (req, res)=>{
    const {id} = req.body;
    const sql = "select dh.From_t , dh.To_t, d.name from employee_schedule es, duty_hour dh,days d where es.duty_hour_id =dh.duty_hour_id and dh.day_id=d.id and es.employee_id =?;"
    db.query(sql, [id], (err, result)=>{
        res.send(result)
    })
})

app.post('/employee/allAttendence', (req, res)=>{
    const {id}= req.body;
    const sql = "select dayname(a.in_Time) day_of_attendence,a.in_Time, a.out_Time  from attendence a, employees e where a.employee_id=e.id   and e.id =? ;"
    db.query(sql, [id], (err,result)=>{
        res.send(result)
    })
})











