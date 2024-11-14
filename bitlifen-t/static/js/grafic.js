// Obtener el contexto del canvas
const ctx = document.getElementById('heartAttackChart').getContext('2d');

// Datos del gráfico
const data = {
    labels: ['20-29', '30-39', '40-49', '50-59', '60-69', '70+'], // Grupos de edad
    datasets: [{
        label: 'Frecuencia de Paros Cardíacos',
        data: [5, 10, 20, 35, 50, 70], // Datos de ejemplo, ajusta según sea necesario
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // Azul claro con transparencia
        borderColor: 'rgba(54, 162, 235, 1)', // Azul sólido
        borderWidth: 1
    }]
};

// Configuración del gráfico
const config = {
    type: 'bar', // Tipo de gráfico (barra)
    data: data,
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Casos por 100,000 personas'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Edad'
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        }
    }
};

// Crear el gráfico
const heartAttackChart = new Chart(ctx, config);
