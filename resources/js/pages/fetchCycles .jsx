import axios from 'axios';

const fetchCycles = async () => {
    const response = await axios.get('/api/cycles');
    console.log(response.data);
};

useEffect(() => {
    fetchCycles();
}, []);
