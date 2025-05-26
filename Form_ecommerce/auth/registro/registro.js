const registroForm = document.getElementById('crearUser');

registroForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const fechaNacimiento = document.getElementById('cita').value;
  

  try {
    // Verificar si el email ya está registrado en el servidor
    const usuariosRes = await fetch('http://localhost:3000/usuarios');
    const usuarios = await usuariosRes.json();

    const yaExiste = usuarios.find(u => u.email === email);
    if (yaExiste) {
      return alert('¡El usuario ya está registrado!');
    }

    const nuevoUsuario = {
      nombre,
      apellido,
      email,
      contraseña: password,
      fechaNacimiento,
      EsCliente: true
    };

    const res = await fetch('http://localhost:3000/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoUsuario)
    });

    if (!res.ok) throw new Error('No se pudo registrar el usuario');

    const usuarioRegistrado = await res.json();

    // Guardamos el usuario en localStorage (para mantener sesión)
    localStorage.setItem('usuario', JSON.stringify(usuarioRegistrado));

    alert('¡Registro exitoso!');
    window.location.href = '../login/login.html';
  } catch (error) {
    console.error(error);
    alert('Hubo un error al registrar el usuario.');
  }
});

