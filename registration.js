const form = document.getElementById('registration-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const fullname = form.elements.fullname.value;
    const email = form.elements.email.value;
    const age = form.elements.age.value;
    const gender = form.elements.gender.value;
    const address = form.elements.address.value;
    const mobile = form.elements.mobile.value;
    const password = form.elements.password.value;
    const confirmPassword = form.elements.confirmPassword.value;

    if (!fullname) {
        alert('Name must be filled out');
        return false;
      } else if (!/^[a-zA-Z ]+$/.test(fullname)) {
        alert('Name must contain only letters and spaces');
        return false;
      }

      if (!email) {
        alert('Email must be filled out');
        return false;
      }

      if (!age) {
        alert('Age must be filled out');
        return false;
      } else {
        // Check age is a number and is at least 18
        if (isNaN(age) || age < 18) {
          alert('You must be at least 18 years old to register');
          return false;
        }
      }    

      if (!gender) {
        alert('Gender must be selected');
        return false;
      } else {
        // Check that a valid gender has been selected
        const validGenders = ['Male', 'Female'];
        if (!validGenders.includes(gender)) {
          alert('Invalid gender selected');
          return false;
        }
      }  

      if (!address) {
        alert('Address must be filled out');
        return false;
      }

      if (!mobile) {
        alert('Mobile number must be filled out');
        return false;
      } else if (!/^[0-9+]+$/.test(mobile)) {
        alert('Mobile number must contain only digits and the "+" sign');
        return false;
      }

      if (!password) {
        alert('Password must be filled out');
        return false;
      }

      if (!confirmPassword) {
        alert('Please confirm your password');
        return false;
      }

      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return false;
      }


    const formData = {
        fullname: fullname,
        email: email,
        age: age,
        gender: gender,
        address: address,
        mobile: mobile,
        password: password,
        confirmPassword: confirmPassword
    };

    fetch('http://localhost:3000/users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

    form.reset();
});