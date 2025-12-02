/**
 * Din Mægler Agents API Service
 * 
 * API Endpoints:
 * - GET /agents - Get all agents
 * - GET /agents/:id - Get agent by ID
 */

const API_BASE = "https://dinmaegler.onrender.com";

/**
 * Fetches all agents from the API
 * @returns {Promise<Array>} Array of agent objects
 */
export async function fetchAgents() {
    try {
        const response = await fetch(`${API_BASE}/agents`);
        if (!response.ok) throw new Error('Failed to fetch agents');
        return response.json();
    } catch (error) {
        console.error("Error fetching agents:", error);
        throw error;
    }
}

/**
 * Fetches a specific agent by ID
 * @param {string} id - Agent ID
 * @returns {Promise<Object>} Agent data object
 */
export async function fetchAgentById(id) {
    try {
        const response = await fetch(`${API_BASE}/agents/${id}`);
        if (!response.ok) throw new Error(`Failed to fetch agent with ID: ${id}`);
        return response.json();
    } catch (error) {
        console.error(`Error fetching agent with ID ${id}:`, error);
        throw error;
    }
}

/**
 * Searches for agents by name or other criteria
 * @param {Object} params - Search parameters
 * @returns {Promise<Array>} Filtered array of agent objects
 */
export async function searchAgents(params = {}) {
    try {
        const query = new URLSearchParams(params).toString();
        const url = `${API_BASE}/agents${query ? '?' + query : ''}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to search agents');
        return response.json();
    } catch (error) {
        console.error("Error searching agents:", error);
        throw error;
    }
}

/**
 * Alternative way to find a specific agent by ID from a list of agents
 * @param {string} id - Agent ID to find
 * @returns {Promise<Object|null>} Agent object or null if not found
 */
export async function findAgentById(id) {
    try {
        const agents = await fetchAgents();
        return agents.find(agent => agent.id === id) || null;
    } catch (error) {
        console.error(`Error finding agent with ID ${id}:`, error);
        throw error;
    }
}