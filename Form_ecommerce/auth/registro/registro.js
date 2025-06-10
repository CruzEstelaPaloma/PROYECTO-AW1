const registroForm = document.getElementById('crearUser');

registroForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const fechaNacimiento = document.getElementById('cita').value;

  try {
    // Verificamos si el email ya está registrado
    const respuesta = await fetch('http://localhost:3000/api/usuarios/existeEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    if (!respuesta.ok) {
      throw new Error(`Error al verificar email: ${respuesta.status}`);
    }

    const data = await respuesta.json();

    if (data.existe) {
      return alert('¡El usuario ya está registrado!');
    }

    // Crear nuevo usuario
    const nuevoUsuario = {
      nombre,
      apellido,
      email,
      contraseña: password,
      fechaNacimiento,
      EsCliente: true
    };

    const res = await fetch('http://localhost:3000/api/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoUsuario)
    });

    if (!res.ok) throw new Error('No se pudo registrar el usuario');

    const usuarioRegistrado = await res.json();
    localStorage.setItem('usuario', JSON.stringify(usuarioRegistrado));

    alert('¡Registro exitoso!');
    window.location.href = '../login/login.html';
  } catch (error) {
    console.error('Error en el registro:', error);
    alert('Hubo un error al registrar el usuario.');
  }
});
