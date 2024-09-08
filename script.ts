//listing element
document.getElementById("resumeform")?.addEventListener("submit" , function(event) {
event.preventDefault();

//type assertion
const imageElement = document.getElementById("image") as HTMLInputElement;
const nameElement = document.getElementById("name") as HTMLInputElement;
const emailElement = document.getElementById("email") as HTMLInputElement;
const phoneElement = document.getElementById("phone") as HTMLInputElement;
const educationElement = document.getElementById("education") as HTMLTextAreaElement;
const experienceElement = document.getElementById("experience") as HTMLTextAreaElement;
const skillsElement = document.getElementById("skills") as HTMLTextAreaElement;

const usernameElement = document.getElementById("username")as HTMLInputElement;
if(imageElement && nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement && usernameElement){

    const name = nameElement.value;
    const email = emailElement.value;
    const phone = phoneElement.value;
    const education = educationElement.value;
    const experience = experienceElement.value;
    const skills = skillsElement.value;
    const image = imageElement.files?.[0];
    const imageURL = image ? URL.createObjectURL(image) :"";
    const username = usernameElement.value;
    const uniquepath=`resumes/${username.replace(/\s+/g,'_')}_cv.html`;

//create resume output
const resumeOutput = `
<h2>Resume Output</h2>
${imageURL ? `<img src="${imageURL} alt="image" class="image">` :''}
<p><strong>Name:</strong><span id="edit-name" class=""editable>${name}</span></p>
<p><strong>Email:</strong><span id="edit-email" class=""editable>${email}</span></p>
<p><strong>Phone:</strong><span id="edit-phone" class=""editable>${phone}</span></p>

<h3>Education</h3>
<p id="edit-education" class=""editable>${education}</p>

<h3>Experience</h3>
<p id="edit-experience" class=""editable>${experience}</p>

<h3>Skills</h3>
<p id="edit-skills" class=""editable>${skills}</p>
`;

const downloadLink=document.createElement('a');
downloadLink.href='data:text/html;charset=utf-8,' + encodeURIComponent(resumeOutput)
downloadLink.download= uniquepath;
downloadLink.textContent="Download Your 2024 Resume";


const resumeOutputElement=document.getElementById('resumeOutput');

if(resumeOutputElement){
    resumeOutputElement.innerHTML=resumeOutput;
    resumeOutputElement.appendChild(downloadLink);
    resumeOutputElement.style.display="block";
}
}else {
    console.error("One or more output elements are missing from resume output.");

}
})

function makeEditable(){
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(element => {
        element.addEventListener('click', function() {
            const currentElement = element as HTMLElement;
            const currentvalue = currentElement.textContent || "";

            //replace content
            if(currentElement.tagName ==="P" || currentElement.tagName ==="SPAN"){
                const input = document.createElement('input');
                input.type = 'text';
                input.value = currentvalue;
                input.classList.add('editing-input');

                input.addEventListener('blur', function() {
                    currentElement.textContent =input.value;
                    currentElement.style.display ='inline';
                    input.remove();
                })

                currentElement.style.display ='none';
                currentElement.parentNode?.insertBefore(input, currentElement);
                input.focus();

            }
        })
    })
}