const getUsers = (e) => {
    e.preventDefault();
    const usersNumber = document.querySelector('[name="users-number"').value;
    const usersGender = document.querySelector('[name="gender"').value;
    const url = `https://randomuser.me/api/?results=${usersNumber}&gender=${usersGender === "both" ? "male,female": usersGender} `;
    console.log(url);
    fetch(url) //promise - pending
        .then(response => { //resolved
            // console.log(response);
            if (response.status !== 200) {
                throw Error("To nie jest odpowiedź 200")
            } else {
                return response.json() //Fetch Api = json() parse to object
            }

        }).then(json => showUsers(json.results))
        .catch(err => { //rejected
            console.log(err);
        })

}

const showUsers = (users) => {
    let resultArea = document.querySelector('.user-list');
    resultArea.textContent = '';
    users.forEach(user => {
        console.log(user);

        const userName = `${user.name.title} ${user.name.first} ${user.name.last}`;
        const userAge = user.dob.age;
        const userGender = user.gender;
        const userEmail = user.email;
        const userPhone = user.phone;
        const userLocation = `${user.location.city}, ${user.location.state}, ${user.location.country}`;
        const userImg = user.picture.large;
        console.log(userName);
        resultArea.innerHTML += `<div class='user-list-item'><img src='${userImg}'/> Name: ${userName}</br> Age: ${userAge} <br>Gender: ${userGender} </br>
        Location: ${userLocation} <br/> Email: ${userEmail} </br> Phone: ${userPhone}</div>
                    `

    });

}

document.querySelector('.generator').addEventListener('submit', getUsers)