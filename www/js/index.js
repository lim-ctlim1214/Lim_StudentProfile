text_codes = {
    0: {
        "message": "Testing, just wanted this cool array thing.",
        "class": "regular"
    },
    1: {
        "message": "Some fields are empty.",
        "class": "error"
    },
    2: {
        "message": "Submitting and saving...",
        "class": "regular"
    },
    3: {
        "message": "Cleared!",
        "class": "regular"
    },
    4: {
        "message": "Saved!",
        "class": "regular"
    },
    5: {
        "message": "Invalid Year. Must be lesser than 10.",
        "class": "error"
    },
    6: {
        "message": "Invalid Year. Must be a positive number greater than 0.",
        "class": "error"
    },
    7: {
        "message": "Image too large! Only images less than 5MB can be uploaded.",
        "class": "error"
    },
    8: {
        "message": "You can only have a maximum of 6 skills.",
        "class": "error"
    },
    9: {
        "message": "You need to set your other profile details before setting your image.",
        "class": "error"
    },
    10 : {
        "message": "Camera Fail",
        "class": "error"
    },
    11: {
        "message": "Unable to access the camera. Please check your device permissions.",
        "class": "error"
    }
}

document.addEventListener('deviceready', onDeviceReady, false);

let db;
let currentStudentId = null;

function onDeviceReady() {
  db = window.sqlitePlugin.openDatabase({ name: 'profile.db', location: 'default' });
  db.executeSql('PRAGMA foreign_keys = ON;');
  createTables();
  checkLoginState();
}

function createTables() {
  db.transaction(function(tx) {
    tx.executeSql(`CREATE TABLE IF NOT EXISTS Student(
      ID INTEGER PRIMARY KEY,
      Name TEXT,
      Course TEXT,
      YearLevel INT,
      AboutMe TEXT,
      PFP TEXT
    )`);
  }, function(err) {
    console.log('Student table error:', err.message);
  });

  db.transaction(function(tx) {
    tx.executeSql(`CREATE TABLE IF NOT EXISTS Student_Skills(
      StudentID INTEGER,
      SkillID INTEGER,
      Detail TEXT,
      PRIMARY KEY (StudentID, SkillID),
      FOREIGN KEY (StudentID) REFERENCES Student(ID)
    )`);
  }, function(err) {
    console.log('Student_Skills table error:', err.message);
  });

  db.transaction(function(tx) {
    tx.executeSql(`CREATE TABLE IF NOT EXISTS Users(
      StudentID INTEGER PRIMARY KEY,
      PasswordHash TEXT,
      Salt TEXT,
      FOREIGN KEY (StudentID) REFERENCES Student(ID)
    )`);
  }, function(err) {
    console.log('Users table error:', err.message);
  });
}

async function hashPassword(password, salt) {
  const enc = new TextEncoder();

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: enc.encode(salt),
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    256
  );

  return Array.from(new Uint8Array(derivedBits))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

function generateSalt() {
  const arr = new Uint8Array(16);
  crypto.getRandomValues(arr);
  return Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
}

function isLoggedIn() {
  return localStorage.getItem('loggedInId') !== null;
}

function getLoggedInId() {
  return localStorage.getItem('loggedInId');
}

function checkLoginState() {
  if (isLoggedIn()) {
    document.getElementById('login-page').classList.add('hide');
    loadStudentFromDB(getLoggedInId());
  }
}

async function login() {
  const studentId = document.getElementById('username').value;
  const passwordAttempt = document.getElementById('password').value;

  if (studentId === "" || passwordAttempt === "") {
    showLoginError("Please enter both Student ID and Password.");
    return;
  }

  db.transaction(tx => {
    tx.executeSql(
      'SELECT PasswordHash, Salt FROM Users WHERE StudentID = ?',
      [studentId],
      async (tx, results) => {
        if (results.rows.length === 0) {
          showLoginError("Invalid student ID or password.");
          return;
        }
        const row = results.rows.item(0);
        const attemptHash = await hashPassword(passwordAttempt, row.Salt);

        if (attemptHash === row.PasswordHash) {
          localStorage.setItem('loggedInId', studentId);
          document.getElementById('login-page').classList.add('hide');
          loadStudentFromDB(studentId);
        } else {
          showLoginError("Invalid student ID or password.");
        }
      },
      (tx, err) => {
        console.log('Login query error:', err.message);
        showLoginError("Unable to retrieve your profile. Please try again.");
      }
    );
  });
}

function skipLogin() {
  // Convenience for testing — bypasses auth, uses seed student (ID 1)
  localStorage.setItem('loggedInId', '1');
  document.getElementById('login-page').classList.add('hide');
  loadStudentFromDB('1');
}

function showLoginError(msg) {
  let el = document.getElementById('login-error');
  if (!el) {
    el = document.createElement('p');
    el.id = 'login-error';
    el.style.color = 'red';
    document.querySelector('.login-form').appendChild(el);
  }
  el.textContent = msg;
}

function logout() {
  localStorage.removeItem('loggedInId');
  location.reload();
}

// ---------- DOM refs ----------

const name = document.getElementById("name");
const course = document.getElementById("course");
const year = document.getElementById("year");
const aboutme = document.getElementById("aboutme");
const pfp = document.getElementById("pfp");
const picFileChooser = document.getElementById("picture");
const error = document.getElementById("errorText");
const formsubmit = document.getElementById("submit");
const cancel = document.getElementById("cancel");
const overlay = document.getElementById("overlay");
const skilloverlay = document.getElementById("skill-overlay");
const skillbutton = document.getElementById("edit-skills");
const pfpText = document.getElementById("pfpText");

forms_and_texts = [
    name,
    course,
    year,
    aboutme
]

function edit(){
    overlay.classList.add("show")
}

const pfp_overlay = document.getElementById("profile-picture-overlay")

pfp.addEventListener("click",function(e){
    pfp_overlay.classList.add("show");
})

function hide_pfp_overlay(){
    pfp_overlay.classList.remove("show");
}

let unloaded = true;

function take_a_picture(){
    if (unloaded){
        set_error_pfp(9)
    } else {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
             sourceType: Camera.PictureSourceType.CAMERA,
             encodingType: Camera.EncodingType.JPEG,
             mediaType: Camera.MediaType.PICTURE,
             allowEdit: false,
             correctOrientation: true
        })
    }
}

function showSignup() {
  document.getElementById('login-form').classList.add('hidden');
  document.getElementById('signup-form').classList.remove('hidden');
}

function showLoginForm() {
  document.getElementById('signup-form').classList.add('hidden');
  document.getElementById('login-form').classList.remove('hidden');
}

function showSignupError(msg) {
  document.getElementById('signup-error').textContent = msg;
}

function delete_skill(skillId) {
  if (!confirm("Delete this skill?")) return;

  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM Student_Skills WHERE StudentID = ? AND SkillID = ?',
      [currentStudentId, skillId]
    );
  }, err => {
    console.log('Delete skill error:', err.message);
  }, () => {
    loadSkillsFromDB(currentStudentId); // refresh the list
  });
}
async function signup() {
  const id = document.getElementById('signup-id').value;
  const name = document.getElementById('signup-name').value;
  const password = document.getElementById('signup-password').value;
  const confirm = document.getElementById('signup-confirm').value;

  if (id === "" || name === "" || password === "" || confirm === "") {
    showSignupError("All fields are required.");
    return;
  }

  if (password !== confirm) {
    showSignupError("Passwords do not match.");
    return;
  }

  if (password.length < 6) {
    showSignupError("Password must be at least 6 characters.");
    return;
  }


  db.transaction(tx => {
    tx.executeSql(
      'SELECT StudentID FROM Users WHERE StudentID = ?',
      [id],
      async (tx, results) => {
        if (results.rows.length > 0) {
          showSignupError("That Student ID is already registered.");
          return;
        }

        const salt = generateSalt();
        const hash = await hashPassword(password, salt);

        db.transaction(tx2 => {
          tx2.executeSql(
            'INSERT INTO Student (ID, Name, Course, YearLevel, AboutMe, PFP) VALUES (?, ?, ?, ?, ?, ?)',
            [id, name, '', 1, '', null]
          );
          tx2.executeSql(
            'INSERT INTO Users (StudentID, PasswordHash, Salt) VALUES (?, ?, ?)',
            [id, hash, salt]
          );
        }, err => {
          console.log('Signup error:', err.message);
          showSignupError("Unable to create account. Please try again.");
        }, () => {

          localStorage.setItem('loggedInId', id);
          document.getElementById('login-page').classList.add('hide');
          loadStudentFromDB(id);
        });
      },
      (tx, err) => {
        console.log('Signup check error:', err.message);
        showSignupError("Unable to create account. Please try again.");
      }
    );
  });
}

function onSuccess(imageData) {
    const dataURL = imageData.startsWith("data:")
        ? imageData
        : "data:image/jpeg;base64," + imageData;

    db.transaction(tx => {
        tx.executeSql(
            'UPDATE Student SET PFP = ? WHERE ID = ?',
            [dataURL, currentStudentId],
            () => loadStudentFromDB(currentStudentId),
            (tx, err) => {
                console.log('PFP update error:', err.message);
                set_errormessage_pfp("Unable to update your profile.");
            }
        );
    });
}

function onFail(message){
    if (message === "20"){
        set_error_pfp(11);
        return
    }
    set_errormessage_pfp(message);
}

function set_error_pfp(code){
    pfpText.className = 'error-text';
    pfpText.textContent = text_codes[code].message;
    pfpText.classList.add(text_codes[code].class)
}

function set_errormessage_pfp(message){
    pfpText.className = 'error-text';
    pfpText.textContent = message;
    pfpText.classList.add("error")
}

const gallerySelector = document.getElementById("gallery-selector");
gallerySelector.addEventListener("click", () => {
    if (unloaded){
        set_error_pfp(9)
    } else {
        picFileChooser.click()
    }
})

picFileChooser.addEventListener("change", () => {
    const pfpUploaded = picFileChooser.files[0];
    if (pfpUploaded) {
        select_from_gallery(pfpUploaded);
    }
})

async function select_from_gallery(file){
    try {
        await saveProfilePic(file);
        loadStudentFromDB(currentStudentId);
    } catch (err) {
        console.log(err)
        set_errormessage_pfp("Unable to update your profile.");
    }
}

function saveProfilePic(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataURL = event.target.result;
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE Student SET PFP = ? WHERE ID = ?',
          [dataURL, currentStudentId],
          () => resolve(),
          (tx, err) => reject(err)
        );
      });
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}


async function submit_details(){

    for (const form of forms_and_texts){
        if (form.value === ""){
            set_error_code(1)
            return;
        }
    }

    if (year.value > 9){
        set_error_code(5)
        return;
    }

    if (year.value < 1){
        set_error_code(6)
        return;
    }

    let profile_details = {
        "name": name.value,
        "course": course.value,
        "year": year.value,
        "about": aboutme.value
    }

    formsubmit.classList.add("pressed")
    cancel.classList.add("pressed")
    set_error_code(2);
    await save_details(profile_details);
}

async function save_details(profile_details) {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE Student SET Name = ?, Course = ?, YearLevel = ?, AboutMe = ? WHERE ID = ?',
      [profile_details.name, profile_details.course, profile_details.year, profile_details.about, currentStudentId],
      () => {
        overlay.classList.remove("show");
        set_error_code(4);
        loadStudentFromDB(currentStudentId);
      },
      (tx, err) => {
        console.log('Update error:', err.message);
        set_errormessage_pfp("Unable to update your profile.");
      }
    );
  });
}

function cancelForm(){
    overlay.classList.remove("show")
}

function showSkills(){
    skilloverlay.classList.add("show")
}

function clearAll(){
    for (const form of forms_and_texts){
        form.value = "";
    }
    set_error_code(3);
}

function set_error_code(code){
    error.className = 'error-text';
    error.textContent = text_codes[code].message;
    error.classList.add(text_codes[code].class)
}

const skill_error = document.getElementById("skill-error");

function set_skill_error(code){
    skill_error.className = 'error-text';
    skill_error.textContent = text_codes[code].message;
    skill_error.classList.add(text_codes[code].class)
}

function loadStudentFromDB(studentId) {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM Student WHERE ID = ?',
      [studentId],
      (tx, results) => {
        if (results.rows.length === 0) {
            set_errormessage_pfp("Unable to retrieve your profile. Please try again.");
            return;
        }
        const student = results.rows.item(0);
        currentStudentId = studentId;
        renderStudent(student);
        loadSkillsFromDB(studentId);
      },
      (tx, err) => {
        console.log('Load error:', err.message);
        set_errormessage_pfp("Unable to retrieve your profile. Please try again.");
      }
    );
  });
}

function renderStudent(student) {
  document.getElementById("name-nav").innerHTML = student.Name;
  document.getElementById("name-heading").innerHTML = `Hi! I'm ${student.Name}!`;
  document.getElementById("name-query").innerHTML = `Name: ${student.Name}`;
  document.getElementById("aboutElement").innerHTML = student.AboutMe;
  document.getElementById("course-query").innerHTML = `Course: ${student.Course}`;
  document.getElementById("year-query").innerHTML = `Year: ${student.YearLevel}`;
  document.getElementById("title").innerHTML = `${student.Name}'s Student Profile`;

  name.value = student.Name;
  course.value = student.Course;
  year.value = student.YearLevel;
  aboutme.value = student.AboutMe;

  if (student.PFP) pfp.src = student.PFP;

  formsubmit.classList.remove("pressed");
  cancel.classList.remove("pressed");
  skillbutton.classList.remove("pressed");
  unloaded = false;
}

// ---------- Skills (CRUD) ----------

activeSkillElements = []
activeSkillForms = []
let skillforms = []
let skills_added = 0;
const MAX_SKILLS = 6;
const skillist = document.getElementById("skill-list");

function loadSkillsFromDB(studentId) {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM Student_Skills WHERE StudentID = ? ORDER BY SkillID',
      [studentId],
      (tx, results) => {
        activeSkillElements.forEach(el => el.remove());
        activeSkillElements = [];

        const skill_page = document.getElementById("skills");
        const len = results.rows.length;

        if (len === 0) {
          document.getElementById("noskill").classList.remove("hidden");
          return;
        }
        document.getElementById("noskill").classList.add("hidden");

        for (let i = 0; i < len; i++) {
          const row = results.rows.item(i);
          let skillEl = document.createElement("div");
          skillEl.classList.add("skill-card-mini");
          skillEl.style.display = "flex";
          skillEl.style.justifyContent = "space-between";
          skillEl.style.alignItems = "center";
          skillEl.innerHTML = `
            <b>${row.Detail}</b>
            <span style="cursor:pointer; color:red;" onclick="delete_skill(${row.SkillID})">✕</span>
          `;
          skill_page.appendChild(skillEl);
          activeSkillElements.push(skillEl);
        }
      },
      (tx, err) => console.log('Skill load error:', err.message)
    );
  });
}

function add_skill(){
    if (skills_added >= MAX_SKILLS){
        set_skill_error(8);
        return;
    }
    add_skill_form("")
}

function add_skill_form(skill){
    let newskillform = document.createElement("div");
    newskillform.classList.add("form");
    newskillform.innerHTML = `
        <p>Skill #${skills_added + 1}</p>
    `
    let formTextArea = document.createElement("input");
    formTextArea.type = "text";
    formTextArea.value = skill;
    formTextArea.placeholder = "Enter your skill";
    formTextArea.classList.add("textfield");

    newskillform.appendChild(formTextArea);
    skillist.appendChild(newskillform);
    activeSkillForms.push(newskillform);
    skillforms.push(formTextArea);
    skills_added++;
}

function submit_skills(){
    let actual_skills = []

    for (const form of skillforms){
        if (form.value === ""){
            return;
        }
        actual_skills.push(form.value);
    }

    db.transaction(tx => {
        tx.executeSql('DELETE FROM Student_Skills WHERE StudentID = ?', [currentStudentId]);
        actual_skills.forEach((skill, index) => {
            tx.executeSql(
                'INSERT INTO Student_Skills (StudentID, SkillID, Detail) VALUES (?, ?, ?)',
                [currentStudentId, index + 1, skill]
            );
        });
    }, err => {
        console.log('Skill save error:', err.message);
        set_skill_error(8); // reuse a visible error slot; adjust message if desired
    }, () => {
        loadSkillsFromDB(currentStudentId);
        hide_skills();
    });
}

function hide_skills(){
    skilloverlay.classList.remove("show")
}