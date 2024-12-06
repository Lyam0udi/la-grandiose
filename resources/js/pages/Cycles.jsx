// // resources/js/Cycles.jsx
// import React, { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import axios from 'axios';

// const Cycles = () => {
//     const { t } = useTranslation(); // Get the translation function
//     const [cycles, setCycles] = useState([]);

//     const fetchCycles = async () => {
//         try {
//             const response = await axios.get('/api/cycles'); // Fetch cycles from API
//             setCycles(response.data); // Store cycles data in state
//         } catch (error) {
//             console.error('Error fetching cycles:', error);
//         }
//     };

//     useEffect(() => {
//         fetchCycles(); // Fetch cycles when component mounts
//     }, []);

//     return (
//         <div>
//             <h2>{t('cycle')}</h2> {/* Translated text for "cycle" */}
//             <ul>
//                 {cycles.map((cycle) => (
//                     <li key={cycle.id}>{cycle.name}</li> // Replace with your Cycle's properties
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Cycles;
