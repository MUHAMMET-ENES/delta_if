/*
 * THE ARCHIVE ENGINE
 * Renders the static database of counterfactuals.
 */

const data = [
    {
        id: "Δ-000",
        subject: "The Origin (Manifesto)",
        state: "CONSTANT",
        link: "about.html",
        access: "GRANTED"
    },
    {
        id: "Δ-001",
        subject: "Absence vs. Excess",
        state: "BIFURCATED",
        link: "index.html",
        access: "ACTIVE"
    },
    {
        id: "Δ-002",
        subject: "The Silence of Geometry",
        state: "PENDING",
        link: "#",
        access: "LOCKED"
    },
    {
        id: "Δ-003",
        subject: "Digital Decay",
        state: "CORRUPTED",
        link: "404.html", // Intentionally leads to the Void
        access: "UNSTABLE"
    }
];

const tableBody = document.getElementById('archive-list');

function renderArchive() {
    // Clear loading state
    tableBody.innerHTML = '';

    // Staggered animation delay
    let delay = 0;

    data.forEach(entry => {
        const row = document.createElement('tr');
        row.style.animationDelay = `${delay}ms`;
        
        // Conditional formatting for the Status
        let stateClass = '';
        if(entry.state === 'CORRUPTED') stateClass = 'state-corrupt';
        if(entry.state === 'PENDING') stateClass = 'state-pending';

        row.innerHTML = `
            <td class="col-id">${entry.id}</td>
            <td class="col-subject">${entry.subject}</td>
            <td class="col-state ${stateClass}">[${entry.state}]</td>
            <td class="col-access">
                <a href="${entry.link}" class="access-link">${entry.access === 'LOCKED' ? 'ENCRYPTED' : 'OPEN LINK'}</a>
            </td>
        `;

        tableBody.appendChild(row);
        delay += 100; // 100ms cascade effect
    });
}

// Init
document.addEventListener('DOMContentLoaded', renderArchive);
