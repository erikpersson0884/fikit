
const sittandeDiv = document.getElementById("sittande");
const patetosDiv = document.getElementById("patetContainerDiv");



// POPULATE PATETOS DIV
function populatePatetosDiv(years){
    patetosDiv.innerHTML = "";
    years.forEach(year => {
        if (year.people.length === 0){return;} else{
            createSinglePatetDiv(patetosDiv, year.people, year.year);
        }
    });
}

function createSinglePatetDiv(parentDiv, sittande, year) {
    let patetDivContainer = document.createElement("div");
    patetDivContainer.classList.add("patetDivContainer");

    let patetDiv = document.createElement("div");
    patetDiv.classList.add("patetDiv");

    if (year) {
        let yearTitle = document.createElement("h3");
        yearTitle.textContent = year;
        yearTitle.classList.add("yearTitle");
        patetDiv.appendChild(yearTitle);
    }




    const patetSliderDiv = document.createElement("div");
    patetSliderDiv.classList.add("patetSliderDiv");
    patetDiv.appendChild(patetSliderDiv);

    let leftDiv = document.createElement("div");
    leftDiv.classList.add("patetSlide");
    let rightDiv = document.createElement("div");
    rightDiv.classList.add("patetSlide");

    patetSliderDiv.appendChild(leftDiv);
    patetSliderDiv.appendChild(rightDiv);

    let amountOfPeople = 0;
    sittande.forEach(element => {
        let person = createSittande(element);

        if(amountOfPeople%2 == 0){
            leftDiv.appendChild(person);
        } else{
            rightDiv.appendChild(person);
        }
          amountOfPeople++;
    });
    
    patetDivContainer.appendChild(patetDiv);
    parentDiv.appendChild(patetDivContainer);
}

function createSittande(person){
    let personDiv = document.createElement("div");

    personDiv.classList.add("person");

    personDiv.appendChild(createInfoImgDiv(person));
    let postP = document.createElement("p");
    personDiv.appendChild(postP);
    postP.textContent = person.post;
    postP.classList.add("postP");

    return personDiv;
};

function createInfoImgDiv(person){
    let infoImgDiv = document.createElement("div");

    let img = createPersonImage(person);
    infoImgDiv.appendChild(img);

    infoImgDiv.appendChild(createInfoDiv(person));
    infoImgDiv.classList.add("infoImgDiv");

    return infoImgDiv;
}

function createPersonImage(person){
    const personImage = document.createElement("img");
    personImage.classList.add("personImage");

    personImage.alt = "Profile picture for" + person.name + '"' + person.nick + '"';

    
    if (person.imageFile && person.imageFile !== undefined) {
        personImage.src = 'img/profileImages/' + person.imageFile;
    } else if (committeeInfo.fallbackProfileImage){
        personImage.src = committeeInfo.fallbackProfileImage;
    } else {
        personImage.src = 'img/icons/profilePicture.svg';
    }

    personImage.onerror = function() {
        personImage.src = 'img/icons/profilePicture.svg';
    }

    personImage.onerror = function() {
        personImage.src = 'img/icons/profilePicture.svg';
    }



    if (person.link && person.link !== undefined && person.link !== "") {
        const personLink = document.createElement("a");
        personLink.href = person.link;

        personLink.appendChild(personImage);
        return personLink;
    } else {
        return personImage;
    }
}



function createInfoDiv(person){
    let infoDiv = document.createElement("div");
    infoDiv.classList.add("infoDiv");
    
    let nameTitle = document.createElement("h4");
    nameTitle.textContent = person.nick;

    if (person.link && person.link !== undefined && person.link !== "") {
        const personLink = document.createElement("a");
        personLink.href = person.link;
        infoDiv.appendChild(personLink);

        personLink.appendChild(nameTitle);
    } else {
        infoDiv.appendChild(nameTitle);
    }

    let description = document.createElement("p");
    description.textContent = person.description;
    infoDiv.appendChild(description);

    return infoDiv;
};


function populateSittandeDiv(sittande){
    createSinglePatetDiv(sittandeDiv, sittande);
}



function getAllPatetos() {
    fetch('/api/getAllPatetos')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
          return response.json();
    })
    .then(data => {
        populatePatetosDiv(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
};


function getSittande(){
    fetch('/api/getSittande')
    .then(response => {
        if (response.ok) {
            return response.json();
        } 
        else if (response.status === 404) {
            return [];
        } 
        else {
            throw new Error('Network response was not ok');
        }
    })
    .then(data => {
      if (data.length !== 0) {
          populateSittandeDiv(data.people);
      } else {
          console.log("No sittande found");
      }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}


document.addEventListener('DOMContentLoaded', function() {
    getAllPatetos();
    getSittande();
});



