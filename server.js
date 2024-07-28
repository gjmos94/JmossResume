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

app.get('/resume', (req, res) => {
    const projects = [
        {
            name: 'Project 1',
            description: 'Brief description of Project 1.',
            image: 'https://via.placeholder.com/800x400?text=Project+1'
        },
        {
            name: 'Project 2',
            description: 'Brief description of Project 2.',
            image: 'https://via.placeholder.com/800x400?text=Project+2'
        },
        {
            name: 'Project 3',
            description: 'Brief description of Project 3.',
            image: 'https://via.placeholder.com/800x400?text=Project+3'
        },
        {
            name: 'Project 4',
            description: 'Brief description of Project 4.',
            image: 'https://via.placeholder.com/800x400?text=Project+4'
        }
    ];
    res.render('resume', { projects });
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
