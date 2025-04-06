
import MapView from '../components/MapView';
import { buildEquipmentDetails } from '../utils/parseEquipmentData';
const Dashboard = () => {
  const equipmentList = buildEquipmentDetails();
  console.log({equipmentList});
  
  return (
    <div>
      <div>aaa</div>
      <MapView equipmentList={equipmentList}/>
    </div>
  );
};

export default Dashboard;
