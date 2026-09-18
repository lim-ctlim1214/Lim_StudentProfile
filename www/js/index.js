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
    }
}

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

forms_and_texts = [
    name,
    course,
    year,
    aboutme
]

function edit(){
    overlay.classList.add("show")
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

    const pfpUploaded = picFileChooser.files[0];
    if (pfpUploaded) {
        try {
            await saveProfilePic(pfpUploaded);
        } catch (error) {
            set_error_code(7);
            return;
        }
    } else {
        localStorage.setItem("PFP", "assets/defaultpfp.png")
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
    setElementsInPage()
}

function saveProfilePic(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const dataURL = event.target.result;
            try {
                localStorage.setItem("PFP", dataURL);
                resolve();
            } catch (error) {
                reject(error);
            }
        };
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
}

activeSkillElements = []

function setElementsInPage(){
    let element_profile_details = JSON.parse(localStorage.getItem("profile_details"));
    let skill_details = JSON.parse(localStorage.getItem("saved_skills"));
    if (element_profile_details.name === null) return;
    document.getElementById("name-nav").innerHTML = `${element_profile_details.name}`;
    document.getElementById("name-heading").innerHTML = `Hi! I'm ${element_profile_details.name}!`;
    document.getElementById("name-query").innerHTML = `Name: ${element_profile_details.name}`;
    document.getElementById("aboutElement").innerHTML = `${element_profile_details.about}`;
    document.getElementById("course-query").innerHTML = `Course: ${element_profile_details.course}`;
    document.getElementById("year-query").innerHTML = `Year: ${element_profile_details.year}`;
    document.getElementById("title").innerHTML = `${element_profile_details.name}'s Student Profile`;

    name.value = element_profile_details.name;
    course.value = element_profile_details.course;
    year.value = element_profile_details.year;
    aboutme.value = element_profile_details.about;
    pfp.src = localStorage.getItem("PFP");

    formsubmit.classList.remove("pressed")
    cancel.classList.remove("pressed")
    if (skill_details === null) {
        skillbutton.classList.remove("pressed")
        return;
    }
    skillbutton.classList.remove("pressed")

    activeSkillElements.forEach(element => {
        element.remove();
    })

    activeSkillForms.forEach(form => {
        form.remove();
    })

    skills_added = 0;

    const skill_page = document.getElementById("skills");
    for (const skill of skill_details){
        let skillEl = document.createElement("div")
        skillEl.classList.add("skill-card-mini")
        skillEl.innerHTML = `<b>${skill}</b>`;
        skill_page.appendChild(skillEl);
        add_skill_form(skill)
        activeSkillElements.push(skillEl);
    }
    document.getElementById("noskill").classList.add("hidden");
}

function cancelForm(){
    overlay.classList.remove("show")
}

function showSkills(){
    skilloverlay.classList.add("show")
}

async function save_details(profile_details){
    localStorage.setItem("profile_details", JSON.stringify(profile_details));
    overlay.classList.remove("show")
    set_error_code(4);
}

function clearAll(){
    for (const form of forms_and_texts){
        form.value = "";
    }
    picFileChooser.value = ""
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

let skills_added = 0;
const MAX_SKILLS = 6;
const skillist = document.getElementById("skill-list");

let skillforms = [

]

function add_skill(){
    if (skills_added >= MAX_SKILLS){
        set_skill_error(8);
        return;
    }

    add_skill_form("")

}

activeSkillForms = []

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

    localStorage.setItem("saved_skills", JSON.stringify(actual_skills));
    setElementsInPage()
    hide_skills()
}

function hide_skills(){
    skilloverlay.classList.remove("show")
}

setElementsInPage()