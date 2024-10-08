const express = require('express'); 
const path = require('path'); 
const sqlite3 = require('sqlite3'); 
const { open } = require('sqlite'); 

const PORT = 8080; 

const static_dir = path.join(__dirname, 'static');
const public_dir = path.join(__dirname, 'public');
let db;

(async () => { 
    console.log("Making DB connection...  :o")
    db = await open({ 
        filename: 'resume.sqlite', 
        driver: sqlite3.Database 
    }); 
    console.log("DB CONNECTION READY  #_#")
})(); 

const app = express();
app.use(express.static(static_dir));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

/////////////////////////////////////////////
///////////////////ROUTES////////////////////
/////////////////////////////////////////////

app.get('/index.html', (req, res) => {
    res.sendFile(path.join(public_dir, 'index.html'));  // Serve index.html from the 'public' directory
});

app.get('/test', async (req, res) => {
    const result = await db.get("SELECT * FROM project WHERE id = 1");
    console.log(result);
    res.send("OKKK :D")
});

app.get('/resume', async (req, res) => {
    try {
        const projects = await db.all("SELECT * FROM project");
        res.render('resume', { projects });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/skills', (req, res) => {
    res.render('skills', {title: "Skills"});
});

app.get('/projects', async (req, res) => {
    const projects = await db.all("SELECT * FROM project");
    res.render('projects', {title: "Projects", projects });
});

app.get('/contact', (req, res) => {
    res.render('contact', {title: "Contact"});
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));


// http://localhost:8080/resume

// https://www.w3schools.com
// https://getbootstrap.com/docs/5.3/getting-started/introduction/
// https://developer.mozilla.org/en-US/