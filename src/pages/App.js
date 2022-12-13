import { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import ItemRepo from '../components/ItemRepo';
import {api} from '../services/api';

import {Container} from './styles'

function App() {

  const [currentRepo, setCurrentRepo] = useState('');

  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {
    const {data} = await api.get(`repos/${currentRepo}`)

    if(data.id){

      const isExist = repos.find(repo => repo.id === data.id)

      if(!isExist){
        setRepos(prev => [...prev, data]);
        setCurrentRepo('')
        return
      }
    }
    alert('Repositório repetido ou não encontrado')
  }

  const handleRemoveRepo = (id) => {
    setCurrentRepo(currentRepo.filter(repo => repo.id !== id));
  };

  return (
    <Container>
      <img 
        width={72}
        height={72}
        alt="logo" 
        src="https://github.githubassets.com/images/modules/dashboard/onboarding/gh-desktop.png" />
        <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)}/>
        <Button onClick={handleSearchRepo}/>
        {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo}/>)}
    </Container>
  );
}

export default App;