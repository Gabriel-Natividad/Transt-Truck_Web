// ==================================================================
//          INICIO DEL CÓDIGO JAVASCRIPT INTEGRADO
// ==================================================================

// ===== VARIABLES GLOBALES Y ESTADO DE LA APLICACIÓN =====
let currentUser = '';
let currentRole = null;
let simulationState = {
    isRunning: false,
    currentRoute: null,
    currentStopIndex: 0,
    movementDuration: 2000, // Duración del movimiento entre paradas (2 segundos)
    pauseDuration: 2000, // Duración de la pausa en cada parada (2 segundos)
    interval: null
};
let settings = {
    darkMode: false,
    soundAlerts: true,
    vibration: true,
};
const routesData = {
    campus3: {
        name: "RUTA CAMPUS III",
        image: "./js/assets/Ruta Campus lll.jpg",
        description: "Recorrido por la zona del Campus III, con paradas clave.",
        stops: [
            { name: "Calle 31", x: 10, y: 20 }, { name: "Periférica Norte", x: 20, y: 30 },
            { name: "AV. Concordia", x: 30, y: 40 }, { name: "AV. Corregidora", x: 40, y: 50 },
            { name: "Calle 37", x: 50, y: 60 }, { name: "Boquerón Del Palmar", x: 60, y: 70 },
            { name: "Carretera Carmen Puerto Real", x: 70, y: 60 }, { name: "Calle Escárcega", x: 80, y: 50 },
            { name: "AV. Puerto De Campeche", x: 85, y: 40 }, { name: "AV. Abasolo", x: 90, y: 35 },
            { name: "AV. Contadores", x: 85, y: 30 }, { name: "AV. Central", x: 80, y: 25 },
            { name: "Campus III", x: 75, y: 20 }
        ]
    },
    laguna: {
        name: "RUTA LAGUNA DE TÉRMINOS",
        image: "./js/assets/Ruta Laguna De Terminos.jpg",
        description: "Ruta que bordea la Laguna de Términos, conectando puntos importantes.",
        stops: [
            { name: "Paradero Mercado AFA", x: 15, y: 80 }, { name: "Malecón Del Centro", x: 25, y: 75 },
            { name: "Calle 25", x: 35, y: 70 }, { name: "Calle 24", x: 45, y: 65 },
            { name: "Monumento a la Bandera", x: 50, y: 60 }, { name: "Calle 28 x 17", x: 55, y: 55 },
            { name: "Parque Del Pescador", x: 60, y: 50 }, { name: "AV. 10 de Julio", x: 65, y: 45 },
            { name: "Calle 40", x: 70, y: 40 }, { name: "Calle Independencia", x: 75, y: 35 },
            { name: "Calle Constitución", x: 80, y: 30 }, { name: "Vicente Guerrero", x: 75, y: 25 },
            { name: "Balneario De La Manigua", x: 70, y: 20 }, { name: "AV. 16 De Septiembre", x: 65, y: 25 },
            { name: "Calle Satélite", x: 60, y: 30 }, { name: "Francisco Javier Mina", x: 55, y: 35 },
            { name: "Capilla San Juan Tadeo", x: 50, y: 40 }, { name: "Calle 17-D", x: 45, y: 45 },
            { name: "AV. 10 De Julio", x: 40, y: 50 }, { name: "Calle 19", x: 35, y: 55 },
            { name: "Circuito Del Periférico", x: 30, y: 60 }, { name: "Unidad Deportiva 20 de Noviembre", x: 25, y: 65 },
            { name: "Parque Cuauhtémoc", x: 20, y: 70 }, { name: "Laguna De Términos", x: 15, y: 75 }
        ]
    },
    costera: {
        name: "RUTA COSTERA",
        image: "./js/assets/Ruta Costeral.jpg",
        description: "Viaje a lo largo de la costa, ideal para los que se dirigen al malecón.",
        stops: [
            { name: "Paradero Mercado AFA", x: 15, y: 80 }, { name: "Malecón Del Centro", x: 25, y: 75 },
            { name: "Monumento a la Bandera", x: 50, y: 60 }, { name: "AV. Luis Donaldo Colosio", x: 60, y: 55 },
            { name: "AV. Periférica Norte", x: 70, y: 50 }, { name: "Calle 31", x: 80, y: 45 },
            { name: "AV. Juárez", x: 85, y: 40 }, { name: "Glorieta De La Perla", x: 90, y: 35 },
            { name: "AV. Isla Del Carmen", x: 95, y: 30 }, { name: "AV. Adolfo López Mateos", x: 90, y: 25 },
            { name: "AV. Corregidora", x: 85, y: 20 }, { name: "AV. 5 de Diciembre", x: 80, y: 15 },
            { name: "AV. Nardos", x: 80, y: 70 },
            { name: "AV. Constelación", x: 85, y: 65 }
        ]
    }
};

// ===== NAVEGACIÓN PRINCIPAL DE LA APP =====
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    const screenElement = document.getElementById(screenId);
    if (screenElement) {
        screenElement.classList.add('active');
        const firstInput = screenElement.querySelector('form input[type="text"]');
        if (firstInput) {
            firstInput.focus();
        }
    }
}

// ===== MANEJO DE EVENTOS Y FORMULARIOS =====
document.addEventListener('DOMContentLoaded', function() {
    // Transición de la pantalla de inicio a la de selección de rol
    setTimeout(() => {
        showScreen('roleSelectionScreen');
    }, 2500);

    // Event listeners para los botones de navegación y rol
    document.getElementById('userBtn').addEventListener('click', () => showScreen('userLoginScreen'));
    document.getElementById('conductorBtn').addEventListener('click', () => showScreen('conductorLoginScreen'));
    document.getElementById('guestBtn').addEventListener('click', loginAsGuest);
    document.getElementById('backToRoles1').addEventListener('click', () => showScreen('roleSelectionScreen'));
    document.getElementById('backToRoles2').addEventListener('click', () => showScreen('roleSelectionScreen'));
    document.getElementById('logoutBtn').addEventListener('click', logout);
    document.getElementById('logoutGuestBtn').addEventListener('click', logout);

    // Event listeners del menú principal (Usuario)
    document.getElementById('viewRoutesCard').addEventListener('click', () => {
        showScreen('routesScreen');
        renderRoutes();
    });
    document.getElementById('notificationsCard').addEventListener('click', () => showScreen('notificationsScreen'));
    document.getElementById('settingsCard').addEventListener('click', () => showScreen('settingsScreen'));

    // Event listeners del menú de invitado
    document.getElementById('viewRoutesCardGuest').addEventListener('click', () => {
        showScreen('routesScreen');
        renderRoutes();
    });
    document.getElementById('notificationsCardGuest').addEventListener('click', () => showScreen('notificationsScreen'));

    // Botones de retroceso
    document.getElementById('backToMenu').addEventListener('click', () => {
        if (currentRole === 'guest') {
            showScreen('guestMenu');
        } else {
            showScreen('mainMenu');
        }
    });
    document.getElementById('backToRoutes').addEventListener('click', () => {
        pauseSimulation();
        showScreen('routesScreen');
    });
    document.getElementById('backToMenuFromNotifications').addEventListener('click', () => {
        if (currentRole === 'guest') {
            showScreen('guestMenu');
        } else {
            showScreen('mainMenu');
        }
    });
    document.getElementById('backToMenuFromSettings').addEventListener('click', () => showScreen('mainMenu'));
    document.getElementById('clearNotificationsBtn').addEventListener('click', clearAllNotifications);
    
    // Botones de simulación
    document.getElementById('startStopBtn').addEventListener('click', toggleSimulation);
    document.getElementById('nextStopBtn').addEventListener('click', goToNextStop);
    document.getElementById('stopSimulationBtn').addEventListener('click', () => {
        pauseSimulation();
        showScreen('routesScreen');
        showToast('Simulación detenida.', 'info');
    });

    // Toggle para ajustes
    document.querySelectorAll('.toggle').forEach(toggle => {
        toggle.addEventListener('click', () => toggleSetting(toggle));
    });

    // Formulario de Registro de Usuario
    document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = this.querySelector('button[type="submit"]');

        const formData = {
            nombre: document.getElementById('nombre').value.trim(),
            email: document.getElementById('email').value.trim(),
            password: document.getElementById('password').value,
            birthdate: document.getElementById('birthdate').value
        };
        
        if (!validateUserForm(formData)) { return; }
        
        showLoadingState(submitBtn, "Creando cuenta...");
        
        setTimeout(() => {
            hideLoadingState(submitBtn, "Crear Cuenta");
            currentUser = formData.nombre;
            currentRole = 'user';
            document.getElementById('welcomeUser').textContent = `¡Hola, ${formData.nombre}!`;
            showToast(`¡Registro exitoso, ${formData.nombre}!`, 'success');
            this.reset();
            showScreen('mainMenu');
        }, 1500);
    });

    // Formulario de Login de Conductor
    document.getElementById('conductorLoginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = this.querySelector('button[type="submit"]');
        
        const nombre = document.getElementById('conductorName').value.trim();
        const conductorId = document.getElementById('conductorId').value.trim();
        const selectedRoute = document.getElementById('conductorRoute').value;

        if (!nombre || !conductorId || !selectedRoute) {
            showToast('Por favor, completa todos los campos.', 'error');
            return;
        }

        showLoadingState(submitBtn, "Iniciando...");

        setTimeout(() => {
            hideLoadingState(submitBtn, "Iniciar Ruta");
            currentUser = nombre;
            currentRole = 'conductor';
            document.getElementById('welcomeUser').textContent = `¡Hola, ${nombre}!`;
            showToast(`¡Buen viaje, ${nombre}!`, 'success');
            startRouteSimulation(selectedRoute);
        }, 1000);
    });
});

// ===== FUNCIONES DE ROL Y AUTENTICACIÓN =====
function loginAsGuest() {
    currentRole = 'guest';
    showToast('Bienvenido, Invitado.', 'info');
    showScreen('guestMenu');
}

function logout() {
    currentUser = '';
    currentRole = null;
    pauseSimulation();
    showToast('Sesión cerrada. ¡Vuelve pronto!', 'success');
    showScreen('roleSelectionScreen');
}

// ===== FUNCIONES DE VALIDACIÓN =====
function validateUserForm(data) {
    if (!data.nombre || data.nombre.length < 2) {
        showToast('El nombre debe tener al menos 2 caracteres.', 'error');
        return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showToast('Por favor, ingresa un email válido.', 'error');
        return false;
    }
    if (data.password.length < 6) {
        showToast('La contraseña debe tener al menos 6 caracteres.', 'error');
        return false;
    }
    const birthDate = new Date(data.birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if (age < 18) {
        showToast('Debes ser mayor de 18 años para registrarte.', 'error');
        return false;
    }
    return true;
}

// ===== FUNCIONES DE UI Y FEEDBACK =====
function showLoadingState(button, text = 'Procesando...') {
    button.disabled = true;
    button.textContent = text;
}

function hideLoadingState(button, text = 'Enviar') {
    button.disabled = false;
    button.textContent = text;
}

function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toastContainer.removeChild(toast), 500);
    }, 4000);
}

// ===== LÓGICA DE SIMULACIÓN Y RUTAS =====
function renderRoutes() {
    const routeList = document.getElementById('routeList');
    routeList.innerHTML = '';
    
    for (const routeId in routesData) {
        const route = routesData[routeId];
        const routeCard = document.createElement('div');
        routeCard.className = 'route-card';
        let simulationBtnHtml = '';
        if (currentRole === 'conductor' || currentRole === 'user') {
            simulationBtnHtml = `<button class="btn-primary" onclick="startRouteSimulation('${routeId}')">Ver Detalles de Ruta</button>`;
        }
        routeCard.innerHTML = `
            <div class="route-header">
                <h3 class="route-title">${route.name}</h3>
            </div>
            <div class="route-content">
                <img src="${route.image}" alt="Mapa de la ${route.name}" class="route-image">
                <p class="route-description">${route.description}</p>
                ${simulationBtnHtml}
            </div>
        `;
        routeList.appendChild(routeCard);
    }
}

function startRouteSimulation(routeId) {
    if (!routesData[routeId]) {
        console.error("Ruta no encontrada:", routeId);
        return;
    }
    simulationState.currentRoute = routeId;
    simulationState.currentStopIndex = 0;
    
    const truck = document.getElementById('truck');
    const container = document.getElementById('simulationContainer');
    
    const firstStop = routesData[routeId].stops[0];
    truck.style.left = `${firstStop.x}%`;
    truck.style.top = `${firstStop.y}%`;
    
    container.querySelectorAll('.stop-marker').forEach(marker => marker.remove());
    
    routesData[routeId].stops.forEach((stop, index) => {
        const marker = document.createElement('div');
        marker.className = 'stop-marker';
        marker.textContent = index + 1;
        marker.style.left = `${stop.x}%`;
        marker.style.top = `${stop.y}%`;
        container.appendChild(marker);
    });

    document.getElementById('mapRouteTitle').textContent = `Ruta: ${routesData[routeId].name}`;
    document.getElementById('startStopBtn').textContent = 'Iniciar';
    document.getElementById('startStopBtn').disabled = false;
    document.getElementById('nextStopBtn').disabled = true;
    document.getElementById('stopSimulationBtn').disabled = true;

    updateRouteInfo();
    
    showScreen('mapScreen');
    showToast(`Preparando simulación para la ${routesData[routeId].name}.`, 'info');
}

function toggleSimulation() {
    const startStopBtn = document.getElementById('startStopBtn');
    if (simulationState.isRunning) {
        pauseSimulation();
        startStopBtn.textContent = 'Reanudar';
        document.getElementById('nextStopBtn').disabled = true;
    } else {
        if (!simulationState.interval) {
            // Inicia el movimiento al siguiente punto
            simulateTruckMovement();
        }
        simulationState.isRunning = true;
        startStopBtn.textContent = 'Pausar';
        document.getElementById('nextStopBtn').disabled = false;
        document.getElementById('stopSimulationBtn').disabled = false;
    }
}

function pauseSimulation() {
    clearInterval(simulationState.interval);
    simulationState.interval = null;
    simulationState.isRunning = false;
}

function simulateTruckMovement() {
    const truck = document.getElementById('truck');
    const route = routesData[simulationState.currentRoute];
    const stops = route.stops;
    
    const currentStopIndex = simulationState.currentStopIndex;

    if (currentStopIndex >= stops.length) {
        showToast('¡Ruta completada!', 'success');
        pauseSimulation();
        document.getElementById('startStopBtn').textContent = 'Iniciar';
        document.getElementById('startStopBtn').disabled = true;
        document.getElementById('nextStopBtn').disabled = true;
        document.getElementById('stopSimulationBtn').disabled = true;
        
        addNotification(route.name, 'La ruta ha sido completada.', 'success');
        return;
    }
    
    let nextStop = stops[currentStopIndex];

    // Transición para el movimiento, dura 2 segundos
    truck.style.transition = `all ${simulationState.movementDuration / 1000}s linear`;
    truck.style.left = `${nextStop.x}%`;
    truck.style.top = `${nextStop.y}%`;
    
    const markers = document.querySelectorAll('.stop-marker');
    if (markers[currentStopIndex]) {
        markers[currentStopIndex].classList.add('visited');
    }
    
    const stopName = stops[currentStopIndex].name;
    const routeName = route.name;
    addNotification(routeName, `El camión ha llegado a la parada: ${stopName}`, 'info');

    simulationState.currentStopIndex++;
    
    updateRouteInfo();

    // Suma la duración del movimiento y la pausa en cada parada
    simulationState.interval = setTimeout(() => {
        simulateTruckMovement();
    }, simulationState.movementDuration + simulationState.pauseDuration);
}

function goToNextStop() {
    if (simulationState.isRunning) {
        pauseSimulation();
        simulateTruckMovement();
    }
}

function updateRouteInfo() {
    const routeInfoTitle = document.getElementById('routeInfoTitle');
    const routeInfoContent = document.getElementById('routeInfoContent');
    
    const route = routesData[simulationState.currentRoute];
    const currentStopIndex = simulationState.currentStopIndex;
    const currentStop = route.stops[currentStopIndex - 1];

    if (currentStop) {
        routeInfoTitle.textContent = `Última parada: ${currentStop.name}`;
        routeInfoContent.innerHTML = `<p>Paradas restantes: ${route.stops.length - currentStopIndex}</p>`;
    } else {
        routeInfoTitle.textContent = `Ruta iniciada`;
        routeInfoContent.innerHTML = `<p>Paradas restantes: ${route.stops.length - currentStopIndex}</p>`;
    }
}


// ===== LÓGICA DE NOTIFICACIONES Y AJUSTES =====
function addNotification(title, message, type = 'info') {
    const notificationsList = document.getElementById('notificationsList');
    const notification = document.createElement('div');
    notification.className = 'notification-item new';
    notification.innerHTML = `
        <div class="notification-time">${new Date().toLocaleTimeString()}</div>
        <div class="notification-title">${title}</div>
        <div class="notification-message">${message}</div>
    `;
    notificationsList.prepend(notification);
    setTimeout(() => notification.classList.remove('new'), 1000);
}

function clearAllNotifications() {
    const list = document.getElementById('notificationsList');
    list.innerHTML = '';
    showToast('Notificaciones eliminadas.', 'success');
}

// ===== LÓGICA DE AJUSTES =====
function toggleSetting(element) {
    element.classList.toggle('active');
    const settingName = element.dataset.setting;
    const isActive = element.classList.contains('active');
    settings[settingName] = isActive;

    if (settingName === 'darkMode') {
        toggleDarkMode(isActive);
    }

    showToast(`'${settingName}' ${isActive ? 'activado' : 'desactivado'}.`, 'info');
}

function toggleDarkMode(isDark) {
    document.body.classList.toggle('dark-mode', isDark);
}