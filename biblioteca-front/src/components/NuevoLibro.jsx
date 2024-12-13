import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

const NuevoLibro = () => {
  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    ISBN: "",
    estado: "",
    editorial: "",
    idioma: "",
    cantidad: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const dataToSend = {
      ...formData,
      estado: parseInt(formData.estado, 10),
      editorial: parseInt(formData.editorial, 10),
      idioma: parseInt(formData.idioma, 10),
      cantidad: parseInt(formData.cantidad, 10),
      ruta_imagen: formData.ruta_imagen,
    };

    try {
      console.log(dataToSend);
      await api.put("/libros", dataToSend);

      setSuccess(true);
      setTimeout(() => navigate("/Admin"), 2000);
    } catch (err) {
      setError("No se pudo cargar el nuevo libro. Intente nuevamente.");
    }
  };

  return (
    <div
      style={{
        maxHeight: "80vh",
        overflowY: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <Container className="d-flex align-items-center justify-content-center">
        <Row className="w-100">
          <Col md={9} className="mx-auto">
            <h2 className="text-center pb-3">Nuevo Libro</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && (
              <Alert variant="success">
                Libro registrado exitosamente. Redirigiendo...
              </Alert>
            )}
            <Form onSubmit={handleSubmit} className="shadow p-4 rounded" aria-label="Formulario para registrar un nuevo libro">
              <Form.Group className="mb-3" controlId="formTitulo">
                <Form.Label htmlFor="titulo">Titulo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa el titulo"
                  name="titulo"
                  id="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-describedby="tituloHelp"
                />
                <Form.Text id="tituloHelp" className="text-muted">
                  Escribe el título del libro.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formAutor">
                <Form.Label htmlFor="autor">Autor</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa el autor"
                  name="autor"
                  id="autor"
                  value={formData.autor}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-describedby="autorHelp"
                />
                <Form.Text id="autorHelp" className="text-muted">
                  Escribe el nombre del autor del libro.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formISBN">
                <Form.Label htmlFor="ISBN">ISBN</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa el ISBN"
                  name="ISBN"
                  id="ISBN"
                  value={formData.ISBN}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-describedby="isbnHelp"
                />
                <Form.Text id="isbnHelp" className="text-muted">
                  Proporciona el código ISBN del libro.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formImg">
                <Form.Label htmlFor="ruta_imagen">Ruta Imagen</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="/static/Img/Nombre_Imagen.jpg"
                  name="ruta_imagen"
                  id="ruta_imagen"
                  value={formData.ruta_imagen}
                  onChange={handleChange}
                  required
                  aria-required="true"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEstado">
                <Form.Label htmlFor="estado">Estado</Form.Label>
                <Form.Control
                  as="select"
                  name="estado"
                  id="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  required
                  aria-required="true"
                >
                  <option value={0}></option>
                  <option value={2}>Presentable</option>
                  <option value={1}>Reparacion</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEditorial">
                <Form.Label htmlFor="editorial">Editorial</Form.Label>
                <Form.Control
                  as="select"
                  name="editorial"
                  id="editorial"
                  value={formData.editorial}
                  onChange={handleChange}
                  required
                  aria-required="true"
                >
                  <option value={0}></option>
                  <option value={1}>Editorial Planeta</option>
                  <option value={2}>Penguin Random House</option>
                  <option value={3}>Alfaguara</option>
                  <option value={4}>RBA Libros</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formIdioma">
                <Form.Label htmlFor="idioma">Idioma</Form.Label>
                <Form.Control
                  as="select"
                  name="idioma"
                  id="idioma"
                  value={formData.idioma}
                  onChange={handleChange}
                  required
                  aria-required="true"
                >
                  <option value={0}></option>
                  <option value={1}>Español</option>
                  <option value={2}>Inglés</option>
                  <option value={3}>Francés</option>
                  <option value={4}>Alemán</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formCantidad">
                <Form.Label htmlFor="cantidad">Cantidad</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa la cantidad de libros"
                  name="cantidad"
                  id="cantidad"
                  value={formData.cantidad}
                  onChange={handleChange}
                  required
                  aria-required="true"
                />
              </Form.Group>
              <Button
                variant="success"
                type="submit"
                className="mx-auto d-block"
                aria-label="Registrar Nuevo Libro"
              >
                Registrar Nuevo Libro
              </Button>
            </Form>
            <div className="text-center">
              <Button
                variant="link"
                onClick={() => navigate("/Admin")}
                className="text-decoration-none fw-bold text-light"
                aria-label="Volver al detalle de libros"
              >
                Volver al detalle de libros
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NuevoLibro;
