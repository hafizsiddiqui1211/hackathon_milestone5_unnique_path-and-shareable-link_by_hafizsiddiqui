console.log("Script Loaded Successfully");
var skillsFieldset = document.querySelector('fieldset:nth-of-type(4)');
var toggleButton = document.createElement('button');
toggleButton.textContent = "Toggle Skills Section";
toggleButton.type = "button";
toggleButton.className = "toggle-button";
var form = document.getElementById('resumeform');
form.insertBefore(toggleButton, form.querySelector('button[type="submit"]'));
// Toggle visibility of Skills fieldset with smooth transition
toggleButton.addEventListener('click', function () {
    skillsFieldset.style.display = skillsFieldset.style.display === "none" ? "block" : "none";
    toggleButton.textContent = skillsFieldset.style.display === "none" ? "Show Skills Section" : "Hide Skills Section";
});
// Profile picture and form data elements
var imageInput = document.getElementById("image");
var profilePicture = document.getElementById("profile-picture");
var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var phoneInput = document.getElementById("Phone");
var educationInput = document.getElementById("education");
var experienceInput = document.getElementById("experience");
var skillsInput = document.getElementById("skills");
var output = document.getElementById("output");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    // Display profile picture if uploaded
    if (imageInput.files && imageInput.files[0]) {
        var reader_1 = new FileReader();
        reader_1.onload = function () {
            profilePicture.style.display = "block";
            profilePicture.src = reader_1.result;
        };
        reader_1.readAsDataURL(imageInput.files[0]);
    }
    // Display resume information
    document.getElementById("resume-name").textContent = "".concat(nameInput.value);
    document.getElementById("resume-email").textContent = "Email: ".concat(emailInput.value);
    document.getElementById("resume-phone").textContent = "Phone: ".concat(phoneInput.value);
    document.getElementById("resume-education").textContent = educationInput.value;
    document.getElementById("resume-experience").textContent = experienceInput.value;
    document.getElementById("resume-skills").textContent = skillsInput.value;
    // Show the generated resume
    output.style.display = "block";
    // Generate unique link based on username
    var username = nameInput.value.toLowerCase().replace(/ /g, "-");
    var generatedLink = document.getElementById("generatedLink");
    generatedLink.href = "https://".concat(username, ".vercel.app/resume");
    generatedLink.textContent = generatedLink.href;
    document.getElementById("resumeLink").style.display = "block";
});
// Event listener for the "Download PDF" button
var downloadPdfButton = document.getElementById("downloadPdfButton");
downloadPdfButton.addEventListener("click", function () {
    var options = {
        margin: 1,
        filename: "".concat(nameInput.value.toLowerCase().replace(/ /g, "_"), "_resume.pdf"),
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(options).from(output).save();
});

