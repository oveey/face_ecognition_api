import axios from 'axios';

const setUpInfo = async (req, res) => {
    const { imageUrl } = req.body;

    if (!imageUrl) {
        return res.status(400).json({ error: 'Image URL is required' });
    }

    const PAT = '87124373b52f4a0a9374b0aa624c5402'; // Replace this with your actual PAT
    const USER_ID = 'museya';
    const APP_ID = 'face-detection';
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';

    const requestBody = {
        user_app_id: {
            user_id: USER_ID,
            app_id: APP_ID,
        },
        inputs: [
            {
                data: {
                    image: {
                        url: imageUrl,
                    },
                },
            },
        ],
    };

    try {
        const response = await axios.post(
            `https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`,
            requestBody,
            {
                headers: {
                    Authorization: `Key ${PAT}`, // Use PAT here
                    'Content-Type': 'application/json',
                },
            }
        );
        const regions = response.data.outputs[0].data.regions;
        res.json(regions);
    } catch (err) {
        console.error('Error communicating with Clarifai:', err.message);
        res.status(err.response?.status || 500).json({ error: err.message });
    }
};

export default setUpInfo
