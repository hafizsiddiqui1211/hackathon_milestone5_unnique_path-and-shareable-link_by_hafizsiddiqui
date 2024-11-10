console.log("Script Loaded Successfully");

const skillsFieldset = document.querySelector('fieldset:nth-of-type(4)') as HTMLFieldSetElement;
const toggleButton = document.createElement('button');
toggleButton.textContent = "Toggle Skills Section";
toggleButton.type = "button";
toggleButton.className = "toggle-button";

const form = document.getElementById('resumeform') as HTMLFormElement;
form.insertBefore(toggleButton, form.querySelector('button[type="submit"]'));

// Toggle visibility of Skills fieldset with smooth transition
toggleButton.addEventListener('click', () => {
    skillsFieldset.style.display = skillsFieldset.style.display === "none" ? "block" : "none";
    toggleButton.textContent = skillsFieldset.style.display === "none" ? "Show Skills Section" : "Hide Skills Section";
});

// Profile picture and form data elements
const imageInput = document.getElementById("image") as HTMLInputElement;
const profilePicture = document.getElementById("profile-picture") as HTMLImageElement;
const nameInput = document.getElementById("name") as HTMLInputElement;
const emailInput = document.getElementById("email") as HTMLInputElement;
const phoneInput = document.getElementById("Phone") as HTMLInputElement;
const educationInput = document.getElementById("education") as HTMLTextAreaElement;
const experienceInput = document.getElementById("experience") as HTMLTextAreaElement;
const skillsInput = document.getElementById("skills") as HTMLTextAreaElement;
const output = document.getElementById("output") as HTMLElement;

form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Display profile picture if uploaded
    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function () {
            profilePicture.style.display = "block";
            profilePicture.src = reader.result as string;
        };
        reader.readAsDataURL(imageInput.files[0]);
    }

    // Display resume information
    document.getElementById("resume-name")!.textContent = `${nameInput.value}`;
    document.getElementById("resume-email")!.textContent = `Email: ${emailInput.value}`;
    document.getElementById("resume-phone")!.textContent = `Phone: ${phoneInput.value}`;
    document.getElementById("resume-education")!.textContent = educationInput.value;
    document.getElementById("resume-experience")!.textContent = experienceInput.value;
    document.getElementById("resume-skills")!.textContent = skillsInput.value;

    // Show the generated resume
    output.style.display = "block";

    // Generate unique link based on username
    const username = nameInput.value.toLowerCase().replace(/ /g, "-");
    const generatedLink = document.getElementById("generatedLink") as HTMLAnchorElement;
    generatedLink.href = `https://${username}.vercel.app/resume`;
    generatedLink.textContent = generatedLink.href;
    document.getElementById("resumeLink")!.style.display = "block";
});

// Event listener for the "Download PDF" button
const downloadPdfButton = document.getElementById("downloadPdfButton") as HTMLButtonElement;
downloadPdfButton.addEventListener("click", () => {
    const options = {
        margin: 1,
        filename: `${nameInput.value.toLowerCase().replace(/ /g, "_")}_resume.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(options).from(output).save();
});
