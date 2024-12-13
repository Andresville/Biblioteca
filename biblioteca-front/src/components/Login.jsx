import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import api from "../services/api";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2"; // Importar SweetAlert

const Login = ({ setUserType }) => {
  const { saveUserId } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/usuario", { username, password });
      console.log("Respuesta del servidor:", response.data);

      if (response.data.token && response.data.userType && response.data.id) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userType", response.data.userType);
        localStorage.setItem("id_usuario", response.data.id);

        saveUserId(response.data.id);
        setUserType(response.data.userType);

        // Mostrar alerta de éxito con SweetAlert
        Swal.fire({
          title: '¡Bienvenido!',
          text: 'Has iniciado sesión correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          // Redirigir al usuario dependiendo de su tipo
          navigate(response.data.userType === "admin" ? "/admin" : "/user");
        });
      } else {
        setError("Datos inválidos recibidos del servidor");
      }
    } catch (err) {
      console.error("Error al autenticar:", err);
      setError("Credenciales incorrectas");

      // Mostrar alerta de error con SweetAlert
      Swal.fire({
        title: 'Error',
        text: 'Credenciales incorrectas.',
        icon: 'error',
        confirmButtonText: 'Intentar de nuevo',
      });
    }
  };

  const handleChange = (e) => {
    if (error) setError("");
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    else if (name === "password") setPassword(value);
  };

  return (
    <div>
      <Container className="d-flex align-items-center justify-content-center" style={{ width: '70%' }}>
        <Row className="w-100">
          <Col md={6} className="mx-auto">
            <div className="text-center">
              <h2>Iniciar Sesión</h2>
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3 mt-3" controlId="formUsername">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa tu usuario"
                  value={username}
                  onChange={handleChange}
                  name="username"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-5" controlId="formPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={handleChange}
                  name="password"
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mx-auto d-block">
                Iniciar Sesión
              </Button>
            </Form>
            <div className="text-center rounded py-3">
              <Button
                variant="link"
                onClick={() => navigate('/nuevo-usuario')}
                className="text-decoration-none text-light"
              >
                Crear nuevo usuario
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
