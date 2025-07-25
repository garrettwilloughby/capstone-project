import dotenv from "dotenv";
import express from 'express';
import { MongoClient } from "mongodb";
import cors from 'cors';

dotenv.config();

const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const loginCollection = process.env.MONGO_DB_LOGIN_COLL;
const emplCollection = process.env.MONGO_DB_EMPLOYEE_COLL



const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true
  });


app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    console.log(`Username: ${username} | Password: ${password}`);

    if (username == null || password == null) {
      res.status(404).send("Invalid username or password")
    }
    else {
      try {
        const db = client.db(dbName);
        const collection = db.collection(loginCollection);

        const data = await collection.find({}).toArray();
        // in case of capitalization differences
        const filtered_data = data.filter(element => element.username.toUpperCase() == username.toUpperCase());

        // Ensure only one result and that the password matches
        if (filtered_data.length != 1 || filtered_data[0].password != password) {
          res.status(401).send("Incorrect username or password");
        }
        else {
          console.log("Authed");
            
            const employee_id = filtered_data[0].employee_id; // return the employee_id to front end to save
            console.log(employee_id);
            res.status(200).send(employee_id);
        }
      }
      catch (err) {
          console.error(err);
          res.status(500).send("The server encountered an issue");
      }
    }
})

app.get('/api/collect/:employee_id', async (req, res) => {
    const { employee_id } = req.params;

    try {
        const db = client.db(dbName);
        const collection = db.collection(emplCollection);

        const data = await collection.find({ employee_id : employee_id }).toArray();

        if (data.length == 0) {
            res.status(404).send("Employee ID does not exist");
        }
        else {
            let returnList = [];
            const arr = data[0].direct_reports;
            //console.log(arr);
            for (let i = 0; i < arr.length; i++) {
               // console.log(arr[i]);
                let empl_data = await collection.find({ employee_id : arr[i]}).toArray();
                returnList.push(empl_data);

            }
            res.status(200).send(returnList);
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send("An internal server error occurred");
    }
})

app.get('/api/fetch/:employee_id', async (req, res) => {
    // Gets data for employees with matching employee_ids
    const { employee_id } = req.params;

    try {
        const client = new MongoClient(url, {})
            
        const db = client.db(dbName);
        const collection = db.collection(emplCollection);

        const regEx = new RegExp(`.*${employee_id}.*`, "i");
        const data = await collection.find({ employee_id : regEx}).toArray();// get employee data to find who their direct reports are

        if (data.length < 1) {
            res.status(404).send("No results found");
        }
        else {
            res.status(200).send(data);
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
})

app.get('/api/fetch/:employee_id/:target_employee_id', async (req, res) => {
  // Gets data for employees with matching employee_ids
  const { employee_id, target_employee_id } = req.params;

  console.log(employee_id);
  console.log(target_employee_id);

  try {
      const client = new MongoClient(url, {})
          
      const db = client.db(dbName);
      const collection = db.collection(emplCollection);

      const regEx = new RegExp(`.*${employee_id}.*`);
      const data = await collection.find({ employee_id : regEx}).toArray();// get employee data to find who their direct reports are

      console.log(data);

      if (data.length < 1) {
          res.status(403).send("No results found");
      }
      else {
        const regEx2 = new RegExp(`.*${target_employee_id}.*`);
        const target_data = await collection.find({ employee_id : regEx2 }).toArray();

        console.log(target_data);

        if (target_data.length > 0) {
          if (!data[0].direct_reports.includes(target_data[0].employee_id) && !data[0].role == 2) {
            console.log("Dropping salary");
            delete target_data.salary;
          }
          //delete target_data.isHr;
          res.status(200).send(target_data)
        }
        else {
          console.log("womp womp.");
          res.status(404).send("No results found for UUID.");
        }
        //res.status(200).send(data);
      }
  }
  catch (err) {
      console.error(err);
      res.status(500).send(err);
  }
})

app.get('/api/:employee_id', async (req, res) => {
    // get all results of employees. filters out salaries if they arent allowed to see them.
    const { employee_id } = req.params;

    console.log("hello!");

    try {
        const client = new MongoClient(url, {})
            
        const db = client.db(dbName);
        const collection = db.collection(emplCollection);

        const data = await collection.find({}).toArray()

        //console.log(data);

        const employer_data = data.filter(x => x.employee_id == employee_id); // get employee data to find who their direct reports are

        if (employer_data.length == 1) {
            const direct_reports = employer_data[0].direct_reports;

            let return_list = [];
            if (employer_data[0].role == 2) {
                const employee_data = await collection.find({}).toArray();
                for (let i = 0; i < employee_data.length; i++) {
                    //delete employee_data[i].isHr;
                    return_list.push(employee_data[i]);
                }
            }
            else {
                const employee_data = await collection.find({}).toArray();
                for (let i = 0; i < employee_data.length; i++) {
                    //delete employee_data[i].isHr;
                    if (!direct_reports.includes(employee_data[i].employee_id) && employee_data[i].employee_id != employee_id) {
                        delete employee_data[i].salary;
                    }
                    return_list.push(employee_data[i]);
                }
            }
            console.log(return_list);
            if (return_list.length > 0) {
                res.status(200).json(return_list);
                return;
            }
        }
        res.status(404).send("No results found for employee_id");
    }
    catch (err) {

        console.error(err);
        res.status(500).send("The server encountered an issue");
    }


})

app.get('/api/:employee_id/:query', async (req, res) => {
    // fetches all employees matching regex query. Filters out salaries if they shouldnt se them
    const { employee_id, query } = req.params;

    try {
        const client = new MongoClient(url, {})
            
        const db = client.db(dbName);
        const collection = db.collection(emplCollection);

        const data = await collection.find({}).toArray()

        //console.log(data);

        const employer_data = data.filter(x => x.employee_id == employee_id); // get employee data to find who their direct reports are

        if (employer_data.length == 1) {
            const direct_reports = employer_data[0].direct_reports;
            const regEx = new RegExp(`.*${query}.*`, "i");
            const employee_data = await collection.find({ employee_name : regEx}).toArray(); // returns all usernames that have the query within them.toArray();

            let return_list = [];
            
            if (employer_data[0].role == 2) {
                for (let i = 0; i < employee_data.length; i++) {
                    //delete employee_data[i].isHr;
                    return_list.push(employee_data[i]);
                }
            }
            else {
                for (let i = 0; i < employee_data.length; i++) {
                    //delete employee_data[i].isHr;
                    if (!direct_reports.includes(employee_data[i].employee_id) && employee_data[i].employee_id != employee_id) {
                        delete employee_data[i].salary;
                    }
                    return_list.push(employee_data[i]);
                }
            }
            console.log(return_list);
            if (return_list.length > 0) {
                res.status(200).json(return_list);
                return;
            }
        }
        res.status(404).send("No results found for employee_id");
    }
    catch (err) {
        console.error(err);
        res.status(500).send("The server encountered an issue");
    }
})


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})