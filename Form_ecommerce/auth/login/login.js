document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
  
    if (loginForm) {
      loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();
  
        const email = document.getElementById('email').value.trim();
        const contraseña = document.getElementById('password').value;
  
        try {
            const res = await fetch('http://localhost:3000/api/usuarios/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, contraseña })
          });
  
          if (!res.ok) {
            const errorData = await res.json();
            alert(errorData.error || 'Usuario y/o contraseña incorrectos!');
            return;
          }
  
          const data = await res.json();
          localStorage.setItem('token', data.token);  
          localStorage.setItem('usuario', JSON.stringify(data.usuario));
  
          alert('Login exitoso! Bienvenido');
  
          
          await obtenerUsuarios();
  
          
          window.location.href = '/Form_ecommerce/index.html';
  
        } catch (error) {
          console.error(error);
          alert('Error al verificar usuario.');
        }
      });
    }
  });
  
  
  async function obtenerUsuarios() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No estás logueado.');
      return;
    }
  
    try {
        const res = await fetch('http://localhost:3000/api/usuarios', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.error || 'Error al obtener usuarios.');
        return;
      }
  
      const usuarios = await res.json();
      console.log('Usuarios protegidos:', usuarios);
      
  
    } catch (error) {
      console.error('Error:', error);
      alert('Error en la conexión al obtener usuarios.');
    }
  }
  