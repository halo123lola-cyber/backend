import express from 'express';
const app = express();

app.use(express.json());

// Definir el puerto correctamente
const PORT = process.env.PORT || 3001;

// 1. READ (GET)
app.get('/api/games', async (req, res) => {
    try {
        const mockGames = [
            { _id: 'mock1', title: "Ejemplo 1", genre: "RPG", platform: "PC", releaseYear: 2023, rating: 4.5, cover: "url1" },
            { _id: 'mock2', title: "Ejemplo 2", genre: "Aventura", platform: "PS5", releaseYear: 2024, rating: 5.0, cover: "url2" },
        ];
        res.status(200).json(mockGames);
    } catch (error) {
        res.status(500).json({ message: 'Error interno (simulado).' });
    }
});

// 2. CREATE (POST)
app.post('/api/games', async (req, res) => {
    try {
        const newGameData = req.body;
        const savedGameMock = { 
            ...newGameData, 
            _id: Date.now().toString(),
            createdAt: new Date(),
            updatedAt: new Date()
        };
        res.status(201).json(savedGameMock);
    } catch (error) {
        res.status(400).json({ message: 'Error de validación (simulado).' });
    }
});

// 3. UPDATE (PUT)
app.put('/api/games/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (id === 'not_found') {
            return res.status(404).json({ message: 'Juego no encontrado (simulado).' });
        }

        const updatedGameMock = { 
            _id: id, 
            ...updateData,
            updatedAt: new Date()
        };

        res.status(200).json(updatedGameMock);
    } catch (error) {
        res.status(500).json({ message: 'Error interno al actualizar.' });
    }
});

// 4. DELETE (DELETE)
app.delete('/api/games/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (id === 'not_found') {
            return res.status(404).json({ message: 'Juego no encontrado (simulado).' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error interno al eliminar.' });
    }
});

// -------------------------------------------------------------
// INICIO DEL SERVIDOR
// -------------------------------------------------------------
app.listen(PORT, () => {
    console.log(`
    =======================================================
    🚀 Servidor Express (MOCK) ejecutándose en http://localhost:${PORT}

    Rutas de la API:
    - GET/POST: http://localhost:${PORT}/api/games
    - PUT/DELETE: http://localhost:${PORT}/api/games/:id
    =======================================================
    `);
});
