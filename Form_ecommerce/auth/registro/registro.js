const registroForm = document.getElementById('crearUser')

registroForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const nombre = document.querySelector('input[type="nombre"]').value;
    const apellido = document.querySelector('input[type="apellido"]').value;
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;
    const fechaNacimiento = document.querySelector('input[type="date"]').value;


    const Users =JSON.parse(sessionStorage.getItem('users')) || []

    const IsUserRegistered =Users.find(user=> user.email===email)

    if (IsUserRegistered){
        return alert('El usuario ya esta registrado!')
    }
    Users.push({nombre: nombre, apellido:apellido, email:email,password: password, date:fechaNacimiento })
    sessionStorage.setItem('users',JSON.stringify(Users))
    alert('registro exitoso')
    window.location.href = '../login/login.html'; 



})
