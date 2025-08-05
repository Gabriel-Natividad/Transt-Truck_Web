# Transit Truck 🚛

Una plataforma web moderna para la gestión y optimización del transporte de camiones, diseñada específicamente para las rutas de Ciudad del Carmen, Campeche.

## 🌟 Características

- **Diseño Moderno**: Interfaz glassmorphism con gradientes y efectos visuales
- **Responsive Design**: Adaptable a dispositivos móviles y desktop
- **Formularios Interactivos**: Registro e inicio de sesión con validación
- **Animaciones Fluidas**: Efectos de parallax y transiciones suaves
- **Accesibilidad**: Navegación por teclado y elementos semánticos

## 🚀 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con custom properties y grid/flexbox
- **JavaScript ES6+**: Funcionalidad interactiva y validaciones
- **Font Awesome**: Iconos vectoriales
- **Live Server**: Desarrollo local (VS Code)

## 📁 Estructura del Proyecto

```
transit-truck/
├── index.html              # Página principal
├── css/
│   └── styles.css          # Estilos CSS organizados por secciones
├── js/
│   └── script.js           # Funcionalidad JavaScript
├── assets/
│   └── images/             # Imágenes (para uso futuro)
└── README.md               # Documentación del proyecto
```

## 🛠️ Instalación y Configuración

### Requisitos Previos
- Visual Studio Code
- Extensión Live Server para VS Code

### Pasos de Instalación

1. **Clona o descarga el proyecto**
   ```bash
   git clone [tu-repositorio]
   cd transit-truck
   ```

2. **Abre en Visual Studio Code**
   ```bash
   code .
   ```

3. **Instala la extensión Live Server**
   - Ve a Extensions (Ctrl+Shift+X)
   - Busca "Live Server"
   - Instala la extensión de Ritwick Dey

4. **Ejecuta el proyecto**
   - Haz clic derecho en `index.html`
   - Selecciona "Open with Live Server"
   - El sitio se abrirá automáticamente en tu navegador

## 📱 Secciones de la Aplicación

### 🏠 Hero Section
- Presentación principal de Transit Truck
- Botón de llamada a la acción para explorar rutas

### 📝 Formulario de Registro
- Campos: Nombre, Email, Contraseña, Fecha de Nacimiento
- Validaciones en tiempo real
- Verificación de edad mínima (18 años)

### ℹ️ Sección "Conócenos"
- Información sobre la empresa
- Características principales: Seguro, Rápido, Rentable
- Iconos interactivos con efectos hover

### 🗺️ Sección de Rutas
- **Ruta Campus III**: Conexión con el campus universitario
- **Ruta Laguna de Términos**: Acceso a la zona turística
- Cards interactivas con efectos visuales

### 🔐 Modal de Inicio de Sesión
- Formulario emergente
- Navegación por teclado
- Cierre con Escape o clic exterior

## 🎨 Características de Diseño

### Paleta de Colores
- **Primario**: #667eea (Azul)
- **Secundario**: #764ba2 (Púrpura)
- **Gradientes**: Linear gradients para elementos destacados

### Efectos Visuales
- **Glassmorphism**: Elementos con transparencia y blur
- **Parallax**: Efecto sutil en la sección hero
- **Animaciones**: Fade-in y slide-in al hacer scroll
- **Hover Effects**: Transformaciones y sombras dinámicas

## 💻 Funcionalidades JavaScript

### Validación de Formularios
- Validación de email con regex
- Verificación de edad
- Mensajes de error personalizados
- Estados de carga en botones

### Navegación Suave
- Scroll suave entre secciones
- Compensación por header fijo

### Notificaciones
- Sistema de notificaciones toast
- Tipos: success, error, info
- Animaciones de entrada y salida

### Accesibilidad
- Navegación por teclado en modales
- Focus management
- Elementos semánticos

## 📱 Responsive Design

### Breakpoints
- **Desktop**: > 768px
- **Tablet**: ≤ 768px
- **Mobile**: ≤ 480px

### Adaptaciones Móviles
- Menú de navegación oculto
- Grid de una columna
- Padding reducido
- Botones apilados verticalmente

## 🔧 Personalización

### Modificar Colores
Edita las custom properties en `css/styles.css`:
```css
:root {
    --primary-color: #tu-color-primario;
    --secondary-color: #tu-color-secundario;
}
```

### Agregar Nuevas Rutas
1. Duplica un `.route-card` en `index.html`
2. Actualiza el contenido y el icono
3. Los estilos se aplicarán automáticamente

### Modificar Animaciones
Las animaciones están definidas en la sección de `@keyframes` en el CSS.

## 🐛 Debug y Desarrollo

### Función de Debug
El archivo JavaScript incluye una función `debugLog()` que solo funciona en localhost:
```javascript
debugLog('Mensaje de debug', datos);
```

### Verificación de Elementos
Al cargar la página, se verifica automáticamente que todos los elementos críticos existan.

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🤝 Contribuciones

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Contacto

Para soporte o consultas sobre Transit Truck, contacta a través de:
- Email: gabodelacruz2006@gmail.com

---

**¡Gracias por usar Transit Truck! 🚛✨**