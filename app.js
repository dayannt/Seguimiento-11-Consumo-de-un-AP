class Agente {
    constructor(nombre, rol, habilidades, imagen) {
        this.nombre = nombre;
        this.rol = rol;
        this.habilidades = habilidades;
        this.imagen = imagen;
    }
}

async function getAgents() {
    const response = await fetch('https://valorant-api.com/v1/agents');
    const data = await response.json();
    const agentsData = data.data;


    const agentes = agentsData.map(agent => new Agente(
        agent.displayName,
        agent.role ? agent.role.displayName : 'Unknown',
        agent.abilities.map(ability => ability.displayName),
        agent.displayIcon
    ));

    renderAgents(agentes);
}


function renderAgents(agentes) {
    const container = document.getElementById('agentes-container');
    container.innerHTML = ''; 

    agentes.forEach(agente => {
        const agentCard = document.createElement('div');
        agentCard.classList.add('agent-card');
        
        agentCard.innerHTML = `
            <img src="${agente.imagen}" alt="${agente.nombre}">
            <h2>${agente.nombre}</h2>
            <p><strong>Role:</strong> ${agente.rol}</p>
            <ul class="abilities">
                ${agente.habilidades.map(habilidad => `<li>${habilidad}</li>`).join('')}
            </ul>
        `;

        container.appendChild(agentCard);
    });
}


function filterAgents(event) {
    const searchTerm = event.target.value.toLowerCase();
    const agentCards = document.querySelectorAll('.agent-card');

    agentCards.forEach(card => {
        const agentName = card.querySelector('h2').textContent.toLowerCase();
        if (agentName.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

document.getElementById('search').addEventListener('input', filterAgents);

getAgents();