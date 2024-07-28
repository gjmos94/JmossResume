let express = require('express'); 
let path = require('path'); 
const sqlite3 = require('sqlite3'); 
const { open } = require('sqlite'); 

const PORT = 8080; 

const static_dir = path.join(__dirname, 'static');
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

app.get('/test', async (req, res) => {
    const result = await db.get("SELECT * FROM project WHERE id = 1");
    console.log(result);
    res.send("OKKK :D")
    const projectResult = await db.all("SELECT * FROM project");
    console.log(projectResult);
});

app.get('/resume', async (req, res) => {
    const projectResult = await db.all("SELECT * FROM project");
    res.render('resume', {projects: projectResult, title: "Resume"});
});

app.get('/skills', (req, res) => {
    res.render('skills', {title: "Skills"});
});

app.get('/projects', (req, res) => {
    res.render('projects', {title: "Projects"});
});

app.get('/contact', (req, res) => {
    res.render('contact', {title: "Contact"});
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
