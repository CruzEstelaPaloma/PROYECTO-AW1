
document.addEventListener('DOMContentLoaded', function () {
    
    const login = document.getElementById('login');
   
  
  
    if (login) {
        login.addEventListener('submit', function (event) {
            event.preventDefault();
  
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
  
            console.log("Email:", email);
            console.log("Password:", password);
  
            
            const Users = JSON.parse(sessionStorage.getItem('users')) || [];
  
            
            const validUser = Users.find(user => user.email === email && user.password === password);
  
            if (!validUser) {
                return alert('Usuario y/o contraseña incorrectos!');
            }
  
            
            sessionStorage.setItem('active_user', JSON.stringify(validUser));
  
            alert(`Bienvenido ${validUser.nombre}`);
  
            
            const authenticated = true; 
  
            if (authenticated) {
               window.location.href = "/Form_ecommerce/index.html"; 
            } else {
                alert("Datos incorrectos.");
            }
        });
    }
  
   
  });
  