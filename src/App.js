import {getDataSet, calculatePoints} from './sharedFunctions/dataFunctions/dataSetFunctions'
import Dashboard from './components/template/dashboard';
import '@fontsource/roboto';

function App() {
  const dataSet = getDataSet();

  return (
    <Dashboard />
  );
}

export default App;
