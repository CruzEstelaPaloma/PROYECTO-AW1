document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const res = await fetch('http://localhost:3000/usuarios');
                const users = await res.json();

                const validUser = users.find(user => user.email === email && user.contraseña === password);

                if (!validUser) {
                    return alert('Usuario y/o contraseña incorrectos!');
                }

                localStorage.setItem('usuario', JSON.stringify(validUser));

                alert(`Bienvenido ${validUser.nombre}`);

                // Verificá la ruta real de tu index
                window.location.href = "/Form_ecommerce/index.html";
            } catch (error) {
                console.error(error);
                alert("Error al verificar usuario.");
            }
        });
    }
});
