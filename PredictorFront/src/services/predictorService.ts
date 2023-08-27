const API_URL = 'http://localhost:8080/api/predictor'; // Adjust this URL to your backend's endpoint

const PredictorService = {
    sendDataToBackend: async (csvData: string) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: csvData,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    },
};

export default PredictorService;
