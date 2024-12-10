import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import Swal from 'sweetalert2';

const NuevoUsuario = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
        role: 'user',
        dni: '',
        direccion: '',
        telefono: '',
    });
    const navigate = useNavigate();

    const validate = () => {
        if (!formData.nombre.trim()) {
            Swal.fire('Error', 'El nombre es obligatorio.', 'error');
            return false;
        } else if (!/^[a-zA-Z]{3,11}$/.test(formData.nombre)) {
            Swal.fire('Error', 'El nombre debe tener entre 3 y 11 letras y no debe contener números.', 'error');
            return false;
        }
        if (!formData.email.trim()) {
            Swal.fire('Error', 'El correo electrónico es obligatorio.', 'error');
            return false;
        } else if (!/.+@.+\..+/.test(formData.email)) {
            Swal.fire('Error', 'El correo electrónico debe contener un @ y un dominio válido.', 'error');
            return false;
        }
        if (!formData.password.trim()) {
            Swal.fire('Error', 'La contraseña es obligatoria.', 'error');
            return false;
        } else if (formData.password.length < 6) {
            Swal.fire('Error', 'La contraseña debe tener al menos 6 caracteres.', 'error');
            return false;
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(formData.password)) {
            Swal.fire('Error', 'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial.', 'error');
            return false;
        }
        if (!formData.dni.trim()) {
            Swal.fire('Error', 'El DNI es obligatorio.', 'error');
            return false;
        } else if (!/^\d+$/.test(formData.dni)) {
            Swal.fire('Error', 'El DNI debe contener solo números.', 'error');
            return false;
        }
        if (!formData.direccion.trim()) {
            Swal.fire('Error', 'La dirección es obligatoria.', 'error');
            return false;
        }
        if (!formData.telefono.trim()) {
            Swal.fire('Error', 'El teléfono es obligatorio.', 'error');
            return false;
        } else if (!/^\d{11}$/.test(formData.telefono)) {
            Swal.fire('Error', 'El teléfono debe contener exactamente 11 dígitos.', 'error');
            return false;
        }
        return true;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            await api.put('/usuario', formData);
            Swal.fire('Éxito', 'Usuario creado exitosamente.', 'success');
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            Swal.fire('Error', 'No se pudo crear el usuario. Intente nuevamente.', 'error');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center mt-3 mb-5">
            <Row className="w-100">
                <Col md={8} className="mx-auto">
                    <div className="text-center mb-4">
                        <h2>Crear Nuevo Usuario</h2>
                    </div>
                    <Form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
                        <Form.Group className="mb-3" controlId="formNombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingresa el nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Ingresa el correo electrónico"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Ingresa la contraseña"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formRole">
                            <Form.Label>Rol</Form.Label>
                            <Form.Control
                                as="select"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                            >
                                <option value="user">Usuario</option>
                                <option value="admin">Administrador</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDni">
                            <Form.Label>DNI</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingresa el DNI"
                                name="dni"
                                value={formData.dni}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDireccion">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingresa la dirección"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formTelefono">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingresa el teléfono"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="success" type="submit" className="w-100">
                            Crear Usuario
                        </Button>
                    </Form>
                    <div className="text-center mt-4">
                        <Button
                            variant="link"
                            onClick={() => navigate('/')}
                            className="text-decoration-none"
                        >
                            Volver al inicio
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default NuevoUsuario;
