document.addEventListener('DOMContentLoaded', function() {
    // Ahora el DOM está completamente cargado

    const login = document.getElementById('login');
    const logout = document.getElementById('logout');
    if (login) {
        login.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita que se recargue la página

            const email = (document.getElementById('email')).value;
            const password = (document.getElementById('password')).value

            console.log("Email:", email); // Verifica el valor
            console.log("Password:", password); // Verifica el valor

            // Aquí podrías agregar tu lógica de autenticación.
            const authenticated = true; // Cambia esto según tu lógica

            if (authenticated) {
                window.location.href = "index.html"; // Redirige a la página principal
            } else {
                alert("Datos incorrectos.");
            }
        });
    }
    else if (logout ){
        logout.addEventListener( 'click' ,() => {
        window.location.href ='login.html';
    });  
    }
});
